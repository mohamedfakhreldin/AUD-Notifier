#!/usr/bin/env node
const fsim = require('fs')
const rlim = require('readline')
async function main(){


const readline = await rlim
 

const fs = await fsim

    let rl = readline.createInterface(
        process.stdin, process.stdout);
        const askQuestion =async (question,defaultAnswer)=>{
            return new Promise(resolve=>{

                rl.question(`\x1b[33m${question}: [Default: ${defaultAnswer}]:  \x1b[0m`, (answer) => {
                
                    resolve(answer || defaultAnswer)
                });
            })
        }
if (process.argv[2] =='init') {
    let obj={

    }
    obj.public_path =await askQuestion('public_path','./')
    
    obj.sw =await askQuestion('do you want to initialize our service worker file in your public path? yes or no','yes') =='no'?'no':'yes'
  if (obj.sw =='yes') {
    if(fs.existsSync(obj.public_path+'/service-worker.js')){

        console.error('\x1b[31m service worker file already exist')
    }else{

        fs.writeFileSync(obj.public_path+'/service-worker.js',fs.readFileSync(__dirname+'/service-worker.js'))
        console.log(`\x1b[32m service worker created successfully\x1b[0m`);
    }
  }
}
        rl.close()
        
    }
 main()