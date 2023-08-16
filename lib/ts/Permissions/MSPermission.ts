import Permission from "./Permission";
import { PermissionEvents } from "../types/types";

export default class MSPermission extends Permission{
    requestPermission(PermissionEvents:PermissionEvents){
        
            if(window.external.msSiteMode() && typeof PermissionEvents.onGranted =='function') PermissionEvents.onGranted()
           else if(window.external.msSiteMode() && typeof PermissionEvents.onDefault =='function') PermissionEvents.onDefault()
          


        
    }
    isGranted(){
        return window.external.msSiteMode()
      }
      isDenied(){
        return false
      }
      isDefault(){
        return !window.external.msSiteMode()
        
      }
      get(){
        
        return window.external.msSiteMode() ? this.GRANTED:this.DEFAULT
      }
}