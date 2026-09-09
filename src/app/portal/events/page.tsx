'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function EventManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Create an empty state based on fields
  const getEmptyState = () => ({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    order: ""
  });
  
  const [formData, setFormData] = useState<any>(getEmptyState());

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/events');
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
    const url = editingId ? `/api/admin/events/${editingId}` : '/api/admin/events';
    
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
      await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (e) {
      alert('Error deleting');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold capitalize">Manage events</h1>
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
          
          <div className="${['description', 'content', 'excerpt'].includes('title') ? 'md:col-span-2' : ''}">
            <label className="block text-sm font-medium mb-1 opacity-80 capitalize">title</label>
            
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none"
            />
            
          </div>
          <div className="${['description', 'content', 'excerpt'].includes('description') ? 'md:col-span-2' : ''}">
            <label className="block text-sm font-medium mb-1 opacity-80 capitalize">description</label>
            
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none"
            />
            
          </div>
          <div className="${['description', 'content', 'excerpt'].includes('date') ? 'md:col-span-2' : ''}">
            <label className="block text-sm font-medium mb-1 opacity-80 capitalize">date</label>
            
            <input
              type="date"
              required
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none"
            />
            
          </div>
          <div className="${['description', 'content', 'excerpt'].includes('order') ? 'md:col-span-2' : ''}">
            <label className="block text-sm font-medium mb-1 opacity-80 capitalize">order</label>
            
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
              {editingId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              {item.imageUrl || item.photoUrl || item.coverImageUrl ? (
                <img src={item.imageUrl || item.photoUrl || item.coverImageUrl} alt="Cover" className="w-full h-32 object-cover rounded-lg mb-4" />
              ) : null}
              <h3 className="font-bold text-lg mb-1">{item.title || item.name || item.caption || 'Item'}</h3>
              <p className="text-sm opacity-60 mb-4 line-clamp-2">{item.description || item.excerpt || item.role}</p>
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
