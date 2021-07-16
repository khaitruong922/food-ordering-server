import { IsEmail, IsOptional, IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidEmailFormat = "Invalid email format!",
    InvalidNameLength = "Name must be between 1 and 255 letters!",
    InvalidPhoneLength = "Phone must be between 6 and 15 digts!",
    InvalidUsernameLength = "Username must be between 6 and 16 letters!",
    InvalidPasswordLength = "Password must be between 6 and 100 letters!",
}

export class CreateUserDto {
    @IsString()
    @Length(1, 255, {
        message: ValidationErrorMessage.InvalidNameLength
    })
    name: string

    @IsEmail({
        ignore_max_length: true,
    }, {
        message: ValidationErrorMessage.InvalidEmailFormat
    })
    email: string

    @IsString()
    @Length(6, 16, {
        message: ValidationErrorMessage.InvalidUsernameLength
    })
    username: string

    @IsString()
    @Length(6, 100, {
        message: ValidationErrorMessage.InvalidPasswordLength
    })
    password: string

    @IsOptional()
    @IsString()
    avatarPath: string

    @IsString()
    @Length(6, 15, {
        message: ValidationErrorMessage.InvalidPasswordLength
    })
    phoneNumber: string

    @IsString()
    address: string
}