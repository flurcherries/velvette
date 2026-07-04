import type { Metadata } from 'next';
import './globals.css';
import { Laila, EB_Garamond } from 'next/font/google';
import Link from 'next/link';
import { Home, BookOpen, Compass, Sparkles, MapPin, ScrollText, History, Heart, Layers3, Tags, Trash2, Settings } from 'lucide-react';

const laila = Laila({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-laila' });
const garamond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-garamond' });

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/manuscript', label: 'Manuscript', icon: BookOpen },
  { href: '/worldbuilding', label: 'Worldbuilding', icon: Compass },
  { href: '/characters', label: 'Characters', icon: Sparkles },
  { href: '/locations', label: 'Locations', icon: MapPin },
  { href: '/lore', label: 'Lore', icon: ScrollText },
  { href: '/timeline', label: 'Timeline', icon: History },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/collections', label: 'Collections', icon: Layers3 },
  { href: '/tags', label: 'Tags', icon: Tags },
  { href: '/trash', label: 'Trash', icon: Trash2 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export const metadata: Metadata = {
  title: 'Velvette',
  description: 'A cozy sanctuary for fantasy authors and storytellers.',
  metadataBase: new URL('https://velvette.vercel.app'),
  openGraph: {
    title: 'Velvette',
    description: 'A cozy sanctuary for fantasy authors and storytellers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velvette',
    description: 'A cozy sanctuary for fantasy authors and storytellers.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${laila.variable} ${garamond.variable}`}>
        <div className="flex min-h-screen flex-col lg:flex-row">
          <aside className="w-full border-b border-sage/50 bg-[linear-gradient(180deg,_rgba(251,244,246,0.95),_rgba(239,242,235,0.95))] px-5 py-6 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-ink/70">Velvette</p>
              <h2 className="mt-2 text-2xl font-semibold">Keepsakes of my heart.</h2>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-full border border-transparent px-3 py-2 text-base transition hover:border-sage/60 hover:bg-white/70">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 rounded-[1.5rem] border border-rosewater/60 bg-white/70 p-4 text-sm leading-7 text-ink/80">
              <p className="font-semibold">Your stories are safe here.</p>
              <p className="mt-1">Private by default, cozy by design, and made for soft, uninterrupted dreaming.</p>
            </div>
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
