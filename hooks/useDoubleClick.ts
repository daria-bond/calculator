import { type DragStartEvent } from '@dnd-kit/core';
import { useCallback, useRef, type MutableRefObject } from 'react';

export const useDoubleClick = (
  clickFunc: (...args: any[]) => void,
  doubleClickFunc: (...argsDoubleClick: any[]) => void,
  argClickFunc: any[] | 'event' | null = null,
  argDoubleClickFunc: any[] | 'event' | null = null,
  timeout = 200,
): ((args: MouseEvent | DragStartEvent) => void) => {
  const clickTimeout: MutableRefObject<NodeJS.Timeout | undefined> =
    useRef(undefined);
  const clicks = useRef<number>(0);

  const draftFunc = (
    func,
    argFunc: 'event' | any[] | null,
    event: MouseEvent | DragStartEvent,
  ): ((...args: any[]) => void) | (() => void) => {
    if (argFunc !== null) {
      return argFunc === 'event' ? func(event) : func(event, ...argFunc);
    } else {
      return func();
    }
  };

  const clearClickTimeout = (): void => {
    if (clickTimeout.current !== null) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = undefined;
    }
  };

  return useCallback(
    (event: MouseEvent | DragStartEvent) => {
      clicks.current = clicks.current + 1;

      if (clicks.current === 1) {
        clickTimeout.current = setTimeout(() => {
          clicks.current = 0;
          draftFunc(clickFunc, argClickFunc, event);
        }, timeout);
      }
      if (clicks.current === 2) {
        clearClickTimeout();
        draftFunc(doubleClickFunc, argDoubleClickFunc, event);
        clicks.current = 0;
      }
    },
    [clickFunc, doubleClickFunc],
  );
};
