import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Store } from "src/store/entities/store.entity";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    name: string
}
