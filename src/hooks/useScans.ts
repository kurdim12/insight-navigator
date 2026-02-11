/**
 * React Query hooks for Scan API
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scanApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

/**
 * Fetch all scans (optionally filtered by website)
 */
export function useScans(websiteId?: string) {
  return useQuery({
    queryKey: websiteId ? ['scans', websiteId] : ['scans'],
    queryFn: () => scanApi.list(websiteId),
  });
}

/**
 * Fetch single scan report
 */
export function useScan(id: string) {
  return useQuery({
    queryKey: ['scans', id],
    queryFn: () => scanApi.get(id),
    enabled: !!id,
    // Refetch every 3 seconds if scan is running
    refetchInterval: (data) => {
      if (data?.status === 'running' || data?.status === 'pending') {
        return 3000; // Poll every 3 seconds
      }
      return false; // Stop polling when complete/failed
    },
  });
}

/**
 * Start a new scan
 */
export function useStartScan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ websiteId, maxPages = 100 }: { websiteId: string; maxPages?: number }) =>
      scanApi.start(websiteId, maxPages),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: 'Scan Started',
        description: 'Your SEO scan has been queued and will start shortly',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
