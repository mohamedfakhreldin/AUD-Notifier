import Permission from "./Permission";
import { PermissionEvents } from "../types/types";

export default class MozPermission extends Permission{
    requestPermission(PermissionEvents:PermissionEvents){
        
            if( typeof PermissionEvents.onGranted =='function') PermissionEvents.onGranted()
      

        
    }
    isGranted(){
        return true
      }
      isDenied(){
        return false
      }
      isDefault(){
        return false
      }
      get(){
          
          return this.GRANTED
      }
}