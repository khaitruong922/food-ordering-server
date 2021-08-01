import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsOptional, IsPositive, IsString, Length, ValidateNested } from "class-validator";
import { CreateOrderDetailDto } from "src/order-detail/dto/create-order-detail.dto";
import { User } from "src/user/entities/user.entity";
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
    @IsOptional()
    note: string

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    deliveredAt: Date

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    orderDetails: CreateOrderDetailDto[]

    @ApiProperty()
    @IsOptional()
    user: User

    @ApiProperty()
    @IsOptional()
    totalPrice: number
}
