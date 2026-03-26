import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    id: "cursed-spirit",
    title: "Cursed Spirit Generator",
    description: "Type in a fear. Get a full cursed spirit profile.",
    icon: "👁",
    status: "ready",
    path: "/cursed-spirit",
    gradient: "linear-gradient(135deg, #ff0033 0%, #440011 100%)",
  },
  {
    id: "quiz",
    title: "Which Character Are You?",
    description: "Personality quiz across JJK, MHA & One-Punch Man.",
    icon: "⚡",
    status: "coming-soon",
    path: null,
    gradient: "linear-gradient(135deg, #cc0022 0%, #330011 100%)",
  },
  {
    id: "odyssey",
    title: "Odyssey Mode",
    description: "Choose your own adventure through Greek mythology.",
    icon: "⚔️",
    status: "coming-soon",
    path: null,
    gradient: "linear-gradient(135deg, #990022 0%, #220011 100%)",
  },
  {
    id: "forbidden-factory",
    title: "Forbidden Factory",
    description: "Classified case files on creatures from the Factory. Enter at your own risk.",
    icon: "🏚",
    status: "ready",
    path: "/forbidden-factory",
    gradient: "linear-gradient(135deg, #880022 0%, #1a0011 100%)",
  },
];

export default function Hub() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [glitch, setGlitch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#fff",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes glitchShift {
          0% { transform: translate(0); }
          25% { transform: translate(-3px, 2px); }
          50% { transform: translate(3px, -1px); }
          75% { transform: translate(-1px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: #ff003344; }
          50% { border-color: #ff0033aa; }
        }
        .card-hover:hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 8px 40px rgba(255, 0, 51, 0.3) !important;
        }
        .card-hover:hover .card-border {
          opacity: 1 !important;
        }
        .ready-badge {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "2px", background: "rgba(255, 0, 51, 0.15)",
        animation: "scanline 3s linear infinite",
        zIndex: 10, pointerEvents: "none",
      }} />

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255,0,51,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,0,51,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      <div style={{
        position: "fixed", top: "-200px", right: "-200px",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(255,0,51,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "900px", margin: "0 auto", padding: "60px 24px",
        position: "relative", zIndex: 5,
      }}>
        <div style={{
          textAlign: "center", marginBottom: "70px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            display: "inline-block", padding: "6px 20px",
            border: "1px solid #ff003344", borderRadius: "2px",
            fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase",
            color: "#ff0033", marginBottom: "24px",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
            animation: "borderGlow 3s ease-in-out infinite",
          }}>
            ⟨ ENTER IF YOU DARE ⟩
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 12vw, 120px)",
            lineHeight: 0.9, margin: "0 0 8px 0", letterSpacing: "2px",
            color: "#fff", position: "relative",
            animation: glitch ? "glitchShift 0.15s ease" : "none",
          }}>
            <span style={{ color: "#ff0033" }}>[ </span>
            THE CURSED ARCHIVE
            <span style={{ color: "#ff0033" }}> ]</span>
          </h1>

          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "16px",
            color: "#666", letterSpacing: "6px", textTransform: "uppercase",
            margin: 0, fontWeight: 600,
          }}>
            YOU'VE BEEN WARNED
          </p>

          <div style={{
            width: "60px", height: "2px",
            background: "linear-gradient(90deg, transparent, #ff0033, transparent)",
            margin: "30px auto 0",
          }} />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              className="card-hover"
              onClick={() => mod.path && navigate(mod.path)}
              onMouseEnter={() => setHoveredCard(mod.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: "relative", background: "#111", borderRadius: "4px",
                padding: "32px 28px",
                cursor: mod.status === "ready" ? "pointer" : "default",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${0.2 + i * 0.1}s`,
                overflow: "hidden", border: "1px solid #1a1a1a",
              }}
            >
              <div className="card-border" style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: "4px", border: "1px solid #ff003366",
                opacity: hoveredCard === mod.id ? 1 : 0,
                transition: "opacity 0.3s ease", pointerEvents: "none",
              }} />

              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                background: hoveredCard === mod.id ? mod.gradient : "transparent",
                opacity: 0.08, transition: "all 0.5s ease", pointerEvents: "none",
              }} />

              <div style={{
                display: "inline-block", padding: "3px 10px", borderRadius: "2px",
                fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, marginBottom: "16px",
                background: mod.status === "ready" ? "rgba(255,0,51,0.15)" : "rgba(255,255,255,0.05)",
                color: mod.status === "ready" ? "#ff0033" : "#444",
                border: `1px solid ${mod.status === "ready" ? "#ff003344" : "#222"}`,
              }}>
                <span className={mod.status === "ready" ? "ready-badge" : ""}>
                  {mod.status === "ready" ? "▶ START HERE" : "◼ COMING SOON"}
                </span>
              </div>

              <div style={{
                fontSize: "36px", marginBottom: "12px",
                filter: mod.status === "coming-soon" ? "grayscale(0.8) opacity(0.4)" : "none",
              }}>
                {mod.icon}
              </div>

              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px",
                margin: "0 0 8px 0", letterSpacing: "1px",
                color: mod.status === "coming-soon" ? "#444" : "#fff",
              }}>
                {mod.title}
              </h3>

              <p style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "14px",
                color: mod.status === "coming-soon" ? "#333" : "#888",
                margin: 0, lineHeight: 1.5, fontWeight: 400,
              }}>
                {mod.description}
              </p>

              {mod.status === "ready" && (
                <div style={{
                  position: "absolute", top: 0, right: 0, width: "40px", height: "40px",
                  background: "linear-gradient(135deg, transparent 50%, rgba(255,0,51,0.2) 50%)",
                }} />
              )}
            </div>
          ))}
        </div>

        <div style={{
          textAlign: "center", marginTop: "60px",
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease", transitionDelay: "0.8s",
        }}>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
            color: "#333", letterSpacing: "3px", textTransform: "uppercase",
          }}>
            BUILT BY CONNOR & DAD — POWERED BY AI
          </p>
        </div>
      </div>
    </div>
  );
}
