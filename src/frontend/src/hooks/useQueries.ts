import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useServices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLeads() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listLeads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactDetails() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["contactDetails"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getContactDetails();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitLead() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      fullName,
      contactNumber,
    }: {
      fullName: string;
      contactNumber: string;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.captureLead(fullName, contactNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Thank you! We will contact you soon.");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to submit. Please try again.");
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Backend not available");
      return actor.deleteLead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead deleted successfully.");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete lead.");
    },
  });
}

export function useVerifyAdminPassword() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (password: string) => {
      if (!actor) throw new Error("Backend not available");
      return actor.verifyAdminPassword(password);
    },
  });
}

export function useAddService() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      title,
      description,
      icon,
      order,
    }: {
      title: string;
      description: string;
      icon: string;
      order: bigint;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.addService(title, description, icon, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service added successfully.");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to add service.");
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      icon,
      order,
    }: {
      id: bigint;
      title: string;
      description: string;
      icon: string;
      order: bigint;
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.updateService(id, title, description, icon, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated successfully.");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update service.");
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Backend not available");
      return actor.deleteService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted successfully.");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete service.");
    },
  });
}

export function useSetContactDetails() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      phone,
      whatsapp,
      email,
      address,
      socialMedia,
    }: {
      phone: string;
      whatsapp: string;
      email: string;
      address: string;
      socialMedia: { url: string; platform: string }[];
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.setContactDetails(
        phone,
        whatsapp,
        email,
        address,
        socialMedia,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactDetails"] });
      toast.success("Contact details updated successfully.");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update contact details.");
    },
  });
}

export function useAppSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["appSettings"],
    queryFn: async () => {
      if (!actor) return null;
      const backendSettings = await actor.getAppSettings();
      // Backend AppSettings has walletNetwork, walletAddress, currency, upiId, paymentType
      // We return it as-is; landing page components cast to LandingPageSettings shape
      // or use default values since the backend doesn't store landing page content yet.
      return backendSettings;
    },
    enabled: !!actor && !isFetching,
  });
}
