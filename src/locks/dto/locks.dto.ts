import { ApiProperty } from '@nestjs/swagger';

export class CreateLockDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  serviceUUID: string;
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

export class AssignUserToLockBodyDto {
  @ApiProperty()
  userId: string;
}

export class GetUsersAssignedToLockDto {
  @ApiProperty()
  lockId: string;
}

export class DeleteUserFromLock extends AssignUserToLockDto {}

export class RegisterLockDto {
  @ApiProperty()
  serviceUUID: string;
  @ApiProperty()
  ipAddress: string;
}

export class GetUserLocksDto {
  userId: string;
}

export class OpenLockDto {
  @ApiProperty()
  serviceUUID: string;
  userId: string;
}

export class CloseLockDto {
  @ApiProperty()
  serviceUUID: string;
  userId: string;
}
