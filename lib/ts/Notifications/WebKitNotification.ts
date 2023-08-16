import  Notify  from "./Notification";
import { NotificationOptions } from "../types/types";

import WebkitPermission from "../Permissions/WebKitPermission";

export default class WebKitNotification extends Notify{
    
        protected Permission:WebkitPermission

        notifications: {}
        private id:number =1
        constructor(options:NotificationOptions,platform:'mobile'|'pc',browser?:string,version?:number){
            super(options,platform,browser,version)
        
            this.Permission = this.Permission || new WebkitPermission

        }
    
        _showNotification(title: string,options?: NotificationOptions) {
        this._checkPermission()
            let notification = window. webkitNotifications?.createNotification(
                options.icon,
                title,
                options.body
            );
            notification.show();
            notification.close = notification.cancel
            options.closeAfter &&    setTimeout(notification.close, options.closeAfter);
            this.notifications[options.tag||this.id++]=notification
            return {...notification,then:function(callback){
                callback(notification)
            }};
        }
        close(tag:string){
            if(this.notifications[tag]){
                this.notifications[tag].close()
                delete this.notifications[tag];
            }
        }
        clear(){
            for (const notification in this.notifications) {
                this.notifications[notification].close()
                delete this.notifications[notification];
                }
            }
        }
    