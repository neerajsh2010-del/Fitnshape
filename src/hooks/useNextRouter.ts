import { useState, useEffect, useCallback } from 'react';

export interface NextRouter {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  forward: () => void;
  pathname: string;
}

export function useRouter(): NextRouter {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const push = useCallback((href: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', href);
      setPathname(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const replace = useCallback((href: string) => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', href);
      setPathname(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const back = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  const forward = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.forward();
    }
  }, []);

  return {
    push,
    replace,
    back,
    forward,
    pathname,
  };
}

export function usePathname(): string {
  const router = useRouter();
  return router.pathname;
}
