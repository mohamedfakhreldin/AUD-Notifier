
import { NotificationOptions } from "../types/types";
import Permission from "../Permissions/Permission";

/**
 *
 *
 * @export
 * @abstract
 * @class Notify
 */
export default abstract class Notify {
  private readonly permissionEvent: {};

  options: NotificationOptions;
  protected _config: { file: any; scope: any };
  protected Permission: Permission;
  protected notification: {};
  protected static audio: AudioBufferSourceNode;
  protected version?: number;
  protected platform: "mobile" | "pc";
  protected browser?: string;
  protected timeout: boolean = true;
  constructor(
    options: NotificationOptions,
    platform: "mobile" | "pc",
    browser?: string,
    version?: number
  ) {
    this.platform = platform;
    this.browser = browser;
    this.version = version;
    this.options = options;
  }

  /**
   *
   *
   * send Notification
   * @param {string} title
   * @param {NotificationOptions} options
   * @param {number} numberOfRepeat
   * @param {(number | number[])} repeatAfter
   * @return {*}
   * @memberof Notify
   *
   */
  sendNotificationRepeatedly(
    title: string,
    options: NotificationOptions,
    numberOfRepeat: number,
    repeatAfter: number | number[]
  ) {
    if (this.timeout) {

      this.sendNotification(title, options);
      return this._repeatNotify(title, numberOfRepeat, repeatAfter);
    }
  }
  /**
   *
   *Send Notification to desktop only
   * @param {*} title
   * @param {NotificationOptions} options
   * @param {number} numberOfRepeat
   * @param {(number|number[])} repeatAfter
   * @return {*}
   * @memberof Notify
   */
  sendDesktopNotificationRepeatedly(
    title: string,
    options: NotificationOptions,
    numberOfRepeat: number,
    repeatAfter: number | number[]
  ) {
    return (
      this.platform == "pc" ?
      this.sendNotificationRepeatedly(
        title,
        options,
        numberOfRepeat,
        repeatAfter
      ):this._setPromisePolyfil()
    );
  }

  /**
   *
   *
   * @param {string} title
   * @param {NotificationOptions} [options]
   * @param {number} [numberOfRepeat]
   * @param {(number|number[])} repeatAfter
   * @return {*}
   * @memberof Notify
   */
  sendMobileNotificationRepeatedly(
    title: string,
    options?: NotificationOptions,
    numberOfRepeat?: number,
    repeatAfter?: number | number[]
  ) {
    return (
      this.platform == "mobile" ?
      this.sendNotificationRepeatedly(
        title,
        options,
        numberOfRepeat,
        repeatAfter
      ):this._setPromisePolyfil()
    );
  }
  _mergeOptions(options: NotificationOptions) {
    if (options) {
      this.options = options
     
    }
    else{
      this.options={}
    }
  }
  /**
   *
   *
   * @param {{ file: string; scope?: string }} settings
   * @memberof Notify
   */
  async setServiceWorkerSettings(settings: { file: string; scope?: string }) {
    if (this._config) {
      this._config.file = settings.file || this._config.file;
      this._config.scope = settings.scope || this._config.scope;
      let reg = await navigator.serviceWorker.ready;
      reg?.unregister();
      navigator.serviceWorker.register(this._config.file, {
        scope: this._config.scope,
      });
    }
  }
  /**
   *
   *
   * @param {string} title
   * @param {NotificationOptions} options
   * @return {*}
   * @memberof Notify
   */
  sendMobileNotification(title: string, options: NotificationOptions) {
    return this.platform == "mobile" ? this.sendNotification(title, options):this._setPromisePolyfil();
  }

  sendDesktopNotification(title: string, options: NotificationOptions) {
    return this.platform == "pc" ? this.sendNotification(title, options):this._setPromisePolyfil();
  }
  /**
   *
   *
   * @param {*} title
   * @param {number} [numberOfRepeat=1]
   * @param {(string | number | any[])} [repeatAfter=1000]
   * @param {number} [i=0]
   * @memberof Notify
   */
  _repeatNotify(
    title: any,
    numberOfRepeat: number = 1,
    repeatAfter: string | number | any[] = 1000,
    i = 0
  ) {
    if (i < numberOfRepeat) {
      setTimeout(
        () => {
          this._showNotification(title, this.options, true);
          this._repeatNotify(title, numberOfRepeat, repeatAfter, ++i);
        },
        repeatAfter instanceof Array
          ? repeatAfter[i] || repeatAfter[repeatAfter.length - 1]
          : repeatAfter
      );
    }
  }
  /**
   * check if notification is allowed
   *
   * @memberof Notify
   */
  _checkPermission() {
    if (this.Permission.isDefault()) {
      this.Permission.requestPermission({});
    }
    if (!this.Permission.isGranted()) {
      this.timeout = false;
  console.error("AUDNotifierError: you must allow notification to send browser notification");
      return false
    }
    return true
  }
_setPromisePolyfil(){
  
return {close:()=>{},then:function(callback){callback(this)}} 
  
}
  /**
   *
   *
   * @abstract
   * @param {string} title
   * @param {NotificationOptions} [options]
   * @param {true} [repeat]
   * @return {*}  {*}
   * @memberof Notify
   */
  abstract _showNotification(
    title: string,
    options?: NotificationOptions,
    repeat?: true
  );
  /**
   *
   *
   * @param {string} title
   * @param {NotificationOptions} [options]
   * @return {Notification}}
   * @memberof Notify
   */
  protected sendNotification(title: string, options?: NotificationOptions) {
    if (!title) throw new Error("title must have value ");
    this._mergeOptions(options);

    return this._showNotification(title, this.options);
  }
}
