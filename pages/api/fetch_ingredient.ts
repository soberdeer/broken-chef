import type { NextApiRequest, NextApiResponse } from "next";
import API_URL, { AUTH, COOKIE, TOKEN } from "../../consts";

type Data = {
  ingredient: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body)
  const body = JSON.parse(req.body);
  // console.log(body)
// console.log(`${API_URL}/ingredients/${body.id}`)
  const data = await fetch(`${API_URL}/ingredients/${body.id}`, {
    method: "GET",
    headers: {
      "cs-referer": "https://www.chefsteps.com/",
      DNT: "1",
      "X-XSRF-TOKEN": TOKEN,
      "sec-ch-ua-mobile": "?0",
      Authorization: AUTH,
      Accept: "application/json, text/plain, */*",
      Cookie: COOKIE,
      Origin: "https://www.chefsteps.com",
      Referer: "https://www.chefsteps.com/",
    },
  })
    .then((res) => res.json())
    .catch(() => {});

  res.status(200).json({ ingredient: data });
}
