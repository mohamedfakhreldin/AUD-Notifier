import Notify from "./Notification";
import { NotificationOptions } from "../types/types";
import { goToLink } from "../helpers";
import ModernPermission from "../Permissions/ModernPermission";
import AudioNotify from "../setAudio";
export default class NotificationAPI extends Notify {
  protected Permission: ModernPermission;
  private _id: number = 1;
  notifications: {};

  constructor(
    options: NotificationOptions,
    platform: "mobile" | "pc",
    browser?: string,
    version?: number
  ) {
    super(options, platform, browser, version);
    this.notifications = {};
    this.Permission = this.Permission || new ModernPermission();
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
    if (!this.Permission.isGranted()) {
      this.timeout = false;
      
      return false
    }
    return true
  }

  async _showNotification(title: string, options: NotificationOptions) {
   return new Promise(async(resolve,reject)=>{
try{

  if ( await this._checkPermission()) {
    
    let { audio, onClick, onClose, onShow, onError, redirect, closeAfter } =
    options;
    let notificationOptions = { ...options };
    delete notificationOptions.audio,
    notificationOptions.onClick,
    notificationOptions.onClose,
    notificationOptions.onError,
    notificationOptions.onShow;
    notificationOptions.slient = await AudioNotify.setTone(audio);
       let notify: any = new Notification(title, options);
       if (
         audio &&
         !AudioNotify.running &&
       notify &&
       AudioNotify.tone &&
       typeof AudioNotify.tone != "string"
       ) {
         AudioNotify.tone.start(0);
         AudioNotify.running = true;
        }
        
        this.notifications[options?.tag || "customtag" + this._id++] = notify;
        notify.onshow = async (e: Event) => {
          typeof onShow == "function" && onShow(e);
        };
        typeof closeAfter == "number" &&
        setTimeout(() => notify.close(), closeAfter);
        notify.onclick = (e: Event) => {
          typeof onClick == "function" && onClick(e);
          
          goToLink(redirect);
        };
        
        notify.onerror = onError;
        notify.onclose = (e: any) => {
          delete this.notifications[options?.tag || "customtag" + this._id];
          typeof onClick == "function" && onClose(e);
        };
        resolve(notify)
      }
      reject('AUDNotifierError: you must allow notification to send browser notification')
    }catch(e){
      reject(e)
    }
    })
    }
    /**
   * close notification by tag
   *
   * @param {string} tag
   * @memberof NotificationAPI
   */
  close(tag: string) {
    if(this.notifications[tag]){

      this.notifications[tag].close()
      delete this.notifications[tag];
  }
    
  }
  /**
   *
   * close all notifications
   *
   * @memberof NotificationAPI
   */
  clear() {
    for (const notification in this.notifications) {
      this.notifications[notification].close();
      delete this.notifications[notification];
    }
  }

}
