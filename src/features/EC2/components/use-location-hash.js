import { useState, useEffect } from 'react';

export default function useLocationHash() {
  const [currentPagePath, setCurrentPage] = useState(
    window.location.hash.substring(1)
  );

  useEffect(() => {
    const handler = () => setCurrentPage(window.location.hash.substring(1));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPagePath]);

  return currentPagePath;
}
