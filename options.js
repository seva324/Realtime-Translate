
const input = document.getElementById("key")
const status = document.getElementById("status")
chrome.storage.sync.get(["apiKey"], d => {
  if (d.apiKey) input.value = d.apiKey
})
document.getElementById("save").onclick = () => {
  chrome.storage.sync.set({ apiKey: input.value }, () => {
    status.textContent = "已保存。请刷新页面开始翻译。"
  })
}
