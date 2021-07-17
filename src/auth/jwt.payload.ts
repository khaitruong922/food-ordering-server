import { Role } from "src/role/role.enum";

export interface JwtPayload {
    sub: number,
    role: Role,
}