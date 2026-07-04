import { Trash2, RefreshCcw, Sparkles } from 'lucide-react';

export default function TrashPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Trash</p>
          <h1 className="text-3xl font-semibold">A gentle place for what has been set aside.</h1>
        </div>
        <div className="rounded-[1.5rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(239,242,235,0.95))] p-6">
          <div className="flex items-center gap-2"><Trash2 className="h-5 w-5" /><h2 className="text-xl font-semibold">Nothing here is lost forever.</h2></div>
          <p className="mt-3 text-sm leading-7 text-ink/80">You can recover old drafts, notes, and fragments whenever you need them.</p>
          <button className="mt-4 rounded-full border border-sage/60 bg-white/70 px-4 py-2 text-sm"><RefreshCcw className="mr-1 inline h-4 w-4" />Restore selected</button>
        </div>
      </div>
    </main>
  );
}
