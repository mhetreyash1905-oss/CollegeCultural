'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function GalleryImageManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Create an empty state based on fields
  const getEmptyState = () => ({
    imageUrl: "",
    order: 0
  });
  
  const [formData, setFormData] = useState<any>(getEmptyState());

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/admin/gallery/${editingId}` : '/api/admin/gallery';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setFormData(getEmptyState());
        fetchItems();
      }
    } catch (e) {
      alert('Error saving data');
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      ...item,
      // Format date if exists
      ...(item.date ? { date: new Date(item.date).toISOString().split('T')[0] } : {})
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (e) {
      alert('Error deleting');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold capitalize">Manage gallery</h1>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setEditingId(null);
              setFormData(getEmptyState());
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF4D6D] text-white rounded-lg hover:bg-[#ff3356] transition-colors"
        >
          {showForm ? 'Cancel' : <><Plus size={18} /> Add New</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-sm font-medium mb-1 opacity-80 capitalize">Image URL</label>
            <input
              type="text"
              required
              value={formData.imageUrl}
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              placeholder="https://..."
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 opacity-80 capitalize">Order</label>
            <input
              type="number"
              required
              value={formData.order}
              onChange={e => setFormData({...formData, order: e.target.value})}
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button type="submit" className="px-6 py-2 bg-[#FFC93C] text-black font-medium rounded-lg hover:bg-[#ffb700] transition-colors">
              {editingId ? 'Update' : 'Add Image'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <img src={item.imageUrl} alt="Gallery item" className="w-full h-40 object-cover rounded-lg mb-4" />
            <div className="flex justify-between items-center text-sm opacity-60 mb-2">
              <span>Order: {item.order}</span>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t border-black/10 dark:border-white/10">
              <button onClick={() => handleEdit(item)} className="p-2 bg-black/5 dark:bg-white/10 rounded-lg hover:bg-black/10 dark:hover:bg-white/20 transition-colors"><Edit size={16} /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-black/50 dark:text-white/50 col-span-full text-center py-8">No items found.</p>}
      </div>
    </div>
  );
}
