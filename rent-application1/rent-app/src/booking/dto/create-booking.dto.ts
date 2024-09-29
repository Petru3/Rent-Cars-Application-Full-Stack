import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @Type(() => Date) // transformă automat string-urile într-o instanță de Date
    @IsDate() // validare pentru a fi o instanță de Date
    dateRent: Date;
}
