
let queue = Promise.resolve()

export function enqueueTranslate(text,settings){
  queue = queue.then(()=>doTranslate(text,settings))
  return queue
}

async function doTranslate(text,settings){
  let res
  try{
    res=await fetch("https://api.moonshot.cn/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization":"Bearer "+settings.apiKey,
        "Content-Type":"application/json; charset=utf-8"
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
  }catch(err){
    return `请求失败：${err?.message||"网络错误"}`
  }

  if(!res.ok){
    let errorText=""
    try{
      const errorData=await res.json()
      errorText=errorData?.error?.message||JSON.stringify(errorData)
    }catch{
      errorText=await res.text()
    }
    return `接口错误(${res.status})：${errorText||"未知错误"}`
  }

  const data=await res.json()
  return data.choices?.[0]?.message?.content?.trim()||"翻译为空"
}
