import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/config.typeorm';
import { RentsModule } from './rents/rents.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config'; // Ensure ConfigModule is imported

@Module({
  imports: [
    ConfigModule.forRoot(), // Load configuration
    TypeOrmModule.forRoot(typeOrmConfig),
    RentsModule,
    AuthModule,
    ReviewsModule,
    BookingModule,
  ],
})
export class AppModule {}
