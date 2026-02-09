
import {SpeechEngine} from "./speech.js"
import {enqueueTranslate} from "./translator.js"
import {createOverlay} from "./overlay.js"

const box=createOverlay()

let settings={
  apiKey:"",
  mode:"bilingual",
  prompt:`你是实时字幕翻译引擎。
只做逐句翻译。
禁止解释。
禁止扩写。
保持口语简短。`
}

chrome.storage.sync.get(["apiKey"],d=>{
  if(d.apiKey) settings.apiKey=d.apiKey
})

let lastTime=0

const speech=new SpeechEngine(onFinal,onInterim)
speech.start("ja-JP")

function onInterim(t){
  box.innerText=t
}

async function onFinal(t){
  if(!settings.apiKey){
    box.innerText="请先在插件里填写API Key"
    return
  }

  const now=Date.now()
  if(now-lastTime<200) return
  lastTime=now

  const tr=await enqueueTranslate(t,settings)

  if(settings.mode==="original") box.innerText=t
  else if(settings.mode==="translated") box.innerText=tr
  else box.innerText=t+"\n"+tr
}
