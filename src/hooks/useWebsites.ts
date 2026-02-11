/**
 * React Query hooks for Website API
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { websiteApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

/**
 * Fetch all websites
 */
export function useWebsites() {
  return useQuery({
    queryKey: ['websites'],
    queryFn: websiteApi.list,
  });
}

/**
 * Fetch single website
 */
export function useWebsite(id: string) {
  return useQuery({
    queryKey: ['websites', id],
    queryFn: () => websiteApi.get(id),
    enabled: !!id,
  });
}

/**
 * Create new website
 */
export function useCreateWebsite() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (url: string) => websiteApi.create({ url }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
      toast({
        title: 'Success',
        description: 'Website added successfully',
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

/**
 * Delete website
 */
export function useDeleteWebsite() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => websiteApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
      toast({
        title: 'Success',
        description: 'Website deleted successfully',
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

/**
 * Verify domain ownership
 */
export function useVerifyDomain() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, method }: { id: string; method: 'dns' | 'meta_tag' | 'file' }) =>
      websiteApi.verify(id, method),
    onSuccess: (data) => {
      if (data.verified) {
        queryClient.invalidateQueries({ queryKey: ['websites'] });
        toast({
          title: 'Success',
          description: data.message,
        });
      } else {
        toast({
          title: 'Verification Failed',
          description: data.message,
          variant: 'destructive',
        });
      }
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
