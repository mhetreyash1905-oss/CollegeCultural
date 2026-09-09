'use client';

import { useState, useEffect } from 'react';

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/logs')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load logs or unauthorized');
        return res.json();
      })
      .then((data) => setLogs(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const actionColors: any = {
    CREATE: 'bg-green-500/20 text-green-700 dark:text-green-400',
    UPDATE: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
    DELETE: 'bg-red-500/20 text-red-700 dark:text-red-400',
    LOGIN: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
    LOGOUT: 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
    REVOKE: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  };

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-6">System Audit Logs</h1>
      <p className="text-black/60 dark:text-white/60 mb-6">
        Viewing the most recent 100 administrative actions.
      </p>

      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 text-sm opacity-80">
              <th className="p-4 font-medium">Timestamp</th>
              <th className="p-4 font-medium">Administrator</th>
              <th className="p-4 font-medium">Action</th>
              <th className="p-4 font-medium">Entity</th>
              <th className="p-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-b border-black/10 dark:border-white/10 last:border-0 hover:bg-black/5 dark:hover:bg-white/5">
                <td className="p-4 text-sm opacity-70">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="p-4 font-medium">{log.adminName}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-md font-medium ${actionColors[log.action] || 'bg-black/10 dark:bg-white/10'}`}>
                    {log.action}
                  </span>
                </td>
                <td className="p-4 text-sm opacity-80">{log.entityType}</td>
                <td className="p-4 text-sm opacity-80">{log.details || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <div className="p-8 text-center text-black/50 dark:text-white/50">
            No audit logs found.
          </div>
        )}
      </div>
    </div>
  );
}
