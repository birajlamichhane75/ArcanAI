import { useEffect, useRef } from 'react'

interface Agent {
  id: string
  name: string
  icon: string
}

interface VisibleEvent {
  agent: string
  renderedLine: string
}

function StatusIndicator({ state }: { state: string }) {
  if (state === 'done') {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
        ✓
      </span>
    )
  }

  if (state === 'active') {
    return <span className="h-3.5 w-3.5 rounded-full bg-emerald-400 animate-pulse" />
  }

  return <span className="h-3.5 w-3.5 rounded-full bg-slate-500" />
}

interface AgentFeedProps {
  agents: Agent[]
  agentStates: Record<string, string>
  visibleEvents: VisibleEvent[]
}

export default function AgentFeed({ agents, agentStates, visibleEvents }: AgentFeedProps) {
  const bottomAnchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [visibleEvents.length])

  return (
    <section className="h-full rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-lg">
      <div className="border-b border-slate-800 px-4 py-4 lg:px-5">
        <h2 className="text-lg font-semibold text-white">Agent Activity Feed</h2>
        <p className="mt-1 text-xs text-slate-400">Live terminal stream</p>
      </div>

      <div className="border-b border-slate-800 px-4 py-4 lg:px-5">
        <ul className="space-y-2">
          {agents.map(agent => (
            <li key={agent.id} className="flex items-center justify-between rounded-md bg-slate-900/70 px-3 py-2">
              <span className="font-mono text-sm">
                {agent.icon} {agent.name}
              </span>
              <StatusIndicator state={agentStates[agent.id]} />
            </li>
          ))}
        </ul>
      </div>

      <div aria-live="polite" className="h-[46vh] min-h-[320px] overflow-y-auto px-4 py-4 font-mono text-sm lg:px-5">
        <ul className="space-y-2">
          {visibleEvents.map((event, index) => (
            <li
              key={`${event.agent}-${index}`}
              className="rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-200 animate-[fadeup_.35s_ease-out]"
            >
              {event.renderedLine}
            </li>
          ))}
        </ul>
        <div ref={bottomAnchorRef} />
      </div>
    </section>
  )
}
