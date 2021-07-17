import { IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidNameLength = "Name length must be between 1 and 255 letters!",
    InvalidDescriptionLength = "Description length must be between 0 and 255 letters!",
    InvalidAdressLength = "address length must be between 0 and 255 letters!"
}

export class CreateStoreDto {
    @IsString()
    @Length(1, 255, {
        message: ValidationErrorMessage.InvalidNameLength
    })
    name : string

    @IsString()
    @Length(0, 255, {
        message : ValidationErrorMessage.InvalidDescriptionLength
    })
    description : string

    @IsString()
    @Length(0, 255, {
        message : ValidationErrorMessage.InvalidAdressLength
    })
    address : string
}
