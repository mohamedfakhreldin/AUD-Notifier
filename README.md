# AUDNotifier

AUDNotifier is Javascript Library make use browser notification easily

## Features

- Send Notification according to Mobile or Desktop

- Set Audio when Notification fires

## Installation

```Javascript
npm install aud-notifier
```

use `notify init` to add  Notifier Service Worker file to your public path

## sendNotification

you can send notification using `sendNotification` methods

```JavaScript
AUDNotifier.sendNotification(title,options)

// send notification on desktop only
AUDNotifier.sendDesktopNotification(title,options)

// send notification on mobile only
AUDNotifier.sendMobileNotification(title,options)
```

## sendNotificationRepeatedly

you can send notification using `sendNotificationRepeatedly` methods

```JavaScript
AUDNotifier.sendNotificationRepeatedly(title,options,numberOfRepeats=1,repeatAfter=1000)
/*
send using set of times
the example below first repeat will fire after 2000 ms from send notification
and second repeat will fire after 1000 ms from first notification
*/
AUDNotifier.sendNotificationRepeatedly(title,options,2,[2000,1000])
// send notification repeatedly on desktop only
AUDNotifier.sendDesktopNotificationRepeatedly(title,options,numberOfRepeats=1,repeatAfter=1000)

// send notification repeatedly on mobile only
AUDNotifier.sendMobileNotificationRepeatedly(title,options,numberOfRepeats=1,repeatAfter=1000)
```

## options

new options you can use

### set Audio

set audio when notification fires
options.audio supports wav,ogg and mp3

```Javascript
AUDNotifier.sendNotification(title,{
    audio:'audio-source'
})

```

to control volume

```Javascript
AUDNotifier.sendNotification(title,{
    audio:{
        src:'audio-source',
        volume:0.5 //from 0 to 1
    }
})

```

### Events

```Javascript
AUDNotifier.sendNotification(title,{
    onClick:function(event) {

    },
    onClose:function(event) {

    },
    onShow:function(event) {

    },
    onError:function(event) {

    }
    })

```

`Note:` options events doesn't fires if you browser use serviceworker notifications and you don't use library service worker
### closeAfter

```Javascript
AUDNotifier.sendNotification(title,{
closeAfter:5000// close notification after 5000ms(5 seconds)
    })

```
### Redirect

```Javascript
AUDNotifier.sendNotification(title,{
redirect:'https://example.com'// go to redirect link on click
    })

```

`Note:` options redirect doesn't fires if you browser use serviceworker notifications and you don't use library service worker

## close

close notification after send notification

```Javascript
AUDNotifier.sendNotification(title,options).then(notification=>{
    notification.close()
})

```

close by tag

```JavaScript
AUDNotifier.close(tag)
```

close all

```JavaScript
AUDNotifier.clear()
```

## Permission

### requestPermission

```JavaScript
AUDNotifier.Permission.requestPermission({
    onGranted:function(){}, // run when permission is granted
   onDenied:function(){}, // run when permission is denied
   onDefault:function(){}, // run when permission is default
})
```

### Check Permission

```JavaScript
AUDNotifier.Permission.isGranted() // check if permission is granted
AUDNotifier.Permission.isDenied() // check if permission is denied
AUDNotifier.Permission.isDefault() // check if permission is default
```

### Get current permission

```JavaScript
AUDNotifier.Permission.get()
```

## Set custom service worker

if the browser send Notification using service worker you can set your service worker using

```JavaScript
AUDNotifier.setServiceWorkerSettings({
    file:'file.js',
    scope:'/path'
})
```
`Note:` this method doesn't fires if you browser use serviceworker notifications 