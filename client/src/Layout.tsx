import { Link, Outlet } from 'react-router';
import { ROUTES } from '@/shared/config/routes';

export function Layout() {
  return (
    <div className="bg-bg min-h-screen text-text">
      <header className="bg-surface border-border border-b">
        <div className="flex items-center gap-3 py-4 layout-inner">
          <Link
            to={ROUTES.home}
            className="flex items-center gap-2 text-primary hover:text-white transition-colors"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
            </svg>
            <span className="font-semibold text-lg">Forms Lite</span>
          </Link>
        </div>
      </header>
      <main className="py-8 layout-inner">
        <Outlet />
      </main>
    </div>
  );
}
