// booking.module.ts
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingRepository } from './booking.repository';
import { RentsRepository } from 'src/rents/rents.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingRepository,
    RentsRepository,
  ],
  exports: [
    BookingService,
  ],
})
export class BookingModule {}
