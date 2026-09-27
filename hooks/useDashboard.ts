import { useToasting } from "@/components/ui/Toast/useToasting";
import apiFetch from "@/lib/api";
import { CDashboardData, PDashboardData } from "@/types";
import { useCallback, useState } from "react";

export interface UseDashboardReturn<T = CDashboardData | PDashboardData| undefined> {
  loading: boolean
  dashboardData: T | undefined
  loadDashboard: () => Promise<void>;
  error: string | null
}

export function useDashboard<T = CDashboardData | PDashboardData | undefined>(
  role: 'client' | 'prestataire' = 'client'
): UseDashboardReturn<T> {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const {notify} = useToasting();

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFetch<T>(`api/dashboard/${role}`);
      
      if (response.success) {
        setDashboardData(response.data);
      } else { 
        const message =
          response.message || "Une erreur est survenue lors du chargement";
        setError(message);
        notify(message, "error");
      }
    } catch {
      const message = "Une erreur est survenue lors du chargement";
      setError(message);
      notify(message, 'error');
    } finally {
      setLoading(false);
    }
  }, [role, notify]);

  return {
    loadDashboard,
    loading,
    dashboardData,
    error,
  };
}
