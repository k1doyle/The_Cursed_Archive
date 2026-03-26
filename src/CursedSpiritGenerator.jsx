import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function CursedEnergyVisual({ name, grade, technique }) {
  const seed = hashCode(name + grade + technique);
  const r1 = (seed % 40) + 20;
  const r2 = ((seed >> 4) % 50) + 30;
  const r3 = ((seed >> 8) % 30) + 15;
  const points1 = ((seed % 5) + 5);
  const points2 = ((seed >> 3) % 4) + 3;
  const pulseSpeed = (seed % 3) + 3;

  const gradeColors = {
    "Special Grade": { primary: "#ff0033", secondary: "#ff3366" },
    "Grade 1": { primary: "#ff2200", secondary: "#ff6644" },
    "Grade 2": { primary: "#cc0033", secondary: "#cc4466" },
    "Grade 3": { primary: "#990033", secondary: "#994466" },
    "Grade 4": { primary: "#660022", secondary: "#884455" },
  };
  const colors = gradeColors[grade] || gradeColors["Grade 2"];

  const createPolygonPoints = (cx, cy, radius, numPoints, innerRatio) => {
    const pts = [];
    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (i * Math.PI) / numPoints - Math.PI / 2;
      const r = i % 2 === 0 ? radius : radius * innerRatio;
      pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return pts.join(" ");
  };

  return (
    <div style={{ width: "200px", height: "200px", position: "relative", margin: "0 auto" }}>
      <style>{`
        @keyframes cursedRotate${seed} { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes cursedPulse${seed} { 0%, 100% { opacity: 0.4; transform: scale(0.95); } 50% { opacity: 0.9; transform: scale(1.05); } }
        @keyframes cursedFlicker${seed} { 0%, 90%, 100% { opacity: 1; } 92% { opacity: 0.3; } 94% { opacity: 0.8; } 96% { opacity: 0.2; } }
      `}</style>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", animation: `cursedFlicker${seed} ${pulseSpeed + 2}s ease-in-out infinite` }}>
        <defs>
          <filter id={`glow-${seed}`}><feGaussianBlur stdDeviation="4" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <radialGradient id={`grad-${seed}`}><stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" /><stop offset="100%" stopColor="transparent" /></radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill={`url(#grad-${seed})`} style={{ animation: `cursedPulse${seed} ${pulseSpeed}s ease-in-out infinite` }} />
        <g style={{ transformOrigin: "100px 100px", animation: `cursedRotate${seed} ${pulseSpeed * 4}s linear infinite` }}>
          <polygon points={createPolygonPoints(100, 100, r2 + 20, points1, 0.5)} fill="none" stroke={colors.primary} strokeWidth="1.5" filter={`url(#glow-${seed})`} opacity="0.8" />
        </g>
        <g style={{ transformOrigin: "100px 100px", animation: `cursedRotate${seed} ${pulseSpeed * 6}s linear infinite reverse` }}>
          <polygon points={createPolygonPoints(100, 100, r1 + 10, points2, 0.4)} fill="none" stroke={colors.secondary} strokeWidth="1" filter={`url(#glow-${seed})`} opacity="0.6" />
        </g>
        <circle cx="100" cy="100" r={r3} fill="none" stroke={colors.primary} strokeWidth="2" filter={`url(#glow-${seed})`} style={{ animation: `cursedPulse${seed} ${pulseSpeed * 0.7}s ease-in-out infinite` }} />
        {[...Array(((seed >> 2) % 3) + 2)].map((_, i) => {
          const angle = ((seed + i * 137) % 360) * Math.PI / 180;
          const dist = 30 + (seed >> (i + 1)) % 40;
          return <circle key={i} cx={100 + Math.cos(angle) * dist} cy={100 + Math.sin(angle) * dist} r={3 + (i * 2)} fill={colors.primary} opacity="0.6" filter={`url(#glow-${seed})`} style={{ animation: `cursedPulse${seed} ${pulseSpeed + i}s ease-in-out infinite` }} />;
        })}
        <text x="100" y="105" textAnchor="middle" dominantBaseline="middle" fill={colors.primary} fontSize="28" fontFamily="'Bebas Neue', sans-serif" filter={`url(#glow-${seed})`} letterSpacing="2" opacity="0.9">
          {grade === "Special Grade" ? "特" : grade === "Grade 1" ? "壱" : grade === "Grade 2" ? "弐" : grade === "Grade 3" ? "参" : "肆"}
        </text>
      </svg>
    </div>
  );
}

