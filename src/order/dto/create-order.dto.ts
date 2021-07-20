import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsOptional, IsPositive, IsString, Length } from "class-validator";
import { OrderStatus } from "../entities/order.entity";

enum ValidationErrorMessage {
    InvalidOrderStatus = "Invalid status!",
    InvalidDescriptionLength = "Description length must be between 0 and 255 letters!",
    InvalidAdressLength = "Address length must be between 0 and 255 letters!",
    NegativePrice = "Price can't be negative!"
}

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    @Length(
        0, 255, {
        message: ValidationErrorMessage.InvalidAdressLength
    }
    )
    address: string

    @ApiProperty()
    @IsString()
    note: string
    
    @ApiProperty()
    @IsPositive({ message: ValidationErrorMessage.NegativePrice })
    totalPrice: number

    @ApiProperty()
    @IsDate()
    DeliveredTime: Date
}
