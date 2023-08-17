import NotificationAPI from "./NotificationAPI";
import ServiceWorkerNotification from "./ServiceWorkerNotification";
import MozNotification from "./MozNotification";
import WebKitNotification from "./WebKitNotification";
import MSNotification from "./MSNotification";
import { detectBrowser, detectPlatform } from "../BrowserSupport";
export default class NotificationAdaptor {
  constructor() {
    let { browser, version } = detectBrowser();
    let platform = detectPlatform();
    if (window.Notification) {
      if (
        browser == "chrome" &&
        platform == "mobile" &&
        window.navigator.serviceWorker != undefined
      ) {
        return new ServiceWorkerNotification({}, platform, browser, +version);
      } else {
        return new NotificationAPI({}, platform, browser, +version);
      }
    } else if (window.navigator.mozNotification != undefined) {
      return new MozNotification({}, platform, browser, +version);
    } else if (window.webKitNotification != undefined) {
      return new WebKitNotification({}, platform, browser, +version);
    } else if (
      window.external !== undefined &&
      window.external.msIsSiteMode !== undefined
    )
      return new MSNotification({}, platform, browser, +version);
    else  console.error("AUDNotifierError: you browser not support AUDNotifier ");
  }
}
