class AUDNotifierError extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg;
    this.name = "AUDNotifierError";
  }
}

if (Notification) {
  describe("start", function () {
    it("define library", function () {
      expect(AUDNotifier).toBeDefined();
    });
  });

  describe("create notifications", () => {
    let originalNotificationFunc, closeSpy;
    let _repeatNotifySpy;

    beforeAll(function () {
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });
    beforeEach(() => {
      _repeatNotifySpy = spyOn(AUDNotifier, "_repeatNotify").and.callThrough();
      closeSpy = spyOn(window.Notification.prototype, "close");
      originalNotificationFunc = window.Notification;
    });
    afterEach(() => {
      
      window.Notification = originalNotificationFunc;
    });
    it("should throw invaild title", function () {
      spyOn(window, "Notification").and.returnValue({});
      Notification.permission = "granted";

      expect(() => {
        AUDNotifier.sendNotification();
      }).toThrow();
      
    });
    it("should create notification", function () {
      spyOn(window, "Notification").and.returnValue({});
      Notification.permission = "granted";

  
      expect(AUDNotifier.sendNotification("title")).toBeInstanceOf(Promise);
    });
    it("should create notification with audio", function (done) {
      spyOn(AUDNotifier.Permission, "get").and.returnValue("granted");
      let fetchSpy = spyOn(window,'fetch')
      AUDNotifier.sendNotification("title", {audio:'test.mp3'}).then(()=>{

        
        expect(fetchSpy).toHaveBeenCalled();
        
        done();
      })
    });
    it("should create notification repeatedly", function (done) {
      spyOn(AUDNotifier.Permission, "get").and.returnValue("granted");

      AUDNotifier.sendNotificationRepeatedly("title", {}, 5);
      jasmine.clock().tick(300);
      expect(_repeatNotifySpy).toHaveBeenCalledTimes(1);
      jasmine.clock().tick(5000);
      expect(_repeatNotifySpy).toHaveBeenCalledTimes(6);
      done();
    });
    it("should create notification close after", function (done) {
      spyOn(AUDNotifier.Permission, "get").and.returnValue("granted");

      AUDNotifier.sendNotification("title", { closeAfter: 1000 }).then((no) => {
        jasmine.clock().tick(200);
        expect(closeSpy).toHaveBeenCalledTimes(0);

        jasmine.clock().tick(1200);
        expect(closeSpy).toHaveBeenCalledTimes(1);

        done();
      });

    });

    it("create notification desktop", function () {
      spyOn(window, "Notification").and.returnValue({});
      Notification.permission = "granted";

      AUDNotifier.platform = "pc";
      expect(AUDNotifier.sendMobileNotification("title")).not.toBeInstanceOf(
        Promise
      );
      expect(AUDNotifier.sendDesktopNotification("title")).toBeInstanceOf(
        Promise
      );
    });
    it("create notification mobile", function () {
      spyOn(window, "Notification").and.returnValue({});
      Notification.permission = "granted";

      AUDNotifier.platform = "mobile";
      expect(AUDNotifier.sendMobileNotification("title")).toBeInstanceOf(
        Promise
      );
      expect(AUDNotifier.sendDesktopNotification("title")).not.toBeInstanceOf(
        Promise
      );
    });
  });
  describe("permissions", () => {
    var requestPermissionSpy;

    let originalNotificationFunc;
    beforeEach(() => {
      requestPermissionSpy = spyOn(AUDNotifier.Permission, "requestPermission");

      originalNotificationFunc = window.Notification;
    });
    afterEach(() => {
      window.Notification = originalNotificationFunc;
    });
    it("permission granted", () => {
      spyOn(window, "Notification").and.returnValue({});

      Notification.permission = "granted";
      expect(AUDNotifier.Permission.isDefault()).toBe(false);
      expect(AUDNotifier.Permission.isDenied()).toBe(false);
      expect(AUDNotifier.Permission.isGranted()).toBe(true);
      expect(AUDNotifier.Permission.get()).toBe("granted");
      expect(AUDNotifier.sendNotification("title")).toBeInstanceOf(Promise);
    });
    it("Permissions methods when permission denied", async () => {
      spyOn(window, "Notification").and.returnValue({});

      Notification.permission = "denied";
      expect(AUDNotifier.Permission.isDefault()).toBe(false);
      expect(AUDNotifier.Permission.isDenied()).toBe(true);
      expect(AUDNotifier.Permission.isGranted()).toBe(false);
      expect(AUDNotifier.Permission.get()).toBe("denied");

      await expectAsync(AUDNotifier.sendNotification("title")).toBeRejectedWith(
        new AUDNotifierError(
          "you must allow notification to send browser notification"
        )
      );
      expect(requestPermissionSpy).not.toHaveBeenCalled();
    });
    it("permission default", async () => {
      spyOn(window, "Notification").and.returnValue({});

      Notification.permission = "default";
      expect(AUDNotifier.Permission.isDefault()).toBe(true);
      expect(AUDNotifier.Permission.isDenied()).toBe(false);
      expect(AUDNotifier.Permission.isGranted()).toBe(false);
      expect(AUDNotifier.Permission.get()).toBe("default");
 
      await expectAsync(AUDNotifier.sendNotification("title")).toBeRejectedWith(
        new AUDNotifierError(
          "you must allow notification to send browser notification"
        )
      );
      expect(requestPermissionSpy).toHaveBeenCalled();
    });
  });
  describe("close notification", () => {
    let originalNotificationFunc, closeSpy;
    let _repeatNotifySpy;

    beforeAll(function () {
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });
    beforeEach(() => {
      _repeatNotifySpy = spyOn(AUDNotifier, "_repeatNotify").and.callThrough();
      closeSpy = spyOn(window.Notification.prototype, "close");
      originalNotificationFunc = window.Notification;
    });
    afterEach(() => {
  
      window.Notification = originalNotificationFunc;
    });

    it("close notification after show", function (done) {
      spyOn(AUDNotifier.Permission, "get").and.returnValue("granted");
      AUDNotifier.sendNotification("title").then((notification) => {
        notification.close();
        jasmine.clock().tick(200);
        expect(closeSpy).toHaveBeenCalledTimes(1);
        done();
      });

    });
    it("close all notification ", function (done) {
      spyOn(AUDNotifier.Permission, "get").and.returnValue("granted");
      AUDNotifier.clear()
  Promise.all([
    AUDNotifier.sendNotification('title'),
    AUDNotifier.sendNotification('title2'),
    AUDNotifier.sendNotification('title3'),
  ]).then(()=>{

    expect(Object.keys(AUDNotifier.notifications).length).toBe(3);
    AUDNotifier.clear()
    expect(Object.keys(AUDNotifier.notifications).length).toBe(0);
    done()
  })

    });
});

it("should close notification by tag", function (done) {
  spyOn(AUDNotifier.Permission, "get").and.returnValue("granted");
  AUDNotifier.clear()

AUDNotifier.sendNotification('title2',{tag:'tag1'}).then(()=>{

expect(Object.keys(AUDNotifier.notifications).length).toBe(1);
AUDNotifier.close('tag1')
expect(Object.keys(AUDNotifier.notifications).length).toBe(0);
done()
})

});

  describe("set service worker", () => {
    it("test config", () => {
      AUDNotifier._config = {};
      AUDNotifier.setServiceWorkerSettings({ file: "./sw.js" });
      expect(AUDNotifier._config.file).toBe("./sw.js");
    });
  });
}
