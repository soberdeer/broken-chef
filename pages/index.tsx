import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomeContainer() {
  const router = useRouter();
  useEffect(() => {
    router.push('/recipes');
  }, []);
  return null;
}
