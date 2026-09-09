'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Image as ImageIcon, Users, Briefcase, Calendar, FileText, Settings, ShieldAlert, LogOut, Menu, X, MessageSquare } from 'lucide-react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Don't show sidebar on login page
  if (pathname === '/portal/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/portal/dashboard' },
    { name: 'Hero Config', icon: ImageIcon, href: '/portal/hero' },
    { name: 'Gallery', icon: ImageIcon, href: '/portal/gallery' },
    { name: 'Societies', icon: Briefcase, href: '/portal/societies' },
    { name: 'Events', icon: Calendar, href: '/portal/events' },
    { name: 'Blogs', icon: FileText, href: '/portal/blogs' },
    { name: 'Team', icon: Users, href: '/portal/team' },
    { name: 'Contact Info', icon: MessageSquare, href: '/portal/contact' },
  ];

  const adminItems = [
    { name: 'Manage Admins', icon: ShieldAlert, href: '/portal/admins' },
    { name: 'Audit Logs', icon: Settings, href: '/portal/logs' },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/portal/login');
  };

  return (
    <div className="min-h-screen bg-[#FFF8EC] dark:bg-[#0F0B1E] text-[#0F0B1E] dark:text-[#FFF8EC] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen w-64 bg-white dark:bg-black/20 border-r border-black/5 dark:border-white/5 flex flex-col transition-transform duration-300 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
          <Link href="/portal/dashboard" className="font-serif font-bold text-xl text-[#FF4D6D]">
            Admin Portal
          </Link>
          <button className="lg:hidden text-black/50 dark:text-white/50" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          <div className="text-xs font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider mb-2 px-3">Content</div>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-[#FF4D6D]/10 text-[#FF4D6D] font-medium' : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <item.icon size={18} className={isActive ? 'text-[#FF4D6D]' : 'opacity-70'} />
                {item.name}
              </Link>
            );
          })}

          <div className="text-xs font-semibold text-black/40 dark:text-white/40 uppercase tracking-wider mt-6 mb-2 px-3">Security (SuperAdmin)</div>
          {adminItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-[#FFC93C]/20 text-[#FFC93C] font-medium' : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <item.icon size={18} className={isActive ? 'text-[#FFC93C]' : 'opacity-70'} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-black/5 dark:border-white/5 bg-white dark:bg-black/20 flex items-center px-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-black/60 dark:text-white/60">
            <Menu size={24} />
          </button>
          <span className="font-serif font-bold ml-2">Admin Portal</span>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
