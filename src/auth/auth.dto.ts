import { IsEmail, IsString, MinLength, IsJWT } from "class-validator";
import { LoginRequest, RegisterRequest, ValidateRequest } from "./auth.pb";

export class LoginRequestDto implements LoginRequest {
    @IsEmail()
    public readonly email: string;
    @IsString()
    public readonly password: string;
}

export class RegisterRequestDto implements RegisterRequest {
    @IsEmail()
    public readonly email: string;
    @IsString()
    @MinLength(8)
    public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
    @IsJWT()
    public readonly token: string;
}