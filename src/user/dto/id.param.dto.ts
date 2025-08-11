import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class IdParamDto {
  @ApiProperty({ example: 7, description: 'User id' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  id: number;
}