import { useEffect, useRef } from "react";

export const usePrevious = <T extends unknown>(value: T): T | undefined => {
  // FROM: https://stackoverflow.com/a/57706747
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};