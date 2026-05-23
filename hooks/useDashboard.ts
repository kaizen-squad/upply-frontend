import { useToasting } from "@/components/ui/Toast/useToasting";
import apiFetch from "@/lib/api";
import { CDashboardData, PDashboardData } from "@/types";
import { useCallback, useState } from "react";

export interface UseDashboardReturn<T = CDashboardData | PDashboardData| undefined> {
  loading: boolean
  dashboardData: T | undefined
  loadDashboard: () => void,
  error: string | null
}

export function useDashboard<T = CDashboardData | PDashboardData | undefined>(
  role: 'client' | 'prestataire' = 'client'
): UseDashboardReturn<T> {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const {notify} = useToasting();

  const loadDashboard = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFetch<T>(`api/dashboard/${role}`);
      
      if (response.success) {
        setDashboardData(response.data);
      } else {
        throw new Error(response.message || 'Erreur de chargement');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement';
      setError(message);
      notify(message, 'error');
    } finally {
      setLoading(false);
    }
  }, [role, loading, notify]);

  return {
    loadDashboard,
    loading,
    dashboardData,
    error,
  };
}
