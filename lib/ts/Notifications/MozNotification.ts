import Notify from "./Notification";
import { NotificationOptions } from "../types/types";

import MozPermission from "../Permissions/MozPermission";

export default class MozNotification extends Notify {
  protected Permission: MozPermission;

  notifications: {};

  constructor(
    options: NotificationOptions,
    platform: "mobile" | "pc",
    browser?: string,
    version?: number
  ) {
    super(options, platform, browser, version);

    this.Permission = this.Permission || new MozPermission();
  }

  _showNotification(title: string, options: NotificationOptions) {
    this._checkPermission();
    let notification = navigator.mozNotification?.createNotification(
      options.icon,
      title,
      options.body
    );

    notification.show();
    notification.close = () => {};

    return {
      ...notification,
      then: function (callback) {
        callback(notification);
      },
    };
  }
  close() {
    console.warn("Close not supported in your browser");
  }
  clear() {
    console.warn("Clear not supported in your browser");
  }
}
