import { ApiProperty } from '@nestjs/swagger';

export class CreateLockDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  ipAddress: string;
  @ApiProperty()
  macAddress: string;
  @ApiProperty()
  enabled: boolean;
}

export class UpdateLockDto extends CreateLockDto {
  @ApiProperty()
  id: string;
}

export class DeleteLockDto {
  @ApiProperty()
  id: string;
}

export class AssignUserToLockDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  lockId: string;
}

export class GetUsersAssignedToLockDto {
  @ApiProperty()
  lockId: string;
}

export class DeleteUserFromLock extends AssignUserToLockDto {}
