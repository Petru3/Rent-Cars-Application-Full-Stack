import { ForbiddenException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Rent } from "./rent.entity";
import { CreateRentDto } from "./dto/create-rent.dto";
import { v4 as uuidv4 } from 'uuid';
import { RentStatus } from "./rent-status.enum";
import { UpdateRentDto } from "./dto/update-rent.dto";
import { GetRentsFilterDto } from "./dto/get-rents-filtered.dto";
import { User } from "src/auth/user.entity";
import { Review } from "src/reviews/review.entity";
import { Booking } from "../booking/booking.entity"; // Import your Booking entity

@Injectable()
export class RentsRepository extends Repository<Rent> {
    private logger = new Logger('RentsRepository');
    
    constructor(private readonly dataSource: DataSource) {
        super(Rent, dataSource.createEntityManager());
    }

    async getAllRents(
        filterDto: GetRentsFilterDto,
        user: User
    ): Promise<Rent[]> {
        const { status, search, sortField, sortOrder } = filterDto;
        
        const query = this.createQueryBuilder('rent')
            .leftJoinAndSelect('rent.reviews', 'review');

        if (user.role === 'OWNER') {
            query.where('rent.userId = :userId', { userId: user.id });
        }
        
        if (status) {
            query.andWhere('rent.status = :status', { status });
        }
    
        if (search) {
            query.andWhere('rent.make LIKE :search', {
                search: `%${search}%`,
            });
        }
    
        if (sortField) {
            query.orderBy(`rent.${sortField}`, sortOrder || 'ASC');
        }

        this.logger.log(`The rent list was returned for the user with id: "${user.id}"|!`);
        try {
            const rents = await query.getMany();
            return rents;
        } catch (error) {
            console.error('Error fetching rents:', error);
            throw new NotFoundException('Failed to get rents!');
        }
    }

    async getAllRentsForOwners(
        filterDto: GetRentsFilterDto,
        user: User
    ): Promise<Rent[]> {
        const { status, search, sortField, sortOrder } = filterDto;
        
        const query = this.createQueryBuilder('rent')
            .leftJoinAndSelect('rent.reviews', 'review');
        
        if (status) {
            query.andWhere('rent.status = :status', { status });
        }
    
        if (search) {
            query.andWhere('rent.make LIKE :search', {
                search: `%${search}%`,
            });
        }
    
        if (sortField) {
            query.orderBy(`rent.${sortField}`, sortOrder || 'ASC');
        }

        this.logger.log(`The rent list was returned for the user with id: "${user.id}"|!`);
        try {
            const rents = await query.getMany();
            return rents;
        } catch (error) {
            console.error('Error fetching rents:', error);
            throw new NotFoundException('Failed to get rents!');
        }
    }

    async getRentById(id: string, user: User): Promise<Rent> {
        const query = this.createQueryBuilder('rent')
            .leftJoinAndSelect('rent.reviews', 'review')
            .where('rent.id = :id', { id });
    
        const rent = await query.getOne();
    
        if (!rent) {
            throw new NotFoundException(`The rent with id: "${id}" not found!`);
        }
    
        return rent;
    }

    async createRent(
        createRentDto: CreateRentDto,
        user: User
    ): Promise<Rent> {

        if (user.role === 'CLIENT') {
            throw new ForbiddenException(`Your role doesn't have permission to add a rent!`);
        } else {
            const { licencePlate } = createRentDto;
    
            const existingRent = await this.findOne({ where: { licencePlate } });
            if (existingRent) {
                throw new HttpException('Duplicate license plate', HttpStatus.BAD_REQUEST);
            }
        
            const newRent = new Rent();
            newRent.id = uuidv4();
            Object.assign(newRent, createRentDto);
            newRent.status = RentStatus.AVAILABLE;
            newRent.reviews = [];
            newRent.userId = user.id;
        
            delete newRent.user;
        
            await this.save(newRent);
        
            this.logger.log(`A rent was created for the user with id: "${user.id}"`);
            return newRent;
        }
    }
    
    async updateRentStatus(
        id: string, 
        status: RentStatus,
        user: User
    ): Promise<Rent> {
        const currentRent = await this.getRentById(id, user);
        currentRent.status = status;
    
        try {
            return await this.save(currentRent);
        } catch (error) {
            this.logger.error('Error updating rent status:', error);
            throw new HttpException('Failed to update rent status', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRentById(
        id: string, 
        updateRentDto: UpdateRentDto,
        user: User
    ): Promise<Rent> {
        const currentRentObj = await this.getRentById(id, user);
    
        if (currentRentObj.userId !== user.id) {
            throw new ForbiddenException(`You are not authorized to update this rent status!`);
        }
        
        const updatedRentObj = {
            ...currentRentObj,
            ...updateRentDto,
        };

        return this.save(updatedRentObj);
    }

    async updateRentDate(
        id: string, 
        dateRent: Date,
        user: User
    ): Promise<Rent> {
        const currentRentObj = await this.getRentById(id, user);
        currentRentObj.dateRent = dateRent;

        return this.save(currentRentObj);
    }

    async deleteRentById(
        id: string,
        user: User
    ): Promise<void> {
        const currentRentObj = await this.getRentById(id, user);

        if (!currentRentObj) {
            throw new NotFoundException(`Rent with ID "${id}" not found.`);
        }

        if (currentRentObj.userId !== user.id) {
            throw new ForbiddenException("You are not authorized to delete this rent.");
        }

        await this.deleteAssociatedReviews(id);
        await this.deleteAssociatedBookings(id); // Call the method to delete bookings
        const result = await this.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Rent with ID "${id}" not found.`);
        }
    }

    async deleteAssociatedReviews(rentId: string): Promise<void> {
        await this.manager.getRepository(Review).delete({ rentId });
    }

    async deleteAssociatedBookings(rentId: string): Promise<void> {
        await this.manager.getRepository(Booking).delete({ rentId }); // Ensure your Booking entity has rentId field
    }
}
