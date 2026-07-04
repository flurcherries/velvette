import { Sparkles, Heart, Shield, WandSparkles, PenSquare } from 'lucide-react';

const characters = [
  {
    name: 'Eira Vale',
    role: 'Ravenheart Heir',
    notes: 'Gentle but stubborn, with an affinity for moonlit magic.',
  },
  {
    name: 'Thoren Ash',
    role: 'Keeper of the Hollow Orchard',
    notes: 'Quiet and watchful, carrying old grief like a lantern.',
  },
  {
    name: 'Lyra Sable',
    role: 'Oracle of the Glass Sea',
    notes: 'Soft-spoken, brilliant, and impossible to fully read.',
  },
];

export default function CharactersPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Characters</p>
            <h1 className="text-3xl font-semibold">Tender profiles for every beloved soul.</h1>
          </div>
          <button className="rounded-full bg-rosewater px-4 py-2 text-sm">New character</button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {characters.map((character) => (
            <div key={character.name} className="rounded-[1.5rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(239,242,235,0.95))] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{character.name}</h2>
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm text-ink/70">{character.role}</p>
              <p className="mt-3 text-sm leading-7 text-ink/80">{character.notes}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blush/70 px-3 py-1 text-xs"><Heart className="mr-1 inline h-3 w-3" />Relationships</span>
                <span className="rounded-full bg-mint/70 px-3 py-1 text-xs"><Shield className="mr-1 inline h-3 w-3" />Affiliations</span>
                <span className="rounded-full bg-rosewater/70 px-3 py-1 text-xs"><WandSparkles className="mr-1 inline h-3 w-3" />Magic</span>
              </div>
              <button className="mt-5 rounded-full border border-sage/60 bg-white/70 px-4 py-2 text-sm"><PenSquare className="mr-1 inline h-4 w-4" />Open profile</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
