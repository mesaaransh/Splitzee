import { useState, useEffect } from 'react';

function useSessionStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const sessionValue = sessionStorage.getItem(key);
    try {
      return sessionValue ? JSON.parse(sessionValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}


export default useSessionStorage;