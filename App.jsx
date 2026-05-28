import { useState, useRef, useEffect } from "react";

const ESCUDO = "data:image/webp;base64,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";
const IGUANA  = "data:image/png;base64,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";


// ─── FIREBASE CONFIG ──────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDxQ4ISmY1wr8C710TdZEEeGIO3axHQzIE",
  authDomain: "lesiones-cfc.firebaseapp.com",
  projectId: "lesiones-cfc",
  storageBucket: "lesiones-cfc.firebasestorage.app",
  messagingSenderId: "170311640122",
  appId: "1:170311640122:web:2cc01f24f9aac623b6c103"
});

const db = getFirestore(firebaseApp);

function parseField(v, def) {
  if (!v) return def;
  if (typeof v === "string") { try { return JSON.parse(v); } catch(x) { return def; } }
  return v;
}

// Guarda lista de jugadores
async function fbSetJugadores(jugadores) {
  await setDoc(doc(db,"cancunfc","plantel"), {
    jugadores: JSON.stringify(jugadores||[]),
    updatedAt: new Date().toISOString()
  });
}

// Guarda datos de UN jugador en su propio documento
async function fbSetPlayer(jId, evEntry, edEntry) {
  await setDoc(doc(db,"cancunfc","p_"+jId), {
    evaluaciones: JSON.stringify(evEntry||{}),
    evalData:     JSON.stringify(edEntry||{}),
    updatedAt:    new Date().toISOString()
  });
}

