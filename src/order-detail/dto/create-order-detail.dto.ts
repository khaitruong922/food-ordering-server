import { ApiProperty } from "@nestjs/swagger";
import { IsNegative } from "class-validator";

enum ValidationErrorMessage {
    InvalidPrice = "Price can't be negative!",
    InvalidQuantity = "Quantity can't be negative"
}

export class CreateOrderDetailDto {
    @ApiProperty()
    @IsNegative({ message: ValidationErrorMessage.InvalidQuantity })
    quantity: number

    @ApiProperty()
    @IsNegative({ message: ValidationErrorMessage.InvalidPrice })
    price: number
}
