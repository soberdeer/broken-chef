import API_URL, { AUTH, COOKIE, TOKEN } from '../consts';

export default async function fetchRecipe(page) {
  return await fetch(
    `${API_URL}/activities/${page}`,
    {
      method: 'GET',
      headers: {
        'cs-referer': 'https://www.chefsteps.com/',
        DNT: '1',
        'X-XSRF-TOKEN': TOKEN,
        'sec-ch-ua-mobile': '?0',
        Authorization: AUTH,
        Accept: 'application/json, text/plain, */*',
        Cookie: COOKIE,
        Origin: 'https://www.chefsteps.com',
        Referer: 'https://www.chefsteps.com/',
      },
    },
  );
}
