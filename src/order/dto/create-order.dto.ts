import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsPositive, IsString, Length } from "class-validator";
import { OrderStatus } from "../entities/order.entity";

enum ValidationErrorMessage {
    InvalidOrderStatus = "Invalid status",
    InvalidDescriptionLength = "Description length must be between 0 and 255 letters!",
    InvalidAdressLength = "address length must be between 0 and 255 letters!",
    NegativePrice = "price can't be negative"
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
    @IsEnum(OrderStatus, {message: ValidationErrorMessage.InvalidOrderStatus})
    status: OrderStatus

    @ApiProperty()
    @IsPositive({message: ValidationErrorMessage.NegativePrice})
    totalPrice: number

    @ApiProperty()
    @IsDate()
    DeliveredTime: Date
}
