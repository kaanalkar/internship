import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Trimmed } from 'src/common/transformers/trimmed.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', minLength: 3, maxLength: 50 })
  @Trimmed()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'Software Engineer', minLength: 3, maxLength: 100 })
  @Trimmed()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  job: string;
}
