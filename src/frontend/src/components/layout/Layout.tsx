import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main
        className={`flex-1 overflow-y-auto bg-background scrollbar-thin ${isMobile ? "pt-16" : ""}`}
      >
        <div className="min-h-full animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
