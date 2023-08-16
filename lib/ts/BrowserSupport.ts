export function detectBrowser(){
    
    if (/edg/i.test(navigator.userAgent)) 
        return {browser:'edge',version:navigator.userAgent.split(/edg\//i)[1].split(' ')[0].split('.')[0]}
 
    else if(/firefox/i.test(navigator.userAgent))
        return {browser:'firefox',version:navigator.userAgent.split(/firefox\//i)[1].split(' ')[0].split('.')[0]}
 
    else if(/chrome/i.test(navigator.userAgent))
        return {browser:'chrome',version:navigator.userAgent.split(/chrome\//i)[1].split(' ')[0].split('.')[0]}
 
     else if( /^((?!chrome|android).)*(?=.*\bsafari\b)(?=.*\bversion\b).*$/i.test(navigator.userAgent))
    return {browser:'safari',version:navigator.userAgent.split(/version\//i)[1].split(' ')[0].split('.')[0]}
    else return {browser:null}
}
export function detectPlatform():'mobile'|'pc'{

  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem); 
})?'mobile':'pc';

}