function SpiritCard({ spirit, onBack }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { setTimeout(() => setRevealed(true), 100); }, []);

  const gradeColor = {
    "Special Grade": "#ff0033", "Grade 1": "#ff2200", "Grade 2": "#cc0033",
    "Grade 3": "#990033", "Grade 4": "#660022",
  }[spirit.grade] || "#ff0033";

  return (
    <div style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{ background: "#111", border: `1px solid ${gradeColor}33`, borderRadius: "4px", padding: "36px 32px", maxWidth: "500px", margin: "0 auto", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${gradeColor}, transparent)` }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse at top, ${gradeColor}08 0%, transparent 60%)`, pointerEvents: "none" }} />

        <div style={{ display: "inline-block", padding: "4px 12px", border: `1px solid ${gradeColor}44`, borderRadius: "2px", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: gradeColor, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, marginBottom: "24px" }}>
          ◉ CLASSIFIED — {spirit.grade.toUpperCase()}
        </div>

        <CursedEnergyVisual name={spirit.name} grade={spirit.grade} technique={spirit.cursedTechnique} />

        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "42px", color: "#fff", textAlign: "center", margin: "20px 0 4px", letterSpacing: "2px" }}>{spirit.name}</h2>
        <p style={{ textAlign: "center", fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", color: "#555", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 28px" }}>Born from the fear of {spirit.fear}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { label: "GRADE", value: spirit.grade },
            { label: "CURSED TECHNIQUE", value: spirit.cursedTechnique },
            { label: "DOMAIN EXPANSION", value: spirit.domainExpansion },
          ].map((stat, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${gradeColor}44`, paddingLeft: "16px", opacity: revealed ? 1 : 0, transform: revealed ? "translateX(0)" : "translateX(-10px)", transition: `all 0.4s ease ${0.3 + i * 0.15}s` }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "10px", letterSpacing: "3px", color: gradeColor, fontWeight: 700, marginBottom: "4px" }}>{stat.label}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", color: "#ccc", fontWeight: 600 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "32px", justifyContent: "center" }}>
          <button onClick={onBack} style={{ background: "linear-gradient(135deg, #ff0033 0%, #990022 100%)", border: "none", borderRadius: "2px", padding: "14px 32px", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: "20px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(255,0,51,0.3)" }}
            onMouseOver={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 30px rgba(255,0,51,0.5)"; }}
            onMouseOut={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 20px rgba(255,0,51,0.3)"; }}
          >← GENERATE ANOTHER</button>
        </div>
      </div>
    </div>
  );
}

export default function CursedSpiritGenerator() {
  const [fear, setFear] = useState("");
  const [loading, setLoading] = useState(false);
  const [spirit, setSpirit] = useState(null);
  const [error, setError] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const navigate = useNavigate();

  const loadingMessages = [
    "Channeling cursed energy...", "Manifesting the spirit...",
    "Binding the technique...", "Registering the grade...", "Sealing the domain...",
  ];

  useEffect(() => {
    if (!loading) return;
    let i = 0;
    setLoadingText(loadingMessages[0]);
    const interval = setInterval(() => { i = (i + 1) % loadingMessages.length; setLoadingText(loadingMessages[i]); }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  const generateSpirit = async () => {
    if (!fear.trim()) return;
    setLoading(true);
    setError(null);
    setSpirit(null);

    try {
      const response = await fetch("/api/generate-spirit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fear: fear.trim() }),
      });

      if (!response.ok) throw new Error("API error");
      const parsed = await response.json();
      setSpirit(parsed);
    } catch (err) {
      setError("The cursed energy was unstable. Try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes borderGlow { 0%, 100% { border-color: #ff003322; box-shadow: 0 0 0 rgba(255,0,51,0); } 50% { border-color: #ff003388; box-shadow: 0 0 20px rgba(255,0,51,0.15); } }
        @keyframes loadingPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        input::placeholder { color: #333; }
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "rgba(255,0,51,0.15)", animation: "scanline 3s linear infinite", zIndex: 10, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "linear-gradient(rgba(255,0,51,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 24px", position: "relative", zIndex: 5 }}>
        <div style={{ marginBottom: "40px" }}>
          <span onClick={() => navigate("/")} style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", color: "#ff0033", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderBottom: "1px solid #ff003344", paddingBottom: "2px" }}>
            ← BACK TO THE CURSED ARCHIVE
          </span>
        </div>

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>👁</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 8vw, 56px)", margin: "0 0 8px", letterSpacing: "2px", lineHeight: 1 }}>
            CURSED SPIRIT<br /><span style={{ color: "#ff0033" }}>GENERATOR</span>
          </h1>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", color: "#555", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600 }}>
            Enter a fear. Manifest a spirit.
          </p>
        </div>

        {!spirit && (
          <div style={{ maxWidth: "440px", margin: "0 auto" }}>
            <div style={{ position: "relative", marginBottom: "16px" }}>
              <input type="text" value={fear} onChange={e => setFear(e.target.value)} onKeyDown={e => e.key === "Enter" && !loading && generateSpirit()} placeholder="Type a fear... (e.g. drowning, being forgotten, the dark)" disabled={loading}
                style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: "2px", padding: "16px 20px", color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 600, letterSpacing: "1px", outline: "none", boxSizing: "border-box", transition: "border-color 0.3s ease", animation: fear ? "none" : "borderGlow 3s ease-in-out infinite" }}
                onFocus={e => e.target.style.borderColor = "#ff003366"} onBlur={e => e.target.style.borderColor = "#222"}
              />
            </div>
            <button onClick={generateSpirit} disabled={loading || !fear.trim()}
              style={{ width: "100%", padding: "14px", background: loading ? "#1a0a0f" : !fear.trim() ? "#111" : "linear-gradient(135deg, #ff0033 0%, #990022 100%)", border: loading ? "1px solid #ff003333" : "none", borderRadius: "2px", color: !fear.trim() ? "#333" : "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "3px", cursor: loading || !fear.trim() ? "default" : "pointer", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}>
              {loading ? <span style={{ animation: "loadingPulse 1.5s ease-in-out infinite" }}>{loadingText}</span> : "MANIFEST SPIRIT"}
            </button>
            {error && <p style={{ textAlign: "center", color: "#ff0033", fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", marginTop: "16px" }}>{error}</p>}
          </div>
        )}

        {spirit && <SpiritCard spirit={spirit} onBack={() => { setSpirit(null); setFear(""); }} />}

        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", color: "#222", letterSpacing: "3px", textTransform: "uppercase" }}>THE CURSED ARCHIVE — BUILT BY CONNOR & DAD</p>
        </div>
      </div>
    </div>
  );
}
