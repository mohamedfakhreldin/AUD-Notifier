import Permission from "./Permission";
import { PermissionEvents } from "../types/types";


export default class ModernPermission extends Permission {
  async requestPermission(PermissionEvents: PermissionEvents) {
    let permission = await Notification.requestPermission();
if (PermissionEvents instanceof Object) {
  
  if (
    permission == this.GRANTED &&
    typeof PermissionEvents.onGranted === "function"
    )
    return PermissionEvents.onGranted();
    if (
      permission == this.DENIED &&
      typeof PermissionEvents.onDenied === "function"
      )
      return PermissionEvents.onDenied();
      if (
        permission == this.DEFAULT &&
        typeof PermissionEvents.onDefault === "function"
        )
        return PermissionEvents.onDefault();
        return permission
      }
    }
      
      isGranted() {
        return this.get() == this.GRANTED;
      }
      isDenied() {
        return this.get() == this.DENIED;
      }
      isDefault() {
        return this.get() == this.DEFAULT;
      }
  get() {
    return Notification.permission;
  }
}
