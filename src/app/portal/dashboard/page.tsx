import { headers } from 'next/headers';
import QuickSettings from './QuickSettings';

export default async function DashboardOverview() {
  const headersList = await headers();
  const adminName = headersList.get('x-admin-name') || 'Admin';
  const adminRole = headersList.get('x-admin-role') || 'admin';

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-2">Welcome back, {adminName}</h1>
      <p className="text-black/60 dark:text-white/60 mb-8">
        You are logged in as a <span className="font-semibold text-[#FF4D6D] uppercase">{adminRole}</span>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickSettings />

        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-2">Help & Instructions</h3>
          <p className="text-sm text-black/60 dark:text-white/60">
            Select a module from the sidebar to manage site content. All changes are logged for security.
          </p>
        </div>
      </div>
    </div>
  );
}
