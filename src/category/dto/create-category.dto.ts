import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Product } from "src/product/entities/product.entity";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @Optional()
    products: Product[]
}
