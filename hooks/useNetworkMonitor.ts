import { useNetworkState } from '@react-hookz/web';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const useNetworkMonitor = (): void => {
  const networkState = useNetworkState();
  useEffect(() => {
    if (!networkState.online) {
      toast.error(
        'You are offline - some content may not be available until you reconnect.'
      );
    }
  }, [networkState.online]);
};

export default useNetworkMonitor;
