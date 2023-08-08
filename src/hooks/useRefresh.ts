import { useCallback, useState } from "react";

interface UseRefreshProps {
  timeout?: number;
  callback?: () => void;
}

export function useRefresh({ timeout = 2000, callback }: UseRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    callback?.();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, timeout);
  }, [timeout, callback]);
  return { isRefreshing, onRefresh };
}
