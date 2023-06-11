This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To see a live demo of the site without the need to install or run anything, visit [`this Vercel site`](https://api-practice2.vercel.app/)

## Getting Started

Install [`Node.js`](https://nodejs.org/en) if not already installed

## Installing Dependencies

Run this command with your terminal IDE

```Javascript
npm install @chakra-ui/react @emotion/react @emotion/styled axios framer-motion millify nprogress react-horizontal-scrolling-menu react-icons
```

Retrieve a RapidAPI Key from [`here`](https://rapidapi.com/apidojo/api/bayut)

Note: You may be required to signUp for RapidAPI before being allowed access.

Afterwards, place API key within the fetchApi.js file. Replacing the .env

```Javascript
import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchAPI = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": RapidAPI key goes here,
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return data;
};
```

Finally, should be ready to run

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
