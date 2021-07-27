import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Store } from "src/store/entities/store.entity";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @Optional()
    stores: Store[]
}
