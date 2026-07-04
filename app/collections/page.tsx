import { Layers3, Sparkles, FolderHeart } from 'lucide-react';

export default function CollectionsPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Collections</p>
            <h1 className="text-3xl font-semibold">Gather ideas into soft, custom bundles.</h1>
          </div>
          <button className="rounded-full bg-mint/70 px-4 py-2 text-sm">New collection</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(239,242,235,0.95))] p-5">
            <div className="flex items-center gap-2"><Layers3 className="h-5 w-5" /><h2 className="text-xl font-semibold">Rituals & spells</h2></div>
            <p className="mt-3 text-sm leading-7 text-ink/80">A curated collection of enchanting fragments and magical references.</p>
            <button className="mt-4 rounded-full border border-sage/60 bg-white/70 px-4 py-2 text-sm"><FolderHeart className="mr-1 inline h-4 w-4" />Open collection</button>
          </div>
          <div className="rounded-[1.5rem] border border-rosewater/60 bg-blush/70 p-5">
            <div className="flex items-center gap-2"><Sparkles className="h-5 w-5" /><h2 className="text-xl font-semibold">Portrait notes</h2></div>
            <p className="mt-3 text-sm leading-7 text-ink/80">Visual references, voice notes, and character moodboards.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
