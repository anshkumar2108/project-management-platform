'use client';
import { useState } from "react";
interface Task {
  id: number;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  assignee: string;
  tag: string;
  due: string;
}
interface Project {
  name: string;
  progress: number;
  color: string;
  members: number;
  tasks: number;
}

const COLORS = {
  navy: "#0A0F1E",
  blue: "#2563EB",
  blueLight: "#3B82F6",
  blueSoft: "#EFF6FF",
  blueMid: "#DBEAFE",
  slate: "#64748B",
  slateLight: "#F1F5F9",
  white: "#FFFFFF",
  green: "#10B981",
  greenSoft: "#ECFDF5",
  amber: "#F59E0B",
  amberSoft: "#FFFBEB",
  red: "#EF4444",
  purple: "#8B5CF6",
  purpleSoft: "#F5F3FF",
  border: "#E2E8F0",
  text: "#0F172A",
  textMuted: "#64748B",
};

const tasks = [
  { id: 1, title: "Design system tokens update", status: "in-progress", priority: "high", assignee: "AS", tag: "Design", due: "Jul 5" },
  { id: 2, title: "API rate limiting implementation", status: "todo", priority: "medium", assignee: "MK", tag: "Backend", due: "Jul 8" },
  { id: 3, title: "Onboarding flow v2", status: "done", priority: "low", assignee: "PL", tag: "Product", due: "Jul 3" },
  { id: 4, title: "Performance audit — dashboard", status: "in-progress", priority: "high", assignee: "JR", tag: "Eng", due: "Jul 6" },
  { id: 5, title: "Write Q3 launch copy", status: "todo", priority: "medium", assignee: "CE", tag: "Marketing", due: "Jul 10" },
];

const projects = [
  { name: "Mobile App v3", progress: 72, color: COLORS.blue, members: 6, tasks: 34 },
  { name: "Design System", progress: 91, color: COLORS.green, members: 3, tasks: 18 },
  { name: "API Gateway", progress: 45, color: COLORS.purple, members: 4, tasks: 27 },
];

const stats = [
  { label: "Tasks completed", value: "2,847", delta: "+12%", positive: true },
  { label: "Active projects", value: "24", delta: "+3", positive: true },
  { label: "Team members", value: "48", delta: "+5", positive: true },
  { label: "On-time delivery", value: "94%", delta: "+2%", positive: true },
];

const features = [
  {
    icon: "⚡",
    title: "Real-time collaboration",
    desc: "Work together without friction. Changes sync instantly across your team — no refreshing, no conflicts.",
    color: COLORS.blue,
    bg: COLORS.blueSoft,
  },
  {
    icon: "🗂️",
    title: "Flexible project views",
    desc: "Switch between Board, List, Timeline, and Table. Your work, your way — every view stays in sync.",
    color: COLORS.purple,
    bg: COLORS.purpleSoft,
  },
  {
    icon: "📊",
    title: "Progress at a glance",
    desc: "Visual dashboards surface blockers before they become problems. Know exactly where every project stands.",
    color: COLORS.green,
    bg: COLORS.greenSoft,
  },
  {
    icon: "🔔",
    title: "Smart notifications",
    desc: "Get alerted on what matters. ProjectFlow learns your patterns and surfaces the right updates at the right time.",
    color: COLORS.amber,
    bg: COLORS.amberSoft,
  },
  {
    icon: "🔗",
    title: "Deep integrations",
    desc: "Connect GitHub, Slack, Figma, Notion, and 40+ tools. Your workflow, unified in one place.",
    color: "#EC4899",
    bg: "#FDF2F8",
  },
  {
    icon: "🔒",
    title: "Enterprise-grade security",
    desc: "SOC 2 Type II, SSO, audit logs, and role-based access. Security built in, not bolted on.",
    color: "#0891B2",
    bg: "#ECFEFF",
  },
];

