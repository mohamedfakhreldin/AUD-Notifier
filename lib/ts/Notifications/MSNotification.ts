import Notify from "./Notification";
import { NotificationOptions } from "../types/types";
import MSPermission from "../Permissions/MSPermission";

export default class MSNotification extends Notify {
  protected Permission: MSPermission;

  notifications: {};

  constructor(
    options: NotificationOptions,
    platform: "mobile" | "pc",
    browser?: string,
    version?: number
  ) {
    super(options, platform, browser, version);
    this.Permission = this.Permission || new MSPermission();
  }

  _showNotification(title: string, options: NotificationOptions) {
    if (this._checkPermission()) {
        
      window.external.msSiteModeClearIconOverlay();
      
      window.external.msSiteModeSetIconOverlay(options.icon, title);
      
      window.external.msSiteModeActivate();
      let obj = {
        close: window.external.msSiteModeClearIconOverlay,
        then: function (callback) {
          callback(this);
        },
      };
      options.closeAfter && setTimeout(() => obj.close(), options.closeAfter);
      return obj;
    }
    return {close:()=>{}}
  }
  close() {
    window.external.msSiteModeClearIconOverlay();
  }
  clear() {
    window.external.msSiteModeClearIconOverlay();
  }
}
