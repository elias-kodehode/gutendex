import { useEffect } from "react";

export function useEventListener(eventName, handler){
    useEffect(() => {

        const eventHandler = (event) => {
            handler(event.detail);
        }

        document.addEventListener(eventName, eventHandler);
        return () => document.removeEventListener(eventName, eventHandler);
    }, [eventName, handler]);
}