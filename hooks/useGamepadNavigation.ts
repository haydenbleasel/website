import { useRouter } from 'next/router';
import useGamepadEvents from '@haydenbleasel/use-gamepad-events';
import toast from 'react-hot-toast';
import { useSessionStorageValue } from '@react-hookz/web';
import { useCommandBar } from '@haydenbleasel/command-bar';

const useGamepadNavigation = (): void => {
  const router = useRouter();
  const { open } = useCommandBar();
  const [hasSeenControls, setHasSeenControls] = useSessionStorageValue(
    'daylight-controls',
    false
  );
  const gamepadEvents = useGamepadEvents({
    onReady: (gamepad) => {
      if (hasSeenControls) {
        return;
      }
      toast(`${gamepad.id} connected.`);
      toast('Press Y to open / close the menu.');
      toast('Press A to select an option.');
      toast('Press B to go back.');
      toast('Press START to reload the page');
      toast('Press SELECT to go back.');
      toast('Use the D-Pad to navigate.');
      setHasSeenControls(true);
    },
  });

  gamepadEvents.on('options', router.reload);
  gamepadEvents.on('share', router.back);

  gamepadEvents.on('down', () => {
    if (typeof window === 'undefined' || open) {
      return;
    }

    window.scrollTo({ top: window.scrollY + window.innerHeight });
  });

  gamepadEvents.on('up', () => {
    if (typeof window === 'undefined' || open) {
      return;
    }

    window.scrollTo({ top: window.scrollY - window.innerHeight });
  });
};

export default useGamepadNavigation;
