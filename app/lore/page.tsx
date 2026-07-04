import { ScrollText, Sparkles, BookMarked, Layers3 } from 'lucide-react';

const loreSections = [
  { title: 'Religions', note: 'The Lantern Faith and the River Rite.' },
  { title: 'Artifacts', note: 'A key forged from fallen stars and a mirror that remembers.' },
  { title: 'Languages', note: 'The old tongue of the mountain enclaves.' },
];

export default function LorePage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Lore</p>
            <h1 className="text-3xl font-semibold">An ever-growing archive of myth and memory.</h1>
          </div>
          <button className="rounded-full bg-rosewater px-4 py-2 text-sm">New lore entry</button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {loreSections.map((section) => (
            <div key={section.title} className="rounded-[1.5rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(239,242,235,0.95))] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <ScrollText className="h-5 w-5" />
              </div>
              <p className="text-sm leading-7 text-ink/80">{section.note}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-mint/70 px-3 py-1 text-xs"><BookMarked className="mr-1 inline h-3 w-3" />Expand</span>
                <span className="rounded-full bg-blush/70 px-3 py-1 text-xs"><Layers3 className="mr-1 inline h-3 w-3" />Custom fields</span>
              </div>
              <button className="mt-5 rounded-full border border-sage/60 bg-white/70 px-4 py-2 text-sm"><Sparkles className="mr-1 inline h-4 w-4" />Open section</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
