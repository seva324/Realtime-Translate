
export function createOverlay(){
  const box=document.createElement("div")
  box.id="ai-subtitle-box"
  Object.assign(box.style,{
    position:"fixed",
    bottom:"8%",
    left:"50%",
    transform:"translateX(-50%)",
    background:"rgba(0,0,0,0.65)",
    color:"#fff",
    padding:"14px 20px",
    borderRadius:"14px",
    fontSize:"22px",
    zIndex:999999,
    maxWidth:"80%",
    textAlign:"center",
    lineHeight:"1.5",
    backdropFilter:"blur(6px)"
  })
  document.body.appendChild(box)
  return box
}
