import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 text-ink">
      <div className="max-w-lg rounded-[2rem] border border-sage/60 bg-white/80 p-8 text-center shadow-velvet">
        <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Velvette</p>
        <h1 className="mt-3 text-3xl font-semibold">This page has drifted into the mist.</h1>
        <p className="mt-3 text-sm leading-7 text-ink/80">Return to the sanctuary and find your way back to the stories waiting for you.</p>
        <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-rosewater px-5 py-3 font-semibold">Return home</Link>
      </div>
    </main>
  );
}
