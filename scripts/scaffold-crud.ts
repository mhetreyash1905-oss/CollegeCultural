import fs from 'fs';
import path from 'path';

const entities = [
  { name: 'Event', plural: 'events', fields: ['title', 'description', 'date', 'order'], type: 'IEvent' },
  { name: 'Society', plural: 'societies', fields: ['name', 'tag', 'description', 'imageUrl', 'accentColor', 'order'], type: 'ISociety' },
  { name: 'GalleryImage', plural: 'gallery', fields: ['imageUrl', 'caption', 'order'], type: 'IGalleryImage' },
  { name: 'BlogPost', plural: 'blogs', fields: ['title', 'slug', 'excerpt', 'content', 'coverImageUrl', 'featured'], type: 'IBlogPost' },
  { name: 'CouncilMember', plural: 'team', fields: ['name', 'role', 'photoUrl', 'order'], type: 'ICouncilMember' }
];

const SRC_DIR = path.join(process.cwd(), 'src');

for (const entity of entities) {
  // --- 1. API Route (GET, POST) ---
  const apiDirPath = path.join(SRC_DIR, 'app', 'api', 'admin', entity.plural);
  fs.mkdirSync(apiDirPath, { recursive: true });
  
  const apiRouteContent = `import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ${entity.name} from '@/models/${entity.name}';
import { logAdminAction } from '@/lib/auditLogger';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const items = await ${entity.name}.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newItem = await ${entity.name}.create(data);
    await logAdminAction(req as any, 'CREATE', '${entity.name}', newItem._id.toString(), \`Created new ${entity.name}\`);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
`;
  fs.writeFileSync(path.join(apiDirPath, 'route.ts'), apiRouteContent);

  // --- 2. API Route ID (PUT, DELETE) ---
  const apiIdDirPath = path.join(apiDirPath, '[id]');
  fs.mkdirSync(apiIdDirPath, { recursive: true });

  const apiIdRouteContent = `import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ${entity.name} from '@/models/${entity.name}';
import { logAdminAction } from '@/lib/auditLogger';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const data = await req.json();
    const item = await ${entity.name}.findByIdAndUpdate(id, data, { new: true });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    await logAdminAction(req as any, 'UPDATE', '${entity.name}', id, \`Updated ${entity.name}\`);
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const item = await ${entity.name}.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    await logAdminAction(req as any, 'DELETE', '${entity.name}', id, \`Deleted ${entity.name}\`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
`;
  fs.writeFileSync(path.join(apiIdDirPath, 'route.ts'), apiIdRouteContent);

  // --- 3. UI Page ---
  const uiDirPath = path.join(SRC_DIR, 'app', 'portal', entity.plural);
  fs.mkdirSync(uiDirPath, { recursive: true });

  const uiContent = `'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function ${entity.name}Manager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Create an empty state based on fields
  const getEmptyState = () => ({
    ${entity.fields.map(f => `${f}: ${f === 'date' ? 'new Date().toISOString().split("T")[0]' : f === 'order' || f === 'featured' ? '""' : '""'}`).join(',\n    ')}
  });
  
  const [formData, setFormData] = useState<any>(getEmptyState());

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/${entity.plural}');
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
    const url = editingId ? \`/api/admin/${entity.plural}/\${editingId}\` : '/api/admin/${entity.plural}';
    
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
      await fetch(\`/api/admin/${entity.plural}/\${id}\`, { method: 'DELETE' });
      fetchItems();
    } catch (e) {
      alert('Error deleting');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold capitalize">Manage ${entity.plural}</h1>
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
          ${entity.fields.map(f => `
          <div className="\${['description', 'content', 'excerpt'].includes('${f}') ? 'md:col-span-2' : ''}">
            <label className="block text-sm font-medium mb-1 opacity-80 capitalize">${f}</label>
            ${['description', 'content', 'excerpt'].includes(f) ? `
            <textarea
              required
              rows={4}
              value={formData.${f}}
              onChange={e => setFormData({...formData, ${f}: e.target.value})}
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none"
            />
            ` : `
            <input
              type="${f === 'date' ? 'date' : f === 'featured' ? 'checkbox' : f === 'order' ? 'number' : 'text'}"
              ${f !== 'featured' ? 'required' : ''}
              ${f === 'featured' ? `checked={formData.${f}}` : `value={formData.${f}}`}
              onChange={e => setFormData({...formData, ${f}: ${f === 'featured' ? 'e.target.checked' : 'e.target.value'}})}
              className="${f === 'featured' ? '' : 'w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none'}"
            />
            `}
          </div>`).join('')}
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
`;
  fs.writeFileSync(path.join(uiDirPath, 'page.tsx'), uiContent);
}

console.log('CRUD scaffolding complete!');
