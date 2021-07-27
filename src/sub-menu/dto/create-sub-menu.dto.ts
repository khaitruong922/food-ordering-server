import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidName = "Name length must be between 1 and 100 letters!"
}

export class CreateSubMenuDto {
    @ApiProperty()
    @IsString()
    @Length(0, 100, { message: ValidationErrorMessage.InvalidName })
    name: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string
}
