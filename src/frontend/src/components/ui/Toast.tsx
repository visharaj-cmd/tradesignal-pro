import { Toaster } from "@/components/ui/sonner";

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-card border border-border text-foreground font-body",
          title: "text-foreground font-semibold",
          description: "text-muted-foreground",
          success: "border-emerald-500/30",
          error: "border-rose-500/30",
          warning: "border-amber-500/30",
          info: "border-primary/30",
        },
      }}
    />
  );
}

export { toast } from "sonner";