const testimonials = [
  {
    quote: "ProjectFlow cut our planning meetings in half. Everyone knows what's happening without asking.",
    name: "Sarah Chen",
    role: "Engineering Lead, Vercel",
    initials: "SC",
    color: COLORS.blue,
  },
  {
    quote: "The best Linear alternative for teams that also need docs and wikis. We moved our entire org in two weeks.",
    name: "Marcus Reed",
    role: "CTO, Raycast",
    initials: "MR",
    color: COLORS.purple,
  },
  {
    quote: "Finally, a PM tool our engineers actually enjoy using. Adoption was 100% — no mandate needed.",
    name: "Priya Lal",
    role: "Head of Product, Loom",
    initials: "PL",
    color: COLORS.green,
  },
];

function Avatar({ initials, color, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "22",
      border: `2px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function PriorityDot({ priority }) {
  const map = { high: COLORS.red, medium: COLORS.amber, low: COLORS.green };
  return <span style={{ width: 7, height: 7, borderRadius: "50%", background: map[priority], display: "inline-block", flexShrink: 0 }} />;
}

function StatusBadge({ status }) {
  const map = {
    "todo": { bg: COLORS.slateLight, color: COLORS.slate, label: "Todo" },
    "in-progress": { bg: COLORS.blueMid, color: COLORS.blue, label: "In Progress" },
    "done": { bg: COLORS.greenSoft, color: COLORS.green, label: "Done" },
  };
  const s = map[status];
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: 10, fontWeight: 600,
      padding: "2px 7px", borderRadius: 20,
      letterSpacing: "0.02em", whiteSpace: "nowrap",
    }}>
      {s.label}
    </span>
  );
}

function CircleProgress({ pct, color, size = 44 }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color + "22"} strokeWidth={5} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={5}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        fontSize={size * 0.22} fontWeight={700} fill={color}>
        {pct}%
      </text>
    </svg>
  );
}

function DashboardMockup() {
  return (
    <div style={{
      background: COLORS.white,
      borderRadius: 18,
      boxShadow: "0 32px 80px rgba(10,15,30,0.18), 0 4px 16px rgba(10,15,30,0.08)",
      overflow: "hidden",
      border: `1px solid ${COLORS.border}`,
      width: "100%",
      maxWidth: 540,
    }}>
      {/* Top bar */}
      <div style={{
        background: COLORS.navy, padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: "#1E2740", borderRadius: 5,
          padding: "3px 10px", fontSize: 10, color: "#7C8DB5",
          fontFamily: "monospace",
        }}>
          app.projectflow.io/workspace/acme
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["AS","MK","PL"].map(i => (
            <div key={i} style={{
              width: 20, height: 20, borderRadius: "50%",
              background: COLORS.blue + "44", border: `1.5px solid ${COLORS.blue}`,
              fontSize: 7, fontWeight: 700, color: COLORS.blue,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{i}</div>
          ))}
        </div>
      </div>

      {/* Sidebar + content */}
      <div style={{ display: "flex", height: 360 }}>
        {/* Sidebar */}
        <div style={{
          width: 140, background: "#F8FAFC",
          borderRight: `1px solid ${COLORS.border}`,
          padding: "12px 0", display: "flex", flexDirection: "column", gap: 1,
          flexShrink: 0,
        }}>
          <div style={{ padding: "0 12px 8px", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: COLORS.blue, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: "#fff", fontWeight: 800,
              }}>P</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.text }}>ProjectFlow</span>
            </div>
          </div>
          {[
            ["🏠","Overview", true],
            ["📋","My Tasks", false],
            ["📁","Projects", false],
            ["📊","Analytics", false],
            ["👥","Team", false],
            ["⚙️","Settings", false],
          ].map(([icon, label, active]) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "6px 12px", fontSize: 11, fontWeight: active ? 600 : 400,
              color: active ? COLORS.blue : COLORS.slate,
              background: active ? COLORS.blueSoft : "transparent",
              borderLeft: active ? `2px solid ${COLORS.blue}` : "2px solid transparent",
              cursor: "default",
            }}>
              <span style={{ fontSize: 12 }}>{icon}</span>{label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "14px 16px", overflowY: "auto", background: COLORS.white }}>
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>Good morning, Alex 👋</div>
              <div style={{ fontSize: 10, color: COLORS.slate }}>Thursday, July 2, 2026 · 3 tasks due today</div>
            </div>
            <div style={{
              background: COLORS.blue, color: "#fff",
              fontSize: 10, fontWeight: 600,
              padding: "5px 10px", borderRadius: 7,
              cursor: "default",
            }}>+ New Task</div>
          </div>

          {/* Project cards */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {projects.map(p => (
              <div key={p.name} style={{
                flex: 1, background: COLORS.slateLight,
                borderRadius: 10, padding: "10px 10px 8px",
                border: `1px solid ${COLORS.border}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.text, lineHeight: 1.3 }}>{p.name}</div>
                  <CircleProgress pct={p.progress} color={p.color} size={36} />
                </div>
                <div style={{ fontSize: 9, color: COLORS.slate }}>{p.tasks} tasks · {p.members} members</div>
              </div>
            ))}
          </div>

          {/* Task list */}
          <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Active tasks</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {tasks.map(t => (
              <div key={t.id} style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "6px 8px", borderRadius: 7,
                border: `1px solid ${COLORS.border}`,
                background: COLORS.white,
                fontSize: 10,
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: 4, border: `1.5px solid ${COLORS.border}`,
                  background: t.status === "done" ? COLORS.green : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {t.status === "done" && <span style={{ color: "#fff", fontSize: 8 }}>✓</span>}
                </div>
                <PriorityDot priority={t.priority} />
                <span style={{
                  flex: 1, color: COLORS.text, fontWeight: 500,
                  textDecoration: t.status === "done" ? "line-through" : "none",
                  opacity: t.status === "done" ? 0.5 : 1,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{t.title}</span>
                <span style={{
                  fontSize: 9, color: COLORS.blue, fontWeight: 600,
                  background: COLORS.blueSoft, padding: "1px 5px", borderRadius: 4,
                }}>{t.tag}</span>
                <StatusBadge status={t.status} />
                <Avatar initials={t.assignee} color={COLORS.blue} size={18} />
                <span style={{ fontSize: 9, color: COLORS.slate, flexShrink: 0 }}>{t.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectFlowLanding() {
  const [email, setEmail] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const faqs = [
    { q: "How is ProjectFlow different from Jira?", a: "ProjectFlow is built for speed. Setup takes minutes, not days. No XML configs, no bloated admin panels — just clean, fast project management your team will actually use." },
    { q: "Can I migrate from Linear or Notion?", a: "Yes. We offer one-click imports from Linear, Notion, Asana, and Jira. Your projects, tasks, comments, and attachments come with you." },
    { q: "Is there a free plan?", a: "Absolutely. Up to 5 members, unlimited projects, and all core features — free forever. Upgrade when your team grows." },
    { q: "What integrations are supported?", a: "GitHub, GitLab, Slack, Figma, Notion, Google Workspace, Zapier, and 40+ more. REST API and webhooks for custom integrations." },
  ];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: COLORS.text,
      background: COLORS.white,
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: ${COLORS.blue}33; }

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: ${COLORS.slate};
          cursor: pointer;
          transition: color 0.15s;
          padding: 4px 0;
        }
        .nav-link:hover { color: ${COLORS.text}; }

        .btn-primary {
          background: ${COLORS.blue};
          color: #fff;
          border: none;
          padding: 11px 24px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
          letter-spacing: -0.01em;
        }
        .btn-primary:hover {
          background: ${COLORS.blueLight};
          transform: translateY(-1px);
          box-shadow: 0 6px 20px ${COLORS.blue}44;
        }

        .btn-secondary {
          background: transparent;
          color: ${COLORS.text};
          border: 1.5px solid ${COLORS.border};
          padding: 10px 22px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .btn-secondary:hover {
          border-color: ${COLORS.blue};
          color: ${COLORS.blue};
          background: ${COLORS.blueSoft};
        }

        .feature-card {
          background: ${COLORS.white};
          border: 1px solid ${COLORS.border};
          border-radius: 16px;
          padding: 28px;
          transition: all 0.2s;
          cursor: default;
        }
        .feature-card:hover {
          border-color: ${COLORS.blue}44;
          box-shadow: 0 8px 32px rgba(37,99,235,0.08);
          transform: translateY(-2px);
        }

        .stat-item {
          transition: transform 0.2s;
        }
        .stat-item:hover { transform: translateY(-2px); }

        .testimonial-card {
          background: ${COLORS.white};
          border: 1px solid ${COLORS.border};
          border-radius: 16px;
          padding: 28px;
          transition: all 0.2s;
        }
        .testimonial-card:hover {
          box-shadow: 0 8px 32px rgba(10,15,30,0.08);
          border-color: ${COLORS.border};
          transform: translateY(-2px);
        }

        .pricing-card {
          border-radius: 20px;
          padding: 32px;
          transition: all 0.2s;
        }
        .pricing-card:hover { transform: translateY(-3px); }

        .faq-item {
          border-bottom: 1px solid ${COLORS.border};
          cursor: pointer;
        }

        .input-email {
          flex: 1;
          padding: 12px 16px;
          border: 1.5px solid ${COLORS.border};
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          color: ${COLORS.text};
          outline: none;
          transition: border-color 0.15s;
          min-width: 0;
        }
        .input-email:focus { border-color: ${COLORS.blue}; box-shadow: 0 0 0 3px ${COLORS.blue}15; }
        .input-email::placeholder { color: ${COLORS.slate}; }

        .logo-badge {
          display: flex; align-items: center; gap: 8px;
        }
        .logo-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: ${COLORS.blue};
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 900; color: #fff;
          letter-spacing: -1px;
        }
        .logo-text {
          font-size: 18px; font-weight: 800;
          color: ${COLORS.text}; letter-spacing: -0.03em;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .hero-mockup { animation: float 5s ease-in-out infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.2s; }
        .fade-up-3 { animation-delay: 0.3s; }
        .fade-up-4 { animation-delay: 0.4s; }

        .integration-logo {
          width: 44px; height: 44px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          background: ${COLORS.white};
          border: 1px solid ${COLORS.border};
          box-shadow: 0 2px 8px rgba(10,15,30,0.06);
          transition: transform 0.2s;
        }
        .integration-logo:hover { transform: scale(1.08); }
      `}</style>

      {/* ─── NAV ─────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{
          maxWidth: 1140, margin: "0 auto",
          padding: "0 24px",
          height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div className="logo-badge">
            <div className="logo-icon">PF</div>
            <span className="logo-text">ProjectFlow</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["Features","Pricing","Integrations","Docs","Blog"].map(l => (
              <span key={l} className="nav-link">{l}</span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="btn-secondary" style={{ padding: "8px 18px", fontSize: 13 }}>Log in</button>
            <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>Get started free</button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section style={{
        maxWidth: 1140, margin: "0 auto",
        padding: "80px 24px 72px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
      }}>
        {/* Left copy */}
        <div>
          {/* Eyebrow */}
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: COLORS.blueSoft, border: `1px solid ${COLORS.blueMid}`,
            borderRadius: 20, padding: "5px 12px", marginBottom: 24,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: COLORS.green, boxShadow: `0 0 0 3px ${COLORS.green}33`,
            }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.blue }}>
              Now in public beta · 2,400+ teams onboarded
            </span>
          </div>

          <h1 className="fade-up fade-up-1" style={{
            fontSize: 52, fontWeight: 900, lineHeight: 1.08,
            letterSpacing: "-0.04em", color: COLORS.text,
            marginBottom: 20,
          }}>
            Ship faster.<br />
            <span style={{ color: COLORS.blue }}>Stay in sync.</span><br />
            Always.
          </h1>

          <p className="fade-up fade-up-2" style={{
            fontSize: 17, color: COLORS.slate, lineHeight: 1.65,
            marginBottom: 36, maxWidth: 440,
          }}>
            ProjectFlow is the collaborative workspace where teams plan, build, and
            deliver — without the overhead. From solo devs to 500-person orgs.
          </p>

          <div className="fade-up fade-up-3" style={{
            display: "flex", gap: 12, alignItems: "center", marginBottom: 36,
          }}>
            <div style={{ display: "flex", flex: 1, gap: 0, maxWidth: 380 }}>
              <input
                className="input-email"
                placeholder="Enter your work email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ borderRadius: "10px 0 0 10px", borderRight: "none" }}
              />
              <button className="btn-primary" style={{ borderRadius: "0 10px 10px 0", whiteSpace: "nowrap" }}>
                Start free →
              </button>
            </div>
          </div>

          <div className="fade-up fade-up-4" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Avatars */}
            <div style={{ display: "flex" }}>
              {["SC","MR","PL","JK","RV"].map((i, idx) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: [COLORS.blue, COLORS.purple, COLORS.green, COLORS.amber, "#EC4899"][idx] + "33",
                  border: `2px solid ${COLORS.white}`,
                  marginLeft: idx === 0 ? 0 : -8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700,
                  color: [COLORS.blue, COLORS.purple, COLORS.green, COLORS.amber, "#EC4899"][idx],
                  zIndex: 5 - idx,
                  position: "relative",
                }}>
                  {i}
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: COLORS.amber, fontSize: 13 }}>★</span>)}
              </div>
              <span style={{ fontSize: 12, color: COLORS.slate }}>
                <strong style={{ color: COLORS.text }}>4.9/5</strong> from 1,200+ reviews
              </span>
            </div>
            <div style={{ width: 1, height: 32, background: COLORS.border }} />
            <div style={{ fontSize: 12, color: COLORS.slate }}>
              <strong style={{ color: COLORS.text }}>No credit card</strong> required
            </div>
          </div>
        </div>

        {/* Right dashboard mockup */}
        <div className="hero-mockup fade-up fade-up-2" style={{ display: "flex", justifyContent: "center" }}>
          <DashboardMockup />
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────────────── */}
      <section style={{ background: COLORS.navy }}>
        <div style={{
          maxWidth: 1140, margin: "0 auto", padding: "44px 24px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
        }}>
          {stats.map((s, i) => (
            <div key={s.label} className="stat-item" style={{
              textAlign: "center",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
              padding: "0 32px",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 38, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>{s.value}</span>
                <span style={{
                  fontSize: 12, fontWeight: 600, padding: "2px 7px", borderRadius: 6,
                  background: COLORS.green + "33", color: COLORS.green,
                }}>{s.delta}</span>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LOGO STRIP ──────────────────────────────────────────── */}
      <section style={{
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "40px 24px",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: COLORS.slate, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28 }}>
            Trusted by teams at
          </div>
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 40, flexWrap: "wrap", alignItems: "center",
          }}>
            {["Vercel","Stripe","Linear","Figma","Notion","Loom","Raycast","Supabase"].map(c => (
              <span key={c} style={{
                fontSize: 16, fontWeight: 800, color: COLORS.border,
                letterSpacing: "-0.03em", userSelect: "none",
              }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: COLORS.slateLight }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              display: "inline-block",
              background: COLORS.blueSoft, color: COLORS.blue,
              fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", padding: "4px 14px", borderRadius: 20,
              marginBottom: 16,
            }}>Why ProjectFlow</div>
            <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16, color: COLORS.text }}>
              Everything your team needs.<br />Nothing you don't.
            </h2>
            <p style={{ fontSize: 17, color: COLORS.slate, maxWidth: 520, margin: "0 auto" }}>
              Built for speed and clarity — not for impressing a procurement committee.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}>
            {features.map((f, i) => (
              <div key={f.title} className="feature-card">
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: f.bg, fontSize: 22,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: COLORS.text }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: COLORS.slate, lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WORKFLOW VISUAL ─────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{
                display: "inline-block",
                background: COLORS.purpleSoft, color: COLORS.purple,
                fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", padding: "4px 14px", borderRadius: 20,
                marginBottom: 16,
              }}>Views & Boards</div>
              <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15 }}>
                Your workflow, your view
              </h2>
              <p style={{ fontSize: 16, color: COLORS.slate, lineHeight: 1.65, marginBottom: 32 }}>
                One source of truth, four ways to look at it. Switch between Board, List, Timeline, and Table — any change in one view reflects everywhere instantly.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["📌", "Board", "Kanban-style drag-and-drop for visual teams"],
                  ["📋", "List", "Dense, sortable rows for power users"],
                  ["📅", "Timeline", "Gantt-style view for planning sprints"],
                  ["🔢", "Table", "Spreadsheet grid with custom properties"],
                ].map(([icon, name, desc]) => (
                  <div key={name} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 16px", borderRadius: 10,
                    background: COLORS.slateLight, border: `1px solid ${COLORS.border}`,
                  }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{name}</div>
                      <div style={{ fontSize: 12, color: COLORS.slate }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini board view */}
            <div style={{
              background: COLORS.slateLight,
              borderRadius: 18,
              padding: 20,
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 12px 40px rgba(10,15,30,0.08)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>Sprint 14 — Board</span>
                <div style={{ display: "flex", gap: 6 }}>
                  {["Board","List","Timeline"].map((v, i) => (
                    <span key={v} style={{
                      fontSize: 11, padding: "3px 9px", borderRadius: 6,
                      background: i === 0 ? COLORS.blue : COLORS.white,
                      color: i === 0 ? "#fff" : COLORS.slate,
                      border: `1px solid ${i === 0 ? COLORS.blue : COLORS.border}`,
                      fontWeight: 600, cursor: "default",
                    }}>{v}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[
                  { col: "Backlog", color: COLORS.slate, cards: ["User auth", "SSO setup", "Email verify"] },
                  { col: "In Progress", color: COLORS.blue, cards: ["Dashboard v2", "API docs"] },
                  { col: "Done", color: COLORS.green, cards: ["Login page", "DB schema", "CI/CD"] },
                ].map(col => (
                  <div key={col.col}>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: col.color,
                      marginBottom: 8, display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: col.color, display: "inline-block" }} />
                      {col.col}
                      <span style={{
                        background: col.color + "22", color: col.color,
                        borderRadius: 10, fontSize: 10, padding: "0 5px", fontWeight: 700,
                      }}>{col.cards.length}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {col.cards.map(c => (
                        <div key={c} style={{
                          background: COLORS.white,
                          borderRadius: 8, padding: "9px 10px",
                          border: `1px solid ${COLORS.border}`,
                          fontSize: 11, color: COLORS.text, fontWeight: 500,
                          boxShadow: "0 1px 4px rgba(10,15,30,0.04)",
                        }}>{c}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTEGRATIONS ────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: COLORS.slateLight, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-block",
            background: COLORS.greenSoft, color: COLORS.green,
            fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "4px 14px", borderRadius: 20,
            marginBottom: 16,
          }}>Integrations</div>
          <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Works with your stack
          </h2>
          <p style={{ fontSize: 16, color: COLORS.slate, marginBottom: 44 }}>
            Connect in one click. No custom code required.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            {["🐙","💬","🎨","📝","🔧","📬","🐛","🔵","📊","⚡","🌐","🔑"].map((icon, i) => (
              <div key={i} className="integration-logo">{icon}</div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: COLORS.slate, marginTop: 24 }}>
            GitHub · Slack · Figma · Notion · Jira · Outlook · GitLab · Linear · Google Sheets · Zapier · Webhooks · SSO
          </p>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Teams that ship faster
            </h2>
            <p style={{ fontSize: 16, color: COLORS.slate }}>
              Don't take our word for it.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: COLORS.amber, fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 15, color: COLORS.text, lineHeight: 1.65, marginBottom: 24, fontStyle: "italic" }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar initials={t.initials} color={t.color} size={38} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.slate }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────────────── */}
      <section style={{ padding: "96px 24px", background: COLORS.slateLight }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Simple, honest pricing
            </h2>
            <p style={{ fontSize: 16, color: COLORS.slate }}>Start free. Scale when you're ready.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 16, alignItems: "start" }}>
            {[
              {
                name: "Free",
                price: "$0",
                unit: "forever",
                desc: "For solo devs and small teams just getting started.",
                features: ["Up to 5 members","Unlimited projects","Board & List views","5 GB storage","Community support"],
                cta: "Get started",
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$12",
                unit: "per seat / mo",
                desc: "For growing teams who need advanced workflows.",
                features: ["Unlimited members","All views incl. Timeline","Custom fields & automations","25 GB storage","Priority support","GitHub & Slack integrations"],
                cta: "Start free trial",
                highlighted: true,
                badge: "Most popular",
              },
              {
                name: "Enterprise",
                price: "Custom",
                unit: "contact us",
                desc: "For large teams needing security and compliance.",
                features: ["Everything in Pro","SSO & SAML","Audit logs","SLA & dedicated CSM","HIPAA / SOC 2 compliance","Custom contracts"],
                cta: "Talk to sales",
                highlighted: false,
              },
            ].map(plan => (
              <div key={plan.name} className="pricing-card" style={{
                background: plan.highlighted ? COLORS.navy : COLORS.white,
                border: plan.highlighted ? `2px solid ${COLORS.blue}` : `1px solid ${COLORS.border}`,
                position: "relative",
              }}>
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: COLORS.blue, color: "#fff",
                    fontSize: 11, fontWeight: 700, padding: "3px 14px", borderRadius: 20,
                  }}>{plan.badge}</div>
                )}
                <div style={{ marginBottom: 6, fontSize: 14, fontWeight: 700, color: plan.highlighted ? "rgba(255,255,255,0.6)" : COLORS.slate }}>
                  {plan.name}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 38, fontWeight: 900, color: plan.highlighted ? "#fff" : COLORS.text, letterSpacing: "-0.04em" }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 13, color: plan.highlighted ? "rgba(255,255,255,0.5)" : COLORS.slate }}>{plan.unit}</span>
                </div>
                <p style={{ fontSize: 13, color: plan.highlighted ? "rgba(255,255,255,0.55)" : COLORS.slate, marginBottom: 24, lineHeight: 1.5 }}>
                  {plan.desc}
                </p>
                <button className={plan.highlighted ? "btn-primary" : "btn-secondary"} style={{
                  width: "100%", marginBottom: 24,
                  background: plan.highlighted ? COLORS.blue : "transparent",
                  color: plan.highlighted ? "#fff" : COLORS.text,
                }}>
                  {plan.cta}
                </button>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                      <span style={{ color: plan.highlighted ? COLORS.green : COLORS.green, flexShrink: 0 }}>✓</span>
                      <span style={{ color: plan.highlighted ? "rgba(255,255,255,0.75)" : COLORS.text }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: COLORS.white }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center" }}>
            Common questions
          </h2>
          <p style={{ fontSize: 15, color: COLORS.slate, textAlign: "center", marginBottom: 40 }}>
            Still have questions? <span style={{ color: COLORS.blue, cursor: "pointer" }}>Talk to us →</span>
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "20px 0",
                }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>{faq.q}</span>
                  <span style={{
                    fontSize: 18, color: COLORS.slate,
                    transform: activeFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    flexShrink: 0, marginLeft: 16,
                  }}>+</span>
                </div>
                {activeFaq === i && (
                  <div style={{ paddingBottom: 20, fontSize: 14, color: COLORS.slate, lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ────────────────────────────────────────────── */}
      <section style={{
        background: COLORS.navy,
        padding: "80px 24px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 300,
          background: `radial-gradient(ellipse, ${COLORS.blue}44 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", marginBottom: 16, lineHeight: 1.1 }}>
            Your team's next sprint<br />starts here.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", marginBottom: 40, lineHeight: 1.6 }}>
            Join 2,400+ teams already building with ProjectFlow.
            Free forever. No credit card. 2-minute setup.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button className="btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>
              Get started free →
            </button>
            <button className="btn-secondary" style={{
              padding: "14px 28px", fontSize: 15,
              background: "rgba(255,255,255,0.07)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              color: "#fff",
            }}>
              Book a demo
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{
        background: "#060A14",
        padding: "60px 24px 32px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div className="logo-badge" style={{ marginBottom: 14 }}>
                <div className="logo-icon">PF</div>
                <span className="logo-text" style={{ color: "#fff" }}>ProjectFlow</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 240 }}>
                The collaborative workspace for teams who care about velocity and clarity.
              </p>
            </div>
            {[
              ["Product", ["Features","Changelog","Roadmap","Status","Pricing"]],
              ["Developers", ["API","Docs","Webhooks","SDKs","GitHub"]],
              ["Company", ["About","Blog","Careers","Press","Contact"]],
              ["Legal", ["Privacy","Terms","Security","Cookies","GDPR"]],
            ].map(([title, links]) => (
              <div key={title}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
                  {title}
                </div>
                {links.map(l => (
                  <div key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 9, cursor: "pointer" }}
                    onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.75)"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
              © 2026 ProjectFlow, Inc. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              {["Twitter","LinkedIn","GitHub","Discord"].map(s => (
                <span key={s} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
                >{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
