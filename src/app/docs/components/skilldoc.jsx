"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Code block ────────────────────────────────────────────────────────────
function CodeBlock({ code, lang = "js" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="relative group rounded-lg overflow-hidden border border-white/8 my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/4 border-b border-white/8">
        <span className="text-xs text-white/30 font-mono tracking-wider uppercase">{lang}</span>
        <button onClick={copy} className="text-xs text-white/30 hover:text-white/70 transition-colors">
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-emerald-300/90 font-mono">{code}</code>
      </pre>
    </div>
  );
}

function DocSection({ title, children }) {
  return (
    <section className="mb-10">
      <h3 className="text-sm font-semibold text-white/40 tracking-[0.15em] uppercase mb-4 pb-2 border-b border-white/8">
        {title}
      </h3>
      {children}
    </section>
  );
}

// ─── HTML DOC ─────────────────────────────────────────────────────────────
function HTMLDoc() {
  const [layout, setLayout] = useState("grid");

  const layouts = [
    { id: "grid",   label: "Grid Layout" },
    { id: "single", label: "Single-Page" },
    { id: "split",  label: "Split Layout" },
  ];

  const GridPreview = () => (
    <div className="flex flex-col gap-2 h-full">
      <div className="h-4 rounded bg-blue-400/40 w-full" />
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded bg-blue-300/20 border border-blue-300/15" />
        ))}
      </div>
    </div>
  );

  const SinglePagePreview = () => (
    <div className="flex flex-col gap-2 h-full">
      <div className="h-5 rounded bg-blue-400/40 mx-auto w-3/5" />
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 rounded bg-blue-300/25 border border-blue-300/15" />
        ))}
      </div>
      <div className="h-6 rounded bg-blue-400/30 w-2/3 mx-auto" />
      <div className="flex-1 rounded bg-blue-300/15 border border-blue-300/10 p-1.5 space-y-1">
        {[100, 85, 90, 70].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-blue-300/25" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="h-3 rounded bg-blue-500/40 w-1/3 mx-auto" />
    </div>
  );

  const SplitPreview = () => (
    <div className="flex gap-2 h-full">
      <div className="w-2/5 flex flex-col gap-2">
        <div className="h-4 rounded bg-blue-400/35 w-3/4" />
        <div className="space-y-1 flex-1">
          {[80, 60, 75].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-blue-300/20" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 rounded bg-blue-300/20 border border-blue-300/15 p-1">
              <div className="h-1 rounded-full bg-blue-300/30 w-3/4 mb-1" />
              <div className="h-1 rounded-full bg-blue-300/20 w-1/2" />
            </div>
          ))}
        </div>
        <div className="flex-1 rounded bg-blue-300/15 border border-blue-300/10 p-1.5 space-y-1">
          {[100, 80, 90].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-blue-300/20" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );

  const previews = { grid: GridPreview, single: SinglePagePreview, split: SplitPreview };

  const layoutCode = {
    grid: `<body>
  <nav>...</nav>
  <main class="grid">
    <article />
    <article />
    <article />
    <!-- repeating card grid -->
  </main>
</body>`,
    single: `<body>
  <section id="hero">...</section>
  <section id="features">...</section>
  <section id="cta">...</section>
  <footer>...</footer>
  <!-- all content on one page -->
</body>`,
    split: `<body>
  <aside class="sidebar">
    <h2>Title</h2>
    <p>Description...</p>
  </aside>
  <main class="content">
    <div class="card-grid">...</div>
  </main>
</body>`,
  };

  const Preview = previews[layout];

  return (
    <>
      <DocSection title="Structure">
        <p className="text-white/60 text-sm leading-7 mb-4">
          HTML defines semantic structure through nested elements — giving browsers and assistive
          technologies a meaningful outline of your content. The layout pattern you choose shapes
          the entire page architecture.
        </p>
      </DocSection>

      <DocSection title="Interactive — Layout Patterns">
        <p className="text-white/40 text-xs mb-4">Select a layout to see how the HTML structure and wireframe change</p>
        <div className="flex gap-2 mb-5 flex-wrap">
          {layouts.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setLayout(id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-200 ${
                layout === id
                  ? "border-orange-400/50 bg-orange-400/10 text-orange-300"
                  : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-white/10 bg-[#050810] p-5" style={{ minHeight: 200 }}>
            <div className="text-[10px] text-white/20 font-mono mb-3 uppercase tracking-wider">wireframe</div>
            <div className="h-44 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full bg-blue-400/30" />
              <div className="pt-3 h-full"><Preview /></div>
            </div>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/2 overflow-hidden" style={{ minHeight: 200 }}>
            <div className="flex items-center justify-between px-4 py-2 bg-white/4 border-b border-white/8">
              <span className="text-xs text-white/25 font-mono uppercase tracking-wider">html</span>
              <span className="text-[10px] text-orange-400/50 font-mono">{layout}</span>
            </div>
            <pre className="p-4 text-xs leading-relaxed overflow-auto h-full">
              <code className="text-emerald-300/80 font-mono">{layoutCode[layout]}</code>
            </pre>
          </div>
        </div>
      </DocSection>

      <DocSection title="Live Demo — Document Structure">
        <div className="rounded-lg border border-white/10 bg-white/3 p-5 space-y-2 text-sm font-mono">
          <div className="border border-orange-400/30 rounded p-2">
            <span className="text-orange-400/60 text-xs mr-2">&lt;header&gt;</span>
            <div className="border border-blue-400/30 rounded p-2 mt-1">
              <span className="text-blue-400/60 text-xs mr-2">&lt;nav&gt;</span>
              <div className="flex gap-3 mt-1">
                {["Home", "About", "Work"].map((l) => (
                  <span key={l} className="px-2 py-0.5 bg-white/10 rounded text-white/60 text-xs hover:bg-blue-500/20 hover:text-blue-300 transition-colors cursor-pointer">{l}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="border border-green-400/30 rounded p-2">
            <span className="text-green-400/60 text-xs mr-2">&lt;main&gt;</span>
            <div className="border border-purple-400/30 rounded p-2 mt-1">
              <span className="text-purple-400/60 text-xs mr-2">&lt;article&gt;</span>
              <p className="text-white/50 text-xs mt-1">Your content lives here.</p>
            </div>
          </div>
          <div className="border border-pink-400/30 rounded p-2">
            <span className="text-pink-400/60 text-xs mr-2">&lt;footer&gt;</span>
            <p className="text-white/30 text-xs mt-1">© 2025 Milan Dorfling</p>
          </div>
        </div>
      </DocSection>

      <DocSection title="Key Rules">
        <ul className="space-y-2 text-sm text-white/60">
          {[
            "Use semantic tags — <header>, <main>, <section>, <article>, <footer>",
            "Always include lang attribute on <html> for accessibility",
            "One <h1> per page — then h2 → h6 in order",
            "Images need descriptive alt attributes",
            "Forms need labels tied to inputs via for/id pairs",
          ].map((rule, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-orange-400/60 mt-0.5">›</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </DocSection>
    </>
  );
}

// ─── CSS DOC ──────────────────────────────────────────────────────────────
function CSSDoc() {
  const [margin, setMargin] = useState(20);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(4);
  const [explode, setExplode] = useState(30);

  const zLayers = [
    { label: "background", color: "#1e3a5f", border: "#3b82f6", textColor: "#93c5fd", zVal: 0 },
    { label: "layout",     color: "#1a3320", border: "#22c55e", textColor: "#86efac", zVal: 10 },
    { label: "content",    color: "#3b1f1f", border: "#ef4444", textColor: "#fca5a5", zVal: 20 },
    { label: "overlay",    color: "#2d1f3d", border: "#a855f7", textColor: "#d8b4fe", zVal: 30 },
    { label: "modal",      color: "#3d2d10", border: "#f59e0b", textColor: "#fcd34d", zVal: 40 },
    { label: "tooltip",    color: "#1a2e3d", border: "#06b6d4", textColor: "#67e8f9", zVal: 50 },
  ];

  const spread = explode / 100;

  return (
    <>
      <DocSection title="The Cascade">
        <p className="text-white/60 text-sm leading-7 mb-4">
          CSS controls presentation. The "cascade" means styles resolve by specificity, source order,
          and inheritance — the most specific rule wins.
        </p>
        <CodeBlock lang="css" code={`/* Specificity: inline > id > class > element */
.card { color: white; }              /* 0,1,0 */
#hero .card { color: blue; }         /* 1,1,0 — wins */

:root {
  --brand: #3b82f6;
  --radius: 8px;
}
.button {
  background: var(--brand);
  border-radius: var(--radius);
  transition: opacity 200ms ease;
}
.button:hover { opacity: 0.85; }`} />
      </DocSection>

      <DocSection title="Interactive — CSS Box Model">
        <p className="text-white/40 text-xs mb-4">Drag sliders to see how margin, border, and padding affect layout</p>
        <div className="rounded-lg border border-white/10 bg-white/3 p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: "rgba(251,191,36,0.08)", border: "2px dashed rgba(251,191,36,0.3)", padding: `${margin}px` }}>
              <span className="absolute top-1 left-2 text-[9px] text-yellow-400/50 font-mono">margin</span>
              <div className="relative flex items-center justify-center transition-all duration-200"
                style={{ backgroundColor: "rgba(59,130,246,0.12)", border: `${border}px solid rgba(59,130,246,0.5)`, padding: `${padding}px` }}>
                <span className="absolute -top-3 left-1 text-[9px] text-blue-400/60 font-mono">border {border}px</span>
                <div className="relative flex items-center justify-center"
                  style={{ backgroundColor: "rgba(52,211,153,0.12)", border: "1px dashed rgba(52,211,153,0.3)", minWidth: 60, minHeight: 40 }}>
                  <span className="absolute top-0.5 left-1 text-[9px] text-emerald-400/50 font-mono">padding</span>
                  <span className="text-xs text-white/50 font-mono mt-3">content</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Margin",  value: margin,  set: setMargin,  color: "accent-yellow-400", min: 0, max: 40 },
              { label: "Border",  value: border,  set: setBorder,  color: "accent-blue-400",   min: 0, max: 16 },
              { label: "Padding", value: padding, set: setPadding, color: "accent-emerald-400", min: 0, max: 40 },
            ].map(({ label, value, set, color, min, max }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-14 font-mono">{label}</span>
                <input type="range" min={min} max={max} value={value}
                  onChange={(e) => set(Number(e.target.value))}
                  className={`flex-1 h-1 rounded-full appearance-none bg-white/10 cursor-pointer ${color}`} />
                <span className="text-xs text-white/30 font-mono w-8 text-right">{value}px</span>
              </div>
            ))}
          </div>
          <CodeBlock lang="css" code={`.element {\n  margin: ${margin}px;\n  border: ${border}px solid #3b82f6;\n  padding: ${padding}px;\n}`} />
        </div>
      </DocSection>

      <DocSection title="Interactive — Z-Index Layer Explorer">
        <p className="text-white/40 text-xs mb-4">
          Drag the slider to explode the rendering layers and see how elements stack on the z-axis
        </p>

        <div className="rounded-lg border border-white/10 bg-[#05080f] overflow-hidden">
          <div className="p-5">
            <div className="relative mx-auto" style={{ width: 320, height: Math.max(180, 120 + zLayers.length * spread * 40), perspective: "600px", perspectiveOrigin: "50% 40%" }}>
              <div style={{
                position: "absolute", inset: 0,
                transformStyle: "preserve-3d",
                transform: `rotateX(${38 * spread}deg) rotateZ(${-6 * spread}deg)`,
                transition: "transform 0.12s ease",
              }}>
                {zLayers.map((layer, i) => (
                  <div key={layer.label} style={{
                    position: "absolute", left: 0, right: 0, top: "50%", height: 44, marginTop: -22,
                    transform: `translateZ(${i * spread * 28}px) translateY(${-i * spread * 36}px)`,
                    backgroundColor: layer.color,
                    border: `1px solid ${layer.border}40`,
                    borderRadius: 6,
                    transition: "transform 0.12s ease",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0 14px",
                  }}>
                    <span style={{ color: layer.textColor, fontFamily: "monospace", fontSize: 11 }}>z-index: {layer.zVal}</span>
                    <span style={{ color: layer.textColor + "80", fontFamily: "monospace", fontSize: 10 }}>.{layer.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-white/25 font-mono w-8">flat</span>
              <input type="range" min={0} max={100} value={explode}
                onChange={(e) => setExplode(Number(e.target.value))}
                className="flex-1 h-1 rounded-full appearance-none bg-white/10 cursor-pointer accent-purple-400" />
              <span className="text-xs text-white/25 font-mono w-14 text-right">explode</span>
            </div>
          </div>

          <div className="border-t border-white/6 px-5 py-3 flex flex-wrap gap-3">
            {zLayers.map((layer) => (
              <div key={layer.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: layer.border + "80" }} />
                <span className="text-[10px] font-mono" style={{ color: layer.textColor + "90" }}>.{layer.label}</span>
              </div>
            ))}
          </div>
        </div>

        <CodeBlock lang="css" code={`/* Higher z-index = closer to the user */
.background { z-index: 0;  }  /* furthest back  */
.layout     { z-index: 10; }
.content    { z-index: 20; }
.overlay    { z-index: 30; }  /* dimmer / drawer */
.modal      { z-index: 40; }  /* dialogs         */
.tooltip    { z-index: 50; }  /* always on top   */

/* z-index only works on positioned elements */
.element {
  position: relative;
  z-index: 20;
}`} />
      </DocSection>

      <DocSection title="Flexbox Cheatsheet">
        <CodeBlock lang="css" code={`.container {
  display: flex;
  flex-direction: row;        /* row | column */
  justify-content: center;   /* main axis */
  align-items: center;       /* cross axis */
  gap: 1rem;
  flex-wrap: wrap;
}
.child {
  flex: 1;
  min-width: 0;
}`} />
      </DocSection>
    </>
  );
}

// ─── JS DOC ───────────────────────────────────────────────────────────────
function JSDoc() {
  const [items, setItems] = useState(["Learn JS", "Build things"]);
  const [input, setInput] = useState("");
  const [asyncLog, setAsyncLog] = useState([]);
  const [asyncRunning, setAsyncRunning] = useState(false);
  const [callStack, setCallStack] = useState([]);
  const [taskQueue, setTaskQueue] = useState([]);
  const logEndRef = useRef(null);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const runAsyncDemo = useCallback(async () => {
    if (asyncRunning) return;
    setAsyncRunning(true);
    setAsyncLog([]);
    setCallStack([]);
    setTaskQueue([]);

    const log = (msg, type = "default") =>
      setAsyncLog((prev) => [...prev, { msg, type, id: Date.now() + Math.random() }]);
    const push = (fn) => setCallStack((s) => [...s, fn]);
    const pop  = ()   => setCallStack((s) => s.slice(0, -1));
    const queue   = (fn) => setTaskQueue((q) => [...q, fn]);
    const dequeue = ()   => setTaskQueue((q) => q.slice(1));

    push("main()");
    log("▶  Script starts", "info");
    await sleep(400);

    push("fetchUser(1)");
    log("→  fetchUser(1) called", "call");
    await sleep(300);

    log("   fetch() sent to Web API", "api");
    pop();
    queue("response callback");
    await sleep(600);

    push("processData()");
    log("→  processData() runs (sync)", "call");
    await sleep(400);
    log("←  processData() complete", "return");
    pop();

    log("   ⏳ Awaiting fetch…", "wait");
    await sleep(700);

    log("   ✓  Response arrived — queued", "api");
    dequeue();
    push("res.json()");
    log("→  res.json() parsed", "call");
    await sleep(300);
    pop();

    log("←  fetchUser resolved ✓", "return");
    pop();
    log("■  Call stack empty", "info");
    setAsyncRunning(false);
  }, [asyncRunning]);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [asyncLog]);

  const logColors = {
    info:   "text-white/40",
    call:   "text-cyan-400/90",
    return: "text-emerald-400/90",
    api:    "text-yellow-400/80",
    wait:   "text-white/25",
  };

  return (
    <>
      <DocSection title="Core Concepts">
        <p className="text-white/60 text-sm leading-7 mb-4">
          JavaScript handles logic, DOM manipulation, async operations, and everything interactive.
          Modern JS (ES6+) is expressive and powerful.
        </p>
        <CodeBlock lang="js" code={`// Closures
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    reset: () => (count = start),
    get: () => count,
  };
}

// Async/Await
async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

// Destructuring + spread
const { name, ...rest } = user;
const merged = { ...defaults, ...overrides };`} />
      </DocSection>

      <DocSection title="Interactive — Async / Event Loop Visualiser">
        <p className="text-white/40 text-xs mb-4">
          Hit Run to watch the call stack, Web API, and task queue work together in real time
        </p>
        <div className="rounded-lg border border-white/10 bg-[#05080f] overflow-hidden">
          <div className="grid grid-cols-3 border-b border-white/8 text-[10px] font-mono text-white/25 uppercase tracking-wider">
            <div className="px-3 py-2 border-r border-white/8">Call Stack</div>
            <div className="px-3 py-2 border-r border-white/8">Web API / Queue</div>
            <div className="px-3 py-2">Log</div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/8" style={{ minHeight: 180 }}>
            <div className="p-3 flex flex-col-reverse gap-1">
              {callStack.map((fn, i) => (
                <div key={i} className="px-2 py-1.5 rounded text-[11px] font-mono text-cyan-300/90 bg-cyan-500/10 border border-cyan-500/20 transition-all duration-200">{fn}</div>
              ))}
              {callStack.length === 0 && <span className="text-white/15 text-[10px] font-mono mt-auto">empty</span>}
            </div>
            <div className="p-3 flex flex-col gap-1">
              {taskQueue.map((task, i) => (
                <div key={i} className="px-2 py-1.5 rounded text-[11px] font-mono text-yellow-300/80 bg-yellow-500/10 border border-yellow-500/20 animate-pulse">{task}</div>
              ))}
              {taskQueue.length === 0 && <span className="text-white/15 text-[10px] font-mono">idle</span>}
            </div>
            <div className="p-3 overflow-y-auto flex flex-col gap-0.5" style={{ maxHeight: 180 }}>
              {asyncLog.map(({ msg, type, id }) => (
                <div key={id} className={`text-[11px] font-mono ${logColors[type] || "text-white/50"}`}>{msg}</div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
          <div className="border-t border-white/8 px-4 py-3 flex items-center gap-3">
            <button onClick={runAsyncDemo} disabled={asyncRunning}
              className={`px-4 py-1.5 rounded text-xs font-mono border transition-all ${
                asyncRunning ? "border-white/10 text-white/20 cursor-not-allowed" : "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
              }`}>
              {asyncRunning ? "running…" : "▶ run"}
            </button>
            {!asyncRunning && asyncLog.length > 0 && (
              <button onClick={() => { setAsyncLog([]); setCallStack([]); setTaskQueue([]); }}
                className="text-xs text-white/20 hover:text-white/50 transition-colors font-mono">clear</button>
            )}
          </div>
        </div>
      </DocSection>

      <DocSection title="Live Demo — Array State">
        <div className="rounded-lg border border-white/10 bg-white/3 p-4 space-y-3">
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { setItems((prev) => [...prev, input.trim()]); setInput(""); } }}
              placeholder="Add item (Enter)"
              className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-white/30" />
          </div>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-center justify-between text-sm text-white/60 group">
                <span className="flex gap-2"><span className="text-white/20 font-mono text-xs">{i + 1}.</span>{item}</span>
                <button onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
                  className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-xs">remove</button>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </>
  );
}

// ─── REACT DOC ────────────────────────────────────────────────────────────
function ReactDoc() {
  const [tab, setTab] = useState("state");
  const [parentCount, setParentCount] = useState(0);
  const [activeNode, setActiveNode] = useState(null);
  const [propFlowActive, setPropFlowActive] = useState(false);
  const [flowPath, setFlowPath] = useState([]);

  const tabs = ["state", "effects", "context", "refs"];

  const triggerFlow = useCallback((path) => {
    if (propFlowActive) return;
    setPropFlowActive(true);
    setFlowPath([]);
    path.forEach((node, i) => {
      setTimeout(() => {
        setFlowPath((p) => [...p, node]);
        setActiveNode(node);
      }, i * 380);
    });
    setTimeout(() => {
      setPropFlowActive(false);
      setActiveNode(null);
      setFlowPath([]);
    }, path.length * 380 + 500);
  }, [propFlowActive]);

  const treeNodes = [
    { id: "App",     label: "App",     depth: 0, x: "50%",  desc: "Root — holds count state" },
    { id: "Header",  label: "Header",  depth: 1, x: "18%",  desc: "Receives title prop" },
    { id: "Counter", label: "Counter", depth: 1, x: "50%",  desc: "Receives count + setCount" },
    { id: "Footer",  label: "Footer",  depth: 1, x: "82%",  desc: "Static — no props" },
    { id: "Display", label: "Display", depth: 2, x: "37%",  desc: "Renders count value" },
    { id: "Button",  label: "Button",  depth: 2, x: "63%",  desc: "Calls setCount on click" },
  ];

  const topMap = { 0: 10, 1: 90, 2: 158 };
  const isActive = (id) => flowPath.includes(id);

  const tabContent = {
    state: `const [count, setCount] = useState(0);
const [user, setUser] = useState(null);

// Functional updates (safe for async)
setCount(prev => prev + 1);

// Object state — always spread
setUser(prev => ({ ...prev, name: "Alex" }));`,
    effects: `useEffect(() => {
  const sub = store.subscribe(handler);
  return () => sub.unsubscribe(); // cleanup
}, [store]);

useEffect(() => {
  document.title = "My App";
}, []); // run once on mount`,
    context: `const ThemeCtx = createContext("dark");

function Provider({ children }) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}
const { theme } = useContext(ThemeCtx);`,
    refs: `const inputRef = useRef(null);
const countRef = useRef(0); // won't re-render

useEffect(() => {
  inputRef.current?.focus();
}, []);

const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));`,
  };

  return (
    <>
      <DocSection title="Hooks Reference">
        <div className="flex gap-1 mb-4 bg-white/4 rounded-lg p-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-1.5 text-xs font-mono rounded-md transition-all ${tab === t ? "bg-white/12 text-white" : "text-white/40 hover:text-white/70"}`}>
              {t}
            </button>
          ))}
        </div>
        <CodeBlock lang="jsx" code={tabContent[tab]} />
      </DocSection>

      <DocSection title="Interactive — Component Tree & Data Flow">
        <p className="text-white/40 text-xs mb-4">
          Click the counter or simulate events to watch props and state flow through the tree
        </p>

        <div className="rounded-lg border border-white/10 bg-[#05080f] overflow-hidden">
          {/* SVG tree */}
          <div className="p-5 relative" style={{ height: 228 }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Static edges */}
              {[["50%","32","18%","112"],["50%","32","50%","112"],["50%","32","82%","112"],
                ["50%","132","37%","180"],["50%","132","63%","180"]].map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              ))}
              {/* Active flow edges */}
              {isActive("App") && isActive("Counter") && (
                <line x1="50%" y1="32" x2="50%" y2="112" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
              )}
              {isActive("App") && isActive("Header") && (
                <line x1="50%" y1="32" x2="18%" y2="112" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
              )}
              {isActive("Counter") && isActive("Display") && (
                <line x1="50%" y1="132" x2="37%" y2="180" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 2" />
              )}
              {isActive("Counter") && isActive("Button") && (
                <line x1="50%" y1="132" x2="63%" y2="180" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 2" />
              )}
              {isActive("Button") && isActive("Counter") && (
                <line x1="63%" y1="180" x2="50%" y2="132" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
              )}
            </svg>

            {treeNodes.map((node) => (
              <div key={node.id} className="absolute -translate-x-1/2 transition-all duration-200"
                style={{ left: node.x, top: topMap[node.depth], zIndex: 1 }}>
                <div className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-all duration-200 ${
                  isActive(node.id)
                    ? "border-cyan-400/70 bg-cyan-500/15 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.35)]"
                    : "border-white/10 bg-white/4 text-white/50"
                }`}>
                  {node.label}
                </div>
              </div>
            ))}

            {activeNode && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
                <div className="px-3 py-1 rounded bg-white/8 border border-white/10 text-[11px] text-white/45">
                  {treeNodes.find((n) => n.id === activeNode)?.desc}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="border-t border-white/8 p-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-[10px] text-white/25 font-mono uppercase tracking-wider">live state</p>
              <div className="flex items-center gap-3">
                <button onClick={() => { setParentCount((c) => c - 1); triggerFlow(["App","Counter","Display"]); }}
                  className="w-7 h-7 rounded bg-white/8 hover:bg-white/15 text-white font-mono text-sm transition-colors">−</button>
                <span className="text-xl font-mono w-8 text-center tabular-nums transition-colors duration-200"
                  style={{ color: parentCount > 0 ? "#34d399" : parentCount < 0 ? "#f87171" : "white" }}>
                  {parentCount}
                </span>
                <button onClick={() => { setParentCount((c) => c + 1); triggerFlow(["App","Counter","Display"]); }}
                  className="w-7 h-7 rounded bg-white/8 hover:bg-white/15 text-white font-mono text-sm transition-colors">+</button>
              </div>
              <p className="text-[10px] text-white/20 font-mono">App → Counter → Display</p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] text-white/25 font-mono uppercase tracking-wider">simulate events</p>
              <div className="space-y-1.5">
                <button disabled={propFlowActive}
                  onClick={() => triggerFlow(["App","Header"])}
                  className="w-full text-left px-2.5 py-1.5 rounded text-[11px] font-mono border border-white/8 text-white/40 hover:border-purple-400/30 hover:text-purple-300 transition-all disabled:opacity-30">
                  title prop → Header
                </button>
                <button disabled={propFlowActive}
                  onClick={() => triggerFlow(["Button","Counter","App","Counter","Display"])}
                  className="w-full text-left px-2.5 py-1.5 rounded text-[11px] font-mono border border-white/8 text-white/40 hover:border-cyan-400/30 hover:text-cyan-300 transition-all disabled:opacity-30">
                  button click → re-render
                </button>
              </div>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection title="Component Patterns">
        <CodeBlock lang="jsx" code={`// Composition over inheritance
function Card({ children, className }) {
  return (
    <div className={\`rounded-lg border \${className}\`}>
      {children}
    </div>
  );
}

// Custom hook — logic extracted, reusable
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}`} />
      </DocSection>
    </>
  );
}

// ─── NODE DOC ─────────────────────────────────────────────────────────────
function NodeDoc() {
  return (
    <>
      <DocSection title="Server Basics">
        <p className="text-white/60 text-sm leading-7 mb-4">
          Node.js runs JavaScript on the server using the V8 engine. Non-blocking and event-driven
          — perfect for I/O-heavy APIs, real-time apps, and tooling.
        </p>
        <CodeBlock lang="js" code={`import express from "express";
const app = express();
app.use(express.json());

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await db.users.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running"));`} />
      </DocSection>

      <DocSection title="Middleware Pattern">
        <CodeBlock lang="js" code={`function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

app.get("/api/profile", authenticate, (req, res) => {
  res.json(req.user);
});`} />
      </DocSection>
    </>
  );
}

// ─── TAILWIND DOC ─────────────────────────────────────────────────────────
function TailwindDoc() {
  const [variant, setVariant] = useState("default");
  const [loadingType, setLoadingType] = useState("card");
  const [shimmerActive, setShimmerActive] = useState(true);

  const cardStyles = {
    default: "bg-white/5 border border-white/15 text-white",
    danger:  "bg-red-950/40 border border-red-500/40 text-red-200",
    success: "bg-emerald-950/40 border border-emerald-500/40 text-emerald-200",
    info:    "bg-blue-950/40 border border-blue-500/40 text-blue-200",
  };

  const shimmerStyle = `
    @keyframes tw-shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position:  600px 0; }
    }
    .tw-shimmer {
      background: linear-gradient(90deg,
        rgba(255,255,255,0.04) 25%,
        rgba(255,255,255,0.10) 50%,
        rgba(255,255,255,0.04) 75%);
      background-size: 1200px 100%;
      animation: tw-shimmer 1.6s ease-in-out infinite;
    }
  `;

  const Bone = ({ w = "w-full", h = "h-3", rounded = "rounded-full", className = "" }) => (
    <div className={`${h} ${w} ${rounded} ${shimmerActive ? "tw-shimmer" : "bg-white/6"} ${className} transition-colors duration-300`} />
  );

  const CardSkeleton = () => (
    <div className="rounded-xl border border-white/8 bg-white/3 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Bone w="w-10 shrink-0" h="h-10" rounded="rounded-full" />
        <div className="flex-1 space-y-2">
          <Bone w="w-2/3" h="h-3" />
          <Bone w="w-1/3" h="h-2" />
        </div>
      </div>
      <Bone w="w-full" h="h-28" rounded="rounded-lg" />
      <div className="space-y-2">
        <Bone h="h-2.5" /><Bone w="w-4/5" h="h-2.5" /><Bone w="w-3/5" h="h-2.5" />
      </div>
      <div className="flex gap-2 pt-1">
        <Bone w="flex-1" h="h-8" rounded="rounded-lg" />
        <Bone w="flex-1" h="h-8" rounded="rounded-lg" />
      </div>
    </div>
  );

  const ProfileSkeleton = () => (
    <div className="rounded-xl border border-white/8 bg-white/3 p-5">
      <Bone w="w-full" h="h-20" rounded="rounded-lg" className="mb-4" />
      <div className="-mt-10 mb-3 flex items-end justify-between">
        <Bone w="w-16 shrink-0" h="h-16" rounded="rounded-full" className="border-2 border-[#020202]" />
        <Bone w="w-20" h="h-7" rounded="rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <Bone w="w-1/2" h="h-4" /><Bone w="w-1/3" h="h-2.5" />
      </div>
      <div className="space-y-1.5 mb-4">
        <Bone /><Bone w="w-5/6" h="h-2" /><Bone w="w-4/6" h="h-2" />
      </div>
      <div className="flex gap-4 pt-4 border-t border-white/6">
        {["Posts","Followers","Following"].map((label) => (
          <div key={label} className="flex-1 text-center space-y-1.5">
            <Bone w="w-1/2 mx-auto" h="h-3" />
            <p className="text-[10px] text-white/20">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="rounded-xl border border-white/8 bg-white/3 divide-y divide-white/6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <Bone w="w-9 shrink-0" h="h-9" rounded="rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <Bone w="w-2/3" h="h-2.5" /><Bone w="w-1/2" h="h-2" />
          </div>
          <Bone w="w-14 shrink-0" h="h-6" rounded="rounded-full" />
        </div>
      ))}
    </div>
  );

  const skeletons = { card: CardSkeleton, profile: ProfileSkeleton, list: ListSkeleton };
  const ActiveSkeleton = skeletons[loadingType];

  return (
    <>
      <DocSection title="Utility-First CSS">
        <p className="text-white/60 text-sm leading-7 mb-4">
          Tailwind's utility classes map directly to CSS properties. Compose styles in markup
          — no naming friction, styles stay co-located with structure.
        </p>
        <CodeBlock lang="jsx" code={`<button className="
  px-4 py-2 rounded-lg font-medium text-sm
  bg-blue-600 hover:bg-blue-700
  text-white transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500/50
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Click me
</button>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" />`} />
      </DocSection>

      <DocSection title="Interactive — Skeleton Loading UI">
        <p className="text-white/40 text-xs mb-4">
          Skeleton screens feel faster than spinners — users see the layout before data arrives.
          Switch templates and toggle the shimmer effect.
        </p>
        <style>{shimmerStyle}</style>

        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex gap-2">
            {["card","profile","list"].map((t) => (
              <button key={t} onClick={() => setLoadingType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${
                  loadingType === t ? "border-sky-400/50 bg-sky-400/10 text-sky-300" : "border-white/10 text-white/40 hover:border-white/25"
                }`}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setShimmerActive((s) => !s)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${
              shimmerActive ? "border-emerald-400/40 bg-emerald-400/8 text-emerald-300" : "border-white/10 text-white/30"
            }`}>
            {shimmerActive ? "✦ shimmer on" : "shimmer off"}
          </button>
        </div>

        <ActiveSkeleton />

        <CodeBlock lang="jsx" code={`function SkeletonBar({ width = "w-full" }) {
  return (
    <div className={\`
      h-3 \${width} rounded-full
      bg-gradient-to-r
      from-white/4 via-white/10 to-white/4
      bg-[length:1200px_100%]
      animate-[shimmer_1.6s_ease-in-out_infinite]
    \`} />
  );
}`} />
      </DocSection>

      <DocSection title="Live Demo — Variant System">
        <div className="flex gap-2 mb-3 flex-wrap">
          {Object.keys(cardStyles).map((v) => (
            <button key={v} onClick={() => setVariant(v)}
              className={`px-2.5 py-1 rounded text-xs border transition-all ${variant === v ? "border-white/40 text-white" : "border-white/10 text-white/40 hover:border-white/25"}`}>
              {v}
            </button>
          ))}
        </div>
        <div className={`rounded-lg p-4 text-sm transition-all duration-300 ${cardStyles[variant]}`}>
          <p className="font-medium mb-1 capitalize">{variant} variant</p>
          <p className="opacity-70 text-xs">Styles change via className — no CSS files touched.</p>
        </div>
      </DocSection>
    </>
  );
}

// ─── NEXTJS DOC ───────────────────────────────────────────────────────────
function NextDoc() {
  return (
    <>
      <DocSection title="App Router">
        <p className="text-white/60 text-sm leading-7 mb-4">
          Next.js App Router uses the filesystem as routes. Folders map to URL segments.
          Special files like{" "}
          <code className="text-emerald-300/80 font-mono text-xs">layout.js</code>,{" "}
          <code className="text-emerald-300/80 font-mono text-xs">page.js</code>, and{" "}
          <code className="text-emerald-300/80 font-mono text-xs">loading.js</code> have reserved behavior.
        </p>
        <CodeBlock lang="bash" code={`app/
  layout.js          # Root layout — wraps all pages
  page.js            # Route: /
  globals.css
  dashboard/
    layout.js        # Nested layout for /dashboard/*
    page.js          # Route: /dashboard
    [id]/
      page.js        # Route: /dashboard/[id] (dynamic)`} />
      </DocSection>
      <DocSection title="Server vs Client Components">
        <CodeBlock lang="jsx" code={`// SERVER component (default) — runs on server
async function UserList() {
  const users = await db.users.findMany();
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// CLIENT component — "use client" directive
"use client";
function Toggle() {
  const [on, setOn] = useState(false);
  return <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>;
}

// Pattern: Server fetches, Client handles interactions
async function Page() {
  const data = await fetchData();
  return <InteractiveChart data={data} />;
}`} />
      </DocSection>
    </>
  );
}

// ─── PYTHON DOC ───────────────────────────────────────────────────────────
function PythonDoc() {
  return (
    <>
      <DocSection title="Python Fundamentals">
        <p className="text-white/60 text-sm leading-7 mb-4">
          Python's philosophy: readable, expressive, batteries-included. Commonly used for scripting,
          data science, ML pipelines, and backend APIs (FastAPI, Django).
        </p>
        <CodeBlock lang="python" code={`# List comprehensions
squares = [x**2 for x in range(10) if x % 2 == 0]

# Generators — lazy evaluation
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Decorators
def require_auth(func):
    def wrapper(request, *args, **kwargs):
        if not request.user:
            raise PermissionError("Not authenticated")
        return func(request, *args, **kwargs)
    return wrapper

@require_auth
def get_profile(request):
    return request.user.profile`} />
      </DocSection>
      <DocSection title="FastAPI Example">
        <CodeBlock lang="python" code={`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int | None = None

users: dict[int, User] = {}

@app.post("/users/{user_id}", status_code=201)
async def create_user(user_id: int, user: User):
    if user_id in users:
        raise HTTPException(status_code=409, detail="Already exists")
    users[user_id] = user
    return {"id": user_id, **user.model_dump()}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    if user_id not in users:
        raise HTTPException(status_code=404)
    return users[user_id]`} />
      </DocSection>
    </>
  );
}

// ─── DOC MAP ──────────────────────────────────────────────────────────────
const DOC_COMPONENTS = {
  HTML5: HTMLDoc, CSS3: CSSDoc, JavaScript: JSDoc, React: ReactDoc,
  "Node.js": NodeDoc, "Tailwind CSS": TailwindDoc, "Next.js": NextDoc, Python: PythonDoc,
};

const SKILL_COLORS = {
  HTML5: "#E44D26", CSS3: "#1572B6", JavaScript: "#F7DF1E", "Node.js": "#3C873A",
  React: "#61DAFB", "Tailwind CSS": "#38BDF8", "Next.js": "#ffffff", Python: "#3776AB",
};

function EmptyState({ allSkills = [], onSelectSkill }) {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-10">
        <p className="text-[10px] text-white/25 font-mono tracking-[0.2em] uppercase mb-3">docs / overview</p>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Stack & Docs</h1>
        <p className="text-white/40 text-sm leading-7 max-w-lg">
          Interactive explainers for every technology in my stack. Select a language from the sidebar or jump in below.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {allSkills.map(({ name, icon, color, proficiency }) => (
          <button key={name} onClick={() => onSelectSkill(name)}
            className="group flex flex-col items-start gap-3 p-4 rounded-lg border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 transition-all duration-200 text-left">
            <span style={{ color }} className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
            <div>
              <p className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">{name}</p>
              <p className="text-[10px] text-white/25 mt-0.5">{proficiency}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SkillDoc({ skill, allSkills = [], onSelectSkill }) {
  const DocComponent = skill ? DOC_COMPONENTS[skill] : null;
  const accentColor = SKILL_COLORS[skill] || "#3b82f6";

  if (!skill) return <EmptyState allSkills={allSkills} onSelectSkill={onSelectSkill} />;

  return (
    <div key={skill} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8 pb-6 border-b border-white/8">
        <div className="inline-block text-xs font-mono px-2 py-0.5 rounded mb-3 border"
          style={{ color: accentColor, borderColor: `${accentColor}30`, background: `${accentColor}10` }}>
          docs / {skill.toLowerCase().replace(/\s+/g, "-")}
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">{skill}</h1>
      </div>
      {DocComponent && <DocComponent />}
    </div>
  );
}