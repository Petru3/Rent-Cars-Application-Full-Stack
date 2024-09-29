import { IsDate, IsInt, IsNotEmpty, IsString, IsNumber, MinLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateRentDto {

    @IsNotEmpty()
    @IsString()
    make: string;

    @IsNotEmpty()
    @IsInt()
    year: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    licencePlate: string;

    @IsNotEmpty()
    @Type(() => Date) // transformă automat string-urile într-o instanță de Date
    @IsDate() // validare pentru a fi o instanță de Date
    dateRent: Date;

    @IsNotEmpty()
    @IsNumber() // Change to validate numbers
    rentalPrice: number;

    @IsNotEmpty()
    @IsString()
    imageRent: string;
}
