import { UserEntitie } from "src/users/entities/user.entity";

export function userIdFound(id: string): number{
  return 
}

export function userIdIndexFound(id: string): number{
  return this.users.findIndex((user: UserEntitie) => Number(id) === user.id)
}