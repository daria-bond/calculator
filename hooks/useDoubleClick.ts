import { type DragStartEvent } from '@dnd-kit/core';
import { useCallback, useRef, type MutableRefObject } from 'react';

type eventType = MouseEvent | DragStartEvent;

export const useDoubleClick = (
  onClick: (...args: any[]) => void,
  onDoubleClick: (...argsDoubleClick: any[]) => void,
  timeout = 200,
): ((args: eventType) => void) => {
  const clickTimeout: MutableRefObject<NodeJS.Timeout | undefined> = useRef(undefined);
  const clicks = useRef<number>(0);

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
          onClick(event);
        }, timeout);
      }
      if (clicks.current === 2) {
        clearClickTimeout();
        onDoubleClick(event);
        clicks.current = 0;
      }
    },
    [onClick, onDoubleClick],
  );
};
