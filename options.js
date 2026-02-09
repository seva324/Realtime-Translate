
const input=document.getElementById("key")
chrome.storage.sync.get(["apiKey"],d=>{
 if(d.apiKey) input.value=d.apiKey
})
document.getElementById("save").onclick=()=>{
 chrome.storage.sync.set({apiKey:input.value})
 alert("已保存")
}
