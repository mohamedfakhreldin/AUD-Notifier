import Permission from "./Permission";
import { PermissionEvents } from "../types/types";

export default class WebkitPermission extends Permission{
    requestPermission(PermissionEvents:PermissionEvents){
        
        window.webkitNotifications?.requestPermission((permission:string)=>{
            if(permission==this.GRANTED && typeof PermissionEvents.onGranted =='function') PermissionEvents.onGranted()
           else if(permission==this.DENIED && typeof PermissionEvents.onDenied =='function') PermissionEvents.onDenied()
          else if (permission == this.DEFAULT && typeof PermissionEvents.onDefault ==='function') return PermissionEvents.onDefault()
           if(this.isDenied() || this.isDefault()) throw new Error("you must allow notification to send browser notification");      

        })
    }
    isGranted(){
        return window.webkitNotifications.checkPermission() ==this.GRANTED
      }
      isDenied(){
        return window.webkitNotifications.checkPermission() ==this.DENIED
      }
      isDefault(){
        return  window.webkitNotifications.checkPermission() ==this.DEFAULT
      }
      get(){
          
          return window.webkitNotifications.checkPermission()
      }
}