'use client';

import { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';

export default function QuickSettings() {
  const [showFestCountdown, setShowFestCountdown] = useState(true);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    fetch('/api/admin/config')
      .then(res => res.json())
      .then(data => {
        if (data && data.showFestCountdown !== undefined) {
          setShowFestCountdown(data.showFestCountdown);
        }
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleToggle = async () => {
    setToggling(true);
    const newVal = !showFestCountdown;
    
    try {
      await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showFestCountdown: newVal }),
      });
      setShowFestCountdown(newVal);
    } catch (e) {
      alert('Failed to update toggle');
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm flex items-center justify-center">
        <Loader2 className="animate-spin text-black/50 dark:text-white/50" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-lg mb-4">Quick Settings</h3>
      
      <div className="flex items-center justify-between p-3 rounded-lg bg-black/5 dark:bg-white/5">
        <div>
          <p className="font-medium">Fest Countdown</p>
          <p className="text-xs opacity-70">Show on homepage</p>
        </div>
        <button 
          onClick={handleToggle}
          disabled={toggling}
          className={`transition-colors ${showFestCountdown ? 'text-green-500' : 'text-black/30 dark:text-white/30'} hover:opacity-80`}
        >
          {showFestCountdown ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
        </button>
      </div>
    </div>
  );
}
