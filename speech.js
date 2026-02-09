
export class SpeechEngine{
  constructor(onFinal,onInterim){
    this.onFinal=onFinal
    this.onInterim=onInterim
    this.buffer=""
  }

  start(lang="ja-JP"){
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition
    const r = new SR()
    r.lang=lang
    r.continuous=true
    r.interimResults=true

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
  }
}
