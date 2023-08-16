export function goToLink(link){
    if(typeof link =='string')
    window.location.href = link
    else if(typeof link == 'object'){
        if(link.link){
            if(link.focus)
            window.open(link.link,link.target || '_blank').focus()
            
            window.open(link.link,link.target || '_blank')
        }
    }
}