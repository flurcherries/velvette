import { Sparkles, Plus, Move3D, Link2 } from 'lucide-react';

const bubbles = [
  { title: 'Moonmere', description: 'A silver lake that hums at dusk.', tags: ['water', 'mystic'] },
  { title: 'Velis Forest', description: 'A maze of whispering pines.', tags: ['forest', 'ancient'] },
  { title: 'Crownspire', description: 'The high city of crystal towers.', tags: ['kingdom', 'magic'] },
];

export default function WorldbuildingPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Worldbuilding</p>
            <h1 className="text-3xl font-semibold">Shape the living map of your realm.</h1>
          </div>
          <button className="rounded-full bg-mint/70 px-4 py-2 text-sm">Create new bubble</button>
        </div>

        <div className="rounded-[2rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.88),_rgba(223,232,217,0.9))] p-6">
          <div className="mb-5 flex flex-wrap gap-2">
            <div className="rounded-full bg-white/70 px-3 py-2 text-sm">Move bubbles</div>
            <div className="rounded-full bg-white/70 px-3 py-2 text-sm">Resize freely</div>
            <div className="rounded-full bg-white/70 px-3 py-2 text-sm">Connect realms</div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {bubbles.map((bubble, index) => (
              <div key={bubble.title} className="rounded-[1.5rem] border border-white/70 bg-white/70 p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{bubble.title}</h2>
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm text-ink/70">{bubble.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {bubble.tags.map((tag) => <span key={tag} className="rounded-full bg-rosewater/70 px-3 py-1 text-xs">{tag}</span>)}
                </div>
                <div className="mt-5 flex gap-2">
                  <button className="rounded-full bg-mint/60 px-3 py-2 text-sm"><Move3D className="mr-1 inline h-4 w-4" />Move</button>
                  <button className="rounded-full bg-blush/70 px-3 py-2 text-sm"><Link2 className="mr-1 inline h-4 w-4" />Connect</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-[1.2rem] border border-dashed border-sage/70 bg-white/70 p-4 text-sm text-ink/70">
            <Plus className="h-4 w-4" /> Create new continent, kingdom, or region with a single gesture.
          </div>
        </div>
      </div>
    </main>
  );
}
