import { useCallback, useState } from "react";

export default function useOnChange() {
  const [value, setValue] = useState("");

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return { value, handleChange, setValue };
}
