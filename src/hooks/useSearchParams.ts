import { useSearchParams as useRouterSearchParams } from 'react-router-dom';

export function useSearchParams() {
  const [searchParams] = useRouterSearchParams();
  const contextParam = searchParams.get('context');
  
  let context = null;
  try {
    context = contextParam ? JSON.parse(decodeURIComponent(contextParam)) : null;
  } catch (e) {
    console.error('Failed to parse context:', e);
  }
  
  return {
    context: context?.code || '',
    error: context?.error || ''
  };
}