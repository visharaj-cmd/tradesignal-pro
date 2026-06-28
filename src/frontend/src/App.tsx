import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AdminRoute } from "./components/AdminRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { Toast } from "./components/ui/Toast";
import { AdminProvider } from "./contexts/AdminContext";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

function PageLoader() {
  return (
    <div className="flex h-full min-h-[60vh] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <AdminProvider>
      <Outlet />
      <Toast />
    </AdminProvider>
  ),
});

// Public landing page
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  ),
});

// Admin login
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminLogin />
    </Suspense>
  ),
});

// Admin layout (protected)
const adminLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: () => (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
});

// Admin dashboard (default admin page)
const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboard />
    </Suspense>
  ),
});

// Admin services page (reuses dashboard with services tab active)
const adminServicesRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboard />
    </Suspense>
  ),
});

// Admin contact page (reuses dashboard with contact tab active)
const adminContactRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboard />
    </Suspense>
  ),
});

// Admin settings page
const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminSettings />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminLoginRoute,
  adminLayout.addChildren([
    adminIndexRoute,
    adminServicesRoute,
    adminContactRoute,
    adminSettingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
