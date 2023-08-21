export default async function fetchRecipe(page) {
  return await fetch(
    `${process.env.API_URL}/activities/${page}`,
    {
      method: 'GET',
      headers: {
        'cs-referer': 'https://www.chefsteps.com/',
        DNT: '1',
        'X-XSRF-TOKEN': process.env.TOKEN,
        'sec-ch-ua-mobile': '?0',
        Authorization: process.env.AUTH,
        Accept: 'application/json, text/plain, */*',
        Cookie: process.env.COOKIE,
        Origin: 'https://www.chefsteps.com',
        Referer: 'https://www.chefsteps.com/',
      },
    },
  );
}
