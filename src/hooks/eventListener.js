import { useEffect, useRef } from "react";

export function useEventListener(eventName, handler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventHandler = (event) => {
      //   handler(event.detail);
      handlerRef.current(event.detail);
    };

    document.addEventListener(eventName, eventHandler);
    return () => document.removeEventListener(eventName, eventHandler);
  }, [eventName]);
}
