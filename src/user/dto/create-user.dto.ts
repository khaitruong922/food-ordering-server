import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";

enum ValidationErrorMessage {
    InvalidEmailFormat = "Invalid email format!",
    InvalidNameLength = "Name must be between 1 and 255 letters!",
    InvalidPhoneLength = "Phone must be between 6 and 15 digts!",
    InvalidUsernameLength = "Username must be between 6 and 16 letters!",
    InvalidPasswordLength = "Password must be between 6 and 100 letters!",
    InvalidPhoneFormat = "Phone number must contain only digits!"
}

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @Length(1, 255, {
        message: ValidationErrorMessage.InvalidNameLength
    })
    name: string

    @ApiProperty()
    @IsEmail({
        ignore_max_length: true,
    }, {
        message: ValidationErrorMessage.InvalidEmailFormat
    })
    email: string

    @ApiProperty()
    @IsString()
    @Length(6, 16, {
        message: ValidationErrorMessage.InvalidUsernameLength
    })
    username: string

    @ApiProperty()
    @IsString()
    @Length(6, 100, {
        message: ValidationErrorMessage.InvalidPasswordLength
    })
    password: string

    @ApiProperty()
    @IsString()
    @IsNumberString({ no_symbols: true }, {
        message: ValidationErrorMessage.InvalidPhoneFormat
    })
    
    @Length(6, 15, {
        message: ValidationErrorMessage.InvalidPhoneLength
    })
    phoneNumber: string

    @ApiProperty()
    @IsString()
    address: string
}