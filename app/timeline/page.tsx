import { History, Star, Sparkles, BookOpen } from 'lucide-react';

const events = [
  { title: 'The First Lantern', type: 'Ancient history', note: 'The city was founded beneath a sky of floating glass.' },
  { title: 'The River Wars', type: 'War', note: 'Kingdoms divided over the silver waters and the sacred key.' },
  { title: 'The Moon Prophecy', type: 'Prophecy', note: 'An old seer spoke of a child who would inherit the night.' },
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Timeline</p>
            <h1 className="text-3xl font-semibold">Mark the turning points of your world with grace.</h1>
          </div>
          <button className="rounded-full bg-mint/70 px-4 py-2 text-sm">New event</button>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.title} className="rounded-[1.5rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(239,242,235,0.95))] p-5">
              <div className="mb-3 flex items-center gap-3">
                <History className="h-5 w-5" />
                <h2 className="text-xl font-semibold">{event.title}</h2>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-ink/70">{event.type}</p>
              <p className="mt-3 text-sm leading-7 text-ink/80">{event.note}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blush/70 px-3 py-1 text-xs"><Star className="mr-1 inline h-3 w-3" />Connected characters</span>
                <span className="rounded-full bg-mint/70 px-3 py-1 text-xs"><BookOpen className="mr-1 inline h-3 w-3" />Manuscripts</span>
                <span className="rounded-full bg-rosewater/70 px-3 py-1 text-xs"><Sparkles className="mr-1 inline h-3 w-3" />Lore</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
