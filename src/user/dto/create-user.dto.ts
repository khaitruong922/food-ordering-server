import { IsEmail, IsOptional, IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidEmailFormat = "Invalid email format!",
    InvalidNameLength = "Name length must be between 1 and 255 letters!",
    InvalidUsernameLength = "Username length must be between 6 and 16 letters!",
    InvalidPasswordLength = "Password length must be between 6 and 100 letters!",
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

    @IsOptional()
    @IsString()
    bio: string
}