import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import { Trimmed } from 'src/common/transformers/trimmed.transformer';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe', minLength: 3, maxLength: 50 })
  @IsOptional()
  @Trimmed()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({ example: 'Software Engineer', minLength: 3, maxLength: 100 })
  @IsOptional()
  @Trimmed()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  job?: string;
}
