

export    type NotificationOptions = {
        tag?:string,
        title?:string
        timestamp?:number,
        data?:any,
        icon?:string,
        image?:string,
        renotify?:boolean,
        body?:string,
        slient?:any
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
    export type PermissionEvents={
        onDenied?:Function
        onGranted?:Function
        onDefault?:Function
    }
   