// Lee todos los datos de Firebase
async function fbGetAll() {
  const snap = await getDoc(doc(db,"cancunfc","plantel"));
  if (!snap.exists()) return null;
  const jugadores = parseField(snap.data().jugadores, []);
  const evaluaciones = {}, evalData = {};
  for (const j of jugadores) {
    const ps = await getDoc(doc(db,"cancunfc","p_"+j.id));
    if (ps.exists()) {
      evaluaciones[j.id] = parseField(ps.data().evaluaciones, {});
      evalData[j.id]     = parseField(ps.data().evalData, {});
    }
  }
  return { jugadores, evaluaciones, evalData };
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const AREAS = [
  { id:"registro",    label:"Registro",          sub:"Ficha del jugador",                       paso:1, icon:"📋", color:"#3b82f6" },
  { id:"medica",      label:"Área Médica",        sub:"Historial de lesiones",                   paso:2, icon:"🩺", color:"#a855f7" },
  { id:"fisio",       label:"Fisioterapia",       sub:"Evaluación Kinesiológica",                paso:3, icon:"🦵", color:"#f97316" },
  { id:"prepfisica",  label:"Preparación Física", sub:"Valoración VALD Performance",             paso:4, icon:"💪", color:"#22c55e" },
  { id:"ecografia",   label:"Ecografía MSK",      sub:"Evaluación Ultrasonido USG",              paso:5, icon:"🔬", color:"#06b6d4" },
  { id:"dashboard",   label:"Informe General",    sub:"Dashboard de riesgo del plantel",        paso:0, icon:"📊", color:"#f59e0b" },
  { id:"print-equipo",label:"PDF Equipo",         sub:"Informe imprimible del plantel completo", paso:0, icon:"🖨", color:"#8b5cf6" },
];
const POS_COLOR = { Portero:"#f59e0b", Defensa:"#3b82f6", Medio:"#22c55e", Delantero:"#ef4444" };
const AUTHORIZED_REPORT = "Hugo Soriano R";
const JUGADORES_INIT = [];
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap";
const BGL = { position:"fixed", inset:0, pointerEvents:"none", backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 39px,#e8e3dc 39px,#e8e3dc 40px)", opacity:0.5 };
const LS = { fontSize:9, letterSpacing:2, color:"#9a9080", fontFamily:"monospace", marginBottom:5, display:"block" };
const TS = { width:"100%", boxSizing:"border-box", padding:"8px 12px", border:"1.5px solid #e0d9d0", borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:11, outline:"none", resize:"vertical" };

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Hdr({ onHome, onBack, backLabel, area, evaluador, selfie, jugador }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <button onClick={onBack} style={{ background:"transparent", border:"none", color:"#9a9080", cursor:"pointer", fontFamily:"monospace", fontSize:12, padding:0 }}>← {backLabel||"Volver"}</button>
        <button onClick={onHome} style={{ background:"#fff", border:"1.5px solid #e0d9d0", color:"#1a3a22", borderRadius:10, width:38, height:38, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>🏠</button>
      </div>
      {area && (
        <div style={{ background:"#1a3a22", borderRadius:12, padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {selfie && <img src={selfie} alt="" style={{ width:32, height:32, borderRadius:"50%", objectFit:"cover", border:"2px solid #c8f044" }} />}
            <div>
              <div style={{ color:"#c8f044", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1 }}>{area.icon} {area.label.toUpperCase()} · PASO {area.paso}</div>
              <div style={{ color:"#6aaa44", fontSize:9, fontFamily:"monospace" }}>{evaluador}</div>
            </div>
          </div>
          {jugador && <div style={{ textAlign:"right" }}>
            <div style={{ color:"#f1f5f9", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14 }}>{jugador.nombre}</div>
            <div style={{ color:"#6aaa44", fontSize:9, fontFamily:"monospace" }}>#{jugador.dorsal} · {jugador.posicion}</div>
          </div>}
        </div>
      )}
    </div>
  );
}

function PTitle({ a, b, sub }) {
  return (
    <div style={{ marginBottom:20 }}>
      <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:38, fontWeight:800, color:"#0d1f14", margin:0, lineHeight:0.95, letterSpacing:-1 }}>
        {a}<br /><span style={{ color:"#1a3a22" }}>{b}</span>
      </h1>
      {sub && <p style={{ color:"#7a7060", fontSize:11, marginTop:8, letterSpacing:1, lineHeight:1.6 }}>{sub}</p>}
    </div>
  );
}

function NInput({ label, value, onChange, unit, ph, hint }) {
  const has = value !== "" && value !== undefined;
  return (
    <div>
      {label && <label style={LS}>{label}</label>}
      <div style={{ position:"relative" }}>
        <input type="number" placeholder={ph||"—"} value={value||""} onChange={e => onChange(e.target.value)}
          style={{ width:"100%", boxSizing:"border-box", padding:unit?"10px 44px 10px 12px":"10px 12px", border:"2px solid "+(has?"#1a3a22":"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:22, outline:"none" }} />
        {unit && <div style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", color:"#9a9080", fontSize:10, fontFamily:"monospace", pointerEvents:"none" }}>{unit}</div>}
      </div>
      {hint && <div style={{ fontSize:8, color:"#b0a898", marginTop:3, fontFamily:"monospace" }}>{hint}</div>}
    </div>
  );
}

function G2({ l, r }) {
  return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}><div>{l}</div><div>{r}</div></div>;
}

function Pill({ label, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{ flex:1, padding:"9px 6px", border:active?"2px solid "+color:"1.5px solid #e0d9d0", borderRadius:8, background:active?color+"18":"#fff", color:active?color:"#7a7060", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1, transition:"all 0.15s" }}>
      {label}
    </button>
  );
}

function Panel({ id, label, num, exp, setExp, children }) {
  const open = exp === id;
  return (
    <div style={{ background:"#fff", border:"1.5px solid #e0d9d0", borderRadius:14, overflow:"hidden", marginBottom:10 }}>
      <div onClick={() => setExp(open?null:id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", cursor:"pointer", background:open?"#1a3a2208":"#faf8f5" }}>
        <div style={{ width:26, height:26, borderRadius:8, background:open?"#1a3a22":"#f0ebe3", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:13, color:open?"#c8f044":"#9a9080", flexShrink:0 }}>{num}</div>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, letterSpacing:1, color:"#0d1f14", flex:1 }}>{label}</span>
        <span style={{ color:"#9a9080", fontSize:14, display:"inline-block", transform:open?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
      </div>
      {open && <div style={{ borderTop:"1px solid #f0ebe3", padding:"16px 18px 14px", background:"#fdfcfa" }}>{children}</div>}
    </div>
  );
}

function SaveBtn({ saved, onSave, label }) {
  return (
    <div style={{ marginTop:20, display:"flex", justifyContent:"flex-end" }}>
      <button onClick={onSave} style={{ background:saved?"#22c55e":"#1a3a22", border:"none", color:saved?"#fff":"#c8f044", borderRadius:10, padding:"12px 28px", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, letterSpacing:2, boxShadow:"3px 3px 0 #0d1f1440", transition:"background 0.3s" }}>
        {saved ? "✓ GUARDADO" : (label || "GUARDAR")}
      </button>
    </div>
  );
}

function Wrap({ children, onHome, onBack, backLabel, area, evaluador, selfie, jugador }) {
  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ minHeight:"100vh", background:"#f5f2ee", padding:"32px 20px", fontFamily:"'DM Mono',monospace" }}>
        <div style={BGL} />
        <div style={{ maxWidth:660, margin:"0 auto", position:"relative" }}>
          <Hdr onHome={onHome} onBack={onBack} backLabel={backLabel} area={area} evaluador={evaluador} selfie={selfie} jugador={jugador} />
          {children}
        </div>
      </div>
    </>
  );
}

// ─── SCREEN: HOME ─────────────────────────────────────────────────────────────
function ScreenHome({ onArea, sesion, onCerrarSesion, jugadores, msgAcceso, sincronizar, syncing, syncOk, debugMsg }) {
  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ minHeight:"100vh", background:"#060d1a", fontFamily:"'DM Mono',monospace" }}>
        <div style={{ position:"fixed", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 39px,#0f1f3a 39px,#0f1f3a 40px)", opacity:0.6, pointerEvents:"none" }} />
        <div style={{ maxWidth:660, margin:"0 auto", padding:"40px 20px", position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:36 }}>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:4, color:"#3b82f6", marginBottom:6 }}>SISTEMA DE EVALUACIÓN · PRETEMPORADA</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:42, fontWeight:800, color:"#f1f5f9", lineHeight:0.95, letterSpacing:-1 }}>CANCÚN FC<br /><span style={{ color:"#c8f044" }}>INJURY RISK</span></div>
            </div>
            <img src={ESCUDO} alt="Cancún FC" style={{ height:100, objectFit:"contain", flexShrink:0 }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
            <div style={{ color:"#475569", fontSize:11, fontFamily:"monospace", letterSpacing:1 }}>Selecciona tu área para iniciar la evaluación</div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
              <button onClick={sincronizar} style={{ background:"#0f172a", border:"1px solid "+(syncOk===true?"#22c55e":syncOk===false?"#ef4444":"#1e293b"), color:syncing?"#f59e0b":syncOk===true?"#22c55e":syncOk===false?"#ef4444":"#64748b", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontFamily:"monospace", fontSize:10, letterSpacing:1, display:"flex", alignItems:"center", gap:5 }}>
                {syncing?"⏳ Sincronizando...":syncOk===true?"✓ Actualizado":syncOk===false?"✗ Error":"🔄 Sincronizar"}
              </button>
              {debugMsg&&<div style={{color:"#f59e0b",fontFamily:"monospace",fontSize:8,maxWidth:200,wordBreak:"break-all"}}>{debugMsg}</div>}
            </div>
          </div>
          {msgAcceso && (
            <div style={{ background:"#1a0a0a", border:"1px solid #ef444466", borderRadius:10, padding:"10px 16px", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:16 }}>⚠</span>
              <span style={{ color:"#ef4444", fontFamily:"monospace", fontSize:11 }}>{msgAcceso}</span>
            </div>
          )}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {AREAS.map(a => (
              <button key={a.id} onClick={() => onArea(a.id)}
                style={{ background:"linear-gradient(135deg,#0f172a,#1e293b)", border:"1px solid "+a.color+"33", borderRadius:16, padding:"18px 22px", cursor:"pointer", display:"flex", alignItems:"center", gap:16, textAlign:"left", boxShadow:"0 4px 20px "+a.color+"11" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=a.color+"88"; e.currentTarget.style.transform="translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=a.color+"33"; e.currentTarget.style.transform="none"; }}
              >
                <div style={{ width:48, height:48, borderRadius:12, background:a.color+"18", border:"1.5px solid "+a.color+"44", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{a.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:20, color:"#f1f5f9", letterSpacing:1 }}>{a.label}</div>
                  <div style={{ fontSize:10, color:"#64748b", fontFamily:"monospace", marginTop:2 }}>{a.id==="registro" ? (jugadores.length > 0 ? jugadores.length+" jugadores registrados" : "Sin jugadores aun") : a.sub}</div>
                </div>
                <div style={{ color:a.color, fontSize:18, opacity:0.6 }}>→</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop:36, display:"flex", alignItems:"center", gap:10, opacity:0.4 }}>
            <img src={IGUANA} alt="" style={{ width:20, height:20, objectFit:"contain" }} />
            <span style={{ fontSize:9, color:"#64748b", fontFamily:"monospace", letterSpacing:2 }}>CANCÚN FC · PREVENCIÓN DE LESIONES · v1.0</span>
          </div>
          {sesion && (
            <div style={{ marginTop:12, background:"#0f1f0a", border:"1px solid #1a3a22", borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                {sesion.selfie && <img src={sesion.selfie} alt="" style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", border:"2px solid #c8f044" }} />}
                <div>
                  <div style={{ color:"#c8f044", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1 }}>SESION ACTIVA</div>
                  <div style={{ color:"#6aaa44", fontSize:10, fontFamily:"monospace" }}>{sesion.evaluador}</div>
                </div>
              </div>
              <button onClick={onCerrarSesion} style={{ background:"transparent", border:"1px solid #ef444466", color:"#ef4444", borderRadius:8, padding:"5px 12px", cursor:"pointer", fontFamily:"monospace", fontSize:10, letterSpacing:1 }}>
                Cerrar sesion
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── SCREEN: LOGIN ────────────────────────────────────────────────────────────
function ScreenLogin({ area, onContinue, onHome }) {
  const [nombre, setNombre] = useState("");
  const ok = nombre.trim().length > 0;
  return (
    <Wrap onHome={onHome} onBack={onHome} area={null} evaluador="" selfie={null} jugador={null}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:area.color+"18", border:"1.5px solid "+area.color, borderRadius:8, padding:"4px 14px", marginBottom:16, fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, letterSpacing:2, color:area.color }}>
        {area.icon} {area.label.toUpperCase()}
      </div>
      <PTitle a="IDENTIFICACIÓN" b="DEL EVALUADOR" sub="Ingresa tu nombre para registrar quién captura esta evaluación." />
      <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e0d9d0", boxShadow:"8px 8px 0 #1a3a2215", padding:"24px" }}>
        <label style={LS}>NOMBRE DEL EVALUADOR</label>
        <input type="text" placeholder="Ej. Dr. Juan García" value={nombre} onChange={e => setNombre(e.target.value)}
          onKeyDown={e => e.key==="Enter" && ok && onContinue(nombre, null)}
          style={{ width:"100%", boxSizing:"border-box", padding:"13px 16px", border:"1.5px solid "+(nombre?"#1a3a22":"#e0d9d0"), borderRadius:10, background:"#faf8f5", color:"#0d1f14", fontFamily:"monospace", fontSize:15, outline:"none" }} />
      </div>
      <button onClick={() => ok && onContinue(nombre, null)} disabled={!ok}
        style={{ marginTop:20, width:"100%", background:ok?"#1a3a22":"#e0d9d0", border:"none", color:ok?"#c8f044":"#b0a898", borderRadius:12, padding:"14px", cursor:ok?"pointer":"not-allowed", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:18, letterSpacing:2, boxShadow:ok?"3px 3px 0 #0d1f1440":"none" }}>
        CONTINUAR →
      </button>
    </Wrap>
  );
}

// ─── SCREEN: PLAYERS ─────────────────────────────────────────────────────────
function ScreenPlayers({ area, evaluador, selfie, jugadores, evaluaciones, sesion, onSelect, onNuevo, onBack, onHome, onPredictor, onPrint }) {
  const [q, setQ] = useState("");
  const list = jugadores.filter(j => j.nombre.toLowerCase().includes(q.toLowerCase()) || j.posicion.toLowerCase().includes(q.toLowerCase()) || j.dorsal.includes(q));
  return (
    <Wrap onHome={onHome} onBack={onBack} backLabel="Volver" area={area} evaluador={evaluador} selfie={selfie} jugador={null}>
      <PTitle a="SELECCIONAR" b="JUGADOR" sub="Selecciona un jugador registrado o crea uno nuevo" />
      <input type="text" placeholder="Buscar por nombre, posición o dorsal..." value={q} onChange={e => setQ(e.target.value)}
        style={{ width:"100%", boxSizing:"border-box", padding:"11px 16px", border:"1.5px solid #e0d9d0", borderRadius:10, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:13, outline:"none", marginBottom:12 }} />
      {area.id === "registro" ? (
        <button onClick={onNuevo} style={{ width:"100%", marginBottom:12, padding:"14px", background:"#1a3a22", border:"none", borderRadius:12, cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, letterSpacing:2, color:"#c8f044", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"3px 3px 0 #0d1f1440" }}>
          + REGISTRAR NUEVO JUGADOR
        </button>
      ) : (
        <div style={{ background:"#fff", border:"1.5px dashed #e0d9d0", borderRadius:12, padding:"10px 16px", marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#9a9080", fontFamily:"monospace" }}>¿El jugador no aparece?</span>
          <button onClick={onNuevo} style={{ background:"#f7f5f0", border:"1px solid #e0d9d0", color:"#1a3a22", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1 }}>+ NUEVO</button>
        </div>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {list.length === 0
          ? <div style={{ textAlign:"center", padding:"40px 0", color:"#9a9080", fontFamily:"monospace", fontSize:12 }}>No se encontraron jugadores</div>
          : list.map(j => {
            const c = POS_COLOR[j.posicion] || "#9a9080";
            return (
              <button key={j.id} onClick={() => onSelect(j)}
                style={{ background:"#fff", border:"1.5px solid #e0d9d0", borderRadius:12, padding:"14px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:14, textAlign:"left" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=area.color; e.currentTarget.style.background="#faf8f5"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#e0d9d0"; e.currentTarget.style.background="#fff"; }}
              >
                <div style={{ width:40, height:40, borderRadius:10, background:c+"18", border:"1.5px solid "+c+"44", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:18, color:c, flexShrink:0 }}>{j.dorsal}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:18, color:"#0d1f14" }}>{j.nombre}</div>
                  <div style={{ fontSize:10, color:"#9a9080", fontFamily:"monospace", marginTop:2 }}>{j.posicion} · {j.edad} años</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
                  <span style={{ color:"#c8c0b8", fontSize:16 }}>→</span>
                  <button onClick={e=>{e.stopPropagation();onPredictor(j);}} style={{ background:"#1a3a22", border:"none", color:"#c8f044", borderRadius:5, padding:"3px 8px", cursor:"pointer", fontFamily:"monospace", fontSize:9, letterSpacing:1 }}>📊 RIESGO</button>
                  <button onClick={e=>{e.stopPropagation();onPrint(j);}} style={{ background:"#1e3a5f", border:"none", color:"#93c5fd", borderRadius:5, padding:"3px 8px", cursor:"pointer", fontFamily:"monospace", fontSize:9, letterSpacing:1 }}>🖨 PDF</button>
                  <div style={{ display:"flex", gap:3 }}>
                    {[{p:"p1",icon:"📋",label:"Ficha"},{p:"p2",icon:"🩺",label:"Historia"},{p:"p3",icon:"🦵",label:"Kine"},{p:"p4",icon:"💪",label:"VALD"},{p:"p5",icon:"🔬",label:"USG"}].map(ev => {
                      const done = evaluaciones?.[j.id]?.[ev.p];
                      return <div key={ev.p} title={ev.label+(done?" - Completo":" - Pendiente")} style={{ width:18, height:18, borderRadius:4, background:done?"#1a3a22":"#e8e3dc", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>{done?ev.icon:"·"}</div>;
                    })}
                  </div>
                </div>
              </button>
            );
          })}
      </div>
    </Wrap>
  );
}

// ─── PASO 1: FICHA ────────────────────────────────────────────────────────────
function Paso1({ ctx }) {
  const [d, setD] = useState({});
  const [saved, setSaved] = useState(false);
  const get = k => d[k]||""; const set = (k,v) => { setD(p=>({...p,[k]:v})); setSaved(false); };
  const POSICIONES = ["Portero","Defensa","Medio","Delantero"];
  const IPOS = { Portero:"🧤", Defensa:"🛡️", Medio:"⚙️", Delantero:"⚡" };
  const p=parseFloat(get("peso")), t=parseFloat(get("talla"))/100;
  const imc = (!p||!t) ? null : (p/(t*t)).toFixed(1);
  const imcI = !imc ? null : parseFloat(imc)<18.5?{tx:"Bajo peso",c:"#60a5fa"}:parseFloat(imc)<25?{tx:"Normal",c:"#22c55e"}:parseFloat(imc)<30?{tx:"Sobrepeso",c:"#f59e0b"}:{tx:"Obesidad",c:"#ef4444"};
  return (
    <Wrap {...ctx} backLabel="Cambiar jugador">
      <PTitle a="FICHA DEL" b="JUGADOR" sub="PASO 1 · Datos base del jugador" />
      <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid #e0d9d0", boxShadow:"8px 8px 0 #1a3a2215", overflow:"hidden" }}>
        <div style={{ borderBottom:"1.5px solid #f0ebe3", padding:"20px 24px" }}>
          <label style={LS}>POSICIÓN EN EL CAMPO</label>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
            {POSICIONES.map(pos => { const active=get("posicion")===pos; return (
              <button key={pos} onClick={() => set("posicion",pos)} style={{ padding:"12px 6px", border:active?"2px solid #1a3a22":"1.5px solid #e0d9d0", borderRadius:12, background:active?"#1a3a22":"#faf8f5", color:active?"#c8f044":"#7a7060", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                <span style={{ fontSize:20 }}>{IPOS[pos]}</span>{pos.toUpperCase()}
              </button>); })}
          </div>
        </div>
        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={LS}>NOMBRE COMPLETO</label>
            <input type="text" placeholder="Ej. Carlos Sánchez" value={get("nombre")} onChange={e => set("nombre",e.target.value)}
              style={{ width:"100%", boxSizing:"border-box", padding:"13px 16px", border:"1.5px solid "+(get("nombre")?"#1a3a22":"#e0d9d0"), borderRadius:10, background:"#faf8f5", color:"#0d1f14", fontFamily:"monospace", fontSize:15, outline:"none" }} />
          </div>
          <G2 l={<NInput label="EDAD" value={get("edad")} onChange={v=>set("edad",v)} unit="años" ph="24" />}
              r={<div><label style={LS}>DOMINANCIA</label><div style={{ display:"flex", gap:8 }}>{["Zurdo","Diestro"].map(d => { const a=get("dominancia")===d; return (<button key={d} onClick={() => set("dominancia",d)} style={{ flex:1, padding:"10px 6px", border:a?"2px solid #1a3a22":"1.5px solid #e0d9d0", borderRadius:10, background:a?"#1a3a22":"#faf8f5", color:a?"#c8f044":"#7a7060", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}><span style={{ fontSize:20, transform:d==="Zurdo"?"scaleX(-1)":"none", display:"inline-block" }}>🦵</span>{d.toUpperCase()}</button>); })}</div></div>} />
          <G2 l={<NInput label="PESO" value={get("peso")} onChange={v=>set("peso",v)} unit="kg" ph="75" />}
              r={<NInput label="TALLA" value={get("talla")} onChange={v=>set("talla",v)} unit="cm" ph="178" />} />
          {imc && <div style={{ background:"#f7f5f0", border:"1.5px solid #e0d9d0", borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div><label style={LS}>IMC CALCULADO</label><div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:800, color:"#0d1f14", lineHeight:1 }}>{imc} <span style={{ fontSize:11, color:"#9a9080" }}>kg/m²</span></div></div>
            {imcI && <div style={{ background:imcI.c+"18", border:"1.5px solid "+imcI.c, color:imcI.c, borderRadius:8, padding:"6px 14px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1 }}>{imcI.tx.toUpperCase()}</div>}
          </div>}
        </div>
      </div>
      {(() => {
        const faltantes = [];
        if (!get("nombre").trim()) faltantes.push("Nombre");
        if (!get("posicion")) faltantes.push("Posicion");
        if (!get("edad")) faltantes.push("Edad");
        if (!get("dominancia")) faltantes.push("Dominancia");
        const ok = faltantes.length === 0;
        return (
          <div style={{ marginTop:20 }}>
            {!ok && <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
              <div style={{ fontSize:10, color:"#ef4444", fontFamily:"monospace", marginBottom:4 }}>Completa los campos obligatorios:</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{faltantes.map(f => <span key={f} style={{ background:"#ef444418", border:"1px solid #ef4444", color:"#ef4444", borderRadius:5, padding:"2px 8px", fontSize:9, fontFamily:"monospace" }}>⚠ {f}</span>)}</div>
            </div>}
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <button onClick={() => { if (!ok) return; setSaved(true); if (ctx.onGuardarJugador && !ctx.jugador) { const nj = ctx.onGuardarJugador({ nombre:get("nombre"), posicion:get("posicion"), edad:get("edad"), peso:get("peso"), talla:get("talla"), dominancia:get("dominancia"), dorsal:get("dorsal")||"" }); ctx.markPasoCompleto(nj?.id, 1); } }}
                style={{ background:ok?"#1a3a22":"#e0d9d0", border:"none", color:ok?"#c8f044":"#b0a898", borderRadius:10, padding:"12px 28px", cursor:ok?"pointer":"not-allowed", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, letterSpacing:2, boxShadow:ok?"3px 3px 0 #0d1f1440":"none" }}>
                {saved ? "✓ GUARDADO" : "GUARDAR Y REGISTRAR"}
              </button>
            </div>
          </div>
        );
      })()}
    </Wrap>
  );
}

// ─── PASO 2: HISTORIAL ────────────────────────────────────────────────────────
const ESTRUCTURAS = [
  { id:"rf", label:"Recto Anterior Femoral", icon:"🦵", color:"#f97316" },
  { id:"isq", label:"Isquiotibiales", icon:"🦵", color:"#eab308", mirror:true },
  { id:"lca", label:"LCA — Lig. Cruzado Anterior", icon:"🦿", color:"#ef4444" },
  { id:"lcp", label:"LCP — Lig. Cruzado Posterior", icon:"🦿", color:"#a855f7" },
  { id:"lcm", label:"Lig. Colateral Medial", icon:"🔗", color:"#3b82f6" },
  { id:"lcl", label:"Lig. Colateral Lateral", icon:"🔗", color:"#06b6d4" },
  { id:"gem", label:"Gemelos / Sóleo", icon:"🦵", color:"#22c55e" },
  { id:"add", label:"Aductores", icon:"🦵", color:"#ec4899", mirror:true },
  { id:"otro", label:"Otros", icon:"📋", color:"#94a3b8", isOtro:true },
];
const TIEMPOS = ["< 2 sem","2–4 sem","4–6 sem","> 6 sem"];
const CY = new Date().getFullYear();
const TEMPS = [CY+"/"+(CY+1).toString().slice(-2),(CY-1)+"/"+CY.toString().slice(-2),(CY-2)+"/"+(CY-1).toString().slice(-2),(CY-3)+"/"+(CY-2).toString().slice(-2),(CY-4)+"/"+(CY-3).toString().slice(-2),"Anterior"];
const emptyL = () => ({ lado:"", episodios:"", tiempo:"", temporada:"", obs:"" });

function Paso2({ ctx }) {
  const saved_p2 = ctx.evalData?.[ctx.jugador?.id]?.p2 || {};
  const [his, setHis] = useState(Object.keys(saved_p2).length > 0 ? saved_p2 : {});
  const [exp, setExp] = useState(null);
  const [saved, setSaved] = useState(false);
  const [otroLabel, setOtroLabel] = useState("");
  function toggle(id) {
    setHis(h => { const n={...h}; if(n[id]) delete n[id]; else n[id]={lesiones:[emptyL()]}; return n; });
    setExp(id);
  }
  function setLF(estId, idx, field, val) {
    setHis(h => { const ls=[...(h[estId]?.lesiones||[])]; ls[idx]={...ls[idx],[field]:val}; return {...h,[estId]:{...h[estId],lesiones:ls}}; });
  }
  function addEp(estId) { setHis(h => ({...h,[estId]:{...h[estId],lesiones:[...(h[estId]?.lesiones||[]),emptyL()]}})); }
  function remEp(estId, idx) {
    setHis(h => { const ls=(h[estId]?.lesiones||[]).filter((_,i)=>i!==idx); if(!ls.length){const n={...h};delete n[estId];return n;} return {...h,[estId]:{...h[estId],lesiones:ls}}; });
  }
  const total = Object.keys(his).length;
  const noLes = total===0;
  return (
    <Wrap {...ctx} backLabel="Cambiar jugador">
      <PTitle a="HISTORIAL DE" b="LESIONES" sub="PASO 2 · Área Médica · Antecedentes de lesiones previas" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
        {[{l:"ESTRUCTURAS",v:total,c:"#1a3a22"},{l:"EPISODIOS",v:Object.values(his).reduce((a,e)=>a+(e.lesiones?.length||0),0),c:"#f97316"},{l:"SIN LESIONES",v:noLes?"✓":"—",c:noLes?"#22c55e":"#9a9080"}].map(s => (
          <div key={s.l} style={{ background:"#fff", border:"1.5px solid #e0d9d0", borderRadius:12, padding:"10px 14px" }}>
            <div style={{ fontSize:9, letterSpacing:2, color:"#9a9080" }}>{s.l}</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:800, color:s.c, lineHeight:1 }}>{s.v}</div>
          </div>
        ))}
      </div>
      <button onClick={() => { setHis({}); setSaved(false); }} style={{ width:"100%", marginBottom:10, padding:"12px", background:noLes?"#1a3a22":"#fff", border:"1.5px solid "+(noLes?"#1a3a22":"#e0d9d0"), borderRadius:12, cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:2, color:noLes?"#c8f044":"#7a7060", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
        ✅ SIN ANTECEDENTE DE LESIONES
      </button>
      {ESTRUCTURAS.map(est => {
        const activa = !!his[est.id];
        const isOpen = exp===est.id && activa;
        const lesiones = his[est.id]?.lesiones||[];
        return (
          <div key={est.id} style={{ background:"#fff", border:"1.5px solid "+(activa?est.color:"#e0d9d0"), borderRadius:14, overflow:"hidden", marginBottom:8, boxShadow:activa?"4px 4px 0 "+est.color+"22":"none" }}>
            <div onClick={() => { if(!activa) toggle(est.id); else setExp(isOpen?null:est.id); }} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", cursor:"pointer", background:activa?est.color+"0d":"#faf8f5" }}>
              <div onClick={e => { e.stopPropagation(); toggle(est.id); }} style={{ width:22, height:22, borderRadius:6, flexShrink:0, border:"2px solid "+(activa?est.color:"#d0c8be"), background:activa?est.color:"transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                {activa && <span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>✓</span>}
              </div>
              <span style={{ fontSize:18, transform:est.mirror?"scaleX(-1)":"none", display:"inline-block" }}>{est.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:15, letterSpacing:1, color:activa?"#0d1f14":"#7a7060" }}>{est.isOtro&&otroLabel?otroLabel:est.label}</div>
              </div>
              {activa && <div style={{ background:est.color+"22", border:"1px solid "+est.color, color:est.color, borderRadius:6, padding:"2px 8px", fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:1 }}>{lesiones.length} EP.</div>}
              {activa && <span style={{ color:"#9a9080", fontSize:13, transform:isOpen?"rotate(180deg)":"none", display:"inline-block", transition:"transform 0.2s" }}>▾</span>}
            </div>
            {isOpen && (
              <div style={{ borderTop:"1px solid "+est.color+"33", padding:"14px 16px 12px" }}>
                {est.isOtro && <div style={{ marginBottom:12 }}><input placeholder="Especifica la lesión..." value={otroLabel} onChange={e => setOtroLabel(e.target.value)} style={{ width:"100%", boxSizing:"border-box", padding:"8px 12px", border:"1.5px solid #e0d9d0", borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:12, outline:"none" }} /></div>}
                {lesiones.map((les, idx) => (
                  <div key={idx} style={{ background:"#faf8f5", borderRadius:10, border:"1px solid #e8e3dc", padding:"12px", marginBottom:8, position:"relative" }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:2, color:est.color, marginBottom:10 }}>EPISODIO #{idx+1}</div>
                    <div style={{ marginBottom:10 }}>
                      <label style={LS}>LADO AFECTADO</label>
                      <div style={{ display:"flex", gap:6 }}>
                        {["Derecho","Izquierdo","Bilateral"].map(lado => (
                          <button key={lado} onClick={() => setLF(est.id,idx,"lado",lado)} style={{ flex:1, padding:"7px 4px", border:les.lado===lado?"2px solid "+est.color:"1.5px solid #e0d9d0", borderRadius:7, background:les.lado===lado?est.color+"18":"#fff", color:les.lado===lado?est.color:"#7a7060", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1 }}>
                            {lado==="Derecho"?"D":lado==="Izquierdo"?"I":"BIL"}<div style={{ fontSize:8, fontWeight:400 }}>{lado}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <G2
                      l={<div><label style={LS}>Nº EPISODIOS</label><input type="number" min="1" placeholder="1" value={les.episodios||""} onChange={e => setLF(est.id,idx,"episodios",e.target.value)} style={{ width:"100%", boxSizing:"border-box", padding:"8px 10px", border:"1.5px solid #e0d9d0", borderRadius:7, background:"#fff", color:"#0d1f14", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:18, outline:"none" }} /></div>}
                      r={<div><label style={LS}>TIEMPO FUERA</label><select value={les.tiempo||""} onChange={e => setLF(est.id,idx,"tiempo",e.target.value)} style={{ width:"100%", padding:"8px 10px", border:"1.5px solid #e0d9d0", borderRadius:7, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:12, outline:"none" }}><option value="">— seleccionar —</option>{TIEMPOS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>}
                    />
                    <div style={{ marginTop:10, marginBottom:8 }}>
                      <label style={LS}>TEMPORADA</label>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                        {TEMPS.map(t => <button key={t} onClick={() => setLF(est.id,idx,"temporada",t)} style={{ padding:"4px 8px", border:les.temporada===t?"2px solid "+est.color:"1.5px solid #e0d9d0", borderRadius:5, background:les.temporada===t?est.color+"18":"#fff", color:les.temporada===t?est.color:"#7a7060", cursor:"pointer", fontFamily:"monospace", fontSize:9 }}>{t}</button>)}
                      </div>
                    </div>
                    <textarea placeholder="Mecanismo, cirugía, rehabilitación..." value={les.obs||""} onChange={e => setLF(est.id,idx,"obs",e.target.value)} rows={2} style={TS} />
                    {lesiones.length>1 && <button onClick={() => remEp(est.id,idx)} style={{ position:"absolute", top:8, right:8, background:"transparent", border:"none", color:"#ef4444", cursor:"pointer", fontSize:13 }}>✕</button>}
                  </div>
                ))}
                <button onClick={() => addEp(est.id)} style={{ width:"100%", padding:"8px", background:"transparent", border:"1.5px dashed "+est.color+"88", borderRadius:8, cursor:"pointer", color:est.color, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:12, letterSpacing:2 }}>+ AGREGAR OTRO EPISODIO</button>
              </div>
            )}
          </div>
        );
      })}
      {(() => {
        const ok = Object.keys(his).length > 0 || noLes;
        return (
          <div style={{ marginTop:20 }}>
            {!ok && <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
              <div style={{ fontSize:10, color:"#ef4444", fontFamily:"monospace" }}>⚠ Selecciona al menos una estructura lesionada o marca "Sin antecedente de lesiones"</div>
            </div>}
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <button onClick={() => { if (!ok) return; setSaved(true); ctx.guardarPaso(ctx.jugador?.id, 2, his); setTimeout(()=>ctx.onBack(),1200); }}
                style={{ background:ok?"#1a3a22":"#e0d9d0", border:"none", color:ok?"#c8f044":"#b0a898", borderRadius:10, padding:"12px 28px", cursor:ok?"pointer":"not-allowed", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, letterSpacing:2, boxShadow:ok?"3px 3px 0 #0d1f1440":"none" }}>
                {saved ? "✓ GUARDADO" : "GUARDAR HISTORIAL"}
              </button>
            </div>
          </div>
        );
      })()}
    </Wrap>
  );
}

// ─── PASO 3: KINESIOLOGÍA ─────────────────────────────────────────────────────
const TESTS_K = [
  { id:"lunge", n:"Lunge Test", pos:"< 10 cm", neg:"≥ 10 cm", bil:true, med:{ u:"cm", um:10, dir:-1 }, desc:"Distancia pie-pared" },
  { id:"thomas", n:"Thomas Modificado", pos:"Pierna contralateral se levanta", neg:"Cae libremente", bil:true, med:null, desc:"Flexores de cadera" },
  { id:"ely", n:"Duncan Ely", pos:"Cadera se eleva / talón no llega a glúteo / dolor", neg:"Talón toca glúteo sin movimiento de cadera", bil:true, med:null, desc:"Recto anterior — decúbito prono" },
  { id:"ham", n:"Hamstring Test", pos:"< 90°", neg:"≥ 90°", bil:true, med:{ u:"°", um:90, dir:-1 }, desc:"Extensibilidad isquiotibiales" },
  { id:"copen", n:"Copenhague Test", pos:"Dolor / contraccion sostenida < 5 seg", neg:"Mantiene contraccion > 5 seg", bil:true, med:null, desc:"Fuerza aductores" },
  { id:"uhbe", n:"UHBE", pos:"Inestabilidad pélvica", neg:"Estabilidad pélvica", bil:true, med:null, desc:"Puente de cadera unipodal" },
  { id:"glut", n:"Activación Glúteo-Isquiotibiales", pos:"Isquiotibiales > glúteo", neg:"Glúteo > isquiotibiales", bil:true, med:null, desc:"Patrón de activación" },
  { id:"rot", n:"Estabilidad Rotacional Tronco", pos:"Dificultad / tronco desalineado", neg:"10 reps diagonales con tronco paralelo", bil:false, med:null, desc:"FMS — Rotary Stability", fms:true },
  { id:"squat", n:"Sentadilla Profunda", pos:"Inclinación / desviación / varo-valgo", neg:"Adecuada ejecución y alineación", bil:false, med:null, desc:"FMS — Deep Squat", fms:true },
  { id:"curl", n:"Curl Nordico", pos:"No llega ni mantiene 75°", neg:"Se mantiene en 75° por 2-3 seg", bil:true, med:{ u:"°", um:75, dir:-1 }, desc:"Excentrico isquiotibiales" },
  { id:"ninv", n:"Nordico Invertido", pos:"No llega ni mantiene 110°", neg:"Se mantiene en 110° por 2-3 seg", bil:true, med:{ u:"°", um:110, dir:-1 }, desc:"Excentrico cuadriceps" },
  { id:"salto", n:"Salto Unipodal desde Banco", pos:"No mantiene 3 seg / varo-valgo / dolor", neg:"Adecuada alineacion de segmentos", bil:true, med:null, desc:"Control neuromuscular" },
  { id:"hombro", n:"Movilidad de Hombro", pos:"Rango articular limitado", neg:"Rango articular completo", bil:true, med:null, desc:"FMS — Porteros", fms:true, portero:true },
  { id:"yocum", n:"Yocum", pos:"Dolor referido", neg:"Sin dolor", bil:true, med:null, desc:"Impingement hombro — Porteros", portero:true },
  { id:"ybt_ant_d", n:"YBT Anterior D",       bil:false, med:{ u:"cm", umbral:null, dir:0 }, desc:"Y Balance Test — Dir. Anterior Derecha",       ybt:true, pos:"Alcance menor 90%", neg:"Alcance mayor 90%" },
  { id:"ybt_pm_d",  n:"YBT Posteromedial D",   bil:false, med:{ u:"cm", umbral:null, dir:0 }, desc:"Y Balance Test — Dir. Posteromedial Derecha",   ybt:true, pos:"Asimetria mayor 4cm", neg:"Asimetria menor 4cm" },
  { id:"ybt_pl_d",  n:"YBT Posterolateral D",  bil:false, med:{ u:"cm", umbral:null, dir:0 }, desc:"Y Balance Test — Dir. Posterolateral Derecha",  ybt:true, pos:"Asimetria mayor 4cm", neg:"Asimetria menor 4cm" },
  { id:"ybt_ant_i", n:"YBT Anterior I",        bil:false, med:{ u:"cm", umbral:null, dir:0 }, desc:"Y Balance Test — Dir. Anterior Izquierda",      ybt:true, pos:"Alcance menor 90%", neg:"Alcance mayor 90%" },
  { id:"ybt_pm_i",  n:"YBT Posteromedial I",   bil:false, med:{ u:"cm", umbral:null, dir:0 }, desc:"Y Balance Test — Dir. Posteromedial Izquierda", ybt:true, pos:"Asimetria mayor 4cm", neg:"Asimetria menor 4cm" },
  { id:"ybt_pl_i",  n:"YBT Posterolateral I",  bil:false, med:{ u:"cm", umbral:null, dir:0 }, desc:"Y Balance Test — Dir. Posterolateral Izquierda",ybt:true, pos:"Asimetria mayor 4cm", neg:"Asimetria menor 4cm" },
  { id:"ybt_lei_d", n:"LEI Derecha",  bil:false, med:{ u:"cm", umbral:null, dir:0 }, desc:"Longitud Extremidad Inferior Derecha", ybt:true, pos:"", neg:"" },
  { id:"ybt_lei_i", n:"LEI Izquierda", bil:false, med:{ u:"cm", umbral:null, dir:0 }, desc:"Longitud Extremidad Inferior Izquierda", ybt:true, pos:"", neg:"" },
];
const emptyK = () => ({ val:"", res:"", obs:"" });
function autoResK(val, med) {
  if (!med || val==="") return "";
  const v=parseFloat(val); if(isNaN(v)) return "";
  return med.dir===-1 ? (v<med.um?"positivo":"negativo") : (v>med.um?"positivo":"negativo");
}

function calcYBT(dat) {
  // Score Compuesto (%) = (Ant + PM + PL) / (3 x LEI) x 100
  // Plisky et al. JOSPT 2006 — umbral riesgo: score < 89% o asimetria > 4cm
  const g = (k) => parseFloat((dat[k]||{}).val||"") || null;
  const antD=g("ybt_ant_d"), pmD=g("ybt_pm_d"), plD=g("ybt_pl_d");
  const antI=g("ybt_ant_i"), pmI=g("ybt_pm_i"), plI=g("ybt_pl_i");
  const leiD=g("ybt_lei_d"), leiI=g("ybt_lei_i");
  // Need at least all reach values and LEI to compute composite score
  if (!antD||!pmD||!plD||!antI||!pmI||!plI) return null;
  if (!leiD||!leiI) return null;
  // Formula correcta segun Plisky 2006
  const compD = ((antD + pmD + plD) / (3 * leiD) * 100).toFixed(1);
  const compI = ((antI + pmI + plI) / (3 * leiI) * 100).toFixed(1);
  const asimAnt = Math.abs(antD - antI).toFixed(1);
  const asimPM  = Math.abs(pmD  - pmI).toFixed(1);
  const asimPL  = Math.abs(plD  - plI).toFixed(1);
  const maxAsim = Math.max(parseFloat(asimAnt), parseFloat(asimPM), parseFloat(asimPL));
  const riesgo = maxAsim > 4 || parseFloat(compD) < 89 || parseFloat(compI) < 89 ? "ALTO" : maxAsim > 2 ? "MODERADO" : "BAJO";
  return { compD, compI, asimAnt, asimPM, asimPL, maxAsim, riesgo, leiD, leiI };
}

function Paso3({ ctx, esPortero }) {
  const nonYBT = TESTS_K.filter(t => !t.ybt && (esPortero || !t.portero));
  const tests = nonYBT;
  const saved_p3 = ctx.evalData?.[ctx.jugador?.id]?.p3 || {};
  const [dat, setDat] = useState(Object.keys(saved_p3).length > 0 ? saved_p3 : {});
  const [exp, setExp] = useState(null);
  const [saved, setSaved] = useState(false);
  function setF(id, lado, field, val) {
    const t = TESTS_K.find(x => x.id===id);
    setDat(d => {
      if (lado) {
        const prev = (d[id]||{})[lado]||emptyK();
        const upd = {...prev,[field]:val};
        if (field==="val"&&t?.med) upd.res=autoResK(val,t.med);
        return {...d,[id]:{...(d[id]||{}),[lado]:upd}};
      } else {
        const prev = d[id]||emptyK();
        const upd={...prev,[field]:val};
        if(field==="val"&&t?.med) upd.res=autoResK(val,t.med);
        return {...d,[id]:upd};
      }
    });
    setSaved(false);
  }
  const compl = tests.filter(t => { const d=dat[t.id]||{}; return t.bil?d.D?.res&&d.I?.res:d.res; }).length;
  const pos = tests.filter(t => { const d=dat[t.id]||{}; return t.bil?d.D?.res==="positivo"||d.I?.res==="positivo":d.res==="positivo"; }).length;
  return (
    <Wrap {...ctx} backLabel="Cambiar jugador">
      <PTitle a="EVALUACIÓN" b="KINESIOLÓGICA" sub="PASO 3 · Fisioterapia · Movilidad y funcionalidad articular" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
        {[{l:"TESTS",v:tests.length,c:"#1a3a22"},{l:"COMPLETADOS",v:compl,c:"#3b82f6"},{l:"POSITIVOS",v:pos,c:pos>0?"#ef4444":"#22c55e"}].map(s => (
          <div key={s.l} style={{ background:"#fff", border:"1.5px solid #e0d9d0", borderRadius:12, padding:"10px 14px" }}>
            <div style={{ fontSize:9, letterSpacing:2, color:"#9a9080" }}>{s.l}</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:800, color:s.c, lineHeight:1 }}>{s.v}</div>
          </div>
        ))}
      </div>
      {tests.map((test, idx) => {
        const d=dat[test.id]||{};
        const compl2=test.bil?d.D?.res&&d.I?.res:d.res;
        const hasPos=test.bil?d.D?.res==="positivo"||d.I?.res==="positivo":d.res==="positivo";
        const bc=!compl2?"#e0d9d0":hasPos?"#ef4444":"#22c55e";
        return (
          <div key={test.id} style={{ background:"#fff", border:"1.5px solid "+bc, borderRadius:14, overflow:"hidden", marginBottom:8, boxShadow:compl2?"4px 4px 0 "+bc+"22":"none" }}>
            <div onClick={() => setExp(exp===test.id?null:test.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", cursor:"pointer", background:compl2?bc+"0d":"#faf8f5" }}>
              <div style={{ width:24, height:24, borderRadius:7, background:compl2?bc:"#f0ebe3", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:12, color:compl2?"#fff":"#9a9080", flexShrink:0 }}>{compl2?(hasPos?"!":"✓"):idx+1}</div>
              <img src={IGUANA} alt="" style={{ width:20, height:20, objectFit:"contain", flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:15, color:"#0d1f14" }}>
                  {test.n}{test.fms?" ·FMS":""}{test.portero?" ·PORTERO":""}
                  {test.med&&<span style={{ background:"#f59e0b22", color:"#b45309", borderRadius:4, padding:"1px 5px", fontSize:9, fontFamily:"monospace", marginLeft:6 }}>📏{test.med.u}</span>}
                </div>
                <div style={{ fontSize:9, color:"#9a9080", fontFamily:"monospace" }}>{test.desc}</div>
              </div>
              <span style={{ color:"#9a9080", fontSize:13, display:"inline-block", transform:exp===test.id?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
            </div>
            {exp===test.id && (
              <div style={{ borderTop:"1px solid "+bc+"33", padding:"14px 16px", background:"#fdfcfa" }}>
                <G2
                  l={<div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:8, padding:"8px 10px" }}><div style={{ fontSize:9, letterSpacing:2, color:"#ef4444", marginBottom:3 }}>⚠ POSITIVO</div><div style={{ fontSize:10, color:"#7f1d1d", lineHeight:1.4 }}>{test.pos}</div></div>}
                  r={<div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"8px 10px" }}><div style={{ fontSize:9, letterSpacing:2, color:"#22c55e", marginBottom:3 }}>✓ NEGATIVO</div><div style={{ fontSize:10, color:"#14532d", lineHeight:1.4 }}>{test.neg}</div></div>}
                />
                <div style={{ marginTop:12 }}>
                  {test.bil ? (
                    <G2
                      l={<LadoInput label="LADO DERECHO" lado="D" testData={d.D||emptyK()} med={test.med} onChange={(f,v) => setF(test.id,"D",f,v)} />}
                      r={<LadoInput label="LADO IZQUIERDO" lado="I" testData={d.I||emptyK()} med={test.med} onChange={(f,v) => setF(test.id,"I",f,v)} />}
                    />
                  ) : (
                    <GlobalInput testData={d} onChange={(f,v) => setF(test.id,null,f,v)} />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {/* YBT GROUP */}
      {(() => {
        const YBT_DIRS = [
          { id:"ybt_ant_d", label:"Anterior", pierna:"DERECHA" },
          { id:"ybt_pm_d",  label:"Posteromedial", pierna:"DERECHA" },
          { id:"ybt_pl_d",  label:"Posterolateral", pierna:"DERECHA" },
          { id:"ybt_ant_i", label:"Anterior", pierna:"IZQUIERDA" },
          { id:"ybt_pm_i",  label:"Posteromedial", pierna:"IZQUIERDA" },
          { id:"ybt_pl_i",  label:"Posterolateral", pierna:"IZQUIERDA" },
        ];
        const allFilled = YBT_DIRS.every(d => (dat[d.id]||{}).val);
        const bc = allFilled ? "#3b82f6" : "#e0d9d0";
        return (
          <div style={{ background:"#fff", border:"1.5px solid "+bc, borderRadius:14, overflow:"hidden", marginBottom:10 }}>
            <div onClick={() => setExp(exp==="ybt"?null:"ybt")} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", cursor:"pointer", background:allFilled?"#3b82f608":"#faf8f5" }}>
              <div style={{ width:24, height:24, borderRadius:7, background:allFilled?"#3b82f6":"#f0ebe3", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:12, color:allFilled?"#fff":"#9a9080", flexShrink:0 }}>{allFilled?"✓":"⚖"}</div>
              <img src={IGUANA} alt="" style={{ width:20, height:20, objectFit:"contain", flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:15, color:"#0d1f14" }}>Y Balance Test (YBT) <span style={{ background:"#3b82f622", color:"#3b82f6", borderRadius:4, padding:"1px 6px", fontSize:9, fontFamily:"monospace", marginLeft:6 }}>PREDICTOR LCA</span></div>
                <div style={{ fontSize:9, color:"#9a9080", fontFamily:"monospace" }}>3 direcciones × 2 piernas — alcance en cm</div>
              </div>
              <span style={{ color:"#9a9080", fontSize:13, display:"inline-block", transform:exp==="ybt"?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
            </div>
            {exp==="ybt" && (
              <div style={{ borderTop:"1px solid #3b82f633", padding:"16px 18px", background:"#fdfcfa" }}>
                <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:"8px 12px", marginBottom:14, fontSize:10, color:"#1e40af", fontFamily:"monospace", lineHeight:1.6 }}>
                  📏 Protocolo: Medir LEI (EIAS → maléolo medial) en cm. Registrar 3 alcances por pierna. Score compuesto = (Ant+PM+PL) / (3×LEI) × 100. Ref: score ≥89% · Asimetria &lt;4cm — Plisky et al. JOSPT 2006.
                </div>
                <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"10px 14px", marginBottom:14 }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:"#1a3a22", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, marginBottom:10 }}>LONGITUD EXTREMIDAD INFERIOR (EIAS → Maléolo Medial)</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    {["D","I"].map(lado => (
                      <div key={lado}>
                        <label style={{ fontSize:9, letterSpacing:2, color:"#9a9080", fontFamily:"monospace", display:"block", marginBottom:4 }}>PIERNA {lado==="D"?"DERECHA":"IZQUIERDA"}</label>
                        <div style={{ position:"relative" }}>
                          <input type="number" placeholder="ej. 92" value={(dat["ybt_lei_"+lado.toLowerCase()]||{}).val||""}
                            onChange={e => setF("ybt_lei_"+lado.toLowerCase(), null, "val", e.target.value)}
                            style={{ width:"100%", boxSizing:"border-box", padding:"10px 40px 10px 12px", border:"2px solid "+((dat["ybt_lei_"+lado.toLowerCase()]||{}).val?"#1a3a22":"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:22, outline:"none" }} />
                          <div style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", color:"#9a9080", fontSize:10, fontFamily:"monospace", pointerEvents:"none" }}>cm</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  {["DERECHA","IZQUIERDA"].map(pierna => (
                    <div key={pierna}>
                      <div style={{ fontSize:10, letterSpacing:3, color:"#3b82f6", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, marginBottom:10 }}>PIERNA {pierna}</div>
                      {YBT_DIRS.filter(d => d.pierna===pierna).map(dir => (
                        <div key={dir.id} style={{ marginBottom:10 }}>
                          <label style={{ fontSize:9, letterSpacing:2, color:"#9a9080", fontFamily:"monospace", display:"block", marginBottom:4 }}>{dir.label.toUpperCase()}</label>
                          <div style={{ position:"relative" }}>
                            <input type="number" placeholder="cm" value={(dat[dir.id]||{}).val||""} onChange={e => setF(dir.id, null, "val", e.target.value)}
                              style={{ width:"100%", boxSizing:"border-box", padding:"10px 40px 10px 12px", border:"2px solid "+((dat[dir.id]||{}).val?"#3b82f6":"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:22, outline:"none" }} />
                            <div style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", color:"#9a9080", fontSize:10, fontFamily:"monospace", pointerEvents:"none" }}>cm</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* YBT Summary Panel */}
      {(() => {
        const ybt = calcYBT(dat);
        if (!ybt) return null;
        const rc = ybt.riesgo === "ALTO" ? "#ef4444" : ybt.riesgo === "MODERADO" ? "#f59e0b" : "#22c55e";
        return (
          <div style={{ background:"#fff", border:"1.5px solid "+rc, borderRadius:14, padding:"16px 18px", marginBottom:10, boxShadow:"4px 4px 0 "+rc+"22" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:2, color:"#0d1f14", marginBottom:12, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span>⚖ Y BALANCE TEST — RESULTADO COMPUESTO</span>
              <span style={{ background:rc+"18", border:"1px solid "+rc, color:rc, borderRadius:6, padding:"2px 10px", fontSize:12 }}>{ybt.riesgo} RIESGO LCA</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              {[
                {l:"SCORE COMPUESTO DERECHO", v:ybt.compD+"%", lei:ybt.leiD+" cm", c:parseFloat(ybt.compD)<89?"#ef4444":"#22c55e"},
                {l:"SCORE COMPUESTO IZQUIERDO", v:ybt.compI+"%", lei:ybt.leiI+" cm", c:parseFloat(ybt.compI)<89?"#ef4444":"#22c55e"}
              ].map(s=>(
                <div key={s.l} style={{ background:"#f7f5f0", borderRadius:8, padding:"10px 12px" }}>
                  <div style={{ fontSize:8, letterSpacing:2, color:"#9a9080", fontFamily:"monospace", marginBottom:4 }}>{s.l}</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:26, color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:8, color:"#9a9080", fontFamily:"monospace" }}>LEI: {s.lei} · Ref: ≥89%</div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[{l:"ASIM. ANTERIOR",v:ybt.asimAnt+" cm"},{l:"ASIM. POSTEROMEDIAL",v:ybt.asimPM+" cm"},{l:"ASIM. POSTEROLATERAL",v:ybt.asimPL+" cm"}].map(a=>{
                const c = parseFloat(a.v) > 4 ? "#ef4444" : parseFloat(a.v) > 2 ? "#f59e0b" : "#22c55e";
                return (
                  <div key={a.l} style={{ background:"#f7f5f0", borderRadius:8, padding:"8px 10px" }}>
                    <div style={{ fontSize:8, letterSpacing:1, color:"#9a9080", fontFamily:"monospace", marginBottom:3 }}>{a.l}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:c }}>{a.v}</div>
                    <div style={{ fontSize:7, color:"#9a9080", fontFamily:"monospace" }}>Riesgo si mayor 4cm</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {(() => {
        const incompletos = tests.filter(t => { const d=dat[t.id]||{}; return t.bil ? !(d.D?.res && d.I?.res) : !d.res; }).map(t => t.n);
        const ok = incompletos.length === 0;
        return (
          <div style={{ marginTop:20 }}>
            {!ok && <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
              <div style={{ fontSize:10, color:"#ef4444", fontFamily:"monospace", marginBottom:6 }}>Faltan resultados en {incompletos.length} test(s):</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{incompletos.slice(0,6).map(n => <span key={n} style={{ background:"#ef444418", border:"1px solid #ef4444", color:"#ef4444", borderRadius:5, padding:"2px 7px", fontSize:9, fontFamily:"monospace" }}>{n}</span>)}{incompletos.length>6&&<span style={{ fontSize:9, color:"#ef4444", fontFamily:"monospace" }}>+{incompletos.length-6} mas</span>}</div>
            </div>}
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <button onClick={() => { if (!ok) return; setSaved(true); ctx.guardarPaso(ctx.jugador?.id, ctx.area?.paso, dat); setTimeout(()=>ctx.onBack(),1200); }}
                style={{ background:ok?"#1a3a22":"#e0d9d0", border:"none", color:ok?"#c8f044":"#b0a898", borderRadius:10, padding:"12px 28px", cursor:ok?"pointer":"not-allowed", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, letterSpacing:2, boxShadow:ok?"3px 3px 0 #0d1f1440":"none" }}>
                {saved ? "Guardado" : "GUARDAR EVALUACION"}
              </button>
            </div>
          </div>
        );
      })()}
    </Wrap>
  );
}

function LadoInput({ label, testData, med, onChange }) {
  const res = testData.res;
  const c = res==="positivo"?"#ef4444":res==="negativo"?"#22c55e":"#9a9080";
  return (
    <div>
      <label style={LS}>{label}</label>
      {med ? (
        <div style={{ marginBottom:6 }}>
          <div style={{ position:"relative" }}>
            <input type="number" placeholder={"ej. "+med.um} value={testData.val||""} onChange={e => onChange("val",e.target.value)}
              style={{ width:"100%", boxSizing:"border-box", padding:"10px 40px 10px 12px", border:"2px solid "+(testData.val?c:"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:24, outline:"none" }} />
            <div style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", color:"#9a9080", fontSize:10, fontFamily:"monospace", pointerEvents:"none" }}>{med.u}</div>
          </div>
          {testData.val && <div style={{ marginTop:4, background:c+"15", border:"1px solid "+c, color:c, borderRadius:6, padding:"4px 10px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:11, letterSpacing:1, textAlign:"center" }}>{res==="positivo"?"⚠ POSITIVO":"✓ NEGATIVO"}</div>}
          <div style={{ fontSize:8, color:"#b0a898", marginTop:3, fontFamily:"monospace" }}>{med.dir===-1?"< "+med.um+" "+med.u+" → POSITIVO":"> "+med.um+" "+med.u+" → POSITIVO"}</div>
        </div>
      ) : (
        <div style={{ display:"flex", gap:6, marginBottom:6 }}>
          {["positivo","negativo"].map(r => { const a=testData.res===r, rc=r==="positivo"?"#ef4444":"#22c55e"; return (
            <button key={r} onClick={() => onChange("res",r)} style={{ flex:1, padding:"8px 4px", border:a?"2px solid "+rc:"1.5px solid #e0d9d0", borderRadius:7, background:a?rc+"18":"#fff", color:a?rc:"#7a7060", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:12, letterSpacing:1 }}>
              {r==="positivo"?"⚠ POS":"✓ NEG"}
            </button>);
          })}
        </div>
      )}
      <textarea placeholder="Observaciones..." value={testData.obs||""} onChange={e => onChange("obs",e.target.value)} rows={2} style={TS} />
    </div>
  );
}

function GlobalInput({ testData, onChange }) {
  return (
    <div>
      <div style={{ display:"flex", gap:6, marginBottom:8 }}>
        {["positivo","negativo"].map(r => { const a=testData.res===r, c=r==="positivo"?"#ef4444":"#22c55e"; return (
          <button key={r} onClick={() => onChange("res",r)} style={{ flex:1, padding:"10px", border:a?"2px solid "+c:"1.5px solid #e0d9d0", borderRadius:8, background:a?c+"18":"#fff", color:a?c:"#7a7060", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1 }}>
            {r==="positivo"?"⚠ POSITIVO":"✓ NEGATIVO"}
          </button>);
        })}
      </div>
      <textarea placeholder="Observaciones..." value={testData.obs||""} onChange={e => onChange("obs",e.target.value)} rows={2} style={TS} />
    </div>
  );
}

// ─── PASO 4: VALD ─────────────────────────────────────────────────────────────
function calcIA(a,b) { const va=parseFloat(a),vb=parseFloat(b); if(!va||!vb||isNaN(va)||isNaN(vb))return null; return ((Math.abs(va-vb)/Math.max(va,vb))*100).toFixed(1); }
function IABar({ pct }) {
  if(pct===null) return null;
  const v=parseFloat(pct), c=v<10?"#22c55e":v<15?"#f59e0b":"#ef4444", lbl=v<10?"SIMÉTRICO":v<15?"LEVE":"ASIMETRÍA ALTA";
  return (
    <div style={{ marginTop:10, background:"#f7f5f0", borderRadius:8, padding:"10px 12px", border:"1px solid "+c+"44" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
        <span style={{ fontSize:9, letterSpacing:2, color:"#9a9080", fontFamily:"monospace" }}>ASIMETRÍA</span>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:c }}>{pct}%</span>
          <div style={{ background:c+"18", border:"1px solid "+c, color:c, borderRadius:5, padding:"2px 7px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:9, letterSpacing:1 }}>{lbl}</div>
        </div>
      </div>
      <div style={{ background:"#e8e3dc", borderRadius:4, height:5 }}>
        <div style={{ width:(Math.min(v,30)/30*100)+"%", height:"100%", background:c, borderRadius:4, transition:"width 0.4s" }} />
      </div>
    </div>
  );
}

function Paso4({ ctx }) {
  const saved_p4 = ctx.evalData?.[ctx.jugador?.id]?.p4 || {};
  const [d, setD] = useState(Object.keys(saved_p4).length > 0 ? saved_p4 : {});
  const [exp, setExp] = useState(null);
  const [saved, setSaved] = useState(false);
  const get = k => d[k]||""; const set=(k,v) => { setD(p=>({...p,[k]:v})); setSaved(false); };
  const TESTS = [
    { id:"cmj", n:"Salto Contramovimiento (CMJ)", desc:"Producción de fuerza · Factores temporales · Altura · Asimetría",
      completo: () => get("cmj_h")&&get("cmj_fd")&&get("cmj_fi"),
      render: () => (
        <div>
          <div style={{ marginBottom:12 }}><label style={LS}>ALTURA DEL SALTO (BILATERAL)</label><NInput value={get("cmj_h")} onChange={v=>set("cmj_h",v)} unit="cm" ph="42" /></div>
          <div style={{ marginBottom:4 }}><label style={{ ...LS, color:"#3b82f6" }}>PRODUCCIÓN DE FUERZA</label><G2 l={<NInput label="DERECHO" value={get("cmj_fd")} onChange={v=>set("cmj_fd",v)} unit="N" ph="1800" />} r={<NInput label="IZQUIERDO" value={get("cmj_fi")} onChange={v=>set("cmj_fi",v)} unit="N" ph="1750" />} /></div>
          <IABar pct={calcIA(get("cmj_fd"),get("cmj_fi"))} />
          <div style={{ marginTop:12 }}><label style={{ ...LS, color:"#3b82f6" }}>FACTORES TEMPORALES</label><G2 l={<NInput label="FASE EXCÉNTRICA" value={get("cmj_exc")} onChange={v=>set("cmj_exc",v)} unit="ms" ph="210" />} r={<NInput label="FASE CONCÉNTRICA" value={get("cmj_conc")} onChange={v=>set("cmj_conc",v)} unit="ms" ph="180" />} /></div>
          <div style={{ marginTop:10 }}><textarea placeholder="Observaciones..." value={get("cmj_obs")||""} onChange={e=>set("cmj_obs",e.target.value)} rows={2} style={TS} /></div>
        </div>
      )},
    { id:"nor", n:"Nórdico", desc:"Producción de fuerza · Fuerza excéntrica · Asimetría bilateral",
      completo: () => get("nor_fd")&&get("nor_fi")&&get("nor_ed")&&get("nor_ei"),
      render: () => (
        <div>
          <label style={{ ...LS, color:"#3b82f6" }}>PRODUCCIÓN DE FUERZA</label>
          <G2 l={<NInput label="DERECHO" value={get("nor_fd")} onChange={v=>set("nor_fd",v)} unit="N" ph="520" />} r={<NInput label="IZQUIERDO" value={get("nor_fi")} onChange={v=>set("nor_fi",v)} unit="N" ph="490" />} />
          <IABar pct={calcIA(get("nor_fd"),get("nor_fi"))} />
          <div style={{ marginTop:12 }}><label style={{ ...LS, color:"#3b82f6" }}>FUERZA EXCÉNTRICA</label></div>
          <G2 l={<NInput label="DERECHO" value={get("nor_ed")} onChange={v=>set("nor_ed",v)} unit="N" ph="480" />} r={<NInput label="IZQUIERDO" value={get("nor_ei")} onChange={v=>set("nor_ei",v)} unit="N" ph="460" />} />
          <IABar pct={calcIA(get("nor_ed"),get("nor_ei"))} />
          <div style={{ marginTop:10 }}><textarea placeholder="Observaciones..." value={get("nor_obs")||""} onChange={e=>set("nor_obs",e.target.value)} rows={2} style={TS} /></div>
        </div>
      )},
    { id:"abd", n:"Abductor-Adductor", desc:"Máxima fuerza bilateral · AB:AD Ratio · Asimetría",
      completo: () => get("abd_d")&&get("abd_i")&&get("add_d")&&get("add_i"),
      render: () => {
        const rd=calcRatio(get("abd_d"),get("add_d")), ri=calcRatio(get("abd_i"),get("add_i"));
        function calcRatio(a,b){const va=parseFloat(a),vb=parseFloat(b);if(!va||!vb||isNaN(va)||isNaN(vb))return null;return(va/vb).toFixed(2);}
        function rColor(r){if(!r)return"#9a9080";const v=parseFloat(r);return v>=0.8&&v<=1.2?"#22c55e":"#ef4444";}
        return (
          <div>
            <label style={{ ...LS, color:"#3b82f6" }}>ABDUCTORES</label>
            <G2 l={<NInput label="DERECHO" value={get("abd_d")} onChange={v=>set("abd_d",v)} unit="N" ph="430" />} r={<NInput label="IZQUIERDO" value={get("abd_i")} onChange={v=>set("abd_i",v)} unit="N" ph="415" />} />
            <IABar pct={calcIA(get("abd_d"),get("abd_i"))} />
            <div style={{ marginTop:12 }}><label style={{ ...LS, color:"#3b82f6" }}>ADDUCTORES</label></div>
            <G2 l={<NInput label="DERECHO" value={get("add_d")} onChange={v=>set("add_d",v)} unit="N" ph="380" />} r={<NInput label="IZQUIERDO" value={get("add_i")} onChange={v=>set("add_i",v)} unit="N" ph="365" />} />
            <IABar pct={calcIA(get("add_d"),get("add_i"))} />
            {(rd||ri)&&<div style={{ marginTop:12 }}><label style={{ ...LS, color:"#3b82f6" }}>AB:AD RATIO</label><G2 l={rd&&<div style={{ background:"#f7f5f0", border:"1.5px solid "+rColor(rd)+"44", borderRadius:10, padding:"10px 12px" }}><div style={LS}>RATIO DERECHO</div><div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:26, color:rColor(rd) }}>{rd}</div><div style={{ fontSize:8, color:"#9a9080", fontFamily:"monospace" }}>Ref: 0.80–1.20</div></div>} r={ri&&<div style={{ background:"#f7f5f0", border:"1.5px solid "+rColor(ri)+"44", borderRadius:10, padding:"10px 12px" }}><div style={LS}>RATIO IZQUIERDO</div><div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:26, color:rColor(ri) }}>{ri}</div><div style={{ fontSize:8, color:"#9a9080", fontFamily:"monospace" }}>Ref: 0.80–1.20</div></div>} /></div>}
            <div style={{ marginTop:10 }}><textarea placeholder="Observaciones..." value={get("abd_obs")||""} onChange={e=>set("abd_obs",e.target.value)} rows={2} style={TS} /></div>
          </div>
        );
      }},
    { id:"iso", n:"Test Isométrico", desc:"Máxima fuerza vertical bilateral · Asimetría",
      completo: () => get("iso_d")&&get("iso_i"),
      render: () => (
        <div>
          <label style={{ ...LS, color:"#3b82f6" }}>FUERZA VERTICAL MÁXIMA</label>
          <G2 l={<NInput label="DERECHO" value={get("iso_d")} onChange={v=>set("iso_d",v)} unit="N" ph="1200" />} r={<NInput label="IZQUIERDO" value={get("iso_i")} onChange={v=>set("iso_i",v)} unit="N" ph="1150" />} />
          <IABar pct={calcIA(get("iso_d"),get("iso_i"))} />
          <div style={{ marginTop:10 }}><textarea placeholder="Observaciones..." value={get("iso_obs")||""} onChange={e=>set("iso_obs",e.target.value)} rows={2} style={TS} /></div>
        </div>
      )},
  ];
  const compl = TESTS.filter(t => t.completo()).length;
  return (
    <Wrap {...ctx} backLabel="Cambiar jugador">
      <PTitle a="VALORACIÓN" b="FÍSICA" sub="PASO 4 · Preparación Física · VALD Performance" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
        {[{l:"PRUEBAS TOTALES",v:TESTS.length,c:"#1a3a22"},{l:"COMPLETADAS",v:compl,c:compl===TESTS.length?"#22c55e":"#3b82f6"}].map(s => (
          <div key={s.l} style={{ background:"#fff", border:"1.5px solid #e0d9d0", borderRadius:12, padding:"10px 14px" }}>
            <div style={{ fontSize:9, letterSpacing:2, color:"#9a9080" }}>{s.l}</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:800, color:s.c, lineHeight:1 }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"#fff", border:"1.5px solid #e0d9d0", borderRadius:12, padding:"10px 14px", marginBottom:14, display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
        <span style={{ fontSize:9, letterSpacing:2, color:"#9a9080", fontFamily:"monospace" }}>ASIMETRÍA:</span>
        {[{c:"#22c55e",l:"< 10% Simétrico"},{c:"#f59e0b",l:"10–15% Leve"},{c:"#ef4444",l:"≥ 15% Alto riesgo"}].map(r => (
          <div key={r.l} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:r.c }} />
            <span style={{ fontSize:10, color:"#7a7060", fontFamily:"monospace" }}>{r.l}</span>
          </div>
        ))}
      </div>
      {TESTS.map((test, i) => (
        <Panel key={test.id} id={test.id} label={test.n} num={i+1} exp={exp} setExp={setExp}>
          <div style={{ fontSize:9, color:"#9a9080", fontFamily:"monospace", marginBottom:12 }}>{test.desc}</div>
          {test.render()}
        </Panel>
      ))}
      {(() => {
        const incompletos = TESTS.filter(t => !t.completo()).map(t => t.n);
        const ok = incompletos.length === 0;
        return (
          <div style={{ marginTop:20 }}>
            {!ok && <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
              <div style={{ fontSize:10, color:"#ef4444", fontFamily:"monospace", marginBottom:6 }}>Pruebas incompletas ({incompletos.length}):</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{incompletos.map(n => <span key={n} style={{ background:"#ef444418", border:"1px solid #ef4444", color:"#ef4444", borderRadius:5, padding:"2px 7px", fontSize:9, fontFamily:"monospace" }}>{n}</span>)}</div>
            </div>}
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <button onClick={() => { if (!ok) return; setSaved(true); ctx.guardarPaso(ctx.jugador?.id, ctx.area?.paso, dat); setTimeout(()=>ctx.onBack(),1200); }}
                style={{ background:ok?"#1a3a22":"#e0d9d0", border:"none", color:ok?"#c8f044":"#b0a898", borderRadius:10, padding:"12px 28px", cursor:ok?"pointer":"not-allowed", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, letterSpacing:2, boxShadow:ok?"3px 3px 0 #0d1f1440":"none" }}>
                {saved ? "Guardado" : "GUARDAR VALORACION"}
              </button>
            </div>
          </div>
        );
      })()}
    </Wrap>
  );
}

// ─── PASO 5: USG ──────────────────────────────────────────────────────────────
function semFL(v){const n=parseFloat(v);if(isNaN(n))return null;if(n>10.5)return{c:"#22c55e",l:"SIN RIESGO"};if(n>=9)return{c:"#f59e0b",l:"VIGILANCIA"};return{c:"#ef4444",l:"ALTO RIESGO"};}
function semEco(v){const n=parseFloat(v);if(isNaN(n))return null;if(n<50)return{c:"#22c55e",l:"ÓPTIMO"};if(n<=70)return{c:"#f59e0b",l:"MODERADO"};return{c:"#ef4444",l:"PATOLÓGICO"};}
function semIA5(v){const n=parseFloat(v);if(isNaN(n))return null;if(n<10)return{c:"#22c55e",l:"NORMAL"};if(n<=15)return{c:"#f59e0b",l:"ALERTA"};return{c:"#ef4444",l:"CRÍTICO"};}
function Bdg({s}){if(!s)return null;return <span style={{ background:s.c+"22", border:"1px solid "+s.c, color:s.c, borderRadius:5, padding:"2px 7px", fontFamily:"monospace", fontWeight:700, fontSize:10, letterSpacing:1, display:"inline-block", marginTop:3 }}>{s.l}</span>;}
function IARow5({label,valD,valI,semFn}){
  const ia=calcIA(valD,valI); const sIA=ia!==null?semIA5(ia):null;
  if(!valD&&!valI)return null;
  return (
    <div style={{ background:"#f7f5f0", borderRadius:8, padding:"10px 12px", marginTop:8, border:"1px solid #e8e3dc" }}>
      <div style={{ fontSize:9, letterSpacing:2, color:"#9a9080", fontFamily:"monospace", marginBottom:8 }}>{label} — RESULTADO</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
        {[{k:"D",v:valD},{k:"I",v:valI}].map(side => { const s=semFn?semFn(side.v):null; return (
          <div key={side.k} style={{ textAlign:"center" }}>
            <div style={{ fontSize:8, color:"#9a9080", fontFamily:"monospace", marginBottom:3 }}>{side.k==="D"?"DERECHO":"IZQUIERDO"}</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:"#0d1f14" }}>{side.v||"—"}</div>
            <Bdg s={s} />
          </div>); })}
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:8, color:"#9a9080", fontFamily:"monospace", marginBottom:3 }}>IA%</div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:sIA?sIA.c:"#9a9080" }}>{ia!==null?ia+"%":"—"}</div>
          <Bdg s={sIA} />
        </div>
      </div>
    </div>
  );
}
function MuscSec5({title,children}){return(<div style={{ background:"#fdfcfa", border:"1.5px solid #e8e3dc", borderRadius:12, padding:"12px", marginBottom:10 }}><div style={{ fontSize:10, letterSpacing:3, color:"#1a3a22", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, marginBottom:10, display:"flex", alignItems:"center", gap:6 }}><img src={IGUANA} alt="" style={{ width:14, height:14, objectFit:"contain" }} />{title}</div>{children}</div>);}
function DTag({txt}){return <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:7, padding:"6px 10px", marginBottom:8, fontSize:9, color:"#1e40af", fontFamily:"monospace" }}>🕐 {txt}</div>;}
const CAMPS_INM = [{key:"bf_fl_d",label:"FL BF Derecho"},{key:"bf_fl_i",label:"FL BF Izquierdo"},{key:"bf_gt_d",label:"Grosor BF Derecho"},{key:"bf_gt_i",label:"Grosor BF Izquierdo"},{key:"rf_fl_d",label:"FL RF Derecho"},{key:"rf_fl_i",label:"FL RF Izquierdo"},{key:"rf_gt_d",label:"Grosor RF Derecho"},{key:"rf_gt_i",label:"Grosor RF Izquierdo"}];
const CAMPS_DIF = [{key:"bf_pa_d",label:"Ángulo Penación BF D"},{key:"bf_pa_i",label:"Ángulo Penación BF I"},{key:"bf_eco_d",label:"Ecogenicidad BF D"},{key:"bf_eco_i",label:"Ecogenicidad BF I"},{key:"rf_pa_d",label:"Ángulo Penación RF D"},{key:"rf_pa_i",label:"Ángulo Penación RF I"},{key:"rf_eco_d",label:"Ecogenicidad RF D"},{key:"rf_eco_i",label:"Ecogenicidad RF I"}];
const TIPO_USG = ["Pre-temporada semana 1","Pre-temporada semana 4","Control mensual","Post-partido congestionado","Post-lesión / RTP","Señal clínica"];

function Paso5({ ctx }) {
  const saved_p5 = ctx.evalData?.[ctx.jugador?.id]?.p5 || {};
  const [dat, setDat] = useState(Object.keys(saved_p5).length > 0 ? saved_p5 : {});
  const [exp, setExp] = useState("cond");
  const [saved, setSaved] = useState(false);
  const get = k => dat[k]||""; const set=(k,v)=>{setDat(p=>({...p,[k]:v}));setSaved(false);};
  const inmFalt=CAMPS_INM.filter(c=>get(c.key)==="");
  const difFalt=CAMPS_DIF.filter(c=>get(c.key)==="");
  const inmComp=CAMPS_INM.length-inmFalt.length;
  const difComp=CAMPS_DIF.length-difFalt.length;
  const todo=inmFalt.length===0&&difFalt.length===0;
  function riesgo(){
    const flags=[];
    function chk(val,fn,mkTxt){if(!val)return;const s=fn(val);if(!s)return;const alto=s.l==="ALTO RIESGO"||s.l==="PATOLÓGICO"||s.l==="CRÍTICO";const mod=s.l==="VIGILANCIA"||s.l==="MODERADO"||s.l==="ALERTA";if(alto)flags.push({n:"ALTO",t:mkTxt(val,s)});else if(mod)flags.push({n:"MOD",t:mkTxt(val,s)});}
    chk(get("bf_fl_d"),semFL,(v,s)=>"FL BF Der: "+v+" cm — "+s.l);
    chk(get("bf_fl_i"),semFL,(v,s)=>"FL BF Izq: "+v+" cm — "+s.l);
    chk(get("bf_eco_d"),semEco,(v,s)=>"Eco BF Der: "+v+" UA — "+s.l);
    chk(get("bf_eco_i"),semEco,(v,s)=>"Eco BF Izq: "+v+" UA — "+s.l);
    const iaBF=calcIA(get("bf_fl_d"),get("bf_fl_i")),iaRF=calcIA(get("rf_fl_d"),get("rf_fl_i"));
    if(iaBF){const s=semIA5(iaBF);if(s&&s.l==="CRÍTICO")flags.push({n:"ALTO",t:"IA% BF: "+iaBF+"% > 15% — RR×3.2"});else if(s&&s.l==="ALERTA")flags.push({n:"MOD",t:"IA% BF: "+iaBF+"%"});}
    if(iaRF){const s=semIA5(iaRF);if(s&&s.l==="CRÍTICO")flags.push({n:"ALTO",t:"IA% RF: "+iaRF+"% > 15%"});else if(s&&s.l==="ALERTA")flags.push({n:"MOD",t:"IA% RF: "+iaRF+"%"});}
    const alto=flags.some(f=>f.n==="ALTO"),mod=flags.some(f=>f.n==="MOD");
    return{nivel:alto?"ALTO":mod?"MODERADO":get("bf_fl_d")?"BAJO":null,color:alto?"#ef4444":mod?"#f59e0b":"#22c55e",flags};
  }
  const r=riesgo();
  const PANELES=[{id:"cond",n:1,label:"Condiciones Pre-Evaluación"},{id:"biceps",n:2,label:"Bíceps Femoral (cabeza larga)"},{id:"recto",n:3,label:"Recto Femoral"},{id:"doppler",n:4,label:"Doppler Color"},{id:"concl",n:5,label:"Conclusión Clínica y Plan"}];
  return (
    <Wrap {...ctx} backLabel="Cambiar jugador">
      <PTitle a="EVALUACIÓN" b="ULTRASONIDO" sub="PASO 5 · Ecografía MSK · Protocolo USG v2.4 — 2024 · Evidencia I–II" />
      {r.nivel&&<div style={{ background:r.nivel==="BAJO"?"#f0fdf4":r.nivel==="MODERADO"?"#fffbeb":"#fff5f5", border:"1.5px solid "+r.color, borderRadius:14, padding:"14px 18px", marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:r.flags.length?8:0 }}>
          <div><div style={{ fontSize:9, letterSpacing:3, color:"#9a9080", fontFamily:"monospace" }}>RIESGO GLOBAL USG</div><div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:24, color:r.color }}>{r.nivel}</div></div>
          <div style={{ width:44, height:44, borderRadius:"50%", background:r.color+"20", border:"3px solid "+r.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{r.nivel==="BAJO"?"✓":r.nivel==="MODERADO"?"■":"✕"}</div>
        </div>
        {r.flags.map((f,i)=><div key={i} style={{ display:"flex", gap:8, marginTop:4 }}><span style={{ color:f.n==="ALTO"?"#ef4444":"#f59e0b", fontSize:10 }}>▸</span><span style={{ fontSize:10, color:"#4b4030", fontFamily:"monospace" }}>{f.t}</span></div>)}
      </div>}
      <div style={{ background:"#fff", border:"1.5px solid #e0d9d0", borderRadius:12, padding:"10px 14px", marginBottom:14 }}>
        <div style={{ fontSize:9, letterSpacing:2, color:"#9a9080", fontFamily:"monospace", marginBottom:8 }}>UMBRALES DE REFERENCIA</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          {[{c:"#22c55e",t:"SIN RIESGO",i:["FL BF > 10.5 cm","Eco < 50 UA","IA < 10%"]},{c:"#f59e0b",t:"VIGILANCIA",i:["FL BF 9–10.5 cm","Eco 50–70 UA","IA 10–15%"]},{c:"#ef4444",t:"ALTO RIESGO",i:["FL BF < 9.0 cm","Eco > 70 UA","IA > 15%"]}].map(rx=>(
            <div key={rx.t} style={{ background:rx.c+"08", border:"1px solid "+rx.c+"33", borderRadius:8, padding:"8px 10px" }}>
              <div style={{ color:rx.c, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:11, letterSpacing:1, marginBottom:4 }}>{rx.t}</div>
              {rx.i.map(it=><div key={it} style={{ fontSize:9, color:"#7a7060", fontFamily:"monospace", lineHeight:1.6 }}>{it}</div>)}
            </div>
          ))}
        </div>
      </div>
      {PANELES.map(pan => (
        <Panel key={pan.id} id={pan.id} label={pan.label} num={pan.n} exp={exp} setExp={setExp}>
          {pan.id==="cond"&&(
            <div>
              <G2 l={<div><label style={LS}>TIPO DE EVALUACIÓN</label><select value={get("tipo")} onChange={e=>set("tipo",e.target.value)} style={{ width:"100%", padding:"10px 12px", border:"1.5px solid "+(get("tipo")?"#1a3a22":"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:12, outline:"none" }}><option value="">— seleccionar —</option>{TIPO_USG.map(t=><option key={t} value={t}>{t}</option>)}</select></div>}
                  r={<div><label style={LS}>EVALUADOR</label><input type="text" placeholder="Nombre / Colegiado Nº" value={get("eval")} onChange={e=>set("eval",e.target.value)} style={{ width:"100%", boxSizing:"border-box", padding:"10px 12px", border:"1.5px solid "+(get("eval")?"#1a3a22":"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:12, outline:"none" }} /></div>} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginTop:12 }}>
                <NInput label="HORAS DESDE ENTRENO" value={get("horas")} onChange={v=>set("horas",v)} unit="h" ph="48" hint="Mín: 48 h" />
                <NInput label="TEMPERATURA SALA" value={get("temp")} onChange={v=>set("temp",v)} unit="°C" ph="21" hint="Óptimo 20–22°C" />
                <NInput label="DOLOR EVA" value={get("eva")} onChange={v=>set("eva",v)} unit="/10" ph="0" hint="Escala 0–10" />
              </div>
              <div style={{ marginTop:12 }}><NInput label="ACWR SEMANA PREVIA" value={get("acwr")} onChange={v=>set("acwr",v)} ph="1.0" hint="Óptimo 0.8–1.3" /></div>
              <div style={{ marginTop:12 }}><label style={LS}>OBSERVACIONES GENERALES</label><textarea placeholder="Condiciones especiales..." value={get("obs_g")||""} onChange={e=>set("obs_g",e.target.value)} rows={2} style={TS} /></div>
            </div>
          )}
          {pan.id==="biceps"&&(
            <div>
              <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"8px 12px", marginBottom:12, fontSize:10, color:"#14532d", fontFamily:"monospace", lineHeight:1.6 }}>📍 Decúbito prono, rodilla 0° · 50% tuberosidad isquiática–fosa poplítea · Long. + transv.</div>
              <MuscSec5 title="LONGITUD FASCICULAR"><G2 l={<NInput label="DERECHO" value={get("bf_fl_d")} onChange={v=>set("bf_fl_d",v)} unit="cm" ph="10.8" hint="Riesgo si < 9.0 cm" />} r={<NInput label="IZQUIERDO" value={get("bf_fl_i")} onChange={v=>set("bf_fl_i",v)} unit="cm" ph="10.5" hint="Riesgo si < 9.0 cm" />} /><IARow5 label="FL BF" valD={get("bf_fl_d")} valI={get("bf_fl_i")} semFn={semFL} /></MuscSec5>
              <MuscSec5 title="GROSOR MUSCULAR"><G2 l={<NInput label="DERECHO" value={get("bf_gt_d")} onChange={v=>set("bf_gt_d",v)} unit="cm" ph="3.8" />} r={<NInput label="IZQUIERDO" value={get("bf_gt_i")} onChange={v=>set("bf_gt_i",v)} unit="cm" ph="3.7" />} /><IARow5 label="GROSOR BF" valD={get("bf_gt_d")} valI={get("bf_gt_i")} semFn={null} /></MuscSec5>
              <MuscSec5 title="ÁNGULO DE PENACIÓN"><DTag txt="Campo diferido — obtenido en software (ImageJ / propietario)" /><G2 l={<NInput label="DERECHO" value={get("bf_pa_d")} onChange={v=>set("bf_pa_d",v)} unit="°" ph="12.5" />} r={<NInput label="IZQUIERDO" value={get("bf_pa_i")} onChange={v=>set("bf_pa_i",v)} unit="°" ph="13.0" />} /></MuscSec5>
              <MuscSec5 title="ECOGENICIDAD"><DTag txt="Campo diferido — escala de grises tras exportar imagen DICOM/PNG" /><G2 l={<NInput label="DERECHO" value={get("bf_eco_d")} onChange={v=>set("bf_eco_d",v)} unit="UA" ph="42" hint="< 50 óptimo · > 70 patológico" />} r={<NInput label="IZQUIERDO" value={get("bf_eco_i")} onChange={v=>set("bf_eco_i",v)} unit="UA" ph="45" hint="0–255" />} /><IARow5 label="ECO BF" valD={get("bf_eco_d")} valI={get("bf_eco_i")} semFn={semEco} /></MuscSec5>
              <label style={LS}>OBSERVACIONES</label><textarea placeholder="Hallazgos, homogeneidad..." value={get("bf_obs")||""} onChange={e=>set("bf_obs",e.target.value)} rows={2} style={TS} />
            </div>
          )}
          {pan.id==="recto"&&(
            <div>
              <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"8px 12px", marginBottom:12, fontSize:10, color:"#14532d", fontFamily:"monospace", lineHeight:1.6 }}>📍 Supino, cadera 0°, rodilla 0° · 50% EIAS–polo superior rótula · Longitudinal</div>
              <MuscSec5 title="LONGITUD FASCICULAR"><G2 l={<NInput label="DERECHO" value={get("rf_fl_d")} onChange={v=>set("rf_fl_d",v)} unit="cm" ph="8.2" />} r={<NInput label="IZQUIERDO" value={get("rf_fl_i")} onChange={v=>set("rf_fl_i",v)} unit="cm" ph="8.0" />} /><IARow5 label="FL RF" valD={get("rf_fl_d")} valI={get("rf_fl_i")} semFn={null} /></MuscSec5>
              <MuscSec5 title="GROSOR MUSCULAR"><G2 l={<NInput label="DERECHO" value={get("rf_gt_d")} onChange={v=>set("rf_gt_d",v)} unit="cm" ph="2.6" />} r={<NInput label="IZQUIERDO" value={get("rf_gt_i")} onChange={v=>set("rf_gt_i",v)} unit="cm" ph="2.5" />} /><IARow5 label="GROSOR RF" valD={get("rf_gt_d")} valI={get("rf_gt_i")} semFn={null} /></MuscSec5>
              <MuscSec5 title="ÁNGULO DE PENACIÓN"><DTag txt="Campo diferido — obtenido en software (ImageJ / propietario)" /><G2 l={<NInput label="DERECHO" value={get("rf_pa_d")} onChange={v=>set("rf_pa_d",v)} unit="°" ph="14.0" />} r={<NInput label="IZQUIERDO" value={get("rf_pa_i")} onChange={v=>set("rf_pa_i",v)} unit="°" ph="13.5" />} /></MuscSec5>
              <MuscSec5 title="ECOGENICIDAD"><DTag txt="Campo diferido — escala de grises tras exportar imagen DICOM/PNG" /><G2 l={<NInput label="DERECHO" value={get("rf_eco_d")} onChange={v=>set("rf_eco_d",v)} unit="UA" ph="48" hint="< 50 óptimo · > 70 patológico" />} r={<NInput label="IZQUIERDO" value={get("rf_eco_i")} onChange={v=>set("rf_eco_i",v)} unit="UA" ph="50" hint="0–255" />} /><IARow5 label="ECO RF" valD={get("rf_eco_d")} valI={get("rf_eco_i")} semFn={semEco} /></MuscSec5>
              <label style={LS}>OBSERVACIONES</label><textarea placeholder="Hallazgos, homogeneidad..." value={get("rf_obs")||""} onChange={e=>set("rf_obs",e.target.value)} rows={2} style={TS} />
            </div>
          )}
          {pan.id==="doppler"&&(
            <div>
              <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:8, padding:"8px 12px", marginBottom:12, fontSize:10, color:"#7f1d1d", fontFamily:"monospace", lineHeight:1.6 }}>Activar solo ante sospecha de lesión activa o tendinopatía. Ohberg: 0=sin señal · 3=difusa severa.</div>
              <G2 l={<div><label style={LS}>MÚSCULO EVALUADO</label><input type="text" placeholder="Ej. Bíceps Femoral D" value={get("dop_m")} onChange={e=>set("dop_m",e.target.value)} style={{ width:"100%", boxSizing:"border-box", padding:"10px 12px", border:"1.5px solid "+(get("dop_m")?"#1a3a22":"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:12, outline:"none" }} /></div>}
                  r={<div><label style={LS}>GRADO OHBERG (0–3)</label><div style={{ display:"flex", gap:6 }}>{["0","1","2","3"].map(g=>{const a=get("dop_g")===g,c=g==="0"?"#22c55e":g==="1"?"#84cc16":g==="2"?"#f59e0b":"#ef4444";return <button key={g} onClick={()=>set("dop_g",g)} style={{ flex:1, padding:"10px 4px", border:a?"2px solid "+c:"1.5px solid #e0d9d0", borderRadius:8, background:a?c+"18":"#fff", color:a?c:"#7a7060", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:18 }}>{g}</button>;})}</div><div style={{ fontSize:8, color:"#9a9080", fontFamily:"monospace", marginTop:4 }}>0=sin señal · 3=difusa severa</div></div>} />
              <div style={{ marginTop:12 }}><label style={LS}>OBSERVACIONES DOPPLER</label><textarea placeholder="Hiperemia, localización..." value={get("dop_obs")||""} onChange={e=>set("dop_obs",e.target.value)} rows={2} style={TS} /></div>
            </div>
          )}
          {pan.id==="concl"&&(
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
                {[{val:"BAJO",c:"#22c55e",icon:"✓",desc:"Entrenamiento normal"},{val:"MODERADO",c:"#f59e0b",icon:"■",desc:"Monitoreo semanal"},{val:"ALTO",c:"#ef4444",icon:"✕",desc:"Intervención inmediata"}].map(rx=>{const a=get("ries_c")===rx.val;return <button key={rx.val} onClick={()=>set("ries_c",rx.val)} style={{ padding:"12px 8px", border:a?"2px solid "+rx.c:"1.5px solid #e0d9d0", borderRadius:10, background:a?rx.c+"18":"#fff", color:a?rx.c:"#7a7060", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}><span style={{ fontSize:20 }}>{rx.icon}</span>{rx.val}<span style={{ fontSize:9, fontFamily:"monospace", fontWeight:400 }}>{rx.desc}</span></button>;})}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div><label style={LS}>HALLAZGO PRINCIPAL</label><input type="text" placeholder="Ej. FL BF Der reducida — vigilancia" value={get("hallazgo")} onChange={e=>set("hallazgo",e.target.value)} style={{ width:"100%", boxSizing:"border-box", padding:"10px 12px", border:"1.5px solid "+(get("hallazgo")?"#1a3a22":"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:12, outline:"none" }} /></div>
                <div><label style={LS}>PLAN DE INTERVENCIÓN</label><textarea placeholder="Modificación de carga, derivación..." value={get("plan")||""} onChange={e=>set("plan",e.target.value)} rows={3} style={TS} /></div>
                <div><label style={LS}>PRÓXIMA EVALUACIÓN USG</label><input type="date" value={get("prox")} onChange={e=>set("prox",e.target.value)} style={{ width:"100%", boxSizing:"border-box", padding:"10px 12px", border:"1.5px solid "+(get("prox")?"#1a3a22":"#e0d9d0"), borderRadius:8, background:"#fff", color:"#0d1f14", fontFamily:"monospace", fontSize:12, outline:"none" }} /></div>
              </div>
            </div>
          )}
        </Panel>
      ))}
      <div style={{ marginTop:8, background:"#fff", border:"1.5px solid #e0d9d0", borderRadius:14, overflow:"hidden" }}>
        {[{label:"INMEDIATOS",desc:"medibles en evaluación",comp:inmComp,total:CAMPS_INM.length,falt:inmFalt,bc:inmFalt.length===0?"#22c55e":"#f59e0b",tbg:"#fff8f0",tb:"#f59e0b",tc:"#92400e",ti:"⚠"},{label:"DIFERIDOS",desc:"requieren software",comp:difComp,total:CAMPS_DIF.length,falt:difFalt,bc:difFalt.length===0?"#22c55e":"#3b82f6",tbg:"#eff6ff",tb:"#3b82f6",tc:"#1e40af",ti:"🕐"}].map((row,i)=>(
          <div key={row.label} style={{ padding:"12px 16px", borderBottom:i===0?"1px solid #f0ebe3":"none" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:row.bc }} />
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1, color:"#0d1f14" }}>{row.label}</span>
                <span style={{ fontSize:9, color:"#9a9080", fontFamily:"monospace" }}>({row.desc})</span>
              </div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:16, color:row.bc }}>{row.comp}/{row.total}</span>
            </div>
            <div style={{ background:"#e8e3dc", borderRadius:4, height:5, marginBottom:row.falt.length>0?8:0 }}>
              <div style={{ width:((row.comp/row.total)*100)+"%", height:"100%", background:row.bc, borderRadius:4, transition:"width 0.3s" }} />
            </div>
            {row.falt.length>0&&<div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>{row.falt.map(c=><div key={c.key} style={{ background:row.tbg, border:"1px solid "+row.tb, borderRadius:5, padding:"2px 7px", fontSize:9, color:row.tc, fontFamily:"monospace" }}>{row.ti} {c.label}</div>)}</div>}
          </div>
        ))}
        {difFalt.length>0&&<div style={{ padding:"8px 16px", borderTop:"1px solid #f0ebe3", background:"#f8fafc" }}><div style={{ fontSize:9, color:"#6b7280", fontFamily:"monospace", lineHeight:1.6 }}>💡 Puedes guardar ahora y completar campos diferidos al procesar imágenes en el software.</div></div>}
      </div>
{(() => {
        const ok = inmFalt.length === 0;
        return (
          <div style={{ marginTop:8 }}>
            {!ok && <div style={{ background:"#fff5f5", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
              <div style={{ fontSize:10, color:"#ef4444", fontFamily:"monospace", marginBottom:6 }}>Campos inmediatos pendientes:</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{inmFalt.map(c => <span key={c.key} style={{ background:"#ef444418", border:"1px solid #ef4444", color:"#ef4444", borderRadius:5, padding:"2px 7px", fontSize:9, fontFamily:"monospace" }}>{c.label}</span>)}</div>
            </div>}
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <button onClick={() => { if (!ok) return; setSaved(true); ctx.guardarPaso(ctx.jugador?.id, ctx.area?.paso, dat); setTimeout(()=>ctx.onBack(),1200); }}
                style={{ background:ok?"#1a3a22":"#e0d9d0", border:"none", color:ok?"#c8f044":"#b0a898", borderRadius:10, padding:"12px 28px", cursor:ok?"pointer":"not-allowed", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, letterSpacing:2, boxShadow:ok?"3px 3px 0 #0d1f1440":"none" }}>
                {saved ? "Guardado" : todo ? "GUARDAR USG" : "GUARDAR PARCIALMENTE"}
              </button>
            </div>
          </div>
        );
      })()}
    </Wrap>
  );
}


// ─── INFORME IMPRIMIBLE ──────────────────────────────────────────────────────

const PRINT_STYLES = `
  @media print {
    .no-print { display: none !important; }
    .print-only { display: block !important; }
    body { margin: 0; background: white !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
  @media screen {
    .print-only { display: none; }
  }
  @page { size: A4; margin: 15mm; }
`;

function InformeImprimible({ jugador, evalData, evaluaciones, evaluador, modo, onBack }) {
  const jId = jugador?.id;
  const ev  = evalData[jId] || {};
  const d2  = ev.p2 || {};
  const d3  = ev.p3 || {};
  const d4  = ev.p4 || {};
  const d5  = ev.p5 || {};
  const ev2 = evaluaciones[jId] || {};
  const fecha = new Date().toLocaleDateString("es-MX", { year:"numeric", month:"long", day:"numeric" });

  function sc(v,p,r,f){ if(v){f.push({pts:p,txt:r});return p;} return 0; }
  function niv(pct){ if(pct>=60)return{label:"CRITICO",color:"#ef4444"}; if(pct>=35)return{label:"ALTO",color:"#f97316"}; if(pct>=15)return{label:"MODERADO",color:"#f59e0b"}; return{label:"BAJO",color:"#22c55e"}; }

  function scoreLCA() {
    let pts=0; const flags=[];
    if(d2.lca?.lesiones?.length>0) pts+=sc(true,30,"Lesion previa LCA",flags);
    const aD=parseFloat((d3.ybt_ant_d||{}).val||""), aI=parseFloat((d3.ybt_ant_i||{}).val||"");
    const pD=parseFloat((d3.ybt_pm_d||{}).val||""),  pI=parseFloat((d3.ybt_pm_i||{}).val||"");
    if(!isNaN(aD)&&!isNaN(aI)&&Math.abs(aD-aI)>4) pts+=sc(true,15,"YBT asimetria anterior >4cm",flags);
    if(!isNaN(pD)&&!isNaN(pI)&&Math.abs(pD-pI)>4) pts+=sc(true,15,"YBT asimetria posteromedial >4cm",flags);
    const salto=d3.salto||{};
    if(salto.D?.res==="positivo"||salto.I?.res==="positivo") pts+=sc(true,20,"Valgo dinamico en aterrizaje (OR 4.7 — Hewett 2005)",flags);
    if((d3.squat||{}).res==="positivo") pts+=sc(true,10,"Deficit control neuromuscular Squat FMS",flags);
    const nD=parseFloat(d4.nor_fd||""),nI=parseFloat(d4.nor_fi||"");
    if(!isNaN(nD)&&!isNaN(nI)&&nD>0&&nI>0){const a=Math.abs(nD-nI)/Math.max(nD,nI)*100;if(a>=15)pts+=sc(true,15,"Asimetria excentrica isquios >=15% (RR 3.1)",flags);}
    const cD=parseFloat(d4.cmj_fd||""),cI=parseFloat(d4.cmj_fi||"");
    if(!isNaN(cD)&&!isNaN(cI)&&cD>0&&cI>0){const a=Math.abs(cD-cI)/Math.max(cD,cI)*100;if(a>=15)pts+=sc(true,10,"Asimetria CMJ >=15% (OR 2.8 — Paterno 2010)",flags);}
    const pct=Math.min(pts,100); return{pct,flags,nivel:niv(pct)};
  }

  function scoreIsq() {
    let pts=0; const flags=[];
    if(d2.isq?.lesiones?.length>0) pts+=sc(true,30,"Lesion previa isquiotibiales (RR 3.9)",flags);
    const fD=parseFloat(d5.bf_fl_d||""),fI=parseFloat(d5.bf_fl_i||"");
    if(!isNaN(fD)){if(fD<9)pts+=sc(true,20,"FL BF Der <9.0cm — ALTO RIESGO (OR 4.1 — Timmins)",flags);else if(fD<10.5)pts+=sc(true,10,"FL BF Der 9-10.5cm — vigilancia",flags);}
    if(!isNaN(fI)){if(fI<9)pts+=sc(true,20,"FL BF Izq <9.0cm — ALTO RIESGO (OR 4.1 — Timmins)",flags);else if(fI<10.5)pts+=sc(true,10,"FL BF Izq 9-10.5cm — vigilancia",flags);}
    const eD=parseFloat(d5.bf_eco_d||"");
    if(!isNaN(eD)&&eD>70) pts+=sc(true,10,"Ecogenicidad BF Der >70 UA — patologica",flags);
    const nD=parseFloat(d4.nor_fd||""),nI=parseFloat(d4.nor_fi||"");
    if(!isNaN(nD)&&!isNaN(nI)&&nD>0&&nI>0){const a=Math.abs(nD-nI)/Math.max(nD,nI)*100;if(a>=15)pts+=sc(true,15,"Asimetria nordico >=15% (RR 2.4 — van Dyk 2017)",flags);}
    if((d3.curl||{}).D?.res==="positivo"||(d3.curl||{}).I?.res==="positivo") pts+=sc(true,10,"Curl Nordico positivo",flags);
    if((d3.ham||{}).D?.res==="positivo"||(d3.ham||{}).I?.res==="positivo") pts+=sc(true,8,"Hamstring Test positivo <90°",flags);
    const pct=Math.min(pts,100); return{pct,flags,nivel:niv(pct)};
  }

  function scoreRF() {
    let pts=0; const flags=[];
    if(d2.rf?.lesiones?.length>0) pts+=sc(true,30,"Lesion previa recto femoral (RR 3.5)",flags);
    const ely=d3.ely||{};
    if(ely.D?.res==="positivo"||ely.I?.res==="positivo") pts+=sc(true,20,"Duncan Ely positivo (sens. 72%)",flags);
    const th=d3.thomas||{};
    if(th.D?.res==="positivo"||th.I?.res==="positivo"){pts+=sc(true,12,"Thomas Modificado positivo",flags);if(ely.D?.res==="positivo"||ely.I?.res==="positivo")pts+=sc(true,8,"Ely+Thomas combinados (espec. 81%)",flags);}
    if((d3.lunge||{}).D?.res==="positivo"||(d3.lunge||{}).I?.res==="positivo") pts+=sc(true,8,"Lunge Test positivo",flags);
    const nD=parseFloat(d4.nor_ed||""),nI=parseFloat(d4.nor_ei||"");
    if(!isNaN(nD)&&!isNaN(nI)&&nD>0&&nI>0){const a=Math.abs(nD-nI)/Math.max(nD,nI)*100;if(a>=15)pts+=sc(true,12,"Asimetria Nordico Invertido >=15%",flags);}
    const pct=Math.min(pts,100); return{pct,flags,nivel:niv(pct)};
  }

  const lca=scoreLCA(), isq=scoreIsq(), rf=scoreRF();
  const maxR=[lca,isq,rf].reduce((mx,r)=>r.pct>mx.pct?r:mx,{pct:0,nivel:{label:"BAJO",color:"#22c55e"}});

  function Cell({label,value,color}){
    return(
      <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid #f0f0f0",fontSize:11}}>
        <span style={{color:"#555"}}>{label}</span>
        <span style={{fontWeight:700,color:color||"#111"}}>{value||"—"}</span>
      </div>
    );
  }

  function RiskBlock({titulo,res}){
    return(
      <div style={{marginBottom:10,padding:"10px 12px",background:res.nivel.color+"15",border:"1.5px solid "+res.nivel.color+"44",borderRadius:8,pageBreakInside:"avoid"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
          <span style={{fontWeight:700,fontSize:12,color:"#111"}}>{titulo}</span>
          <span style={{background:res.nivel.color,color:"#fff",padding:"2px 10px",borderRadius:20,fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>{res.nivel.label} — {res.pct}%</span>
        </div>
        <div style={{background:"#ddd",borderRadius:3,height:6,marginBottom:5}}>
          <div style={{width:res.pct+"%",height:"100%",background:res.nivel.color,borderRadius:3}}/>
        </div>
        {res.flags.length>0
          ? res.flags.map((f,i)=><div key={i} style={{fontSize:9,color:"#444",lineHeight:1.7}}>▸ {f.txt} <b style={{color:res.nivel.color}}>(+{f.pts}pts)</b></div>)
          : <div style={{fontSize:9,color:"#22c55e"}}>Sin factores de riesgo identificados</div>}
      </div>
    );
  }

  const iaVal = (a,b) => { const va=parseFloat(a),vb=parseFloat(b); if(!va||!vb)return null; return((Math.abs(va-vb)/Math.max(va,vb))*100).toFixed(1); };
  const iaColor = v => parseFloat(v)>=15?"#ef4444":parseFloat(v)>=10?"#f59e0b":"#111";

  return (
    <div style={{fontFamily:"Arial,sans-serif",color:"#111",maxWidth:720,margin:"0 auto",padding:"20px",fontSize:12,background:"#fff"}}>
      <style>{PRINT_STYLES}</style>

      {/* Barra de accion — solo en pantalla */}
      <div className="no-print" style={{background:"#1a3a22",borderRadius:12,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={onBack} style={{background:"transparent",border:"1px solid #c8f04466",color:"#c8f044",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontFamily:"monospace",fontSize:11}}>
          ← Volver
        </button>
        <div style={{color:"#6aaa44",fontFamily:"monospace",fontSize:10}}>
          Usa Ctrl+P (o Cmd+P) → Guardar como PDF
        </div>
        <button onClick={()=>window.print()} style={{background:"#c8f044",border:"none",color:"#0d1f14",borderRadius:8,padding:"8px 20px",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,letterSpacing:2}}>
          🖨 IMPRIMIR / PDF
        </button>
      </div>

      {/* CONTENIDO IMPRIMIBLE */}

      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,paddingBottom:12,borderBottom:"3px solid #1a3a22"}}>
        <div>
          <div style={{fontSize:9,color:"#666",letterSpacing:2,marginBottom:3}}>CANCÚN FC · INFORME MÉDICO INDIVIDUAL · CONFIDENCIAL</div>
          <div style={{fontSize:24,fontWeight:900,color:"#1a3a22",lineHeight:1}}>{jugador?.nombre}</div>
          <div style={{fontSize:11,color:"#555",marginTop:3}}>#{jugador?.dorsal} · {jugador?.posicion} · {jugador?.edad} años · {jugador?.dominancia}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <img src={ESCUDO} alt="Cancun FC" style={{height:60,objectFit:"contain"}}/>
          <div style={{fontSize:9,color:"#888",marginTop:4}}>{fecha}</div>
        </div>
      </div>

      {/* Riesgo global */}
      <div style={{background:maxR.nivel.color,color:"#fff",padding:"10px 16px",borderRadius:8,marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:9,letterSpacing:2,opacity:0.85}}>RIESGO GLOBAL MÁS ELEVADO</div>
          <div style={{fontSize:22,fontWeight:900}}>{maxR.nivel.label}</div>
        </div>
        <div style={{fontSize:40,fontWeight:900}}>{maxR.pct}%</div>
      </div>

      {/* Grid datos + evaluaciones */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:"#1a3a22",letterSpacing:1,marginBottom:6,paddingBottom:3,borderBottom:"2px solid #1a3a22"}}>DATOS GENERALES</div>
          <Cell label="Posición" value={jugador?.posicion}/>
          <Cell label="Edad" value={jugador?.edad+" años"}/>
          <Cell label="Peso" value={jugador?.peso?jugador.peso+" kg":null}/>
          <Cell label="Talla" value={jugador?.talla?jugador.talla+" cm":null}/>
          <Cell label="Dominancia" value={jugador?.dominancia}/>
        </div>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:"#1a3a22",letterSpacing:1,marginBottom:6,paddingBottom:3,borderBottom:"2px solid #1a3a22"}}>EVALUACIONES</div>
          {[{p:"p1",n:"Ficha del Jugador"},{p:"p2",n:"Historial de Lesiones"},{p:"p3",n:"Kinesiologia"},{p:"p4",n:"Valoracion VALD"},{p:"p5",n:"Ultrasonido USG"}].map(e=>(
            <div key={e.p} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 0",borderBottom:"1px solid #f0f0f0",fontSize:11}}>
              <span style={{color:ev2[e.p]?"#22c55e":"#ddd",fontWeight:700,fontSize:13}}>{ev2[e.p]?"✓":"○"}</span>
              <span style={{color:ev2[e.p]?"#111":"#aaa"}}>{e.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Predictores */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:"#1a3a22",letterSpacing:1,marginBottom:8,paddingBottom:3,borderBottom:"2px solid #1a3a22"}}>PREDICTORES DE RIESGO LESIONAL</div>
        <RiskBlock titulo="Ligamento Cruzado Anterior (LCA)" res={lca}/>
        <RiskBlock titulo="Isquiotibiales" res={isq}/>
        <RiskBlock titulo="Recto Anterior Femoral" res={rf}/>
      </div>

      {/* VALD */}
      {(d4.cmj_fd||d4.nor_fd||d4.iso_d)&&(
        <div style={{marginBottom:14,pageBreakInside:"avoid"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#1a3a22",letterSpacing:1,marginBottom:6,paddingBottom:3,borderBottom:"2px solid #1a3a22"}}>VALORACIÓN FÍSICA VALD</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            {d4.cmj_h&&<Cell label="Altura CMJ" value={d4.cmj_h+" cm"}/>}
            {d4.cmj_fd&&d4.cmj_fi&&<Cell label="Asimetria CMJ" value={iaVal(d4.cmj_fd,d4.cmj_fi)+"%"} color={iaColor(iaVal(d4.cmj_fd,d4.cmj_fi))}/>}
            {d4.nor_fd&&d4.nor_fi&&<Cell label="Asimetria Nordico" value={iaVal(d4.nor_fd,d4.nor_fi)+"%"} color={iaColor(iaVal(d4.nor_fd,d4.nor_fi))}/>}
            {d4.nor_ed&&d4.nor_ei&&<Cell label="Asimetria Nordico Exc." value={iaVal(d4.nor_ed,d4.nor_ei)+"%"} color={iaColor(iaVal(d4.nor_ed,d4.nor_ei))}/>}
            {d4.iso_d&&d4.iso_i&&<Cell label="Asimetria Isometrico" value={iaVal(d4.iso_d,d4.iso_i)+"%"} color={iaColor(iaVal(d4.iso_d,d4.iso_i))}/>}
            {d4.abd_d&&d4.abd_i&&<Cell label="Asimetria Abductor" value={iaVal(d4.abd_d,d4.abd_i)+"%"} color={iaColor(iaVal(d4.abd_d,d4.abd_i))}/>}
          </div>
        </div>
      )}

      {/* USG */}
      {(d5.bf_fl_d||d5.rf_fl_d)&&(
        <div style={{marginBottom:14,pageBreakInside:"avoid"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#1a3a22",letterSpacing:1,marginBottom:6,paddingBottom:3,borderBottom:"2px solid #1a3a22"}}>ULTRASONIDO MUSCULAR</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            {d5.bf_fl_d&&<Cell label="FL Biceps Femoral Der" value={d5.bf_fl_d+" cm"} color={parseFloat(d5.bf_fl_d)<9?"#ef4444":parseFloat(d5.bf_fl_d)<10.5?"#f59e0b":"#111"}/>}
            {d5.bf_fl_i&&<Cell label="FL Biceps Femoral Izq" value={d5.bf_fl_i+" cm"} color={parseFloat(d5.bf_fl_i)<9?"#ef4444":parseFloat(d5.bf_fl_i)<10.5?"#f59e0b":"#111"}/>}
            {d5.rf_fl_d&&<Cell label="FL Recto Femoral Der" value={d5.rf_fl_d+" cm"}/>}
            {d5.rf_fl_i&&<Cell label="FL Recto Femoral Izq" value={d5.rf_fl_i+" cm"}/>}
            {d5.bf_eco_d&&<Cell label="Ecogenicidad BF Der" value={d5.bf_eco_d+" UA"} color={parseFloat(d5.bf_eco_d)>70?"#ef4444":"#111"}/>}
            {d5.bf_eco_i&&<Cell label="Ecogenicidad BF Izq" value={d5.bf_eco_i+" UA"} color={parseFloat(d5.bf_eco_i)>70?"#ef4444":"#111"}/>}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{marginTop:20,paddingTop:8,borderTop:"1px solid #ddd",fontSize:9,color:"#888",display:"flex",justifyContent:"space-between"}}>
        <span>Generado por: {evaluador} · {fecha}</span>
        <span>Cancún FC · Confidencial · Uso exclusivo equipo médico</span>
      </div>
      <div style={{fontSize:8,color:"#bbb",marginTop:3}}>
        Referencias: Timmins MSSE 2016 · Hewett AJSM 2005 · Plisky JOSPT 2006 · Paterno AJSM 2010 · van Dyk BJSM 2017 · Peeler JMST 2007
      </div>
    </div>
  );
}

// ─── INFORME EQUIPO IMPRIMIBLE ───────────────────────────────────────────────

function InformeEquipoImprimible({ jugadores, evalData, evaluaciones, evaluador, onBack }) {
  const fecha = new Date().toLocaleDateString("es-MX");
  return (
    <div style={{fontFamily:"Arial,sans-serif",padding:20,background:"#fff",minHeight:"100vh"}}>
      <style>{PRINT_STYLES}</style>
      <div className="no-print" style={{background:"#1a3a22",borderRadius:12,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={onBack} style={{background:"transparent",border:"1px solid #c8f04466",color:"#c8f044",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontFamily:"monospace",fontSize:11}}>
          ← Volver
        </button>
        <span style={{color:"#6aaa44",fontFamily:"monospace",fontSize:10}}>Ctrl+P → Guardar como PDF</span>
        <button onClick={()=>window.print()} style={{background:"#c8f044",border:"none",color:"#0d1f14",borderRadius:8,padding:"8px 20px",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,letterSpacing:2}}>
          IMPRIMIR / PDF
        </button>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,paddingBottom:12,borderBottom:"3px solid #1a3a22"}}>
        <div>
          <div style={{fontSize:9,color:"#666",letterSpacing:2}}>CANCUN FC · INFORME EJECUTIVO · CONFIDENCIAL</div>
          <div style={{fontSize:24,fontWeight:900,color:"#1a3a22"}}>INFORME GENERAL DE RIESGO LESIONAL</div>
          <div style={{fontSize:11,color:"#555",marginTop:3}}>Generado por: {evaluador} · {fecha}</div>
        </div>
        <img src={ESCUDO} alt="Cancun FC" style={{height:60,objectFit:"contain"}}/>
      </div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:"#1a3a22",marginBottom:8}}>PLANTEL ({jugadores.length} jugadores)</div>
        {jugadores.map((j,i) => (
          <div key={j.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 10px",background:i%2===0?"#f9f9f9":"#fff",borderBottom:"1px solid #eee",fontSize:11}}>
            <span><strong>{j.nombre}</strong> · #{j.dorsal} · {j.posicion}</span>
            <span style={{color:"#888"}}>
              {evaluaciones[j.id]?.p3?"✓Kine ":""}{evaluaciones[j.id]?.p4?"✓VALD ":""}{evaluaciones[j.id]?.p5?"✓USG":""}
              {!evaluaciones[j.id]?.p3&&!evaluaciones[j.id]?.p4&&!evaluaciones[j.id]?.p5?"Sin evaluar":""}
            </span>
          </div>
        ))}
      </div>
      <div style={{marginTop:20,paddingTop:8,borderTop:"1px solid #ddd",fontSize:9,color:"#888"}}>
        Cancun FC · Confidencial · Solo para la direccion medica
      </div>
    </div>
  );
}


function Dashboard({ jugadores, evaluaciones, evalData, evaluador, onHome }) {
  const [verJugador, setVerJugador] = useState(null);

  const POS = ["Portero","Defensa","Medio","Delantero"];
  const posColor = { Portero:"#f59e0b", Defensa:"#3b82f6", Medio:"#22c55e", Delantero:"#ef4444" };

  function getRiesgo(jId) {
    const ev=evalData[jId]||{}, d2=ev.p2||{}, d3=ev.p3||{}, d4=ev.p4||{}, d5=ev.p5||{};
    let pts=0;
    if(d2.lca?.lesiones?.length>0) pts+=20;
    if(d2.isq?.lesiones?.length>0) pts+=20;
    const salto=d3.salto||{};
    if(salto.D?.res==="positivo"||salto.I?.res==="positivo") pts+=15;
    const fD=parseFloat(d5.bf_fl_d||"");
    if(!isNaN(fD)&&fD<9)pts+=20;else if(!isNaN(fD)&&fD<10.5)pts+=10;
    const nD=parseFloat(d4.nor_fd||""),nI=parseFloat(d4.nor_fi||"");
    if(!isNaN(nD)&&!isNaN(nI)&&nD>0&&nI>0){const a=Math.abs(nD-nI)/Math.max(nD,nI)*100;if(a>=15)pts+=10;}
    const cD=parseFloat(d4.cmj_fd||""),cI=parseFloat(d4.cmj_fi||"");
    if(!isNaN(cD)&&!isNaN(cI)&&cD>0&&cI>0){const a=Math.abs(cD-cI)/Math.max(cD,cI)*100;if(a>=15)pts+=8;}
    const pct=Math.min(pts,100);
    const nivel=pct>=60?"CRITICO":pct>=35?"ALTO":pct>=15?"MODERADO":"BAJO";
    const color=pct>=60?"#ef4444":pct>=35?"#f97316":pct>=15?"#f59e0b":"#22c55e";
    const evaluado=!!(evaluaciones[jId]?.p3||evaluaciones[jId]?.p4||evaluaciones[jId]?.p5);
    return{pct,nivel,color,evaluado};
  }



  const jConR = jugadores.map(j=>({...j, r:getRiesgo(j.id)}));
  const evaluados = jConR.filter(j=>j.r.evaluado);
  const alto = jConR.filter(j=>["ALTO","CRITICO"].includes(j.r.nivel.label)&&j.r.evaluado);

  if (verJugador) {
    const j = jConR.find(x=>x.id===verJugador);
    const r = j?.r;
    return (
      <>
        <link href={FONT_LINK} rel="stylesheet" />
        <div style={{ minHeight:"100vh", background:"#060d1a", padding:"32px 20px", fontFamily:"'DM Mono',monospace" }}>
          <div style={{ maxWidth:660, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <button onClick={()=>setVerJugador(null)} style={{ background:"transparent", border:"none", color:"#64748b", cursor:"pointer", fontFamily:"monospace", fontSize:12, padding:0 }}>← Volver</button>
              <button onClick={onHome} style={{ background:"#0f172a", border:"1px solid #1e293b", color:"#64748b", borderRadius:10, width:36, height:36, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>🏠</button>
            </div>
            <div style={{ background:"linear-gradient(135deg,#0f172a,#1e293b)", border:"1.5px solid "+(r?.color||"#334155")+"44", borderRadius:20, padding:"20px 24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:30, fontWeight:800, color:"#f1f5f9", letterSpacing:-1 }}>{j?.nombre}</div>
                  <div style={{ color:"#64748b", fontFamily:"monospace", fontSize:10, marginTop:3 }}>#{j?.dorsal} · {j?.posicion} · {j?.edad} años</div>
                </div>
                <div style={{ background:r?.color+"18", border:"1.5px solid "+r?.color, color:r?.color, borderRadius:8, padding:"4px 14px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:1 }}>{r?.nivel} {r?.pct}%</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                {[{l:"KINE",p:"p3",icon:"🦵"},{l:"VALD",p:"p4",icon:"💪"},{l:"USG",p:"p5",icon:"🔬"}].map(e=>{
                  const done=evaluaciones[j?.id]?.[e.p];
                  return(<div key={e.l} style={{ background:"#0a1628", border:"1px solid "+(done?"#22c55e33":"#1e293b"), borderRadius:10, padding:"12px", textAlign:"center" }}>
                    <div style={{ fontSize:20, marginBottom:4 }}>{e.icon}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:11, color:done?"#22c55e":"#475569" }}>{done?"COMPLETO":"PENDIENTE"}</div>
                    <div style={{ fontSize:9, color:"#475569", fontFamily:"monospace" }}>{e.l}</div>
                  </div>);
                })}
              </div>
              {!j?.r.evaluado&&<div style={{ marginTop:14, background:"#1e293b", borderRadius:10, padding:"10px 14px", color:"#64748b", fontFamily:"monospace", fontSize:11 }}>Sin evaluaciones completadas aun</div>}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ minHeight:"100vh", background:"#060d1a", padding:"32px 20px", fontFamily:"'DM Mono',monospace" }}>
        <div style={{ position:"fixed", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 39px,#0f1f3a 39px,#0f1f3a 40px)", opacity:0.4, pointerEvents:"none" }} />
        <div style={{ maxWidth:700, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:4, color:"#f59e0b", marginBottom:6 }}>CANCÚN FC · INFORME EJECUTIVO</div>
              <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:36, fontWeight:800, color:"#f1f5f9", margin:0, lineHeight:0.95, letterSpacing:-1 }}>
                INFORME<br /><span style={{ color:"#f59e0b" }}>GENERAL</span>
              </h1>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <img src={ESCUDO} alt="Cancun FC" style={{ height:64, objectFit:"contain" }} />
              <button onClick={onHome} style={{ background:"#0f172a", border:"1px solid #1e293b", color:"#64748b", borderRadius:10, width:36, height:36, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>🏠</button>
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:20 }}>
            {[{l:"TOTAL",v:jugadores.length,c:"#3b82f6"},{l:"EVALUADOS",v:evaluados.length,c:"#22c55e"},{l:"ALTO RIESGO",v:alto.length,c:"#ef4444"},{l:"PENDIENTES",v:jugadores.length-evaluados.length,c:"#f59e0b"}].map(k=>(
              <div key={k.l} style={{ background:"linear-gradient(135deg,#0f172a,#1e293b)", border:"1px solid "+k.c+"33", borderRadius:14, padding:"14px 12px" }}>
                <div style={{ fontSize:8, letterSpacing:2, color:"#64748b", fontFamily:"monospace", marginBottom:4 }}>{k.l}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:34, fontWeight:800, color:k.c, lineHeight:1 }}>{k.v}</div>
              </div>
            ))}
          </div>

          {/* Alertas */}
          {alto.length>0&&(
            <div style={{ background:"#1a0a0a", border:"1.5px solid #ef444433", borderRadius:14, padding:"16px", marginBottom:16 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, fontWeight:700, color:"#ef4444", letterSpacing:2, marginBottom:12 }}>⚠ ALTO RIESGO / CRÍTICO</div>
              {alto.sort((a,b)=>b.r.pct-a.r.pct).map(j=>(
                <button key={j.id} onClick={()=>setVerJugador(j.id)}
                  style={{ width:"100%", background:"#0f172a", border:"1px solid #ef444422", borderRadius:10, padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", textAlign:"left", marginBottom:6 }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#ef4444"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#ef444422"}>
                  <div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, color:"#f1f5f9" }}>{j.nombre}</div>
                    <div style={{ fontSize:10, color:"#64748b", fontFamily:"monospace" }}>#{j.dorsal} · {j.posicion}</div>
                  </div>
                  <div style={{ background:j.r.color+"18", border:"1px solid "+j.r.color, color:j.r.color, borderRadius:6, padding:"3px 12px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:12 }}>{j.r.nivel} {j.r.pct}%</div>
                </button>
              ))}
            </div>
          )}

          {/* Por posición */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
            {POS.map(pos=>{
              const grupo=jConR.filter(j=>j.posicion===pos);
              if(!grupo.length) return null;
              const c=posColor[pos]||"#64748b";
              return(
                <div key={pos} style={{ background:"linear-gradient(135deg,#0f172a,#1e293b)", border:"1px solid "+c+"33", borderRadius:14, padding:"14px" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, color:c, letterSpacing:1, marginBottom:10 }}>{pos.toUpperCase()} ({grupo.length})</div>
                  {grupo.map(j=>(
                    <button key={j.id} onClick={()=>setVerJugador(j.id)}
                      style={{ width:"100%", background:"#0a1628", border:"1px solid #1e293b", borderRadius:8, padding:"8px 10px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", textAlign:"left", marginBottom:5 }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=c}
                      onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}>
                      <div>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, color:"#f1f5f9" }}>{j.nombre}</div>
                        <div style={{ fontSize:9, color:"#64748b", fontFamily:"monospace" }}>#{j.dorsal}</div>
                      </div>
                      {j.r.evaluado
                        ? <span style={{ background:j.r.color+"18", border:"1px solid "+j.r.color+"44", color:j.r.color, borderRadius:5, padding:"2px 8px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:10 }}>{j.r.nivel}</span>
                        : <span style={{ fontSize:9, color:"#475569", fontFamily:"monospace" }}>pendiente</span>}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Plantel completo */}
          <div style={{ background:"linear-gradient(135deg,#0f172a,#1e293b)", border:"1px solid #1e293b", borderRadius:14, overflow:"hidden" }}>
            <div style={{ padding:"14px 18px", borderBottom:"1px solid #1e293b", fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, color:"#94a3b8", letterSpacing:2 }}>PLANTEL COMPLETO</div>
            {[...jConR].sort((a,b)=>(b.r.pct||0)-(a.r.pct||0)).map((j,i)=>{
              const ev2=evaluaciones[j.id]||{};
              return(
                <button key={j.id} onClick={()=>setVerJugador(j.id)}
                  style={{ width:"100%", background:i%2===0?"#0a1628":"transparent", border:"none", borderBottom:"1px solid #1e293b", padding:"12px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, textAlign:"left" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#1e293b"}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#0a1628":"transparent"}>
                  <div style={{ width:32, height:32, borderRadius:8, background:j.r.color+"18", border:"1px solid "+j.r.color+"44", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:14, color:j.r.color, flexShrink:0 }}>{j.dorsal||"—"}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:15, color:"#f1f5f9" }}>{j.nombre}</div>
                    <div style={{ fontSize:9, color:"#64748b", fontFamily:"monospace" }}>{j.posicion} · {j.edad} años</div>
                  </div>
                  <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                    {["p3","p4","p5"].map(p=><div key={p} style={{ width:18, height:18, borderRadius:4, background:ev2[p]?"#1a3a22":"#1e293b", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:ev2[p]?"#22c55e":"#475569" }}>{ev2[p]?"✓":"·"}</div>)}
                    {j.r.evaluado
                      ? <span style={{ background:j.r.color+"18", border:"1px solid "+j.r.color+"44", color:j.r.color, borderRadius:6, padding:"2px 10px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:11, marginLeft:6 }}>{j.r.nivel}</span>
                      : <span style={{ fontSize:9, color:"#475569", fontFamily:"monospace", marginLeft:6 }}>sin evaluar</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop:16, background:"#0f172a", borderRadius:10, padding:"8px 14px", border:"1px solid #1e293b" }}>
            <div style={{ fontSize:8, color:"#334155", fontFamily:"monospace", lineHeight:1.8 }}>
              CANCÚN FC · INFORME EJECUTIVO CONFIDENCIAL · Solo para uso interno de la dirección médica
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── PREDICTOR ALGORITMO ────────────────────────────────────────────────────

function nivelRiesgo(pct) {
  if (pct >= 60) return { label:"CRITICO",  color:"#ef4444", bg:"#fff5f5", icon:"✕" };
  if (pct >= 35) return { label:"ALTO",     color:"#f97316", bg:"#fff7ed", icon:"⚠" };
  if (pct >= 15) return { label:"MODERADO", color:"#f59e0b", bg:"#fffbeb", icon:"■" };
  return              { label:"BAJO",      color:"#22c55e", bg:"#f0fdf4", icon:"✓" };
}

function score(value, points, reason, flags) {
  if (value) { flags.push({ pts: points, txt: reason }); return points; }
  return 0;
}

function predLCA(p2, p3, p4) {
  let pts = 0;
  const flags = [];
  const his = p2 || {};
  const kin = p3 || {};
  const vald = p4 || {};

  // ── HISTORIAL PREVIO (mayor peso) ──
  if (his.lca?.lesiones?.some(l => l.lado === "Derecho" || l.lado === "Izquierdo")) {
    pts += score(true, 30, "Lesion previa LCA ipsilateral (RR 6.0 — van Mechelen 1992)", flags);
  } else if (his.lca?.lesiones?.length > 0) {
    pts += score(true, 20, "Lesion previa LCA (RR 4.5 — Wiggins et al. AJSM 2016)", flags);
  }

  // ── YBT — Plisky et al. JOSPT 2006 ──
  const ybtAntD = parseFloat((kin.ybt_ant_d||{}).val||"");
  const ybtAntI = parseFloat((kin.ybt_ant_i||{}).val||"");
  const ybtPMD  = parseFloat((kin.ybt_pm_d||{}).val||"");
  const ybtPMI  = parseFloat((kin.ybt_pm_i||{}).val||"");
  const ybtPLD  = parseFloat((kin.ybt_pl_d||{}).val||"");
  const ybtPLI  = parseFloat((kin.ybt_pl_i||{}).val||"");

  if (!isNaN(ybtAntD) && !isNaN(ybtAntI)) {
    const asimAnt = Math.abs(ybtAntD - ybtAntI);
    if (asimAnt > 4) pts += score(true, 15, "YBT asimetria anterior > 4cm (RR 2.5 — Plisky 2006)", flags);
    else if (asimAnt > 2) pts += score(true, 7, "YBT asimetria anterior 2-4cm (vigilancia)", flags);
  }
  if (!isNaN(ybtPMD) && !isNaN(ybtPMI)) {
    const asimPM = Math.abs(ybtPMD - ybtPMI);
    if (asimPM > 4) pts += score(true, 15, "YBT asimetria posteromedial > 4cm (RR 2.5 — Plisky 2006)", flags);
    else if (asimPM > 2) pts += score(true, 7, "YBT asimetria posteromedial 2-4cm", flags);
  }

  // ── VALGO DINÁMICO — Hewett et al. AJSM 2005 OR 4.7 ──
  const salto = kin.salto || {};
  const valgoDer = salto.D?.res === "positivo";
  const valgoIzq = salto.I?.res === "positivo";
  if (valgoDer || valgoIzq) pts += score(true, 20, "Valgo dinamico en aterrizaje (OR 4.7 — Hewett 2005)", flags);

  const squat = kin.squat || {};
  if (squat.res === "positivo") pts += score(true, 10, "Deficit control neuromuscular en Sentadilla FMS", flags);

  // ── RATIO H:Q — Asimetría nórdico VALD ──
  const norFD = parseFloat(vald.nor_fd||""), norFI = parseFloat(vald.nor_fi||"");
  if (!isNaN(norFD) && !isNaN(norFI) && norFD > 0 && norFI > 0) {
    const asimNor = Math.abs(norFD - norFI) / Math.max(norFD, norFI) * 100;
    if (asimNor >= 15) pts += score(true, 15, "Asimetria excentrica isquios >= 15% — desequilibrio H:Q (RR 3.1)", flags);
    else if (asimNor >= 10) pts += score(true, 8, "Asimetria excentrica isquios 10-14%", flags);
  }

  // ── ASIMETRÍA CMJ — Paterno et al. AJSM 2010 OR 2.8 ──
  const cmjD = parseFloat(vald.cmj_fd||""), cmjI = parseFloat(vald.cmj_fi||"");
  if (!isNaN(cmjD) && !isNaN(cmjI) && cmjD > 0 && cmjI > 0) {
    const asimCMJ = Math.abs(cmjD - cmjI) / Math.max(cmjD, cmjI) * 100;
    if (asimCMJ >= 15) pts += score(true, 10, "Asimetria CMJ >= 15% (OR 2.8 — Paterno 2010)", flags);
    else if (asimCMJ >= 10) pts += score(true, 5, "Asimetria CMJ 10-14%", flags);
  }

  // ── ADDUCTORES — Copenhague ──
  const copen = kin.copen || {};
  if (copen.D?.res === "positivo" || copen.I?.res === "positivo") {
    pts += score(true, 5, "Deficit fuerza adductores (Copenhague positivo) — factor estabilizador rodilla", flags);
  }

  const pct = Math.min(Math.round(pts), 100);
  return { pct, flags, nivel: nivelRiesgo(pct) };
}

function predIsquio(p2, p3, p4, p5) {
  let pts = 0;
  const flags = [];
  const his = p2 || {};
  const kin = p3 || {};
  const vald = p4 || {};
  const usg = p5 || {};

  // ── HISTORIAL PREVIO ──
  if (his.isq?.lesiones?.length > 0) {
    pts += score(true, 30, "Lesion previa isquiotibiales (RR 3.9 — Engebretsen 2010)", flags);
  }

  // ── LONGITUD FASCICULAR USG — Timmins et al. MSSE 2016 OR 4.1 ──
  const flBFD = parseFloat(usg.bf_fl_d||""), flBFI = parseFloat(usg.bf_fl_i||"");
  if (!isNaN(flBFD)) {
    if (flBFD < 9.0) pts += score(true, 20, "FL BF Der < 9.0cm — ALTO RIESGO (OR 4.1 — Timmins 2016)", flags);
    else if (flBFD < 10.5) pts += score(true, 10, "FL BF Der 9.0-10.5cm — vigilancia (Timmins 2016)", flags);
  }
  if (!isNaN(flBFI)) {
    if (flBFI < 9.0) pts += score(true, 20, "FL BF Izq < 9.0cm — ALTO RIESGO (OR 4.1 — Timmins 2016)", flags);
    else if (flBFI < 10.5) pts += score(true, 10, "FL BF Izq 9.0-10.5cm — vigilancia (Timmins 2016)", flags);
  }

  // ── ECOGENICIDAD — Pillen et al. Muscle Nerve 2009 ──
  const ecoBFD = parseFloat(usg.bf_eco_d||""), ecoBFI = parseFloat(usg.bf_eco_i||"");
  if (!isNaN(ecoBFD) && ecoBFD > 70) pts += score(true, 10, "Ecogenicidad BF Der > 70 UA — infiltracion grasa/fibrosis", flags);
  else if (!isNaN(ecoBFD) && ecoBFD >= 50) pts += score(true, 5, "Ecogenicidad BF Der 50-70 UA — moderada", flags);
  if (!isNaN(ecoBFI) && ecoBFI > 70) pts += score(true, 10, "Ecogenicidad BF Izq > 70 UA — infiltracion grasa/fibrosis", flags);

  // ── ASIMETRÍA NÓRDICO VALD — van Dyk et al. BJSM 2017 ──
  const norFD = parseFloat(vald.nor_fd||""), norFI = parseFloat(vald.nor_fi||"");
  if (!isNaN(norFD) && !isNaN(norFI) && norFD > 0 && norFI > 0) {
    const asim = Math.abs(norFD - norFI) / Math.max(norFD, norFI) * 100;
    if (asim >= 15) pts += score(true, 15, "Asimetria nórdico >= 15% — deficit excentrico isquios (RR 2.4 — van Dyk 2017)", flags);
    else if (asim >= 10) pts += score(true, 7, "Asimetria nordico 10-14% — vigilancia", flags);
  }

  // ── CURL NÓRDICO KINESIOLOGÍA ──
  const curl = kin.curl || {};
  if (curl.D?.res === "positivo" || curl.I?.res === "positivo") {
    pts += score(true, 10, "Curl Nordico positivo — fuerza excentrica insuficiente", flags);
  }

  // ── HAMSTRING TEST ──
  const ham = kin.ham || {};
  if (ham.D?.res === "positivo" || ham.I?.res === "positivo") {
    pts += score(true, 8, "Hamstring Test positivo < 90° — flexibilidad reducida isquiotibiales", flags);
  }

  // ── ASIMETRÍA BILATERAL USG ──
  if (!isNaN(flBFD) && !isNaN(flBFI) && flBFD > 0 && flBFI > 0) {
    const iaFL = Math.abs(flBFD - flBFI) / Math.max(flBFD, flBFI) * 100;
    if (iaFL > 15) pts += score(true, 10, "IA% longitud fascicular BF > 15% (RR 3.2 — Timmins 2016)", flags);
    else if (iaFL > 10) pts += score(true, 5, "IA% longitud fascicular BF 10-15%", flags);
  }

  const pct = Math.min(Math.round(pts), 100);
  return { pct, flags, nivel: nivelRiesgo(pct) };
}

function predRecto(p2, p3, p4, p5) {
  let pts = 0;
  const flags = [];
  const his = p2 || {};
  const kin = p3 || {};
  const vald = p4 || {};
  const usg = p5 || {};

  // ── HISTORIAL PREVIO ──
  if (his.rf?.lesiones?.length > 0) {
    pts += score(true, 30, "Lesion previa recto femoral (RR 3.5 — Orchard et al. BJSM 2001)", flags);
  }

  // ── DUNCAN ELY — Peeler et al. JMST 2007 ──
  const ely = kin.ely || {};
  const elyPos = ely.D?.res === "positivo" || ely.I?.res === "positivo";
  if (elyPos) pts += score(true, 20, "Duncan Ely positivo — acortamiento recto femoral (sensibilidad 72%)", flags);

  // ── THOMAS MODIFICADO ──
  const thomas = kin.thomas || {};
  if (thomas.D?.res === "positivo" || thomas.I?.res === "positivo") {
    pts += score(true, 12, "Thomas Modificado positivo — acortamiento flexores cadera", flags);
  }

  // ── ELY + THOMAS combinados — mayor especificidad ──
  if (elyPos && (thomas.D?.res === "positivo" || thomas.I?.res === "positivo")) {
    pts += score(true, 8, "Ely + Thomas positivos combinados — especificidad 81% (Peeler 2007)", flags);
  }

  // ── LUNGE TEST ──
  const lunge = kin.lunge || {};
  const lungeD = parseFloat((lunge.D||{}).val||""), lungeI = parseFloat((lunge.I||{}).val||"");
  if (!isNaN(lungeD) && lungeD < 10) pts += score(true, 10, "Lunge Der < 10cm — restriccion movilidad tobillo/cadena anterior", flags);
  if (!isNaN(lungeI) && lungeI < 10) pts += score(true, 10, "Lunge Izq < 10cm — restriccion movilidad tobillo/cadena anterior", flags);
  if (lunge.D?.res === "positivo" || lunge.I?.res === "positivo") {
    pts += score(true, 8, "Lunge Test positivo — restriccion dorsiflexion", flags);
  }

  // ── NÓRDICO INVERTIDO VALD ──
  const ninvD = parseFloat(vald.nor_ed||""), ninvI = parseFloat(vald.nor_ei||"");
  if (!isNaN(ninvD) && !isNaN(ninvI) && ninvD > 0 && ninvI > 0) {
    const asim = Math.abs(ninvD - ninvI) / Math.max(ninvD, ninvI) * 100;
    if (asim >= 15) pts += score(true, 12, "Asimetria Nordico Invertido >= 15% — deficit excentrico cuadriceps", flags);
    else if (asim >= 10) pts += score(true, 6, "Asimetria Nordico Invertido 10-14%", flags);
  }
  const ninvKin = kin.ninv || {};
  if (ninvKin.D?.res === "positivo" || ninvKin.I?.res === "positivo") {
    pts += score(true, 10, "Nordico Invertido positivo — fuerza excentrica cuadriceps insuficiente", flags);
  }

  // ── FL RECTO FEMORAL USG ──
  const flRFD = parseFloat(usg.rf_fl_d||""), flRFI = parseFloat(usg.rf_fl_i||"");
  if (!isNaN(flRFD) && !isNaN(flRFI) && flRFD > 0 && flRFI > 0) {
    const iaRF = Math.abs(flRFD - flRFI) / Math.max(flRFD, flRFI) * 100;
    if (iaRF > 15) pts += score(true, 10, "IA% FL Recto Femoral > 15% — asimetria arquitectural significativa", flags);
    else if (iaRF > 10) pts += score(true, 5, "IA% FL Recto Femoral 10-15%", flags);
  }

  const pct = Math.min(Math.round(pts), 100);
  return { pct, flags, nivel: nivelRiesgo(pct) };
}

function hasAnyKine(d) { return d && Object.keys(d).length > 0; }
function hasAnyVald(d) { return d && (d.cmj_fd || d.nor_fd || d.iso_d || d.abd_d); }
function hasAnyUSG(d)  { return d && (d.bf_fl_d || d.bf_fl_i || d.rf_fl_d); }
function hasUSGEco(d)  { return d && (d.bf_eco_d || d.bf_eco_i); }
function hasUSGAngulo(d){ return d && (d.bf_pa_d || d.bf_pa_i); }
function confiabilidadFn(vars) { return Math.round(vars.filter(v=>v.ok).length / vars.length * 100); }

function GaugeBar({ pct, color }) {
  return (
    <div style={{ marginTop:8 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:32, color, lineHeight:1 }}>{pct}%</span>
        <span style={{ fontSize:9, color:"#64748b", fontFamily:"monospace" }}>/ 100 pts</span>
      </div>
      <div style={{ background:"#1e293b", borderRadius:6, height:10 }}>
        <div style={{ width:pct+"%", height:"100%", background:color, borderRadius:6, transition:"width 0.8s ease" }} />
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
        {[{v:15,l:"MOD"},{v:35,l:"ALTO"},{v:60,l:"CRIT"}].map(m => (
          <div key={m.v} style={{ position:"relative" }}>
            <span style={{ fontSize:8, color:"#475569", fontFamily:"monospace" }}>{m.v}% {m.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskCard({ titulo, icon, result, vars, confiabilidad }) {
  if (!result) {
    return (
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <span style={{ fontSize:20 }}>{icon}</span>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, letterSpacing:2, color:"#64748b" }}>{titulo}</span>
        </div>
        <div style={{ background:"#1e293b", borderRadius:10, padding:"12px 14px" }}>
          <div style={{ fontSize:10, color:"#475569", fontFamily:"monospace", marginBottom:6 }}>SIN DATOS SUFICIENTES PARA CALCULAR</div>
          <div style={{ fontSize:9, color:"#334155", fontFamily:"monospace" }}>Completa al menos un paso de evaluacion para iniciar el predictor</div>
        </div>
      </div>
    );
  }

  const { pct, flags, nivel } = result;
  return (
    <div style={{ background:"#0f172a", border:"1.5px solid "+nivel.color+"44", borderRadius:16, padding:"20px", boxShadow:"0 0 24px "+nivel.color+"15" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:20 }}>{icon}</span>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, letterSpacing:2, color:"#94a3b8" }}>{titulo}</span>
        </div>
        <div style={{ background:nivel.bg, border:"1px solid "+nivel.color, color:nivel.color, borderRadius:8, padding:"3px 12px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, letterSpacing:1 }}>
          {nivel.icon} {nivel.label}
        </div>
      </div>
      <GaugeBar pct={pct} color={nivel.color} />
      {/* Confiabilidad del predictor */}
      <div style={{ marginTop:10, background:"#0a1628", borderRadius:8, padding:"10px 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
          <span style={{ fontSize:9, letterSpacing:2, color:"#475569", fontFamily:"monospace" }}>CONFIABILIDAD DEL PREDICTOR</span>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:16, color:confiabilidad>=80?"#22c55e":confiabilidad>=50?"#f59e0b":"#ef4444" }}>{confiabilidad}%</span>
        </div>
        <div style={{ background:"#1e293b", borderRadius:4, height:5, marginBottom:8 }}>
          <div style={{ width:confiabilidad+"%", height:"100%", background:confiabilidad>=80?"#22c55e":confiabilidad>=50?"#f59e0b":"#ef4444", borderRadius:4, transition:"width 0.6s" }} />
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
          {vars.map((v,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:10, color:v.ok?"#22c55e":"#334155" }}>{v.ok?"✓":"○"}</span>
              <span style={{ fontSize:9, color:v.ok?"#64748b":"#334155", fontFamily:"monospace" }}>{v.label}{!v.clave?" (opcional)":""}</span>
            </div>
          ))}
        </div>
      </div>
      {flags.length > 0 && (
        <div style={{ marginTop:14 }}>
          <div style={{ fontSize:9, letterSpacing:3, color:"#475569", fontFamily:"monospace", marginBottom:8 }}>FACTORES IDENTIFICADOS</div>
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {flags.map((f,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                <div style={{ width:16, height:16, borderRadius:4, background:nivel.color+"22", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                  <span style={{ color:nivel.color, fontSize:9 }}>▸</span>
                </div>
                <div>
                  <span style={{ color:"#cbd5e1", fontSize:10, fontFamily:"monospace", lineHeight:1.5 }}>{f.txt}</span>
                  <span style={{ color:nivel.color, fontSize:9, fontFamily:"monospace", marginLeft:6 }}>(+{f.pts}pts)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {flags.length === 0 && (
        <div style={{ marginTop:12, background:"#22c55e11", border:"1px solid #22c55e33", borderRadius:8, padding:"8px 12px", fontSize:10, color:"#22c55e", fontFamily:"monospace" }}>
          Sin factores de riesgo identificados en los datos disponibles
        </div>
      )}
    </div>
  );
}

function PredictorScreen({ jugador, evalData, onBack, onHome }) {
  const jId = jugador?.id;
  const d2 = (evalData[jId]||{}).p2 || {};
  const d3 = (evalData[jId]||{}).p3 || {};
  const d4 = (evalData[jId]||{}).p4 || {};
  const d5 = (evalData[jId]||{}).p5 || {};

  const varsLCA = [
    { label:"Historial lesiones (P2)", ok:Object.keys(d2).length>0, clave:true },
    { label:"Kinesiologia — YBT / Valgo (P3)", ok:hasAnyKine(d3), clave:true },
    { label:"VALD — CMJ / Nordico (P4)", ok:hasAnyVald(d4), clave:true },
  ];
  const varsIsq = [
    { label:"Historial lesiones (P2)", ok:Object.keys(d2).length>0, clave:true },
    { label:"Kinesiologia — Curl / Hamstring (P3)", ok:hasAnyKine(d3), clave:true },
    { label:"VALD — Nordico (P4)", ok:hasAnyVald(d4), clave:true },
    { label:"USG — Longitud fascicular BF (P5)", ok:hasAnyUSG(d5), clave:true },
    { label:"USG — Ecogenicidad (diferido)", ok:hasUSGEco(d5), clave:false },
  ];
  const varsRF = [
    { label:"Historial lesiones (P2)", ok:Object.keys(d2).length>0, clave:true },
    { label:"Kinesiologia — Ely / Thomas / Lunge (P3)", ok:hasAnyKine(d3), clave:true },
    { label:"VALD — Nordico Invertido (P4)", ok:hasAnyVald(d4), clave:true },
    { label:"USG — Longitud fascicular RF (P5)", ok:hasAnyUSG(d5), clave:true },
    { label:"USG — Ecogenicidad RF (diferido)", ok:hasUSGEco(d5), clave:false },
  ];

  const hayLCA = varsLCA.some(v=>v.ok);
  const hayIsq = varsIsq.some(v=>v.ok);
  const hayRF  = varsRF.some(v=>v.ok);

  const lca   = hayLCA ? predLCA(d2,d3,d4)        : null;
  const isq   = hayIsq ? predIsquio(d2,d3,d4,d5)  : null;
  const recto = hayRF  ? predRecto(d2,d3,d4,d5)   : null;

  const confLCA = confiabilidadFn(varsLCA);
  const confIsq = confiabilidadFn(varsIsq);
  const confRF  = confiabilidadFn(varsRF);
  const maxR = [lca,isq,recto].filter(Boolean).reduce((mx,r)=>r.pct>(mx?.pct||0)?r:mx,null);
  const minConf = Math.min(...[confLCA,confIsq,confRF]);

  return (
    <Wrap onHome={onHome} onBack={onBack} backLabel="Volver" area={null} evaluador="" selfie={null} jugador={jugador}>
      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e293b)", border:"1px solid #334155", borderRadius:16, padding:"16px 20px", marginBottom:20 }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, letterSpacing:4, color:"#3b82f6", marginBottom:4 }}>PREDICTOR DE RIESGO LESIONAL</div>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:30, fontWeight:800, color:"#f1f5f9", lineHeight:1 }}>{jugador?.nombre}</div>
        <div style={{ color:"#64748b", fontFamily:"monospace", fontSize:10, marginTop:4 }}>#{jugador?.dorsal} · {jugador?.posicion} · {jugador?.edad} años</div>
      </div>
      {maxR && (
        <div style={{ background:maxR.nivel.bg, border:"1.5px solid "+maxR.nivel.color, borderRadius:14, padding:"14px 18px", marginBottom:18, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:3, color:"#9a9080", fontFamily:"monospace" }}>RIESGO GLOBAL MAS ELEVADO</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:28, color:maxR.nivel.color, lineHeight:1 }}>{maxR.nivel.icon} {maxR.nivel.label}</div>
            {minConf<100 && <div style={{ fontSize:9, color:"#f59e0b", fontFamily:"monospace", marginTop:4 }}>Calculo parcial — confiabilidad min: {minConf}%</div>}
          </div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:44, color:maxR.nivel.color, lineHeight:1 }}>{maxR.pct}%</div>
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:18 }}>
        {[{l:"BAJO",c:"#22c55e",r:"0-14%"},{l:"MODERADO",c:"#f59e0b",r:"15-34%"},{l:"ALTO",c:"#f97316",r:"35-59%"},{l:"CRITICO",c:"#ef4444",r:"≥60%"}].map(n=>(
          <div key={n.l} style={{ background:"#f7f5f0", border:"1px solid "+n.c+"33", borderRadius:8, padding:"6px 10px", textAlign:"center" }}>
            <div style={{ color:n.c, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:11, letterSpacing:1 }}>{n.l}</div>
            <div style={{ color:"#9a9080", fontFamily:"monospace", fontSize:8, marginTop:1 }}>{n.r}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <RiskCard titulo="LIGAMENTO CRUZADO ANTERIOR (LCA)" icon="🦴" result={lca} vars={varsLCA} confiabilidad={confLCA} />
        <RiskCard titulo="ISQUIOTIBIALES" icon="⚡" result={isq} vars={varsIsq} confiabilidad={confIsq} />
        <RiskCard titulo="RECTO ANTERIOR FEMORAL" icon="🦵" result={recto} vars={varsRF} confiabilidad={confRF} />
      </div>
      <div style={{ marginTop:16, background:"#f7f5f0", borderRadius:10, padding:"8px 14px", border:"1px solid #e0d9d0" }}>
        <div style={{ fontSize:8, color:"#9a9080", fontFamily:"monospace", lineHeight:1.8 }}>
          Timmins MSSE 2016 · Hewett AJSM 2005 · Plisky JOSPT 2006 · Paterno AJSM 2010 · van Dyk BJSM 2017 · Ekstrand BJSM 2023 · Peeler JMST 2007 | Herramienta de apoyo clinico — no reemplaza juicio profesional.
        </div>
      </div>
    </Wrap>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [areaId, setAreaId] = useState(null);
  const [jugador, setJugador] = useState(null);
  const [sesion, setSesion] = useState(null);
  const [jugadores, setJugadores] = useState(JUGADORES_INIT);
  const [evaluaciones, setEvaluaciones] = useState({});
  const [evalData, setEvalData] = useState({});
  const [areaIdPrev, setAreaIdPrev] = useState(null);
  const [msgAcceso, setMsgAcceso] = useState("");
  const [dbReady, setDbReady] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncOk, setSyncOk] = useState(null);

  // ── localStorage ─────────────────────────────────────────────────────────
  function lsSet(j, e, d) {
    try {
      localStorage.setItem("cfc_j", JSON.stringify(j||[]));
      localStorage.setItem("cfc_e", JSON.stringify(e||{}));
      localStorage.setItem("cfc_d", JSON.stringify(d||{}));
    } catch(x) {}
  }
  function lsGet() {
    try {
      return {
        j: JSON.parse(localStorage.getItem("cfc_j")||"[]"),
        e: JSON.parse(localStorage.getItem("cfc_e")||"{}"),
        d: JSON.parse(localStorage.getItem("cfc_d")||"{}"),
      };
    } catch(x) { return {j:[],e:{},d:{}}; }
  }

  // ── Iniciar ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const ls = lsGet();
    if (ls.j.length > 0)              setJugadores(ls.j);
    if (Object.keys(ls.e).length > 0) setEvaluaciones(ls.e);
    if (Object.keys(ls.d).length > 0) setEvalData(ls.d);
    setDbReady(true);
    setSyncing(true);
    fbGetAll().then(fb => {
      if (fb && fb.jugadores.length > 0) {
        setJugadores(fb.jugadores);
        setEvaluaciones(fb.evaluaciones);
        setEvalData(fb.evalData);
        lsSet(fb.jugadores, fb.evaluaciones, fb.evalData);
      }
      setSyncOk(true);
    }).catch(() => setSyncOk(false))
      .finally(() => { setSyncing(false); setTimeout(()=>setSyncOk(null),3000); });
  }, []);

  // ── Guardar jugadores ──────────────────────────────────────────────────────
  async function guardarEnFirebase(j, e, d) {
    lsSet(j, e, d);
    // Solo actualiza lo necesario en Firebase
    try { await fbSetJugadores(j); } catch(x) {}
  }

  // ── Guardar paso de un jugador (solo su documento) ─────────────────────────
  async function fbGuardarPaso(jId, eEntry, dEntry) {
    try { await fbSetPlayer(jId, eEntry, dEntry); } catch(x) {}
  }

  // ── Sincronizar ────────────────────────────────────────────────────────────
  const [debugMsg, setDebugMsg] = useState("");
  async function sincronizar() {
    setSyncing(true); setSyncOk(null); setDebugMsg("");
    try {
      const fb = await fbGetAll();
      if (fb) {
        setJugadores(fb.jugadores);
        setEvaluaciones(fb.evaluaciones);
        setEvalData(fb.evalData);
        lsSet(fb.jugadores, fb.evaluaciones, fb.evalData);
        setDebugMsg(fb.jugadores.length+" jugs · "+Object.keys(fb.evalData).length+" evals");
      } else { setDebugMsg("Sin datos"); }
      setSyncOk(true);
    } catch(err) { setSyncOk(false); setDebugMsg("Error"); }
    setSyncing(false);
    setTimeout(()=>setSyncOk(null),3000);
  }


  const area = AREAS.find(a => a.id === areaId);

  function goHome() { setScreen("home"); setAreaId(null); setJugador(null); setAreaIdPrev(null); }
  function cerrarSesion() { setSesion(null); setScreen("home"); setAreaId(null); setJugador(null); setAreaIdPrev(null); }
  function handleArea(id) {
    if (id === "dashboard") { setScreen("dashboard"); return; }
    if (id === "print-equipo") { setScreen("print-equipo"); return; }
    setAreaId(id);
    if (!sesion) { setScreen("login"); return; }
    setScreen("players");
  }

  function handleGuardarJugador(datos) {
    const nuevo = { ...datos, id: Date.now().toString() };
    const nuevosJ = [...jugadores, nuevo];
    const nuevasE = { ...evaluaciones, [nuevo.id]: { p1: true } };
    setJugadores(nuevosJ);
    setEvaluaciones(nuevasE);
    setJugador(nuevo);
    guardarEnFirebase(nuevosJ, nuevasE, evalData);
    fbSetPlayer(nuevo.id, nuevasE[nuevo.id]||{}, {});
    setTimeout(() => {
      if (areaIdPrev) {
        setAreaId(areaIdPrev);
        setAreaIdPrev(null);
        setScreen("players");
      } else {
        setAreaId(null);
        setScreen("home");
      }
    }, 1200);
    return nuevo;
  }

  function markPasoCompleto(jId, paso) {
    if (!jId) return;
    const nuevas = { ...evaluaciones, [jId]: { ...(evaluaciones[jId]||{}), ["p"+paso]: true } };
    setEvaluaciones(nuevas);
    guardarEnFirebase(jugadores, nuevas, evalData);
  }
  function saveEvalData(jId, paso, data) {
    if (!jId) return;
    const nuevos = { ...evalData, [jId]: { ...(evalData[jId]||{}), ["p"+paso]: data } };
    setEvalData(nuevos);
    guardarEnFirebase(jugadores, evaluaciones, nuevos);
  }

  // Guarda evalData Y evaluaciones — solo el documento de este jugador en Firebase
  function guardarPaso(jId, paso, data) {
    if (!jId) return;
    const nuevosData = { ...evalData, [jId]: { ...(evalData[jId]||{}), ["p"+paso]: data } };
    const nuevasEval = { ...evaluaciones, [jId]: { ...(evaluaciones[jId]||{}), ["p"+paso]: true } };
    setEvalData(nuevosData);
    setEvaluaciones(nuevasEval);
    lsSet(jugadores, nuevasEval, nuevosData);
    // Solo guarda el documento de ESTE jugador — no sobreescribe a los demás
    fbGuardarPaso(jId, nuevasEval[jId], nuevosData[jId]);
  }
  const ctx = { onHome:goHome, onBack:()=>setScreen("players"), area, evaluador:sesion?.evaluador||"", selfie:sesion?.selfie||null, jugador, onGuardarJugador:handleGuardarJugador, markPasoCompleto, saveEvalData, guardarPaso, evalData };


  // Loading screen
  if (!dbReady) {
    return (
      <>
        <link href={FONT_LINK} rel="stylesheet" />
        <div style={{ minHeight:"100vh", background:"#060d1a", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace" }}>
          <img src={ESCUDO} alt="Cancun FC" style={{ height:80, objectFit:"contain", marginBottom:24, opacity:0.8 }} />
          <div style={{ color:"#c8f044", fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:700, letterSpacing:4, marginBottom:8 }}>
            {syncing ? "CARGANDO DATOS..." : syncOk===false ? "SIN CONEXIÓN" : "INICIANDO..."}
          </div>
          <div style={{ color:"#475569", fontFamily:"monospace", fontSize:10, letterSpacing:2 }}>
            {syncing ? "Conectando con Firebase..." : syncOk===false ? "Revisa tu conexión a internet" : ""}
          </div>
          {syncOk===false && (
            <button onClick={()=>setDbReady(true)} style={{ marginTop:20, background:"#1a3a22", border:"none", color:"#c8f044", borderRadius:10, padding:"10px 24px", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:2 }}>
              CONTINUAR SIN CONEXIÓN
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{"input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}input[type=number]{-moz-appearance:textfield;}"}</style>
      {screen==="home"&&<ScreenHome onArea={id=>{setMsgAcceso(""); handleArea(id);}} sesion={sesion} onCerrarSesion={cerrarSesion} jugadores={jugadores} msgAcceso={msgAcceso} sincronizar={sincronizar} syncing={syncing} syncOk={syncOk} debugMsg={debugMsg} />}
      {screen==="login"&&area&&<ScreenLogin area={area} onContinue={(n,f)=>{setSesion({evaluador:n,selfie:f});setScreen("players");}} onHome={goHome} />}
      {screen==="players"&&area&&<ScreenPlayers area={area} evaluador={sesion?.evaluador||""} selfie={sesion?.selfie||null} jugadores={jugadores} evaluaciones={evaluaciones} onSelect={j=>{setJugador(j);setScreen("form");}} onNuevo={()=>{setJugador(null);setAreaIdPrev(areaId);setAreaId("registro");setScreen("form");}} onBack={()=>{sesion?setScreen("home"):setScreen("login");}} onHome={goHome} onPredictor={j=>{setJugador(j);setScreen("predictor");}} sesion={sesion} onPrint={j=>{setJugador(j);setScreen("print");}} />}
      {screen==="form"&&area&&area.paso===1&&<Paso1 ctx={ctx} />}
      {screen==="form"&&area&&area.paso===2&&<Paso2 ctx={ctx} />}
      {screen==="form"&&area&&area.paso===3&&<Paso3 ctx={ctx} esPortero={jugador?.posicion==="Portero"} />}
      {screen==="form"&&area&&area.paso===4&&<Paso4 ctx={ctx} />}
      {screen==="form"&&area&&area.paso===5&&<Paso5 ctx={ctx} />}
      {screen==="predictor"&&<PredictorScreen jugador={jugador} evalData={evalData} onBack={()=>setScreen("players")} onHome={goHome} />}
      {screen==="print"&&jugador&&<InformeImprimible jugador={jugador} evalData={evalData} evaluaciones={evaluaciones} evaluador={sesion?.evaluador||""} modo="individual" onBack={()=>setScreen("players")} />}
      {screen==="print-equipo"&&<InformeEquipoImprimible jugadores={jugadores} evalData={evalData} evaluaciones={evaluaciones} evaluador={sesion?.evaluador||""} onBack={()=>setScreen("home")} />}
      {screen==="dashboard"&&<Dashboard jugadores={jugadores} evaluaciones={evaluaciones} evalData={evalData} evaluador={sesion?.evaluador||""} onHome={goHome} />}
    </>
  );
}