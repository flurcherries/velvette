const quotes = [
  'A soft spark remains.',
  'Write one true line and let the rest follow.',
  'Your world is allowed to bloom slowly.',
  'Even a quiet page is a brave beginning.',
  'The heart always remembers the right sentence.',
];

export function getTodayKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function shouldRevealDailyEgg(revealedDay: string | undefined, todayKey: string) {
  return Boolean(revealedDay && revealedDay === todayKey);
}

export function getDailyEggQuote(availableQuotes = quotes, todayKey = getTodayKey()) {
  const index = todayKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % availableQuotes.length;
  return availableQuotes[index];
}

export function getDailyEggContent(todayKey = getTodayKey()) {
  return {
    quote: getDailyEggQuote(quotes, todayKey),
    revealed: false,
  };
}
