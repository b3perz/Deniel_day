import { TICKER_ITEMS } from '../data/constants';

export default function NewsTicker() {
  const text = TICKER_ITEMS.join('  \u2022  ');
  const doubled = text + '  \u2022  ' + text;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950 border-t border-slate-800 overflow-hidden h-8 flex items-center group">
      <div
        className="whitespace-nowrap font-mono text-xs text-slate-500 group-hover:[animation-play-state:paused]"
        style={{
          animation: 'ticker-scroll 90s linear infinite',
          willChange: 'transform',
        }}
      >
        {doubled}
      </div>
    </div>
  );
}
