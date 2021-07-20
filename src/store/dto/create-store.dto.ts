import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidNameLength = "Name length must be between 1 and 100 letters!",
}

export class CreateStoreDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100, {
        message: ValidationErrorMessage.InvalidNameLength
    })
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    address: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    img: string
}
