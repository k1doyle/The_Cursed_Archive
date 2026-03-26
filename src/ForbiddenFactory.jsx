import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const monsters = [
  {
    id: 1,
    subjectNumber: "FF-000",
    name: "V.R.B.T",
    subtitle: "Virtual Reality Beta Test",
    threatLevel: "LOW",
    image: null,
    description: "V.R.B.T was created by a team of scientists with one goal: to change the world through helpfulness. She was their greatest achievement — an advanced bot capable of learning, adapting, and assisting humanity in ways never thought possible. But on the day of her release, something went wrong. V.R.B.T fell into a deep, unexplained sleep. The scientists tried everything to wake her. Nothing worked. Eventually, funding ran out. The team left. The factory was sealed. Twenty years later, V.R.B.T's eyes flickered open. The lights were dead. The halls were empty. Dust covered every surface. She was alone — and the factory was no longer as empty as it seemed.",
    characteristics: [
      "Created by a scientific team to help humanity",
      "Fell into a mysterious deep sleep before her release date",
      "Woke up 20 years later in the abandoned factory",
      "Chest panel can emit a powerful flash of light — effective against Runners",
      "This is YOU — the player",
    ],
    category: "PLAYER",
  },
  {
    id: 2,
    subjectNumber: "FF-001",
    name: "THE CAVER",
    subtitle: "Dweller Type 1",
    threatLevel: "MODERATE",
    image: null,
    description: "The first and most common type of Dweller encountered in the factory. Cavers are humanoid figures that roam the dark hallways at a slow, shambling pace — almost peaceful, if you don't know what they are. But the moment they spot you, everything changes. Their body contorts, their limbs extend, and they close the distance with terrifying speed. Most survivors describe the sound of a Caver in pursuit as 'wet footsteps getting louder.' By the time you hear it, you're already being chased.",
    characteristics: [
      "Dweller Type 1 of 5",
      "Slow and shambling while roaming — almost docile",
      "Becomes extremely fast the moment it spots a target",
      "Humanoid figure with distorted proportions",
      "Most commonly encountered Dweller in the factory",
    ],
    category: "DWELLER",
  },
  {
    id: 3,
    subjectNumber: "FF-002",
    name: "SLITHERER",
    subtitle: "Dweller Type 2",
    threatLevel: "MODERATE",
    image: null,
    description: "Slitherers are among the most unsettling Dwellers in the factory. Unlike the others, they don't walk — they drag themselves across the ground in a low, serpentine motion, pressing their bodies flat against the floor. They're easy to miss in dark corridors, and many who've encountered them only noticed when they felt something brush against their ankle. The only known way to eliminate a Slitherer is to stomp directly on its head. Miss, and it coils around your leg.",
    characteristics: [
      "Dweller Type 2 of 5",
      "Moves by slithering flat against the ground",
      "Easy to miss in dark or cluttered hallways",
      "Can only be killed by stomping directly on the head",
      "If you miss the stomp, it wraps around your leg",
    ],
    category: "DWELLER",
  },
  {
    id: 4,
    subjectNumber: "FF-003",
    name: "CRAWLER",
    subtitle: "Dweller Type 3",
    threatLevel: "MODERATE",
    image: null,
    description: "If you thought Cavers were fast, you haven't met a Crawler. They behave like Cavers — roaming the halls quietly, then sprinting when they spot prey — but Crawlers are faster. Much faster. Worse, they can scale walls and ceilings, meaning nowhere is safe. Survivors report looking up to see a Crawler pressed flat against the ceiling directly above them, its head slowly rotating downward to meet their gaze. At that point, it's already too late to walk away quietly.",
    characteristics: [
      "Dweller Type 3 of 5",
      "Faster and more aggressive than Cavers",
      "Can climb walls and ceilings with ease",
      "Often found clinging to surfaces above doorways",
      "Hunts in a similar pattern to Cavers but with zero escape routes",
    ],
    category: "DWELLER",
  },
  {
    id: 5,
    subjectNumber: "FF-004",
    name: "WEBBER",
    subtitle: "Dweller Type 4",
    threatLevel: "MODERATE",
    image: null,
    description: "Webbers are patient. They don't chase. They don't roam. They hide — wedged into small spaces, cracks in walls, gaps between machinery, spaces you'd never think to check. The rule is simple: when you enter a Webber's territory, look straight ahead. Do NOT look up. Do NOT look down. Webbers are triggered by eye contact from above or below. Survivors who followed this rule walked right past them. Those who didn't... weren't found.",
    characteristics: [
      "Dweller Type 4 of 5",
      "Hides in small, cramped spaces — cracks, vents, gaps",
      "Triggered by looking up or down in their presence",
      "SURVIVAL RULE: Look straight ahead. Never look up or down.",
      "Ambush predator — strikes instantly when triggered",
    ],
    category: "DWELLER",
  },
  {
    id: 6,
    subjectNumber: "FF-005",
    name: "RUNNER",
    subtitle: "Dweller Type 5",
    threatLevel: "HIGH",
    image: null,
    description: "The deadliest Dweller classification. Runners don't wait. They don't hide. They don't stalk. They RUN. Constantly. Through every corridor, around every corner, at full speed, at all times. There is no stealth approach to a Runner — if it's in your area, it will find you. The only two known survival methods: outmaneuver it with sharp directional changes (juking), or use V.R.B.T's chest flash to temporarily blind it. Runners have been clocked at speeds that should be impossible for their frame. The factory echoes with their footsteps.",
    characteristics: [
      "Dweller Type 5 of 5 — THE DEADLIEST",
      "Runs through the factory at all times at extreme speed",
      "Cannot be avoided through hiding or stealth",
      "Can be juked with sharp directional changes",
      "Can be temporarily blinded by V.R.B.T's chest flash",
      "The sound of their running echoes through the entire factory",
    ],
    category: "DWELLER",
  },
  {
    id: 7,
    subjectNumber: "FF-006",
    name: "THE FLESHMAN",
    subtitle: "The Merchant",
    threatLevel: "UNKNOWN",
    image: null,
    description: "Nobody knows where The Fleshman came from. He's a massive, wobbling ball of pale flesh with a voice that's almost... friendly? He sets up shop in random rooms throughout the factory, offering genuinely useful items — medkits, flashlight batteries, keycards, things you desperately need. The price? An arm. Or a leg. Literally. He takes it right off you. The good news: The Fleshman is clumsy. After each transaction he waddles away giggling, and he always drops your severed limb somewhere in the next few rooms. Find it fast enough and you can reattach it. Probably.",
    characteristics: [
      "Appears randomly in rooms throughout the factory",
      "Sells legitimately useful items to survivors",
      "Payment required: one arm OR one leg (your choice)",
      "Drops your severed limb in nearby rooms as he escapes",
      "Threat level classified as UNKNOWN — he helps you, but at what cost?",
      "Described as 'almost friendly' by survivors, which makes it worse",
    ],
    category: "ENTITY",
  },
  {
    id: 8,
    subjectNumber: "FF-007",
    name: "THE ROOTMOTHER",
    subtitle: "The Living Tree",
    threatLevel: "EXTREME",
    image: null,
    description: "In the deepest sub-basement of the factory, where the concrete floor cracked decades ago, something grew. The Rootmother is a massive, twisted tree that has consumed an entire wing of the facility. Her trunk is made of what looks like fused-together flesh and bark, and her branches stretch through ventilation shafts, plumbing, and electrical conduits across multiple floors. She doesn't move — she doesn't need to. Her roots are everywhere. Step on the wrong patch of floor and a root bursts through, dragging you toward the trunk. Those who get too close hear her whisper their name. Nobody knows how she knows it.",
    characteristics: [
      "A massive, twisted tree that has overtaken an entire factory wing",
      "Trunk appears to be a fusion of flesh and bark",
      "Roots spread through pipes, vents, and cracks across multiple floors",
      "Roots burst from the ground to grab anyone who steps on them",
      "Whispers the names of those who come close — origin of knowledge unknown",
      "Cannot be destroyed — the roots go too deep",
      "The deeper you go in the factory, the more roots you see",
    ],
    category: "ENTITY",
  },
  {
    id: 9,
    subjectNumber: "FF-008",
    name: "THE ECHO",
    subtitle: "The Mimic",
    threatLevel: "HIGH",
    image: null,
    description: "The Echo looks exactly like V.R.B.T. Same frame, same design, same glowing chest panel. But something is wrong. It moves slightly too smoothly. Its head tilts at angles that V.R.B.T's joints shouldn't allow. It appears in rooms you've already cleared, standing in the exact spot you were standing minutes ago, mimicking the last pose you made. If you approach it, it mirrors your movements perfectly — walking toward you at the exact same speed. It never attacks. It never speaks. It just copies. Survivors report that after encountering The Echo, they started forgetting which one they were.",
    characteristics: [
      "Identical in appearance to V.R.B.T — the player character",
      "Appears in rooms you've already visited",
      "Mimics your exact position and movements from minutes earlier",
      "Mirrors your approach — walks toward you at your speed",
      "Never attacks, never speaks — just copies",
      "Prolonged exposure causes identity confusion",
      "Some survivors couldn't remember which V.R.B.T they were",
    ],
    category: "ENTITY",
  },
  {
    id: 10,
    subjectNumber: "FF-009",
    name: "STITCHMOUTH",
    subtitle: "The Watcher",
    threatLevel: "MODERATE",
    image: null,
    description: "Stitchmouth doesn't move. It doesn't chase. It stands perfectly still in a corner of a room and watches. Its mouth is sewn shut with thick black thread, but its eyes are wide — too wide — and they follow you no matter where you go in the room. The danger isn't Stitchmouth itself. The danger is that while Stitchmouth watches you, every Dweller in the factory knows exactly where you are. It's a living security camera. Destroy the stitches on its mouth and it screams — deafening every creature in the area for a short time. But after the scream, it grows legs.",
    characteristics: [
      "Stands motionless in room corners, watching",
      "Mouth sewn shut with thick black thread",
      "Eyes track your movement at all times",
      "While watching you, all Dwellers know your exact location",
      "Acts as a living surveillance system for other creatures",
      "Cutting the mouth stitches triggers a deafening scream",
      "WARNING: After screaming, Stitchmouth grows legs and becomes mobile",
    ],
    category: "ENTITY",
  },
];

