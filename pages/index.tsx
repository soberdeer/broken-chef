import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import cookie from 'cookie';
// import { useRouter } from 'next/router';
import API_URL, { COOKIE } from '../consts';
import { useRouter } from 'next/router';
// import Card from '../components/Card/Card';

export default function HomeContainer(props) {
  const router = useRouter();
  useEffect(() => {
      router.push('/recipes')
  }, []);
  return (
    <div>
    </div>
  );
}
