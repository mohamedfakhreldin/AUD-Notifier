declare module 'aud-notifier' {
    const AUDNotifierVar:AUDNotifier
    export default AUDNotifierVar
class AUDNotifier {
    Permission: Permission;

    sendNotification(title: string, options:NotificationOptions): Promise
    sendDesktopNotification(title: string, options:NotificationOptions): Promise|Object
    sendMobileNotification(title: string, options:NotificationOptions): Promise|Object
    sendMobileNotificationRepeatedly(title: string, options:NotificationOptions ,numberOfRepeat:number=1,repeatAfter:number|number[]): void|Object
    sendDesktopNotificationRepeatedly(title: string, options:NotificationOptions ,numberOfRepeat:number=1,repeatAfter:number|number[]): void|Object
    sendNotificationRepeatedly(title: string, options:NotificationOptions ,numberOfRepeat:number=1,repeatAfter:number|number[]): void

    close(tag: string): void;

    clear(): void;

    setServiceWorkerSettings(params: ServiceWorkerSettings): void;
}

export type ServiceWorkerSettings={
    file?:string
    scope?:string
}
export    type NotificationOptions = {
    tag?:string,
    title?:string
    timestamp?:number,
    data?:any,
    icon?:string,
    image?:string,
    renotify?:boolean,
    body?:string,
    slient?:boolean
    dir?:NotificationDirection,
    lang?:string,
    id?:number
    redirect?:string,
    closeAfter?:number
    requireInteraction?:boolean,
    onShow?:Function
    onClick?:Function,
    onClose?:Function
    onError?:Function
    audio?:string

}


export interface Permission {
    DEFAULT: string;
    GRANTED: string;
    DENIED: string;

    requestPermission(PermissionEvents:PermissionEvents): any;

    isGranted(): boolean;
    isDenied(): boolean;
    isDefault(): boolean;

    get(): string;
}
export type PermissionEvents={
    onDenied?:Function
    onGranted?:Function
    onDefault?:Function
}

}