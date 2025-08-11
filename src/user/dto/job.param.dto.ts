import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { Trimmed } from 'src/common/transformers/trimmed.transformer';

export class JobParamDto {
  @ApiProperty({ example: 'Software Engineer' })
  @Trimmed()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  job: string;
}
