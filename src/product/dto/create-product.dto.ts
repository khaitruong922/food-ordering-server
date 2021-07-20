import { ApiProperty } from "@nestjs/swagger";
import { IsNegative, IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidDescriptionLength = "Description length must be between 0 and 255 letters!",
    InvalidName = "Name length can only be 16 letters!",
    InvalidPrice = "Price can't be negative!",
    InvalidQuantity = "Quantity can't be negative"
}

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    img: string

    @ApiProperty()
    @IsNegative({message: ValidationErrorMessage.InvalidPrice})
    price: number

    @ApiProperty()
    @IsString()
    @Length(0,16,{message: ValidationErrorMessage.InvalidName})
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNegative({message: ValidationErrorMessage.InvalidQuantity})
    quantity: number
}