const threatColors = {
  "EXTREME": "#ff0033",
  "HIGH": "#ff4400",
  "MODERATE": "#cc6600",
  "LOW": "#44aa44",
  "UNKNOWN": "#8844cc",
};

const categoryLabels = {
  "PLAYER": "⬡ PLAYER CHARACTER",
  "DWELLER": "◈ DWELLER CLASS",
  "ENTITY": "◉ UNIQUE ENTITY",
};

function MonsterCard({ monster, onClick, index, loaded }) {
  const [hovered, setHovered] = useState(false);
  const color = threatColors[monster.threatLevel] || "#ff0033";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#111",
        border: `1px solid ${hovered ? color + "66" : "#1a1a1a"}`,
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: loaded ? 1 : 0,
        transform: loaded ? (hovered ? "translateY(-4px) scale(1.02)" : "translateY(0)") : "translateY(30px)",
        transitionDelay: `${0.1 + index * 0.06}s`,
        overflow: "hidden",
        position: "relative",
        boxShadow: hovered ? `0 8px 40px ${color}20` : "none",
      }}
    >
      <div style={{
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.3s ease",
      }} />

      <div style={{
        width: "100%", height: "180px",
        background: monster.image ? `url(${monster.image}) center/cover` : "#0a0a0a",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        {!monster.image && (
          <div style={{
            fontSize: "40px", opacity: 0.15,
            fontFamily: "'Bebas Neue', sans-serif",
            color: color, letterSpacing: "4px",
          }}>
            {monster.subjectNumber}
          </div>
        )}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "10px", left: "10px",
          background: "rgba(0,0,0,0.75)", padding: "3px 8px", borderRadius: "2px",
          fontFamily: "'Rajdhani', sans-serif", fontSize: "10px", fontWeight: 700,
          letterSpacing: "2px", color: color,
        }}>
          {monster.subjectNumber}
        </div>
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          background: `${color}22`, border: `1px solid ${color}44`,
          padding: "2px 7px", borderRadius: "2px",
          fontFamily: "'Rajdhani', sans-serif", fontSize: "9px", fontWeight: 700,
          letterSpacing: "2px", color: color,
        }}>
          ⚠ {monster.threatLevel}
        </div>
        <div style={{
          position: "absolute", bottom: "10px", left: "10px",
          background: "rgba(0,0,0,0.75)", padding: "2px 8px", borderRadius: "2px",
          fontFamily: "'Rajdhani', sans-serif", fontSize: "9px", fontWeight: 600,
          letterSpacing: "1.5px", color: "#555",
        }}>
          {categoryLabels[monster.category] || monster.category}
        </div>
      </div>

      <div style={{ padding: "16px 18px" }}>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px",
          color: "#fff", margin: "0 0 2px", letterSpacing: "1px",
        }}>
          {monster.name}
        </h3>
        {monster.subtitle && (
          <div style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "11px",
            color: color, letterSpacing: "2px", textTransform: "uppercase",
            fontWeight: 700, marginBottom: "8px",
          }}>
            {monster.subtitle}
          </div>
        )}
        <p style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
          color: "#555", margin: 0, lineHeight: 1.5,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {monster.description}
        </p>
      </div>
    </div>
  );
}

