export default class AudioNotify{
    static tone:AudioBufferSourceNode|string
static running:boolean = false
    static tonesCaches:{}={}
   static async  setTone(src?:{volume?:number,src?:string}|string){
       
       if (src &&  AudioContext!==undefined && Promise) {
           if(src instanceof Object && src.src){
               var volume = src.volume
               src = src.src
            }else if(typeof src !== 'string') return false
            
          AudioNotify.running && AudioNotify.tone &&  typeof AudioNotify.tone !='string'  && AudioNotify.tone.stop() 
          
          AudioNotify.running=false
        
            var audioCtx = new AudioContext();
try {
    
    

            AudioNotify.tonesCaches[src] = AudioNotify.tonesCaches[src] ||await audioCtx.decodeAudioData( await AudioNotify.loadSound(src))
            
            var track;
            
            const gainNode = audioCtx.createGain();
            
            gainNode.gain.value = volume || 0.5; 
            gainNode.connect(audioCtx.destination)
            track = audioCtx.createBufferSource();
            
            track.buffer = AudioNotify.tonesCaches[src]
            track.connect(gainNode);
            
            AudioNotify.tone = track
            
            return true
        } catch (error) {
        console.error("can't load audio file")
        return false
        }
    }
                    return false
            
              
            
    }




    
   static async loadSound(src:string){
    AudioNotify.tone = 'loading'
       if (typeof fetch =='function') {
       let res =  await fetch(src)


           return res.arrayBuffer()
       }
       return new Promise((resolve)=>{
        let xmlRequest = new XMLHttpRequest();
        xmlRequest.responseType ='arraybuffer'

        xmlRequest.onload=()=>{
        
            
            resolve( xmlRequest.response)
        }
        
        xmlRequest.open('GET',src,true)
        xmlRequest.send()
    })
    }
    }