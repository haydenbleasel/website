import { useEventListener } from '@react-hookz/web';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type GamepadState = {
  a: boolean;
  b: boolean;
  x: boolean;
  y: boolean;
  l1: boolean;
  l2: number;
  l3: boolean;
  r1: boolean;
  r2: number;
  r3: boolean;
  share: boolean;
  options: boolean;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  back: boolean;
  stickLX: number;
  stickLY: number;
  stickRX: number;
  stickRY: number;
};

const useGamepadController = (): GamepadState => {
  const [gamepad, setGamepad] = useState<number | null>(null);
  const [gamepadState, setGamepadState] = useState<GamepadState>({
    a: false,
    b: false,
    x: false,
    y: false,
    l1: false,
    l2: 0,
    l3: false,
    r1: false,
    r2: 0,
    r3: false,
    share: false,
    options: false,
    up: false,
    down: false,
    left: false,
    right: false,
    back: false,
    stickLX: 0,
    stickLY: 0,
    stickRX: 0,
    stickRY: 0,
  });

  const gameloop = useCallback((index: number, oldState: GamepadState) => {
    const activeGamepad = navigator.getGamepads()[index];

    if (!activeGamepad) {
      window.requestAnimationFrame(() => gameloop(index, oldState));
      return;
    }

    const newState = {
      a: activeGamepad.buttons[0].pressed,
      b: activeGamepad.buttons[1].pressed,
      x: activeGamepad.buttons[2].pressed,
      y: activeGamepad.buttons[3].pressed,
      l1: activeGamepad.buttons[4].pressed,
      l2: activeGamepad.buttons[6].value,
      l3: activeGamepad.buttons[10].pressed,
      r1: activeGamepad.buttons[5].pressed,
      r2: activeGamepad.buttons[7].value,
      r3: activeGamepad.buttons[11].pressed,
      share: activeGamepad.buttons[8].pressed,
      options: activeGamepad.buttons[9].pressed,
      up: activeGamepad.buttons[12].pressed,
      down: activeGamepad.buttons[13].pressed,
      left: activeGamepad.buttons[14].pressed,
      right: activeGamepad.buttons[15].pressed,
      back: activeGamepad.buttons[16].pressed,
      stickLX: activeGamepad.axes[0],
      stickLY: activeGamepad.axes[1],
      stickRX: activeGamepad.axes[2],
      stickRY: activeGamepad.axes[3],
    };

    const movement =
      newState.l2 ||
      newState.r2 ||
      newState.stickLX ||
      newState.stickLY ||
      newState.stickRX ||
      newState.stickRY;

    if (movement || JSON.stringify(newState) !== JSON.stringify(oldState)) {
      setGamepadState(newState);
    }

    const next = () => gameloop(index, newState);
    window.requestAnimationFrame(next);
  }, []);

  useEffect(() => {
    if (typeof gamepad === 'number') {
      const newGamepad = navigator.getGamepads()[gamepad];
      if (!newGamepad) {
        setGamepad(null);
        return;
      }
      toast(`${newGamepad.id} connected.`);
    }
  }, [gamepad]);

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
      gameloop(gamepad, gamepadState);
    }
  }, [gameloop, gamepad]);

  return gamepadState;
};

export default useGamepadController;
