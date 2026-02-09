
function createOverlay(){
  const box=document.createElement("div")
  box.id="ai-subtitle-box"
  Object.assign(box.style,{
    position:"fixed",
    bottom:"8%",
    left:"50%",
    transform:"translateX(-50%)",
    background:"linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.75))",
    color:"#f8fafc",
    padding:"16px 22px",
    borderRadius:"18px",
    fontSize:"20px",
    zIndex:999999,
    maxWidth:"85%",
    textAlign:"center",
    lineHeight:"1.55",
    boxShadow:"0 16px 35px rgba(15, 23, 42, 0.4)",
    backdropFilter:"blur(12px)",
    border:"1px solid rgba(148, 163, 184, 0.2)",
    letterSpacing:"0.2px",
    fontFamily:"\"Segoe UI\", \"PingFang SC\", \"Microsoft YaHei\", sans-serif"
  })
  document.body.appendChild(box)
  return box
}

window.createOverlay = createOverlay
