import Notify from "./Notification";
import ModernPermission from "../Permissions/ModernPermission";
import AudioNotify from "../setAudio";
import { NotificationOptions } from "../types/types";
import { AUDNotifierError } from "../errors/AUDNotifierError";

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
      scope: "/",
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
      throw new AUDNotifierError ("you must allow notification to send browser notification");      

      }
    }
  _showNotification(title: string, options: NotificationOptions) {
    let { onClick, onClose, onError, closeAfter, audio, redirect } =
      this.options;
this._checkPermission()
    let oldNotificationClose;
    if (navigator.serviceWorker.ready) {
      return navigator.serviceWorker.getRegistration().then(async (reg) => {
        let notifications = await reg.getNotifications();
        notifications.some((notify) => {
        
        });
        let notify;
        oldNotificationClose?.close();
        options.data =  !(options.data instanceof Object) || {};
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
            onError(e);
          });
      });
    }
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
