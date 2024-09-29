import { DataSource, Repository } from "typeorm";
import { Review } from "./review.entity";
import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { v4 as uuidv4 } from 'uuid';
import { Rent } from "src/rents/rent.entity";

@Injectable()
export class ReviewRepository extends Repository<Review> {
  constructor(private readonly dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  async getAllReviewsByRentId(rentId: string): Promise<Review[]> {
    return this.find({
      where: { rentId },
    });
  }

  async createReviewByIdRent(
    rentId: string,
    createReviewDto: CreateReviewDto,
    user: User
  ): Promise<Partial<Review>> {
    const { comment, name } = createReviewDto;

    const rent = await this.dataSource.getRepository(Rent).findOne({
      where: { id: rentId },
      relations: ['user'],
    });

    if (!rent) {
      throw new NotFoundException(`Rent with ID ${rentId} not found`);
    }

    // Create and save the new review
    const newReview = this.create({
      id: uuidv4(),
      email: user.email,
      comment,
      name,
      userId: user.id,
      rentId,
    });

    await this.save(newReview);

    return {
      name: newReview.name,
      comment: newReview.comment,
      email: newReview.email,
      userId: newReview.userId,
      rentId: newReview.rentId,
    };
  }

  async deleteReviewById(reviewId: string): Promise<void> {
    const result = await this.delete({ id: reviewId });

    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }
  }
}
