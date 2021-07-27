import { ApiProperty } from "@nestjs/swagger";
import { IsNegative, IsOptional, IsPositive, IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidName = "Name length must be between 1 and 100 letters!",
    InvalidPrice = "Price can't be negative!",
    InvalidQuantity = "Quantity can't be negative!"
}

export class CreateProductDto {
    @ApiProperty()
    @IsPositive({ message: ValidationErrorMessage.InvalidPrice })
    price: number

    @ApiProperty()
    @IsString()
    @Length(0, 100, { message: ValidationErrorMessage.InvalidName })
    name: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string
}
