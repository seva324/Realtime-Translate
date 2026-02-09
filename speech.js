
class SpeechEngine{
  constructor(onFinal,onInterim,onStatus){
    this.onFinal=onFinal
    this.onInterim=onInterim
    this.onStatus=onStatus
    this.buffer=""
    this.shouldRestart=false
  }

  start(lang="ja-JP"){
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition
    if(!SR) throw new Error("SpeechRecognition not supported")
    const r = new SR()
    r.lang=lang
    r.continuous=true
    r.interimResults=true

    r.onstart=()=>{
      this.onStatus?.("语音识别已启动，请开始说话。")
    }

    r.onerror=(e)=>{
      const detail=e?.error||e?.message||"未知错误"
      this.onStatus?.(`语音识别错误：${detail}`)
    }

    r.onend=()=>{
      if(this.shouldRestart){
        this.onStatus?.("语音识别已暂停，正在重新连接…")
        setTimeout(()=>r.start(),500)
      }
    }

    r.onresult=(e)=>{
      let interim=""
      let final=""
      for(let i=e.resultIndex;i<e.results.length;i++){
        const t=e.results[i][0].transcript
        if(e.results[i].isFinal) final+=t
        else interim+=t
      }

      if(interim) this.onInterim(interim)

      if(final){
        this.onFinal(final.trim())
      }
    }

    r.start()
    this.recognition=r
    this.shouldRestart=true
    this.onStatus?.("正在请求麦克风权限…")
  }

  stop(){
    this.shouldRestart=false
    this.recognition?.stop()
  }
}

window.SpeechEngine = SpeechEngine
