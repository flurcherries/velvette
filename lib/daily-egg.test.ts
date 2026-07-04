import { describe, expect, it } from 'vitest';
import { getDailyEggQuote, getTodayKey, shouldRevealDailyEgg } from './daily-egg';

describe('daily egg helpers', () => {
  it('keeps the egg hidden until today is stored', () => {
    expect(shouldRevealDailyEgg(undefined, '2026-07-04')).toBe(false);
  });

  it('reveals the egg once the same day has been recorded', () => {
    expect(shouldRevealDailyEgg('2026-07-04', '2026-07-04')).toBe(true);
  });

  it('returns a quote deterministically for the current day', () => {
    const quotes = ['A soft spark remains.', 'Write one true line.'];
    expect(getDailyEggQuote(quotes, '2026-07-04')).toBe('Write one true line.');
  });

  it('formats the day key with year month day', () => {
    const date = new Date('2026-07-04T12:00:00Z');
    expect(getTodayKey(date)).toBe('2026-7-4');
  });
});
