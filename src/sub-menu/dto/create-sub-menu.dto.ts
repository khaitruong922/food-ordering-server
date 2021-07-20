import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidDescriptionLength = "Description length must be between 0 and 255 letters!",
    InvalidName = "name length can only be 16 letters!"
}

export class CreateSubMenuDto {
    @ApiProperty()
    @IsString()
    @Length(0, 16, { message: ValidationErrorMessage.InvalidName })
    name: string

    @ApiProperty()
    @IsString()
    @Length(0, 255, { message: ValidationErrorMessage.InvalidDescriptionLength })
    description: string
}
