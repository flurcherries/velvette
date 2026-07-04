import { Tags, Sparkles, PenTool } from 'lucide-react';

export default function TagsPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Tags</p>
            <h1 className="text-3xl font-semibold">Make your ideas easy to find and gentle to re-open.</h1>
          </div>
          <button className="rounded-full bg-mint/70 px-4 py-2 text-sm">New tag</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {['romance', 'mystery', 'moonlight', 'magic', 'ancestry', 'prophecy'].map((tag) => (
            <div key={tag} className="rounded-full border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(239,242,235,0.95))] px-4 py-2 text-sm">
              <Tags className="mr-1 inline h-4 w-4" />{tag}
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-[1.5rem] border border-sage/60 bg-white/70 p-5">
          <div className="flex items-center gap-2"><PenTool className="h-5 w-5" /><h2 className="text-xl font-semibold">Create your own categories</h2></div>
          <p className="mt-3 text-sm leading-7 text-ink/80">There are no fixed limits here; this space bends to the way you think.</p>
        </div>
      </div>
    </main>
  );
}
