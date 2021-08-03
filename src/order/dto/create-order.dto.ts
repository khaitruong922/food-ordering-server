import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsOptional, IsPositive, IsString, Length, ValidateNested } from "class-validator";
import { CreateOrderDetailDto } from "src/order-detail/dto/create-order-detail.dto";
import { User } from "src/user/entities/user.entity";
import { OrderStatus } from "../entities/order.entity";

enum ValidationErrorMessage {
    InvalidPhoneLength = "Phone length must be between 6 and 15 digits!",
}

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    @Length(6, 15, {
        message: ValidationErrorMessage.InvalidPhoneLength
    })
    phoneNumber: string

    @ApiProperty()
    @IsString()
    address: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    note?: string

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
    user?: User

    @ApiProperty()
    @IsOptional()
    totalPrice?: number
}
