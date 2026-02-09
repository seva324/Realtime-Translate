
const box=window.createOverlay()
box.innerText="正在初始化语音识别…"

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

const speech=new window.SpeechEngine(onFinal,onInterim,onStatus)
try{
  speech.start("ja-JP")
}catch(err){
  box.innerText="浏览器不支持语音识别，无法启动字幕。"
  console.error(err)
}

function onStatus(message){
  if(!box.innerText || box.innerText.startsWith("正在") || box.innerText.includes("语音识别")){
    box.innerText=message
  }
}

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

  const tr=await window.enqueueTranslate(t,settings)

  if(settings.mode==="original") box.innerText=t
  else if(settings.mode==="translated") box.innerText=tr
  else box.innerText=t+"\n"+tr
}
