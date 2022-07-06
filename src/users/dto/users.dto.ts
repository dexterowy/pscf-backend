import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
