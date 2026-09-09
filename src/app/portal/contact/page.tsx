'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function ContactConfig() {
  const [config, setConfig] = useState({
    contactEmail: '',
    contactAddress: '',
    contactPhone: '',
    socialLinks: {
      instagram: '',
      facebook: '',
      linkedin: '',
      twitter: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/config')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setConfig({
            contactEmail: data.contactEmail || '',
            contactAddress: data.contactAddress || '',
            contactPhone: data.contactPhone || '',
            socialLinks: data.socialLinks || { instagram: '', facebook: '', linkedin: '', twitter: '' }
          });
        }
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
        body: JSON.stringify(config),
      });
      if (res.ok) setMessage('Successfully updated contact info!');
      else setMessage('Failed to update.');
    } catch (e) {
      setMessage('An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setConfig({ ...config, [field]: value });
  };

  const updateSocial = (network: string, value: string) => {
    setConfig({
      ...config,
      socialLinks: { ...config.socialLinks, [network]: value }
    });
  };

  if (loading) return <div>Loading configuration...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-6">Contact & Socials</h1>
      
      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-6">General Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Email Address</label>
            <input
              type="email"
              value={config.contactEmail}
              onChange={(e) => updateField('contactEmail', e.target.value)}
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF4D6D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Phone Number (Optional)</label>
            <input
              type="text"
              value={config.contactPhone}
              onChange={(e) => updateField('contactPhone', e.target.value)}
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF4D6D]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 opacity-80">Physical Address</label>
            <textarea
              rows={3}
              value={config.contactAddress}
              onChange={(e) => updateField('contactAddress', e.target.value)}
              className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF4D6D]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {['instagram', 'linkedin', 'facebook', 'twitter'].map((network) => (
            <div key={network}>
              <label className="block text-sm font-medium mb-2 opacity-80 capitalize">{network}</label>
              <input
                type="url"
                // @ts-ignore
                value={config.socialLinks[network] || ''}
                onChange={(e) => updateSocial(network, e.target.value)}
                placeholder={`https://${network}.com/...`}
                className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF4D6D]"
              />
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div className="mb-6 text-sm font-medium text-green-600 dark:text-green-400 bg-green-500/10 p-3 rounded-lg">
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
  );
}
