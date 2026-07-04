"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, Heading1, Heading2, Heading3, Heading4, Undo, Redo, Clock3, Sparkles, Save } from 'lucide-react';

const starterText = `The evening wind carried the scent of rosemary through the narrow halls, and the old keeper of the archive smiled as if remembering a beloved song.

In the hush between dawn and the first bell, she opened the velvet-bound ledger and wrote the names of those who had once crossed the stars.`;

const fonts = ['EB Garamond', 'Baskerville', 'Times New Roman', 'New Rocker', 'Romania One', 'Charter', 'Book Antiqua'];
const highlights = ['#f7e8eb', '#e7f2e4', '#dbeafe', '#fef3c7', '#fee2e2'];

export default function ManuscriptPage() {
  const [font, setFont] = useState('EB Garamond');
  const [fontSize, setFontSize] = useState(18);
  const [mode, setMode] = useState<'Draft' | 'Revision' | 'Final'>('Draft');
  const [selectedHighlight, setSelectedHighlight] = useState(highlights[0]);
  const [content, setContent] = useState(starterText);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);

  const statusTone = useMemo(() => {
    if (mode === 'Revision') return 'bg-amber-100 text-amber-800';
    if (mode === 'Final') return 'bg-emerald-100 text-emerald-800';
    return 'bg-rosewater text-ink';
  }, [mode]);

  return (
    <main className="min-h-screen px-6 py-8 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-veltree backdrop-blur md:p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/70">Manuscript</p>
            <h1 className="text-3xl font-semibold">The page is yours to shape.</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className={`rounded-full px-3 py-2 text-sm ${statusTone}`}>{mode}</div>
            <button className="rounded-full bg-mint/70 px-4 py-2 text-sm">Autosave on</button>
            <button className="rounded-full border border-sage/60 bg-parchment px-4 py-2 text-sm">Version history</button>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-sage/60 bg-[linear-gradient(135deg,_rgba(255,255,255,0.9),_rgba(239,242,235,0.95))] p-4">
          <div className="mb-4 flex flex-wrap gap-2 rounded-[1.2rem] border border-white/70 bg-white/70 p-3">
            <select value={font} onChange={(event) => setFont(event.target.value)} className="rounded-full border border-sage/60 bg-parchment px-3 py-2 text-sm">
              {fonts.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <input type="range" min="14" max="24" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} className="w-24" />
            <button onClick={() => setIsBold((value) => !value)} className={`rounded-full px-3 py-2 text-sm ${isBold ? 'bg-rosewater' : 'bg-white/80'}`}><Bold className="h-4 w-4" /></button>
            <button onClick={() => setIsItalic((value) => !value)} className={`rounded-full px-3 py-2 text-sm ${isItalic ? 'bg-rosewater' : 'bg-white/80'}`}><Italic className="h-4 w-4" /></button>
            <button onClick={() => setIsUnderline((value) => !value)} className={`rounded-full px-3 py-2 text-sm ${isUnderline ? 'bg-rosewater' : 'bg-white/80'}`}><Underline className="h-4 w-4" /></button>
            <button onClick={() => setIsStrike((value) => !value)} className={`rounded-full px-3 py-2 text-sm ${isStrike ? 'bg-rosewater' : 'bg-white/80'}`}><Strikethrough className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><AlignLeft className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><AlignCenter className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><AlignRight className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><AlignJustify className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><Heading1 className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><Heading2 className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><Heading3 className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><Heading4 className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><List className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><Undo className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><Redo className="h-4 w-4" /></button>
            <button className="rounded-full border border-sage/50 bg-mint/50 px-3 py-2 text-sm"><Save className="h-4 w-4" /></button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            {highlights.map((color) => (
              <button key={color} onClick={() => setSelectedHighlight(color)} className={`h-6 w-6 rounded-full border-2 ${selectedHighlight === color ? 'border-ink' : 'border-transparent'}`} style={{ backgroundColor: color }} />
            ))}
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {(['Draft', 'Revision', 'Final'] as const).map((option) => (
              <button key={option} onClick={() => setMode(option)} className={`rounded-full px-4 py-2 text-sm ${mode === option ? 'bg-rosewater' : 'bg-white/80'}`}>{option}</button>
            ))}
          </div>

          <div className="mb-4 grid gap-4 rounded-[1.4rem] border border-sage/50 bg-white/70 p-4 md:grid-cols-3">
            <div className="rounded-[1rem] bg-parchment p-4"><p className="text-sm text-ink/70">Word count</p><p className="mt-2 text-xl font-semibold">2,484</p></div>
            <div className="rounded-[1rem] bg-parchment p-4"><p className="text-sm text-ink/70">Reading time</p><p className="mt-2 text-xl font-semibold">10 min</p></div>
            <div className="rounded-[1rem] bg-parchment p-4"><p className="text-sm text-ink/70">Chapter count</p><p className="mt-2 text-xl font-semibold">7</p></div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.8rem] border border-sage/60 bg-parchment p-6 shadow-inner">
            <div className="mb-4 flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm">
              <Clock3 className="h-4 w-4" /> Writing timer • 25:00 Pomodoro
            </div>
            <div className="space-y-4 text-ink/80" style={{ fontFamily: font, fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
              <textarea value={content} onChange={(event) => setContent(event.target.value)} className="min-h-[240px] w-full rounded-[1.2rem] border border-sage/40 bg-white/80 p-4 text-sm outline-none" style={{ fontFamily: font, fontSize: `${fontSize}px`, lineHeight: 1.8 }} />
              <div className="rounded-[1rem] border border-sage/40 bg-white/70 p-4" style={{ fontWeight: isBold ? 700 : 400, fontStyle: isItalic ? 'italic' : 'normal', textDecoration: isUnderline ? 'underline' : isStrike ? 'line-through' : 'none', backgroundColor: selectedHighlight }}>
                {content.split('\n').map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`} className="mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
