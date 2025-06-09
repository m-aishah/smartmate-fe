
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/ui/use-toast';

interface UseAsyncOperationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
}

interface AsyncOperationState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAsyncOperation<T = any>(
  options: UseAsyncOperationOptions<T> = {}
) {
  const { 
    onSuccess, 
    onError, 
    successMessage, 
    errorMessage = 'An error occurred',
    showToast = true 
  } = options;
  
  const { toast } = useToast();
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (asyncFn: () => Promise<T>) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const result = await asyncFn();
        
        setState({
          data: result,
          isLoading: false,
          error: null,
        });

        onSuccess?.(result);
        
        if (showToast && successMessage) {
          toast({
            title: "Success",
            description: successMessage,
          });
        }
        
        return result;
      } catch (error) {
        const errorObj = error as Error;
        
        setState({
          data: null,
          isLoading: false,
          error: errorObj,
        });

        onError?.(errorObj);
        
        if (showToast) {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
        
        throw error;
      }
    },
    [onSuccess, onError, successMessage, errorMessage, showToast, toast]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
