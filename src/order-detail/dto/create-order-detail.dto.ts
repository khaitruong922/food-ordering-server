import { ApiProperty } from "@nestjs/swagger";
import { IsPositive } from "class-validator";

enum ValidationErrorMessage {
    InvalidPrice = "Price can't be negative!",
    InvalidQuantity = "Quantity can't be negative"
}

export class CreateOrderDetailDto {
    @ApiProperty()
    @IsPositive({ message: ValidationErrorMessage.InvalidQuantity })
    quantity: number

    @ApiProperty()
    @IsPositive({ message: ValidationErrorMessage.InvalidPrice })
    price: number
}
