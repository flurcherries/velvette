import { MapPin, Camera, BookOpen, Trees, Landmark } from 'lucide-react';

const locations = [
  { name: 'Moonmere', type: 'Lake', description: 'A silver expanse that glimmers like a memory in the dark.' },
  { name: 'Hollow Orchard', type: 'Forest', description: 'Ancient trees that blossom only beneath moonlight.' },
  { name: 'Starglass Keep', type: 'Castle', description: 'A gilded fortress with windows that catch starlight.' },
];

export default function LocationsPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Locations</p>
            <h1 className="text-3xl font-semibold">Every place holds a story of its own.</h1>
          </div>
          <button className="rounded-full bg-mint/70 px-4 py-2 text-sm">Add location</button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {locations.map((location) => (
            <div key={location.name} className="rounded-[1.5rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(239,242,235,0.95))] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{location.name}</h2>
                <MapPin className="h-5 w-5" />
              </div>
              <p className="text-sm text-ink/70">{location.type}</p>
              <p className="mt-3 text-sm leading-7 text-ink/80">{location.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blush/70 px-3 py-1 text-xs"><Camera className="mr-1 inline h-3 w-3" />Gallery</span>
                <span className="rounded-full bg-mint/70 px-3 py-1 text-xs"><Landmark className="mr-1 inline h-3 w-3" />History</span>
                <span className="rounded-full bg-rosewater/70 px-3 py-1 text-xs"><Trees className="mr-1 inline h-3 w-3" />Climate</span>
              </div>
              <button className="mt-5 rounded-full border border-sage/60 bg-white/70 px-4 py-2 text-sm"><BookOpen className="mr-1 inline h-4 w-4" />Open details</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
