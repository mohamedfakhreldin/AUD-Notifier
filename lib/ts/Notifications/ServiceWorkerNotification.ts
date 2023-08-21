import Notify from "./Notification";
import ModernPermission from "../Permissions/ModernPermission";
import AudioNotify from "../setAudio";
import { NotificationOptions } from "../types/types";


export default class ServiceWorkerNotification extends Notify {
  Permission: ModernPermission;

  constructor(
    options: NotificationOptions,
    platform: "mobile" | "pc",
    browser?: string,
    version?: number
  ) {
    super(options, platform, browser, version);
    this._config = {
      file: "service-worker.js",
      scope: "./",
    };
    this.Permission = this.Permission || new ModernPermission();
    navigator.serviceWorker.register(this._config.file);
}
  /**
   *
   *
   * @param {Function} event
   * @return {*} 
   * @memberof ServiceWorkerNotification
   */
  _handleEvents(event:Function) {
    if (typeof event == "function") {
      let functonString = event.toString();
      functonString = "return (" + functonString + ")(e)";

      return functonString;
    }
  }
    /**
   * check if notification is allowed
   *
   * @memberof Notify
   */
    async _checkPermission() {
      if (this.Permission.isDefault()) {
  
      await this.Permission.requestPermission({});
    }
    if(!this.Permission.isGranted()){
      this.timeout = false;

      return false
    }
    return true

      
    }
 async _showNotification(title: string, options: NotificationOptions) {
 return new Promise(async(resolve,reject)=>{

   let { onClick, onClose, onError, closeAfter, audio, redirect } =
   this.options;
   try{
     let notify;
     
     if ( await this._checkPermission()) {
       
       let oldNotificationClose;
       if (navigator.serviceWorker.ready) {
         return navigator.serviceWorker.getRegistration().then(async (reg) => {
           let notifications = await reg.getNotifications();
           
           oldNotificationClose?.close();
           options.data =  options.data instanceof Object? options.data : {};
           options.data.redirect = redirect;
           options.slient = await AudioNotify.setTone(audio);
           options.data.onClick = this._handleEvents(onClick);
           options.data.onClose = this._handleEvents(onClose);
           if ( !AudioNotify.running  && AudioNotify.tone && typeof AudioNotify.tone !='string' ) {
             AudioNotify.tone.start(0)
             AudioNotify.running = true
            }
            reg
            .showNotification(title, options)
            .then(async () => {
              notifications = await reg.getNotifications();
              notify = notifications[notifications.length - 1];
              
              typeof closeAfter == "number" &&
              setTimeout(()=>notify.close(), closeAfter);
            })
            .catch(function (e) {
           typeof onError =='function' &&   onError(e);
            });
          });
        }
        resolve(notify)
      }
      reject('AUDNotifierError: you must allow notification to send browser notificatio')
     
    }catch(e){
reject(e)
    }
  })   
}
  /**
   * close notification by tag
   *
   * @param {string} tag
   * @memberof ServiceWorkerNotification
   */
  close(tag: string) {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.getNotifications({ tag }).then((notification) => {
        notification[0].close();
      });
    });
  }
  /**
   * close all notifications
   *
   * @memberof ServiceWorkerNotification
   */
  clear() {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.getNotifications().then((notifications) => {
        for (let i = 0; i < notifications.length; i++) {
          notifications[i].close();
        }
      });
    });
  }
}
