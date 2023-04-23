import { useCallback, useState } from "react";

// Hook

export const useToggle = (initialState = false): [boolean, any] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((): void => setState((state) => !state), []);
  return [state, toggle];
};

// Usage
// function App() {
//   // Call the hook which returns, current value and the toggler function
//   const [isTextChanged, setIsTextChanged] = useToggle();
//   return (
//     <button onClick={setIsTextChanged}>
//       {isTextChanged ? "Toggled" : "Click to Toggle"}
//     </button>
//   );
// }

// ref: https://usehooks.com/
