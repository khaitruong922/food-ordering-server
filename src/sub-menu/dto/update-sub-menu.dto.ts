import { PartialType } from '@nestjs/swagger';
import { CreateSubMenuDto } from './create-sub-menu.dto';

export class UpdateSubMenuDto extends PartialType(CreateSubMenuDto) {}
