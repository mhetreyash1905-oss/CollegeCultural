'use client';

import { useState, useEffect } from 'react';
import { Shield, UserPlus, Ban, CheckCircle } from 'lucide-react';

export default function ManageAdmins() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New user form state
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', name: '', password: '', role: 'admin' });

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to load users or unauthorized');
      const data = await res.json();
      setUsers(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error('Failed to create user');
      setShowForm(false);
      setNewUser({ username: '', name: '', password: '', role: 'admin' });
      fetchUsers();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'revoke' : 'restore'} access for this user?`)) return;
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      fetchUsers();
    } catch (e: any) {
      alert('Failed to update user status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold">Manage Admins</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFC93C] text-black rounded-lg hover:bg-[#ffb700] transition-colors font-medium"
        >
          <UserPlus size={18} /> New Admin
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Administrator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 opacity-80">Full Name</label>
              <input required type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 opacity-80">Username</label>
              <input required type="text" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 opacity-80">Password (min 8 chars)</label>
              <input required type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} minLength={8} className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 opacity-80">Role</label>
              <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none">
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Create User</button>
        </form>
      )}

      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 text-sm opacity-80">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Username</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-black/10 dark:border-white/10 last:border-0 hover:bg-black/5 dark:hover:bg-white/5">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 opacity-70">@{user.username}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-md font-medium uppercase ${user.role === 'superadmin' ? 'bg-[#FFC93C]/20 text-[#d49900] dark:text-[#FFC93C]' : 'bg-blue-500/20 text-blue-700 dark:text-blue-300'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  {user.isActive ? (
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm"><CheckCircle size={14}/> Active</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm"><Ban size={14}/> Revoked</span>
                  )}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleStatus(user._id, user.isActive)}
                    className="text-sm font-medium px-3 py-1 rounded-md border border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10"
                  >
                    {user.isActive ? 'Revoke Access' : 'Restore Access'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
