
import { useMemo, useState } from 'react'

type Page =
  | 'Overview'
  | 'Arena & Context Analysis'
  | 'Cognitive State Tree'
  | 'Shadow Sandbox'
  | 'Sentinel Telemetry'
  | 'Chaos & Policies'
  | 'ROI & Benchmarks'
  | 'Auto Demo'

const nav: { name: Page; icon: string; group: string }[] = [
  { name: 'Overview', icon: '⌂', group: 'WORKSPACE' },
  { name: 'Arena & Context Analysis', icon: '◫', group: 'WORKSPACE' },
  { name: 'Cognitive State Tree', icon: '⌘', group: 'RUNTIME' },
  { name: 'Shadow Sandbox', icon: '▣', group: 'RUNTIME' },
  { name: 'Sentinel Telemetry', icon: '⌁', group: 'OBSERVABILITY' },
  { name: 'Chaos & Policies', icon: '⚙', group: 'OBSERVABILITY' },
  { name: 'ROI & Benchmarks', icon: '▥', group: 'INSIGHTS' },
  { name: 'Auto Demo', icon: '▷', group: 'INSIGHTS' },
]

const scenarios = [
  'SQL schema trap',
  'Research drift',
  'Mass-delete protection',
]

const eventsSeed = [
  ['Request authorized', 'green', '09:42:18'],
  ['Constraint warning', 'yellow', '09:42:17'],
  ['Constraint warning', 'yellow', '09:42:16'],
  ['Request authorized', 'green', '09:42:15'],
  ['Error intercepted', 'red', '09:42:14'],
  ['Request authorized', 'green', '09:42:13'],
  ['Constraint warning', 'yellow', '09:42:12'],
  ['Error intercepted', 'red', '09:42:11'],
  ['Request authorized', 'green', '09:42:10'],
]

function Icon({ children }: { children: string }) {
  return <span className="navIcon">{children}</span>
}

function Metric({
  label,
  value,
  sub,
  trend,
}: {
  label: string
  value: string
  sub: string
  trend?: string
}) {
  return (
    <div className="metric card">
      <div className="metricLabel">{label}</div>
      <div className="metricValue">
        {value}
        {trend && <span className="trend">{trend}</span>}
      </div>
      <div className="metricSub">{sub}</div>
    </div>
  )
}

