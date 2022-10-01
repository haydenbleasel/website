import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCommandBar } from '../components/cmdk';
import useGamepadController from './useGamepadController';

const useGamepadNavigation = (): void => {
  const router = useRouter();
  const gamepadState = useGamepadController();
  const { toggleOpen, open, setIndex, select, setPage } = useCommandBar();

  useEffect(() => {
    if (gamepadState.options) {
      router.reload();
    }
  }, [gamepadState.options, router]);

  useEffect(() => {
    if (gamepadState.y) {
      toggleOpen();
    }
  }, [gamepadState.y, toggleOpen]);

  useEffect(() => {
    if (typeof window === 'undefined' || !gamepadState.down) {
      return;
    }

    if (open) {
      setIndex((index) => index + 1);
    } else {
      window.scrollTo({ top: window.scrollY + window.innerHeight });
    }
  }, [gamepadState.down, open, setIndex]);

  useEffect(() => {
    if (typeof window === 'undefined' || !gamepadState.a || !open) {
      return;
    }

    select();
  }, [select, open, gamepadState.a]);

  useEffect(() => {
    if (typeof window === 'undefined' || !gamepadState.b || !open) {
      return;
    }

    setPage('');
  }, [gamepadState.b, open, setPage]);

  useEffect(() => {
    if (typeof window === 'undefined' || !gamepadState.up) {
      return;
    }

    if (open) {
      setIndex((index) => index - 1);
    } else {
      window.scrollTo({ top: window.scrollY - window.innerHeight });
    }
  }, [gamepadState.up, open, setIndex]);

  useEffect(() => {
    if (gamepadState.share && typeof window !== 'undefined') {
      router.back();
    }
  }, [gamepadState.share, router]);
};

export default useGamepadNavigation;
