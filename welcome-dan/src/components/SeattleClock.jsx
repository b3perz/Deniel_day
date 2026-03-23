import { useState, useEffect } from 'react';

export default function SeattleClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(now);
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-3 text-[9px] font-mono text-slate-600">
      <span>Day 1 of &#8734;</span>
      <span className="text-slate-700">|</span>
      <span>SEATTLE</span>
      <span className="text-slate-400">{time}</span>
    </div>
  );
}
