import { useKBar } from 'kbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCommandBar } from '../components/cmdk';
import useGamepadController from './useGamepadController';

const getActiveKBarIndex = () => {
  const activeElement = document.querySelector(
    '#kbar-listbox > [aria-selected="true"]'
  );
  if (!activeElement) {
    return undefined;
  }
  const id = activeElement.getAttribute('id');
  const index = id?.split('-').at(-1);

  if (!index) {
    return undefined;
  }

  const parsedIndex = Number(index);

  return parsedIndex;
};

const getLastKBarIndex = () => {
  const activeElement = document.querySelectorAll('#kbar-listbox > div');

  const lastElement = activeElement[activeElement.length - 1];

  const id = lastElement.getAttribute('id');
  const index = id?.split('-').at(-1);

  if (!index) {
    return undefined;
  }

  const parsedIndex = Number(index);

  return parsedIndex;
};

const useGamepadNavigation = (): void => {
  const router = useRouter();
  const gamepadState = useGamepadController();
  const commandBar = useCommandBar();
  const kbar = useKBar();

  useEffect(() => {
    if (gamepadState.options) {
      router.reload();
    }
  }, [gamepadState.options, router]);

  useEffect(() => {
    if (gamepadState.y) {
      commandBar.toggleOpen();
    }
  }, [gamepadState.y, commandBar]);

  useEffect(() => {
    if (typeof window === 'undefined' || !gamepadState.down) {
      return;
    }

    const isKBarOpen = document.body.style.overflowY === 'hidden';
    if (isKBarOpen) {
      const activeIndex = getActiveKBarIndex();
      const lastIndex = getLastKBarIndex();
      if (
        activeIndex !== undefined &&
        lastIndex !== undefined &&
        activeIndex < lastIndex
      ) {
        kbar.query.setActiveIndex(activeIndex + 1);
      }
    } else {
      window.scrollTo({ top: window.scrollY + window.innerHeight });
    }
  }, [gamepadState.down, kbar.query]);

  useEffect(() => {
    if (typeof window === 'undefined' || !gamepadState.a) {
      return;
    }

    const isKBarOpen = document.body.style.overflowY === 'hidden';
    if (!isKBarOpen) {
      return;
    }

    const activeElement = document.querySelector<HTMLDivElement>(
      '#kbar-listbox > [aria-selected="true"]'
    );

    if (!activeElement) {
      return;
    }

    activeElement.click();
  }, [gamepadState.a]);

  useEffect(() => {
    if (typeof window === 'undefined' || !gamepadState.b) {
      return;
    }

    const isKBarOpen = document.body.style.overflowY === 'hidden';
    if (!isKBarOpen) {
      return;
    }

    kbar.query.setCurrentRootAction(null);
  }, [gamepadState.b, kbar.query]);

  useEffect(() => {
    if (typeof window === 'undefined' || !gamepadState.up) {
      return;
    }

    const isKBarOpen = document.body.style.overflowY === 'hidden';
    if (isKBarOpen) {
      const activeIndex = getActiveKBarIndex();
      if (activeIndex !== undefined && activeIndex > 0) {
        kbar.query.setActiveIndex(activeIndex - 1);
      }
    } else {
      window.scrollTo({ top: window.scrollY - window.innerHeight });
    }
  }, [gamepadState.up, kbar.query]);

  useEffect(() => {
    if (gamepadState.share && typeof window !== 'undefined') {
      router.back();
    }
  }, [gamepadState.share, router]);
};

export default useGamepadNavigation;
