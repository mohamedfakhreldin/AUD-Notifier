import { PermissionEvents } from "../types/types"

export default abstract class Permission{
     GRANTED ='granted'
     DENIED ='denied'
     DEFAULT ='default'
  abstract  requestPermission(PermissonEvent:PermissionEvents)
abstract isGranted():boolean
abstract isDenied():boolean
abstract isDefault():boolean
}