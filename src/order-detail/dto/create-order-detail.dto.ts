import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPositive } from "class-validator";
import { Product } from "src/product/entities/product.entity";

enum ValidationErrorMessage {
    InvalidPrice = "Price can't be negative!",
    InvalidQuantity = "Quantity can't be negative"
}

export class CreateOrderDetailDto {
    @ApiProperty()
    @IsPositive({ message: ValidationErrorMessage.InvalidQuantity })
    quantity: number

    @ApiProperty()
    productId: number

    @ApiProperty()
    @IsOptional()
    product: Product

    @ApiProperty()
    @IsOptional()
    price: number
}
