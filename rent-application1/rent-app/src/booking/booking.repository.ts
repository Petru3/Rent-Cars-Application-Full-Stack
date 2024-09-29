import { ForbiddenException, Injectable, NotFoundException, HttpException, HttpStatus } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { User } from "src/auth/user.entity";
import { Rent } from "src/rents/rent.entity";
import { RentStatus } from "src/rents/rent-status.enum";
import { RentsRepository } from "src/rents/rents.repository"; // Import the RentsRepository
import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable()
export class BookingRepository extends Repository<Booking> {
    constructor(
        private readonly dataSource: DataSource,
        private readonly rentsRepository: RentsRepository // Inject the RentsRepository
    ) {
        super(Booking, dataSource.createEntityManager());
    }
    
    async getAllBookings(user: User): Promise<Booking[]> {
        // Fetch all bookings for the user
        const bookings = await this.createQueryBuilder('booking')
            .leftJoinAndSelect('booking.user', 'user')
            .where('user.id = :id', { id: user.id })
            .getMany();
    
        // Remove the `user` property from each booking
        bookings.forEach(booking => {
            delete booking.user;
        });
    
        return bookings;
    }
    
    async createBooking(
        rentId: string,
        user: User,
    ): Promise<Booking> {
        const rent = await this.dataSource.getRepository(Rent).findOne({
            where: { id: rentId },
            relations: ['user'],
        });
    
        if (!rent) {
            throw new NotFoundException(`Rent with ID ${rentId} not found`);
        }

        if (rent.status === RentStatus.RENTED) {
            throw new HttpException(`Rent with ID ${rentId} is already rented`, HttpStatus.CONFLICT);
        }
    
        if (rent.userId === 'OWNER') {
            throw new ForbiddenException('You cannot reserve your own rent.');
        }
    
        const newBooking = new Booking();
        newBooking.make = rent.make;
        newBooking.year = rent.year;
        newBooking.licencePlate = rent.licencePlate;
        newBooking.dateRent = rent.dateRent;
        newBooking.status = rent.status;
        newBooking.rentalPrice = rent.rentalPrice;
        newBooking.user = user;
        newBooking.userId = user.id;
        newBooking.rentId = rentId;
    
        await this.save(newBooking);

        delete newBooking.user;
    
        return newBooking;
    }

    async finishBooking(
        bookingId: string, 
        user: User,
        createBooking: CreateBookingDto // Ensure this includes dateRent
    ): Promise<Booking> {
        const { dateRent } = createBooking;
    
        // Convert dateRent from string to Date instance
        const rentDate = new Date(dateRent);
    
        // Validate the date
        if (isNaN(rentDate.getTime())) {
            throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
        }
    
        // Fetch the booking by ID
        const booking = await this.findOne({ where: { id: bookingId } });
    
        if (!booking) {
            throw new NotFoundException(`Booking with ID ${bookingId} not found`);
        }
    
        // Update the rent date and status in the rents repository
        await this.rentsRepository.updateRentDate(booking.rentId, rentDate, user);
        await this.rentsRepository.updateRentStatus(booking.rentId, RentStatus.RENTED, user);
    
        // Update booking details
        booking.dateRent = rentDate;
        booking.status = RentStatus.RENTED;
        await this.save(booking);
    
        return booking;
    }
    
    async cancelationBooking(bookingId: string, user: User): Promise<void> {
        // Fetch the booking details
        const booking = await this.findOne({ where: { id: bookingId } });
    
        if (!booking) {
            throw new NotFoundException(`Booking with ID ${bookingId} not found`);
        }
    
        // Ensure the user is authorized to cancel this booking
        if (booking.userId !== user.id) {
            throw new ForbiddenException('You are not authorized to cancel this booking.');
        }
    
        // Use the rentId from the booking to update the rent status to 'AVAILABLE'
        await this.rentsRepository.updateRentStatus(booking.rentId, RentStatus.AVAILABLE, user);
    
        const deleteResult = await this.delete(bookingId);
    
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Failed to delete booking with ID ${bookingId}`);
        }
    }
}
