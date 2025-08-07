import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ example: '12345', description: 'The unique identifier of the user', required: false })
  id?: number;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name?: string;

  @ApiProperty({ example: 'Software Engineer', description: 'The job title of the user' })
  job?: string;
}