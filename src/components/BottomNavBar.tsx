import { NavLink, useLocation } from 'react-router-dom';
import { LayoutGroup, motion } from 'framer-motion';
import { Icon } from './Icon';
import { cn } from '@/lib/cn';

type NavItem = {
  to: string;
  label: string;
  icon: string;
  matchPrefix?: string;
};

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { to: '/app/home', label: 'Home', icon: 'home', matchPrefix: '/app/home' },
  {
    to: '/app/vehicles',
    label: 'Vehicles',
    icon: 'directions_car',
    matchPrefix: '/app/vehicles',
  },
  {
    to: '/app/business',
    label: 'Business',
    icon: 'work',
    matchPrefix: '/app/business',
  },
  { to: '/app/account', label: 'Account', icon: 'person', matchPrefix: '/app/account' },
];

/**
 * Bottom navigation with an animated active-state pill (one of the three
 * highest-ROI polish bets from the UI audit). The pill uses Framer Motion's
 * shared `layoutId` so it FLIPs between tabs in ~180ms when the route
 * changes.
 */
export function BottomNavBar() {
  const { pathname } = useLocation();
  const activeIndex = NAV_ITEMS.findIndex((item) =>
    pathname.startsWith(item.matchPrefix ?? item.to),
  );

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around bg-surface-container-lowest px-4 pt-2 pb-safe shadow-nav"
      aria-label="Primary"
    >
      <LayoutGroup id="bottom-nav">
        {NAV_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex items-center justify-center px-2 py-1 outline-none"
            >
              <div
                className={cn(
                  'relative z-10 flex items-center justify-center gap-2 rounded-full px-4 py-1.5 transition-colors',
                  isActive
                    ? 'text-on-secondary-container'
                    : 'text-on-surface-variant',
                )}
              >
                <Icon name={item.icon} filled={isActive} size={22} />
                <span className="text-label-bold">{item.label}</span>
              </div>
              {isActive ? (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 z-0 rounded-full bg-secondary-container"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
            </NavLink>
          );
        })}
      </LayoutGroup>
    </nav>
  );
}
