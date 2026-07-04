"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Sparkles, Clock3, Heart, MessageCircleHeart } from 'lucide-react';
import { getDailyEggContent, getTodayKey, shouldRevealDailyEgg } from '@/lib/daily-egg';

const widgets = [
  { title: 'Current writing streak', value: '12 days', accent: 'bg-rosewater' },
  { title: 'Weekly writing streak', value: '5 days', accent: 'bg-mint' },
  { title: 'Monthly goal', value: '82%', accent: 'bg-blush' },
  { title: 'Words written today', value: '1,842', accent: 'bg-sage' },
];

const library = [
  { title: 'Moonlit Reliquary', progress: '74%', author: 'Mira Aster', color: 'bg-rosewater' },
  { title: 'The Hollow Orchard', progress: '41%', author: 'Eira Vale', color: 'bg-sage' },
  { title: 'Crown of Thorns', progress: '91%', author: 'Lys Winter', color: 'bg-mint' },
];

const activity = [
  'Revised the moonlit prophecy scene in Moonlit Reliquary.',
  'Added a new spirit to the character archive.',
  'Updated the river kingdom map in worldbuilding.',
  'Uploaded a pressed-flower reference image.',
];

export default function DashboardPage() {
  const [tapped, setTapped] = useState(false);
  const [revealedQuote, setRevealedQuote] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem('velvette-daily-egg');
    const today = getTodayKey();
    if (shouldRevealDailyEgg(stored || undefined, today)) {
      setTapped(true);
      setRevealedQuote(getDailyEggContent(today).quote);
    }
  }, []);

  const handleEggTap = () => {
    if (tapped) return;
    const today = getTodayKey();
    const content = getDailyEggContent(today);
    setRevealedQuote(content.quote);
    setTapped(true);
    window.localStorage.setItem('velvette-daily-egg', today);
  };

  const eggLabel = useMemo(() => (tapped ? 'A quote has opened for you today.' : 'Tap once today and let a little encouragement crack open.'), [tapped]);

  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-velvet backdrop-blur md:p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Dashboard</p>
            <h1 className="text-3xl font-semibold">Welcome back, sweet storyteller.</h1>
          </div>
          <div className="rounded-full bg-mint/70 px-4 py-2 text-sm">Today feels gentle and bright.</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {widgets.map((widget) => (
            <motion.div key={widget.title} whileHover={{ y: -2 }} className="rounded-[1.5rem] border border-sage/60 bg-parchment p-5">
              <div className={`mb-4 h-2 w-16 rounded-full ${widget.accent}`} />
              <p className="text-sm text-ink/70">{widget.title}</p>
              <p className="mt-2 text-2xl font-semibold">{widget.value}</p>
            </motion.div>
          ))}
        </div>

        <section className="mt-8 rounded-[2rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.85),_rgba(223,232,217,0.9))] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Library shelf</p>
              <h2 className="text-2xl font-semibold">Your manuscripts</h2>
            </div>
            <div className="rounded-full bg-rosewater/70 px-3 py-1 text-sm">Shelved with care</div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {library.map((book) => (
              <Link key={book.title} href="/manuscript" className="group rounded-[1.5rem] border border-white/70 bg-white/70 p-5 shadow-sm transition hover:shadow-velvet">
                <div className={`h-24 rounded-[1rem] ${book.color}`} />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-sm text-ink/70">{book.author}</p>
                  </div>
                  <BookOpen className="h-5 w-5 text-ink/60" />
                </div>
                <div className="mt-4 h-2 rounded-full bg-sage/40">
                  <div className={`h-2 rounded-full ${book.color}`} style={{ width: book.progress }} />
                </div>
                <p className="mt-2 text-sm text-ink/70">Completion {book.progress}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-rosewater/60 bg-blush/60 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Daily egg</h2>
            </div>
            <button onClick={handleEggTap} className="flex w-full items-center gap-6 rounded-[1.5rem] bg-white/70 p-5 text-left transition hover:scale-[1.01]">
              <motion.div animate={tapped ? { rotate: -8, scale: 1.05 } : { rotate: 0, scale: 1 }} className="flex h-24 w-24 items-center justify-center rounded-full border border-sage/70 bg-mint/70 text-4xl">
                {tapped ? '🥚' : '🥚'}
              </motion.div>
              <div>
                <p className="text-lg">{tapped ? 'The egg has cracked open.' : 'A gentle quote waits inside.'}</p>
                <p className="mt-2 text-sm text-ink/70">{eggLabel}</p>
                {tapped && revealedQuote ? <p className="mt-3 rounded-[1rem] border border-rosewater/60 bg-blush/60 px-3 py-2 text-sm italic">“{revealedQuote}”</p> : null}
              </div>
            </button>
          </div>
          <div className="rounded-[2rem] border border-sage/60 bg-white/70 p-6">
            <div className="mb-4 flex items-center gap-2">
              <MessageCircleHeart className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Recent activity</h2>
            </div>
            <div className="space-y-3">
              {activity.map((item) => (
                <div key={item} className="rounded-[1rem] border border-sage/40 bg-parchment/70 p-3 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
