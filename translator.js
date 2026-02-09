
let queue = Promise.resolve()

export function enqueueTranslate(text,settings){
  queue = queue.then(()=>doTranslate(text,settings))
  return queue
}

async function doTranslate(text,settings){
  const res=await fetch("https://api.moonshot.cn/v1/chat/completions",{
    method:"POST",
    headers:{
      "Authorization":"Bearer "+settings.apiKey,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      model:"moonshot-v1-8k",
      temperature:0,
      max_tokens:120,
      messages:[
        {role:"system",content:settings.prompt},
        {role:"user",content:text}
      ]
    })
  })
  const data=await res.json()
  return data.choices?.[0]?.message?.content?.trim()||""
}