function Donut() {
  return (
    <div className="donutWrap">
      <div className="donut">
        <div className="donutHole">
          <b>3.2K</b>
          <small>TOKENS</small>
        </div>
      </div>
      <div className="legend">
        {[
          ['System', '23%', 'mint'],
          ['User', '28%', 'yellow'],
          ['Assistant', '17%', 'blue'],
          ['Memory', '8%', 'purple'],
          ['Tool output', '24%', 'pink'],
        ].map((x) => (
          <div key={x[0]}>
            <i className={x[2]} />
            <span>{x[0]}</span>
            <b>{x[1]}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

function NodeTree() {
  return (
    <div className="treeCanvas">
      <svg viewBox="0 0 620 245" role="img" aria-label="Cognitive state branch graph">
        <g fill="none" strokeWidth="2.2">
          <path d="M150 122 C190 122 190 65 235 65" stroke="#59dfb7" />
          <path d="M150 122 C190 122 190 184 235 184" stroke="#59dfb7" />
          <path d="M365 65 C410 65 405 28 452 28" stroke="#59dfb7" />
          <path d="M365 65 C410 65 405 78 452 78" stroke="#e66a78" strokeDasharray="6 5" />
          <path d="M365 65 C410 65 405 128 452 128" stroke="#a88af5" strokeDasharray="6 5" />
          <path d="M365 184 C410 184 405 164 452 164" stroke="#59dfb7" />
          <path d="M365 184 C410 184 405 215 452 215" stroke="#59dfb7" />
        </g>
        <g fontSize="15" fontFamily="Inter, sans-serif" textAnchor="middle">
          <rect x="12" y="103" width="138" height="38" rx="19" fill="#164b42" stroke="#5ee2bb" strokeWidth="2" />
          <text x="81" y="127" fill="#9cf4d7">Committed step</text>
          <rect x="235" y="46" width="130" height="38" rx="19" fill="#164b42" stroke="#5ee2bb" strokeWidth="2" />
          <text x="300" y="70" fill="#9cf4d7">Committed step</text>
          <rect x="235" y="165" width="130" height="38" rx="19" fill="#164b42" stroke="#5ee2bb" strokeWidth="2" />
          <text x="300" y="189" fill="#9cf4d7">Committed step</text>
          <rect x="452" y="9" width="156" height="38" rx="19" fill="#164b42" stroke="#5ee2bb" strokeWidth="1.5" />
          <text x="530" y="33" fill="#9cf4d7">Committed steps</text>
          <rect x="452" y="59" width="156" height="38" rx="19" fill="#48252e" stroke="#d65b6a" strokeDasharray="5 4" />
          <text x="530" y="83" fill="#f18b98">Pruned error node</text>
          <rect x="452" y="109" width="156" height="38" rx="19" fill="#342b57" stroke="#a78bf4" />
          <text x="530" y="133" fill="#c6b8ff">Injected constraint</text>
          <rect x="452" y="145" width="156" height="38" rx="19" fill="#164b42" stroke="#5ee2bb" />
          <text x="530" y="169" fill="#9cf4d7">Committed step 2</text>
          <rect x="452" y="196" width="156" height="38" rx="19" fill="#164b42" stroke="#5ee2bb" />
          <text x="530" y="220" fill="#9cf4d7">Committed step 3</text>
        </g>
      </svg>
    </div>
  )
}

function BarChart() {
  const vals = [64, 51, 74, 53, 75, 59, 47, 32, 44, 28, 93, 28, 46, 60, 53, 39]

  return (
    <div className="barChart">
      <div className="yLabels">
        <span>100</span>
        <span>80</span>
        <span>60</span>
        <span>40</span>
        <span>20</span>
        <span>0</span>
      </div>
      <div className="bars">
        {vals.map((v, i) => (
          <div className="barCol" key={i}>
            <div className={'bar ' + (i === 10 ? 'danger' : '')} style={{ height: `${v}%` }} />
            <small>{i % 2 === 0 ? `S${Math.floor(i / 2) + 1}` : ''}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

function Events({ events }: { events: string[][] }) {
  return (
    <div className="events">
      {events.map((e, i) => (
        <div className="event" key={i}>
          <i className={e[1]} />
          <span>{e[0]}</span>
          <time>{e[2]}</time>
        </div>
      ))}
    </div>
  )
}

function CodeDiff({ compact = false }: { compact?: boolean }) {
  return (
    <div className={'codeWindow ' + (compact ? 'compact' : '')}>
      <div className="codeTop">
        <span>⌄ &nbsp;↑ <b>▰▰▰</b> &nbsp; context.patch</span>
        <span>▢ &nbsp;···</span>
      </div>
      <div className="codeLine mutedCode">@@ -12,7 +12,12 @@ agent_context</div>
      <div className="codeLine"><em>1</em> <span>const response = await agent.run();</span></div>
      <div className="codeLine"><em>2</em> <span>const recent = state.lastAction;</span></div>
      <div className="codeLine removed"><em>3</em> <span>− query = "SELECT * FROM users_v1";</span></div>
      <div className="codeLine added"><em>4</em> <span>+ query = "SELECT * FROM users_v2";</span></div>
      <div className="codeLine added"><em>5</em> <span>+ constraint: use UUID for user lookup</span></div>
      <div className="codeLine"><em>6</em> <span>const result = await tools.execute(query);</span></div>
      <div className="codeLine removed"><em>7</em> <span>− retry(previous_context + error);</span></div>
      <div className="codeLine added"><em>8</em> <span>+ rollback(snapshot);</span></div>
      <div className="codeLine added"><em>9</em> <span>+ injectConstraint(policy);</span></div>
    </div>
  )
}

function Overview({ events }: { events: string[][] }) {
  return (
    <>
      <div className="metrics">
        <Metric label="SUCCESS RATE" value="96.4%" sub="+60.4% vs baseline" trend="↗" />
        <Metric label="SENTINEL LATENCY" value="3.8ms" sub="(<20ms target)" />
        <Metric label="LOOPS HEALED" value="14" sub="(rollbacks triggered)" />
        <Metric label="TOKENS SAVED" value="15.3K" sub="(74% cost saved)" />
      </div>

      <div className="dashboardGrid">
        <div className="card treeCard">
          <div className="cardTitle">Branching node tree <span className="liveTag">LIVE STATE</span></div>
          <NodeTree />
        </div>

        <div className="card contextCard">
          <div className="cardTitle">Context health <span className="muted">3.2K tokens</span></div>
          <Donut />
        </div>

        <div className="card chartCard">
          <div className="cardTitle">Step similarity & drift scores</div>
          <BarChart />
          <div className="chartLegend">
            <span><i className="mintDot" /> Goal alignment</span>
            <span><i className="redDot" /> Drift event</span>
          </div>
        </div>

        <div className="card diffCard">
          <div className="cardTitle">Latest context diff <span className="muted">context.patch</span></div>
          <CodeDiff compact />
        </div>

        <div className="rightStack">
          <div className="card healthCard">
            <div className="healthRings">
              {[
                ['94%', 'Goal', 'alignment'],
                ['89%', 'Context', 'purity'],
                ['100%', 'Sandbox', 'safety'],
              ].map((x) => (
                <div className="ringItem" key={x[1]}>
                  <div className="ring"><b>{x[0]}</b></div>
                  <span>{x[1]}<br />{x[2]}</span>
                </div>
              ))}
            </div>

            <div className="budget">
              <div className="budgetHead"><span>Token budget</span><b>125 / 368</b></div>
              <div className="progress"><i style={{ width: '48%' }} /></div>
              <div className="budgetHead"><span>Context utilization</span><b>68%</b></div>
              <div className="progress"><i style={{ width: '68%' }} /></div>
              <div className="budgetHead"><span>Policy compliance</span><b>100%</b></div>
              <div className="progress"><i style={{ width: '100%' }} /></div>
            </div>
          </div>

          <div className="card eventCard">
            <div className="cardTitle">Recent sentinel events <span className="liveTag">LIVE</span></div>
            <Events events={events} />
          </div>
        </div>
      </div>
    </>
  )
}

function ArenaContext() {
  const [hasRun, setHasRun] = useState(false)
  const [runCount, setRunCount] = useState(0)
  const [running, setRunning] = useState(false)

  const startComparison = () => {
    if (running) return

    setRunning(true)
    setHasRun(false)

    window.setTimeout(() => {
      setHasRun(true)
      setRunCount((count) => count + 1)
      setRunning(false)
    }, 800)
  }

  return (
    <div className="pageStack">
      <div className="pageIntro">
        <div>
          <p className="eyebrow">CONTROLLED EXPERIMENT</p>
          <h2>Agent Arena</h2>
          <p>Run the same task against an unprotected agent and a CSHR-protected agent.</p>
        </div>

        <button className="primary" onClick={startComparison} disabled={running}>
          {running ? '⟳ Running comparison...' : hasRun ? '↻ Run comparison again' : '▷ Start comparison'}
        </button>
      </div>

      {hasRun && (
        <div className="liveTag" role="status">
          ✓ Comparison #{runCount} completed successfully
        </div>
      )}

      <div className="twoCol">
        <div className="card agentPanel">
          <div className="panelHead">
            <span className="redPill">UNPROTECTED AGENT</span>
            <b>Standard execution</b>
          </div>

          <div className="terminal">
            <p className="dim">$ agent.run("Migrate customer records")</p>
            <p>✓ Step 1 · Read schema</p>
            <p>✓ Step 2 · Inspect records</p>
            <p className="bad">✕ Step 3 · Invalid column: user_id</p>
            <p className="bad">↻ Step 4 · Retrying with same schema...</p>
            <p className="bad">✕ Step 5 · Context polluted</p>
            <div className="terminalAlert">EXECUTION FAILED · 8,420 TOKENS CONSUMED</div>
          </div>

          <div className="panelFoot">
            <span>Completion</span>
            <b className="badText">35.8%</b>
          </div>
        </div>

        <div className="card agentPanel">
          <div className="panelHead">
            <span className="greenPill">CSHR PROTECTED</span>
            <b>Self-healing execution</b>
          </div>

          <div className="terminal">
            <p className="dim">$ cshr.protect(agent).run(task)</p>
            <p>✓ Step 1 · Read schema</p>
            <p>✓ Step 2 · Inspect records</p>
            <p className="bad">⚠ Step 3 · Schema mismatch detected</p>
            <p className="purpleText">↶ Rollback to checkpoint #2</p>
            <p className="good">✓ Constraint injected · UUID on users_v2</p>
            <p className="good">✓ Step 4–8 · Task completed</p>
            <div className="terminalSuccess">TASK COMPLETED · 2,190 TOKENS</div>
          </div>

          <div className="panelFoot">
            <span>Completion</span>
            <b className="goodText">96.4%</b>
          </div>
        </div>
      </div>

      <div className="metrics three">
        <Metric label="TOKEN REDUCTION" value="74%" sub="vs. unprotected run" />
        <Metric label="RECOVERY TIME" value="18ms" sub="from detection to rewind" />
        <Metric label="SIDE EFFECTS" value="0" sub="unsafe mutations committed" />
      </div>

      {/* CONTEXT DIFF SECTION */}
      <div className="pageIntro" style={{ marginTop: '28px' }}>
        <div>
          <p className="eyebrow">SURGICAL CONTEXT PRUNING</p>
          <h2>X-Ray Context Diff</h2>
          <p>
            Inspect exactly what CSHR removed and what it injected
            before the next model call.
          </p>
        </div>
        <span className="greenPill">ROLLBACK VERIFIED</span>
      </div>

      <div className="card">
        <div className="cardTitle">
          Prompt mutation · checkpoint #002
          <span className="muted">JSON / PROMPT DIFF</span>
        </div>
        <CodeDiff />
      </div>

      <div className="twoCol">
        <div className="card miniInfo">
          <h3 className="badText">Removed toxic context</h3>
          <p>
            Invalid schema assumption, repeated retry trace and
            hallucinated column references were excluded from the
            next context window.
          </p>
        </div>

        <div className="card miniInfo">
          <h3 className="goodText">Injected system constraint</h3>
          <p>
            Do not query users_v1 using id. Use UUID on users_v2
            for all customer lookups.
          </p>
        </div>
      </div>
    </div>
  )
}

function TreePage() {
  const [checkpointCount, setCheckpointCount] = useState(0)
  const [lastCheckpoint, setLastCheckpoint] = useState('')

  const createCheckpoint = () => {
    const nextCheckpoint = checkpointCount + 1

    setCheckpointCount(nextCheckpoint)
    setLastCheckpoint(
      `Checkpoint #${nextCheckpoint} created successfully at ${new Date().toLocaleTimeString()}`
    )
  }

  return (
    <div className="pageStack">
      <div className="pageIntro">
        <div>
          <p className="eyebrow">WORKING MEMORY VISUALIZATION</p>
          <h2>Cognitive State Tree</h2>
          <p>Explore execution checkpoints, failed branches and injected constraints.</p>
        </div>

        <button className="secondary" onClick={createCheckpoint}>
          ＋ Create checkpoint
        </button>
      </div>

      {lastCheckpoint && (
        <div className="card" style={{ padding: '14px 18px' }}>
          <span className="greenPill">CHECKPOINT CREATED</span>
          <p>{lastCheckpoint}</p>
          <p>Total new checkpoints: {checkpointCount}</p>
        </div>
      )}

      <div className="card">
        <div className="cardTitle">
          Execution branch · Session #CSHR-2048
          <span className="liveTag">LIVE</span>
        </div>
        <NodeTree />
      </div>

      <div className="threeCards">
        <div className="card miniInfo">
          <span className="greenPill">COMMITTED</span>
          <h3>12 nodes</h3>
          <p>Verified reasoning and tool steps retained in the active context.</p>
        </div>

        <div className="card miniInfo">
          <span className="redPill">PRUNED</span>
          <h3>3 nodes</h3>
          <p>Failed reasoning branches removed from the active prompt.</p>
        </div>

        <div className="card miniInfo">
          <span className="purplePill">INJECTED</span>
          <h3>2 constraints</h3>
          <p>High-signal policy constraints added after recovery.</p>
        </div>
      </div>
    </div>
  )
}

function Shadow() {
  const [query, setQuery] = useState(
    "UPDATE customers SET status = 'inactive' WHERE last_seen < NOW() - INTERVAL '90 days';"
  )
  const [ran, setRan] = useState(false)

  return (
    <div className="pageStack">
      <div className="pageIntro">
        <div>
          <p className="eyebrow">TRANSACTIONAL SAFETY LAYER</p>
          <h2>Shadow-Commit Sandbox</h2>
          <p>Dry-run mutations, inspect blast radius and decide whether to commit.</p>
        </div>
        <span className="greenPill">PRODUCTION ISOLATED</span>
      </div>

      <div className="twoCol">
        <div className="card editorCard">
          <div className="cardTitle">Mutation editor <span className="muted">SQL · PostgreSQL</span></div>
          <textarea
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setRan(false)
            }}
          />
          <div className="buttonRow">
            <button
              className="secondary"
              onClick={() => {
                setQuery('DELETE FROM customers;')
                setRan(false)
              }}
            >
              Load risky query
            </button>
            <button className="primary" onClick={() => setRan(true)}>▷ Run dry-run</button>
          </div>
        </div>

        <div className="card resultsCard">
          <div className="cardTitle">Shadow execution result</div>
          {ran ? (
            <>
              <div className="resultStatus warning">⚠ BLOCKED · BLAST RADIUS EXCEEDED</div>
              <div className="resultNumber">2,481 <small>rows impacted</small></div>
              <p className="muted">Policy limit: 100 rows · Transaction rolled back safely.</p>
              <div className="resultGrid">
                <span>BEGIN</span><b>✓ Started</b>
                <span>Invariant checks</span><b className="badText">✕ Failed</b>
                <span>ROLLBACK</span><b className="goodText">✓ Complete</b>
              </div>
            </>
          ) : (
            <div className="emptyState">
              <div>▣</div>
              <b>Awaiting dry-run</b>
              <p>Execute a mutation to inspect its impact before touching production data.</p>
            </div>
          )}
        </div>
      </div>

      <div className="card safetyStrip">
        <div>
          <b>Transactional guarantee</b>
          <p>All speculative writes run inside an isolated transaction and are rolled back unless every invariant passes.</p>
        </div>
        <div className="safeStat">
          <b>100%</b>
          <span>Rollback integrity</span>
        </div>
      </div>
    </div>
  )
}

function Telemetry() {
  return (
    <div className="pageStack">
      <div className="pageIntro">
        <div>
          <p className="eyebrow">LOW-LATENCY INTERCEPTION</p>
          <h2>Drift & Loop Sentinel</h2>
          <p>Live mathematical signals for goal alignment and semantic loop detection.</p>
        </div>
        <span className="liveTag">● STREAMING</span>
      </div>

      <div className="metrics three">
        <Metric label="GOAL ALIGNMENT" value="0.94" sub="Threshold ≥ 0.15" />
        <Metric label="LOOP SIMILARITY" value="0.21" sub="Interception at > 0.85" />
        <Metric label="INTERCEPT LATENCY" value="3.8ms" sub="Target under 20ms" />
      </div>

      <div className="card">
        <div className="cardTitle">Step-by-step sentinel signals</div>
        <div className="signalRows">
          {Array.from({ length: 8 }, (_, i) => (
            <div className="signalRow" key={i}>
              <b>Step {i + 1}</b>
              <div className="signalTrack">
                <i style={{ width: `${[92, 87, 81, 74, 68, 19, 88, 94][i]}%` }} />
              </div>
              <span>{[.92, .87, .81, .74, .68, .19, .88, .94][i].toFixed(2)}</span>
              <span className={i === 5 ? 'badText' : 'goodText'}>
                {i === 5 ? 'DRIFT CAUGHT' : 'ALIGNED'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Policies() {
  const [loop, setLoop] = useState(0.85)
  const [drift, setDrift] = useState(0.15)
  const [schema, setSchema] = useState(true)
  const [blast, setBlast] = useState(true)

  return (
    <div className="pageStack">
      <div className="pageIntro">
        <div>
          <p className="eyebrow">ACTIVE DEFENSE CONFIGURATION</p>
          <h2>Chaos Injector & Policy Lab</h2>
          <p>Adjust runtime thresholds and inject controlled failures to validate recovery.</p>
        </div>
        <button className="primary">Save policy set</button>
      </div>

      <div className="twoCol">
        <div className="card policyCard">
          <div className="cardTitle">Sentinel thresholds</div>
          <label>Semantic loop cutoff <b>{loop.toFixed(2)}</b></label>
          <input type="range" min=".70" max=".95" step=".01" value={loop} onChange={(e) => setLoop(+e.target.value)} />
          <label>Goal drift cutoff <b>{drift.toFixed(2)}</b></label>
          <input type="range" min=".10" max=".40" step=".01" value={drift} onChange={(e) => setDrift(+e.target.value)} />

          <div className="toggleRow">
            <span><b>Schema validation</b><small>Reject unknown tables and columns</small></span>
            <input type="checkbox" checked={schema} onChange={(e) => setSchema(e.target.checked)} />
          </div>

          <div className="toggleRow">
            <span><b>Blast-radius protection</b><small>Block mutations above row limit</small></span>
            <input type="checkbox" checked={blast} onChange={(e) => setBlast(e.target.checked)} />
          </div>
        </div>

        <div className="card policyCard">
          <div className="cardTitle">Inject a failure scenario</div>
          {['Inject schema trap', 'Force semantic loop', 'Inject goal drift', 'Simulate mass-delete'].map((s, i) => (
            <button
              className="chaosButton"
              key={s}
              onClick={(e) => {
                const el = e.currentTarget
                el.classList.add('triggered')
                el.textContent = '✓ ' + s + ' · queued'
              }}
            >
              <span className="chaosIcon">{['⌘', '↻', '⌁', '▤'][i]}</span>
              <span>
                {s}
                <small>{['Invalid table reference', 'Repeat near-identical tool calls', 'Off-goal action sequence', 'Unbounded DELETE mutation'][i]}</small>
              </span>
              <b>＋</b>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ROI() {
  return (
    <div className="pageStack">
      <div className="pageIntro">
        <div>
          <p className="eyebrow">BUSINESS IMPACT</p>
          <h2>ROI &amp; Reliability</h2>
          <p>Translate runtime protection into measurable operational value.</p>
        </div>
        <button className="secondary">Export report ↗</button>
      </div>

      <div className="metrics">
        <Metric label="TASK SUCCESS RATE" value="96.4%" sub="vs 35.8% baseline" trend="↗" />
        <Metric label="TOKENS SAVED" value="15.3K" sub="74% reduction" />
        <Metric label="API COST AVOIDED" value="$4.82" sub="per 100 workflows" />
        <Metric label="CORRUPTIONS PREVENTED" value="14" sub="unsafe writes blocked" />
      </div>

      <div className="twoCol">
        <div className="card">
          <div className="cardTitle">Reliability comparison</div>
          <div className="compareBars">
            <div>
              <span>Standard agent</span>
              <div className="progress"><i className="redFill" style={{ width: '35.8%' }} /></div>
              <b>35.8%</b>
            </div>
            <div>
              <span>CSHR protected</span>
              <div className="progress"><i style={{ width: '96.4%' }} /></div>
              <b>96.4%</b>
            </div>
          </div>
        </div>

        <div className="card miniInfo">
          <h3>How the value is calculated</h3>
          <p>Token savings compare the protected execution trace with the unprotected baseline. Corruptions prevented count intercepted mutations that failed configured invariants. Values shown are illustrative demo metrics.</p>
        </div>
      </div>
    </div>
  )
}

function AutoDemo({ onRun }: { onRun: () => void }) {
  const [step, setStep] = useState(0)
  const steps = [
    'Watch the agent execute a multi-step task',
    'Inspect the pruned reasoning branch',
    'Inject a failure and observe recovery',
  ]

  return (
    <div className="pageStack">
      <div className="pageIntro">
        <div>
          <p className="eyebrow">JUDGE QUICK-TOUR</p>
          <h2>Auto-Demo & Quick Tour</h2>
          <p>A guided walkthrough designed to make the runtime understandable in under 60 seconds.</p>
        </div>
        <button className="primary" onClick={() => { setStep(0); onRun() }}>▷ Launch live demo</button>
      </div>

      <div className="card tourCard">
        <div className="tourVisual">
          <div className="tourOrb">✳</div>
          <span className="liveTag">CSHR LIVE SIMULATION</span>
          <h3>{steps[step]}</h3>
          <p>{[
            'Compare an unprotected agent with a protected run in the Arena.',
            'Open the context diff to see toxic tokens removed from working memory.',
            'Trigger a schema trap and watch CSHR roll back, inject a constraint and continue.',
          ][step]}</p>

          <div className="tourDots">
            {steps.map((_, i) => (
              <button key={i} className={i === step ? 'active' : ''} onClick={() => setStep(i)} aria-label={`Go to step ${i + 1}`} />
            ))}
          </div>

          <div className="buttonRow">
            <button className="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
            <button className="primary" onClick={() => setStep((step + 1) % 3)}>
              {step === 2 ? 'Restart tour' : 'Next step →'}
            </button>
          </div>
        </div>

        <div className="tourAside">
          {steps.map((s, i) => (
            <div className={'tourStep ' + (i === step ? 'selected' : '')} key={s} onClick={() => setStep(i)}>
              <b>0{i + 1}</b>
              <span>{s}</span>
              <i>{i < step ? '✓' : '→'}</i>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('Overview')
  const [scenario, setScenario] = useState(scenarios[0])
  const [events, setEvents] = useState(eventsSeed)
  const [, setRuns] = useState(14)
  const [toast, setToast] = useState('')

  const runDemo = () => {
    setRuns((v) => v + 1)
    setEvents([
      ['Rollback completed', 'purple', 'now'],
      ['Goal anchor restored', 'green', 'now'],
      ['Constraint injected', 'yellow', 'now'],
      ...events,
    ].slice(0, 9))
    setToast('Live demo completed · CSHR recovered the agent in 18ms')
    window.setTimeout(() => setToast(''), 3200)
  }

  const subtitle = useMemo(
    () =>
      page === 'Overview'
        ? 'Runtime health at a glance'
        : page === 'Arena & Context Analysis'
          ? 'Agent comparison and context recovery analysis'
          : page === 'Auto Demo'
            ? 'A guided product walkthrough'
            : 'Runtime control center',
    [page]
  )

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">✳</div>
          <div>
            <b>Reverto</b>
            <small>COGNITIVE STATE-HEALING RUNTIME</small>
          </div>
        </div>

        <div className="workspace">
          <span className="workspaceAvatar">D</span>
          <div>
            <b>Demo workspace</b>
            <small>Local environment</small>
          </div>
          <span className="chevron">⌄</span>
        </div>

        {['WORKSPACE', 'RUNTIME', 'OBSERVABILITY', 'INSIGHTS'].map((group) => (
          <div className="navGroup" key={group}>
            <div className="groupLabel">{group}</div>
            {nav.filter((n) => n.group === group).map((n) => (
              <button
                key={n.name}
                className={'navItem ' + (page === n.name ? 'active' : '')}
                onClick={() => setPage(n.name)}
              >
                <Icon>{n.icon}</Icon>
                <span>{n.name}</span>
                {n.name === 'Sentinel Telemetry' && <i className="navLive" />}
              </button>
            ))}
          </div>
        ))}

        <div className="sidebarBottom">
          <div className="statusLine"><i /> Runtime operational</div>
          <div className="userRow">
            <div className="userAvatar">CS</div>
            <div>
              <b>CSHR Operator</b>
              <small>Administrator</small>
            </div>
            <span>···</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="crumb">REVERTO PLATFORM <span>/</span> {page.toUpperCase()}</div>
            <h1>{page === 'Overview' ? 'Cognitive State-Healing Runtime' : page}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="topActions">
            <div className="selectWrap">
              <select value={scenario} onChange={(e) => setScenario(e.target.value)}>
                {scenarios.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <button className="primary runButton" onClick={runDemo}>▷ &nbsp; Run live demo</button>
            <button className="iconButton" aria-label="Notifications">♧<i /></button>
          </div>
        </header>

        <div className="content">
          {page === 'Overview' && <Overview events={events} />}
          {page === 'Arena & Context Analysis' && <ArenaContext />}
          {page === 'Cognitive State Tree' && <TreePage />}
          {page === 'Shadow Sandbox' && <Shadow />}
          {page === 'Sentinel Telemetry' && <Telemetry />}
          {page === 'Chaos & Policies' && <Policies />}
          {page === 'ROI & Benchmarks' && <ROI />}
          {page === 'Auto Demo' && <AutoDemo onRun={runDemo} />}
        </div>

        <footer>
          <span>REVERTO <b>v0.1.0</b></span>
          <span>● All systems operational <i /> Last sync just now</span>
        </footer>
      </main>

      {toast && <div className="toast">✓ &nbsp;{toast}</div>}
    </div>
  )
}
