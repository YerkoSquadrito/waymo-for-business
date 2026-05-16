import { Outlet } from 'react-router-dom';

/**
 * Layout slot for all `/app/*` routes. Most screens use <PageScaffold/>
 * directly to gain control over their TopAppBar / BottomNavBar configuration,
 * so this layout just provides the route boundary.
 */
export default function AppLayout() {
  return <Outlet />;
}
