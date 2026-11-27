"use client";
import { useEffect } from "react";
import "./dashboard-demos.css";

// Interactive motion demos for the Data dashboard UI case study.
// Each demo is static markup; <DemoRunner /> animates them while they are on screen
// (loops while visible, "Replay" restarts, off under prefers-reduced-motion).
// All styles live in dashboard-demos.css, scoped under .ddw.

const P = "/Project_data_dashboard/";

function Replay({ id }: { id: string }) {
  return (
    <div className="ctl">
      <button type="button" data-dd-replay={id}>
        Replay
      </button>
    </div>
  );
}

function StatusBar() {
  return (
    <>
      <div className="isl" />
      <div className="sb">
        <span>9:41</span>
        <span>●●● ▮</span>
      </div>
    </>
  );
}

/** Decision 1 — Fleet → Unit → Day */
export function FleetToDayDemo() {
  return (
    <div className="ddw">
      <div className="stage" id="dd-s1">
        <div>
          <div className="crumb">
            <span data-i="0" className="on">Fleet</span>
            <span data-i="1">Unit</span>
            <span data-i="2">Day</span>
          </div>
          <div className="phone">
            <div className="scr">
              <StatusBar />
              <div className="track" id="dd-trk">
                <img src={`${P}s_fleet.jpg`} alt="Fleet view" />
                <img src={`${P}s_unit.jpg`} alt="Unit profile" />
                <img src={`${P}s_daily.jpg`} alt="Daily log" />
              </div>
              <div className="tap" id="dd-tap" />
            </div>
          </div>
        </div>
        <Replay id="dd-s1" />
      </div>
    </div>
  );
}

/** Decision 2 — status cards replace the code grid */
export function StatusCardsDemo() {
  return (
    <div className="ddw">
      <div className="stage" id="dd-s2">
        <div className="d2">
          <div className="grid100" id="dd-g100" />
          <div className="fl" id="dd-fl">
            <span>All</span>
            <span>Online</span>
            <span>Offline</span>
          </div>
          <div className="cards" id="dd-cards" />
        </div>
        <Replay id="dd-s2" />
      </div>
    </div>
  );
}

/** Decision 3 — ten labels merge into four metrics */
export function MetricsDemo() {
  return (
    <div className="ddw">
      <div className="stage" id="dd-s3">
        <div className="d3" id="dd-d3" />
        <Replay id="dd-s3" />
      </div>
    </div>
  );
}

/** Decision 4 — negative bars become zero-based paired bars */
export function ZeroChartDemo() {
  return (
    <div className="ddw">
      <div className="stage" id="dd-s4">
        <div className="d4">
          <div className="ch before" id="dd-ch">
            <div className="plot" id="dd-plot" />
          </div>
          <div className="lg">
            <span>
              <span className="k"><i style={{ background: "#19a59b" }} />Up</span>
              {"  "}
              <span className="k"><i style={{ background: "#263d42" }} />Down</span>
            </span>
            <button type="button" className="tg" id="dd-tg" style={{ border: 0, background: "none", cursor: "pointer", font: "inherit", color: "inherit" }}>
              <i />Operational days only
            </button>
          </div>
        </div>
        <Replay id="dd-s4" />
      </div>
    </div>
  );
}

/** Decision 5 — the mobile daily log fills in */
export function DailyDemo() {
  return (
    <div className="ddw">
      <div className="stage" id="dd-s5">
        <div className="phone">
          <div className="scr">
            <StatusBar />
            <div className="dy">
              <div className="hd">
                <span className="lg2">K</span>
                <span className="unit">Site A</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>Thursday, Apr 10, 2025</div>
              <div className="days" id="dd-days" />
              <div className="cd">
                <div className="t">Transported Load</div>
                <div className="big"><small>Total</small><span id="dd-tot">0</span><small>kg</small></div>
                <div className="ud">
                  <div><span style={{ color: "#19a59b" }}>■</span> up<b id="dd-up">0 kg</b></div>
                  <div><span>■</span> down<b id="dd-dn">0 kg</b></div>
                </div>
              </div>
              <div className="cd">
                <div className="t">Operating Time</div>
                <div className="big"><span id="dd-hh">0</span><small>h</small><span id="dd-mm">0</span><small>min</small></div>
                <div className="tline"><i id="dd-tlb" /></div>
                <div className="ticks"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
                <div className="se">
                  <div><em>START</em><b id="dd-st">—</b><div><span className="bat" style={{ ["--b" as string]: "99%" }}><i /></span>99%</div></div>
                  <div><em>END</em><b id="dd-en">—</b><div><span className="bat" id="dd-bat" style={{ ["--b" as string]: "99%" }}><i /></span><span id="dd-bp">99%</span></div></div>
                </div>
              </div>
            </div>
            <div className="nav"><span>Profile</span><span className="on">Daily</span><span>Time Range</span><span>Fleet</span></div>
          </div>
        </div>
        <Replay id="dd-s5" />
      </div>
    </div>
  );
}

