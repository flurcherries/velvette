import { Heart, Sparkles, BookOpen } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Favorites</p>
            <h1 className="text-3xl font-semibold">The pieces you return to most often.</h1>
          </div>
          <button className="rounded-full bg-rosewater px-4 py-2 text-sm">Save more</button>
        </div>
        <div className="rounded-[1.5rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(239,242,235,0.95))] p-6">
          <div className="flex items-center gap-2"><Heart className="h-5 w-5" /><h2 className="text-xl font-semibold">Treasured pages</h2></div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1rem] bg-white/70 p-4"><div className="flex items-center gap-2"><BookOpen className="h-4 w-4" /><span className="font-semibold">The moonlit prophecy</span></div><p className="mt-2 text-sm text-ink/70">A favorite chapter marked for revision.</p></div>
            <div className="rounded-[1rem] bg-white/70 p-4"><div className="flex items-center gap-2"><Sparkles className="h-4 w-4" /><span className="font-semibold">Eira’s private notes</span></div><p className="mt-2 text-sm text-ink/70">Warm observations and hidden truths.</p></div>
          </div>
        </div>
      </div>
    </main>
  );
}