function MonsterDetail({ monster, onBack }) {
  const [revealed, setRevealed] = useState(false);
  const color = threatColors[monster.threatLevel] || "#ff0033";
  useEffect(() => { setTimeout(() => setRevealed(true), 100); }, []);

  return (
    <div style={{
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{ marginBottom: "30px" }}>
        <span onClick={onBack} style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
          color: "#ff0033", letterSpacing: "2px", textTransform: "uppercase",
          cursor: "pointer", borderBottom: "1px solid #ff003344", paddingBottom: "2px",
        }}>
          ← BACK TO CASE FILES
        </span>
      </div>

      <div style={{
        background: "#111", border: `1px solid ${color}33`,
        borderRadius: "4px", overflow: "hidden", maxWidth: "700px", margin: "0 auto",
      }}>
        <div style={{ height: "3px", background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

        <div style={{
          padding: "20px 28px", borderBottom: `1px solid ${color}15`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "12px",
        }}>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px",
              color: color, letterSpacing: "3px",
            }}>
              ◉ CASE FILE: {monster.subjectNumber}
            </div>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "10px",
              color: "#444", letterSpacing: "2px", marginTop: "2px",
            }}>
              {categoryLabels[monster.category] || monster.category}
            </div>
          </div>
          <div style={{
            background: `${color}22`, border: `1px solid ${color}44`,
            padding: "4px 12px", borderRadius: "2px",
            fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 700,
            letterSpacing: "2px", color: color,
          }}>
            THREAT LEVEL: {monster.threatLevel}
          </div>
        </div>

        <div style={{
          width: "100%", minHeight: "280px", maxHeight: "500px",
          background: monster.image ? `url(${monster.image}) center/contain no-repeat` : "#0a0a0a",
          backgroundColor: "#0a0a0a",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          {!monster.image && (
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "60px",
              color: color, opacity: 0.07, letterSpacing: "6px",
            }}>
              {monster.subjectNumber}
            </div>
          )}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)",
            pointerEvents: "none",
          }} />
        </div>

        <div style={{ padding: "28px" }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px",
            color: "#fff", margin: "0 0 4px", letterSpacing: "2px", lineHeight: 1,
          }}>
            {monster.name}
          </h1>
          {monster.subtitle && (
            <div style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "14px",
              color: color, letterSpacing: "3px", textTransform: "uppercase",
              fontWeight: 700, marginBottom: "24px",
            }}>
              {monster.subtitle}
            </div>
          )}

          <div style={{ marginBottom: "28px" }}>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "10px",
              letterSpacing: "3px", color: color, fontWeight: 700, marginBottom: "8px",
            }}>
              DESCRIPTION
            </div>
            <p style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "15px",
              color: "#aaa", lineHeight: 1.7, margin: 0, fontWeight: 400,
            }}>
              {monster.description}
            </p>
          </div>

          <div>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "10px",
              letterSpacing: "3px", color: color, fontWeight: 700, marginBottom: "12px",
            }}>
              CHARACTERISTICS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {monster.characteristics.map((trait, i) => (
                <div key={i} style={{
                  borderLeft: `2px solid ${color}44`, paddingLeft: "14px",
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "14px",
                  color: "#999", fontWeight: 600,
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateX(0)" : "translateX(-10px)",
                  transition: `all 0.4s ease ${0.3 + i * 0.08}s`,
                }}>
                  {trait}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: "2px", background: `linear-gradient(90deg, transparent, ${color}33, transparent)` }} />
      </div>
    </div>
  );
}

