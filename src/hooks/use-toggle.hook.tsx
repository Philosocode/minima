import { useState } from "react";

export function useToggle(initialVal: boolean): [boolean, () => void] {
  const [state, setState] = useState(initialVal);

  function toggle() {
    setState(!state);
  };
  
  return [state, toggle];
}