type Token = { x: boolean };

/** Mount once on the page, after the demos. */
export function DemoRunner() {
  useEffect(() => {
    const $ = (id: string) => document.getElementById(id) as HTMLElement;
    if (!$("dd-s1")) return;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dead = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, RM || dead ? 0 : ms));
    const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
    const count = (el: HTMLElement, n: number, ms: number) => {
      if (RM) { el.textContent = fmt(n); return; }
      const t0 = performance.now();
      const f = (now: number) => {
        if (dead) return;
        const p = Math.min(1, (now - t0) / ms);
        el.textContent = fmt(n * (1 - (1 - p) ** 3));
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    };
    const runs: Record<string, (t: Token) => Promise<void>> = {};

    // Decision 1
    const trk = $("dd-trk"), tap = $("dd-tap");
    const crumbs = Array.from(document.querySelectorAll<HTMLElement>("#dd-s1 .crumb span"));
    const go = (i: number) => {
      trk.style.transform = `translateX(${-i * 33.333}%)`;
      crumbs.forEach((c) => c.classList.toggle("on", Number(c.dataset.i) === i));
    };
    const tapAt = async (x: number, y: number) => {
      tap.style.left = x + "px"; tap.style.top = y + "px";
      await wait(550); tap.classList.add("on");
      await wait(250); tap.classList.add("press");
      await wait(180); tap.classList.remove("press");
      await wait(200); tap.classList.remove("on");
    };
    runs["dd-s1"] = async (t) => {
      go(0); tap.style.left = "129px"; tap.style.top = "300px";
      await wait(900); if (t.x) return;
      await tapAt(67, 410); if (t.x) return; go(1); await wait(1400); if (t.x) return;
      await tapAt(100, 518); if (t.x) return; go(2); await wait(1800);
    };

    // Decision 2
    const g = $("dd-g100");
    const L = ["S", "P", "N", "R", "D"], C = ["US", "UK", "DE", "EU", "FR", "CA"];
    g.innerHTML = Array.from({ length: 100 }, (_, i) =>
      `<div class="${i === 70 ? "G" : i % 23 === 7 ? "g" : ""}"><span>${i + 1}</span><span>${C[i % 6]}</span><span>${L[(i * 7) % 5]}</span></div>`
    ).join("");
    const units: [string, string, number, number][] = [
      ["Site A", "on", 25, 5], ["Site B", "off", 50, 10], ["Site C", "on", 50, 10],
      ["Site D", "det", 0, 0], ["Site E", "off", 0, 0], ["Site F", "off", 0, 0],
    ];
    const lab: Record<string, string> = { on: "Online", off: "Offline", det: "Detached" };
    const cards = $("dd-cards"), fl = $("dd-fl");
    cards.innerHTML = units.map((u) =>
      `<div class="uc" data-s="${u[1]}"><span class="chip ${u[1]}1">${lab[u[1]]}</span><h4>${u[0]}</h4><div class="mute" style="font-size:11px">Utilization, last 4 weeks</div><div class="pct ${u[2] ? "" : "z"}">${u[2]}%</div><div class="bar"><i data-w="${u[2]}"></i></div><div class="wd">${u[3]} of 20 workdays</div></div>`
    ).join("");
    const ucs = Array.from(cards.children) as HTMLElement[], fs = Array.from(fl.children) as HTMLElement[];
    const barOf = (c: HTMLElement) => c.querySelector("i") as HTMLElement;
    runs["dd-s2"] = async (t) => {
      g.style.opacity = "1"; g.style.transform = "none"; fl.classList.remove("in"); fs.forEach((f) => f.classList.remove("on"));
      ucs.forEach((c) => { c.classList.remove("in", "dim"); barOf(c).style.width = "0"; });
      await wait(1600); if (t.x) return; g.style.opacity = "0"; g.style.transform = "scale(.96)"; await wait(500);
      for (const c of ucs) { if (t.x) return; c.classList.add("in"); await wait(130); }
      ucs.forEach((c) => { const i = barOf(c); i.style.width = i.dataset.w + "%"; });
      fl.classList.add("in"); fs[0].classList.add("on"); await wait(1600); if (t.x) return;
      fs[0].classList.remove("on"); fs[2].classList.add("on");
      ucs.forEach((c) => c.classList.toggle("dim", c.dataset.s !== "off")); await wait(1800);
    };

    // Decision 3
    const rows: [string[], string, number, string, string][] = [
      [["Load ↑/↓", "Daily Load Sum", "Cumulative Load Sum"], "Transported Load", 98498, "kg", "13,237 kg up · 85,261 kg down"],
      [["Total Cycles", "Cycles / Hour"], "Trips", 1499, "trips", "20 trips per operating hour"],
      [["Duration", "Total Operating Time [Hours]"], "Operating Time", 298, "hours", "Across 45 operational days"],
      [["Days of Use", "Operational days", "Usage Ratio"], "Utilization", 70, "%", "45 of 64 workdays"],
    ];
    const d3 = $("dd-d3");
    d3.innerHTML = rows.map((r) =>
      `<div class="vr"><div class="olds">${r[0].map((o) => `<span>${o}</span>`).join("")}</div><div class="arr">→</div><div class="nt"><b>${r[1]}</b><div class="v"><span data-n="${r[2]}">0</span><small>${r[3]}</small></div><div class="s">${r[4]}</div></div></div>`
    ).join("");
    runs["dd-s3"] = async (t) => {
      const vrs = Array.from(d3.children) as HTMLElement[];
      vrs.forEach((v) => { v.classList.remove("done"); (v.querySelector("[data-n]") as HTMLElement).textContent = "0"; });
      await wait(900);
      for (const v of vrs) {
        if (t.x) return;
        v.classList.add("done");
        const el = v.querySelector("[data-n]") as HTMLElement;
        count(el, Number(el.dataset.n), 900);
        await wait(1100);
      }
      await wait(1400);
    };

    // Decision 4
    const data = [[4, 320, 0], [5, 0, 0], [6, 0, 0], [7, 0, 0], [8, 1000, 0], [9, 1000, 0], [10, 320, 800], [11, 700, 150], [12, 0, 0], [13, 0, 0], [14, 440, 20]];
    const plot = $("dd-plot"), ch = $("dd-ch"), tg = $("dd-tg");
    plot.innerHTML =
      '<div class="base"></div>' +
      [1000, 500, 0, -500, -1000].map((v) => `<span class="ax" data-v="${v}">${v}</span>`).join("") +
      data.map((d) => `<div class="col" data-z="${d[1] + d[2] ? 0 : 1}"><span class="u" data-v="${d[1]}"></span><span class="d" data-v="${d[2]}"></span><b>${d[0]}</b></div>`).join("");
    const base = plot.querySelector(".base") as HTMLElement;
    const axs = Array.from(plot.querySelectorAll<HTMLElement>(".ax")), cols = Array.from(plot.querySelectorAll<HTMLElement>(".col"));
    const draw = (before: boolean) => {
      ch.className = "ch " + (before ? "before" : "after");
      base.style.bottom = before ? "50%" : "0%";
      axs.forEach((a) => {
        const v = Number(a.dataset.v);
        if (before) { a.style.bottom = 50 + v / 20 + "%"; a.style.opacity = "1"; a.textContent = String(v); }
        else { a.style.opacity = v < 0 ? "0" : "1"; a.style.bottom = (v >= 0 ? v / 10 : 0) + "%"; a.textContent = v < 0 ? "" : String(v); }
      });
      cols.forEach((c) => {
        const u = c.querySelector(".u") as HTMLElement, d = c.querySelector(".d") as HTMLElement;
        const uv = Number(u.dataset.v), dv = Number(d.dataset.v);
        if (before) { u.style.bottom = "50%"; u.style.height = uv / 20 + "%"; d.style.height = dv / 20 + "%"; d.style.bottom = 50 - dv / 20 + "%"; }
        else { u.style.bottom = "0%"; u.style.height = uv / 10 + "%"; d.style.bottom = "0%"; d.style.height = dv / 10 + "%"; }
      });
    };
    const ops = (on: boolean) => { tg.classList.toggle("on", on); cols.forEach((c) => c.classList.toggle("gone", on && c.dataset.z === "1")); };
    const onToggle = () => ops(!tg.classList.contains("on"));
    tg.addEventListener("click", onToggle);
    runs["dd-s4"] = async (t) => { ops(false); draw(true); await wait(1800); if (t.x) return; draw(false); await wait(1900); if (t.x) return; ops(true); await wait(2000); };

    // Decision 5
    const days = $("dd-days");
    days.innerHTML = [["Su", 6], ["Mo", 7], ["Tu", 8], ["We", 9], ["Th", 10], ["Fr", 11], ["Sa", 12]].map((d) => `<div>${d[0]}<b>${d[1]}</b></div>`).join("");
    const dd = Array.from(days.children) as HTMLElement[];
    runs["dd-s5"] = async (t) => {
      dd.forEach((d) => d.classList.remove("sel")); dd[3].classList.add("sel");
      ["dd-tot", "dd-hh", "dd-mm"].forEach((i) => ($(i).textContent = "0"));
      $("dd-up").textContent = "0 kg"; $("dd-dn").textContent = "0 kg"; $("dd-st").textContent = "—"; $("dd-en").textContent = "—";
      $("dd-tlb").style.width = "0"; $("dd-bat").style.setProperty("--b", "99%"); $("dd-bp").textContent = "99%";
      await wait(1000); if (t.x) return; dd[3].classList.remove("sel"); dd[4].classList.add("sel"); await wait(350);
      count($("dd-tot"), 1120, 1000); $("dd-up").textContent = "320 kg"; $("dd-dn").textContent = "800 kg"; await wait(700); if (t.x) return;
      $("dd-tlb").style.width = "28.5%"; count($("dd-hh"), 6, 1100); count($("dd-mm"), 49, 1100); $("dd-st").textContent = "07:25 am";
      await wait(1200); $("dd-en").textContent = "14:15 pm"; $("dd-bat").style.setProperty("--b", "79%"); $("dd-bp").textContent = "79%"; await wait(2200);
    };

    // Runner: play while visible, loop, replay
    const ids = ["dd-s1", "dd-s2", "dd-s3", "dd-s4", "dd-s5"];
    const tokens: Record<string, Token> = {};
    const visible: Record<string, boolean> = {};
    const play = async (id: string) => {
      if (tokens[id]) tokens[id].x = true;
      const t: Token = (tokens[id] = { x: false });
      do {
        await runs[id](t);
        if (t.x || RM || dead) break;
        await wait(600);
      } while (!t.x && !dead && visible[id]);
    };
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        const id = e.target.id;
        visible[id] = e.isIntersecting;
        if (e.isIntersecting && (!tokens[id] || tokens[id].x)) play(id);
        else if (!e.isIntersecting && tokens[id]) tokens[id].x = true;
      }),
      { threshold: 0.35 }
    );
    ids.forEach((id) => io.observe($(id)));
    const onReplay = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-dd-replay]");
      if (b?.dataset.ddReplay) play(b.dataset.ddReplay);
    };
    document.addEventListener("click", onReplay);

    return () => {
      dead = true;
      Object.values(tokens).forEach((t) => (t.x = true));
      io.disconnect();
      tg.removeEventListener("click", onToggle);
      document.removeEventListener("click", onReplay);
    };
  }, []);
  return null;
}