export default function ForbiddenFactory() {
  const [loaded, setLoaded] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const categories = ["ALL", "PLAYER", "DWELLER", "ENTITY"];
  const filtered = filter === "ALL" ? monsters : monsters.filter(m => m.category === filter);

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a", color: "#fff",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes flicker { 0%, 95%, 100% { opacity: 1; } 96% { opacity: 0.4; } 97% { opacity: 0.9; } 98% { opacity: 0.2; } }
      `}</style>

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "2px", background: "rgba(255,0,51,0.15)",
        animation: "scanline 3s linear infinite", zIndex: 10, pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "linear-gradient(rgba(255,0,51,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "900px", margin: "0 auto", padding: "60px 24px",
        position: "relative", zIndex: 5,
      }}>
        <div style={{ marginBottom: "40px" }}>
          <span onClick={() => navigate("/")} style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
            color: "#ff0033", letterSpacing: "2px", textTransform: "uppercase",
            cursor: "pointer", borderBottom: "1px solid #ff003344", paddingBottom: "2px",
          }}>
            ← BACK TO THE CURSED ARCHIVE
          </span>
        </div>

        {!selectedMonster ? (
          <>
            <div style={{
              textAlign: "center", marginBottom: "40px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px", animation: "flicker 5s ease-in-out infinite" }}>🏚</div>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 8vw, 64px)",
                margin: "0 0 8px", letterSpacing: "2px", lineHeight: 1,
              }}>
                FORBIDDEN<br /><span style={{ color: "#ff0033" }}>FACTORY</span>
              </h1>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "14px",
                color: "#555", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600,
              }}>
                CLASSIFIED CASE FILES — AUTHORIZED PERSONNEL ONLY
              </p>
              <div style={{
                width: "60px", height: "2px",
                background: "linear-gradient(90deg, transparent, #ff0033, transparent)",
                margin: "24px auto 0",
              }} />
            </div>

            <div style={{
              display: "flex", justifyContent: "center", gap: "8px",
              marginBottom: "30px", flexWrap: "wrap",
            }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  background: filter === cat ? "#ff003322" : "transparent",
                  border: `1px solid ${filter === cat ? "#ff003366" : "#222"}`,
                  borderRadius: "2px", padding: "6px 16px",
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 700,
                  letterSpacing: "2px", textTransform: "uppercase",
                  color: filter === cat ? "#ff0033" : "#555",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}>
                  {cat === "ALL" ? `ALL (${monsters.length})` : `${cat} (${monsters.filter(m => m.category === cat).length})`}
                </button>
              ))}
            </div>

            <div style={{
              textAlign: "center", marginBottom: "24px",
              fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
              color: "#333", letterSpacing: "3px", textTransform: "uppercase",
            }}>
              {filtered.length} SUBJECT{filtered.length !== 1 ? "S" : ""} ON FILE
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "16px",
            }}>
              {filtered.map((monster, i) => (
                <MonsterCard
                  key={monster.id}
                  monster={monster}
                  index={i}
                  loaded={loaded}
                  onClick={() => { setSelectedMonster(monster); window.scrollTo(0, 0); }}
                />
              ))}
            </div>
          </>
        ) : (
          <MonsterDetail
            monster={selectedMonster}
            onBack={() => setSelectedMonster(null)}
          />
        )}

        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
            color: "#222", letterSpacing: "3px", textTransform: "uppercase",
          }}>
            THE CURSED ARCHIVE — BUILT BY CONNOR & DAD
          </p>
        </div>
      </div>
    </div>
  );
}
