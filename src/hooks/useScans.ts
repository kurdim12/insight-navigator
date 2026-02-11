import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scanApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useScans(websiteId?: string) {
  return useQuery({
    queryKey: websiteId ? ['scans', websiteId] : ['scans'],
    queryFn: () => scanApi.list(websiteId),
  });
}

export function useScan(id: string) {
  return useQuery({
    queryKey: ['scans', id],
    queryFn: () => scanApi.get(id),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === 'running' || data?.status === 'pending') {
        return 3000;
      }
      return false;
    },
  });
}

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
