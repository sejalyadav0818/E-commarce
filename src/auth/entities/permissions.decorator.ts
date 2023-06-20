import { SetMetadata } from "@nestjs/common";
import { Permission } from "./permissions.enum";

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata("permissions", permissions);

console.log("decorator permissions", Permissions);
