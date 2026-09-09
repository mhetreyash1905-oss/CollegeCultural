'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

export default function HeroConfig() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/config')
      .then((res) => res.json())
      .then((data) => {
        setImages(data.heroImages || []);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroImages: images.filter(img => img.trim() !== '') }),
      });
      if (res.ok) setMessage('Successfully updated hero images!');
      else setMessage('Failed to update.');
    } catch (e) {
      setMessage('An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const addImage = () => setImages([...images, '']);
  
  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (loading) return <div>Loading configuration...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-6">Hero Slideshow</h1>
      
      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Image URLs</h2>
          <button 
            onClick={addImage}
            className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/10 rounded-lg hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          >
            <Plus size={16} /> Add Image
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {images.map((img, i) => (
            <div key={i} className="flex gap-4 items-center">
              <span className="text-black/40 dark:text-white/40 font-mono text-sm w-4">{i + 1}</span>
              <input
                type="text"
                value={img}
                onChange={(e) => updateImage(i, e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF4D6D]"
              />
              <button 
                onClick={() => removeImage(i)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {images.length === 0 && (
            <p className="text-black/50 dark:text-white/50 text-center py-4">No images configured.</p>
          )}
        </div>

        {message && (
          <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400 bg-green-500/10 p-3 rounded-lg">
            {message}
          </div>
        )}

        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#FF4D6D] text-white rounded-lg hover:bg-[#ff3356] transition-colors disabled:opacity-50 font-medium"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
