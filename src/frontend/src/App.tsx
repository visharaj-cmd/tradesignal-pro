import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AdminRoute } from "./components/AdminRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./components/layout/AdminLayout";
import { Layout } from "./components/layout/Layout";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { Toast } from "./components/ui/Toast";
import { AdminProvider } from "./contexts/AdminContext";
import { AuthProvider } from "./contexts/AuthContext";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Payment = lazy(() => import("./pages/Payment"));
const Profile = lazy(() => import("./pages/Profile"));
const GetCertificate = lazy(() => import("./pages/GetCertificate"));
const VerifyCertificate = lazy(() => import("./pages/VerifyCertificate"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminSignals = lazy(() => import("./pages/admin/AdminSignals"));
const AdminPayments = lazy(() => import("./pages/admin/AdminPayments"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminCertificates = lazy(() => import("./pages/admin/AdminCertificates"));

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
    <AuthProvider>
      <AdminProvider>
        <Outlet />
        <Toast />
      </AdminProvider>
    </AuthProvider>
  ),
});

// Public routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Login />
    </Suspense>
  ),
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Signup />
    </Suspense>
  ),
});

const verifyCertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-cert",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <VerifyCertificate />
    </Suspense>
  ),
});

// Protected user routes
const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: () => (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Dashboard />
    </Suspense>
  ),
});

const paymentRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/payment",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Payment />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Profile />
    </Suspense>
  ),
});

const certificateRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/certificates",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <GetCertificate />
    </Suspense>
  ),
});

// Admin routes
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminLogin />
    </Suspense>
  ),
});

const adminLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: () => (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminOverview />
    </Suspense>
  ),
});

const adminSignalsRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/signals",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminSignals />
    </Suspense>
  ),
});

const adminPaymentsRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/payments",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPayments />
    </Suspense>
  ),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminSettings />
    </Suspense>
  ),
});

const adminCertificatesRoute = createRoute({
  getParentRoute: () => adminLayout,
  path: "/admin/certificates",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminCertificates />
    </Suspense>
  ),
});

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    window.location.replace("/dashboard");
    return null;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  verifyCertRoute,
  protectedLayout.addChildren([
    dashboardRoute,
    paymentRoute,
    profileRoute,
    certificateRoute,
  ]),
  adminLoginRoute,
  adminLayout.addChildren([
    adminIndexRoute,
    adminSignalsRoute,
    adminPaymentsRoute,
    adminSettingsRoute,
    adminCertificatesRoute,
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
