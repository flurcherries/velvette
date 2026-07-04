import { ShieldCheck, KeyRound, Lock, UserCircle2, BellRing } from 'lucide-react';

export default function SettingsPage() {
  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Settings</p>
          <h1 className="text-3xl font-semibold">A private, secure home for your art.</h1>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(239,242,235,0.95))] p-5">
            <div className="mb-4 flex items-center gap-2"><UserCircle2 className="h-5 w-5" /><h2 className="text-xl font-semibold">Profile</h2></div>
            <div className="space-y-3 text-sm text-ink/80">
              <div className="rounded-[1rem] bg-white/70 p-3">Display name</div>
              <div className="rounded-[1rem] bg-white/70 p-3">Username</div>
              <div className="rounded-[1rem] bg-white/70 p-3">Writing goals</div>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-rosewater/60 bg-blush/70 p-5">
            <div className="mb-4 flex items-center gap-2"><ShieldCheck className="h-5 w-5" /><h2 className="text-xl font-semibold">Security</h2></div>
            <div className="space-y-3 text-sm text-ink/80">
              <div className="rounded-[1rem] bg-white/70 p-3"><Lock className="mr-2 inline h-4 w-4" />Secure password management</div>
              <div className="rounded-[1rem] bg-white/70 p-3"><KeyRound className="mr-2 inline h-4 w-4" />Recovery passkey</div>
              <div className="rounded-[1rem] bg-white/70 p-3"><BellRing className="mr-2 inline h-4 w-4" />Inactivity timeout</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
