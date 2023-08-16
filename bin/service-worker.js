self.onnotificationclick = (e)=>{
    if (e.notification.data) {
    console.log(clients);
    
    e.notification.data.redirect && clients.openWindow(e.notification.data.redirect)    
    e.notification.data.onClick && (new Function('e',e.notification.data.onClick)(e));
}
    
}
self.onnotificationclose = (e)=>{
    e.notification.data &&   e.notification.data.onClick && (new Function('e',e.notification.data.onClose)(e));
    
}