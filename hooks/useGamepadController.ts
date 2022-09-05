import { useEventListener, useSessionStorageValue } from '@react-hookz/web';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type GamepadState = {
  a: boolean;
  b: boolean;
  x: boolean;
  y: boolean;
  l1: boolean;
  l3: boolean;
  r1: boolean;
  r3: boolean;
  share: boolean;
  options: boolean;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  back: boolean;
};

const useGamepadController = (): GamepadState => {
  const [gamepad, setGamepad] = useState<number | null>(null);
  const [gamepadState, setGamepadState] = useState<GamepadState>({
    a: false,
    b: false,
    x: false,
    y: false,
    l1: false,
    l3: false,
    r1: false,
    r3: false,
    share: false,
    options: false,
    up: false,
    down: false,
    left: false,
    right: false,
    back: false,
  });
  const [hasSeenControls, setHasSeenControls] = useSessionStorageValue(
    'daylight-controls',
    false
  );

  const gameloop = useCallback(
    (oldState: GamepadState) => {
      if (typeof gamepad !== 'number') {
        window.requestAnimationFrame(() => gameloop(oldState));
        return;
      }

      const activeGamepad = navigator.getGamepads()[gamepad];

      if (!activeGamepad) {
        window.requestAnimationFrame(() => gameloop(oldState));
        return;
      }

      const newState = {
        a: activeGamepad.buttons[0].pressed,
        b: activeGamepad.buttons[1].pressed,
        x: activeGamepad.buttons[2].pressed,
        y: activeGamepad.buttons[3].pressed,
        l1: activeGamepad.buttons[4].pressed,
        l3: activeGamepad.buttons[10].pressed,
        r1: activeGamepad.buttons[5].pressed,
        r3: activeGamepad.buttons[11].pressed,
        share: activeGamepad.buttons[8].pressed,
        options: activeGamepad.buttons[9].pressed,
        up: activeGamepad.buttons[12].pressed,
        down: activeGamepad.buttons[13].pressed,
        left: activeGamepad.buttons[14].pressed,
        right: activeGamepad.buttons[15].pressed,
        back: activeGamepad.buttons[16].pressed,
      };

      if (JSON.stringify(newState) !== JSON.stringify(oldState)) {
        setGamepadState(newState);
      }

      const next = () => gameloop(newState);
      window.requestAnimationFrame(next);
    },
    [gamepad]
  );

  useEffect(() => {
    if (typeof gamepad === 'number') {
      const newGamepad = navigator.getGamepads()[gamepad];

      if (!newGamepad || hasSeenControls) {
        return;
      }

      toast(`${newGamepad.id} connected.`);
      toast('Press Y to open / close the menu.');
      toast('Press A to select an option.');
      toast('Press B to go back.');
      toast('Press START to reload the page');
      toast('Press SELECT to go back.');
      toast('Use the D-Pad to navigate.');

      setHasSeenControls(true);
    }
  }, [gamepad, hasSeenControls, setHasSeenControls]);

  useEventListener(
    typeof window === 'undefined' ? null : window,
    'gamepadconnected',
    () => {
      const newGamepads = navigator.getGamepads();
      const activeGamePad = newGamepads.findIndex((gp) => Boolean(gp));

      setGamepad(activeGamePad);
    },
    { passive: true }
  );

  useEventListener(
    typeof window === 'undefined' ? null : window,
    'gamepaddisconnected',
    () => {
      setGamepad(null);
    },
    { passive: true }
  );

  useEffect(() => {
    if (typeof gamepad === 'number') {
      return;
    }

    const newGamepads = navigator.getGamepads();
    const activeGamePad = newGamepads.findIndex((gp) => Boolean(gp));

    if (activeGamePad === -1) {
      return;
    }

    setGamepad(activeGamePad);
  }, [gamepad]);

  useEffect(() => {
    if (typeof gamepad === 'number') {
      gameloop(gamepadState);
    }
  }, [gameloop, gamepad, gamepadState]);

  return gamepadState;
};

export default useGamepadController;
