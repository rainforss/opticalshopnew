import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });
const client = createClient({
  url: "https://graphql.contentful.com/content/v1/spaces/ku8ywade9k6u/environments/master",
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  fetchOptions: () => {
    return {
      headers: {
        Authorization: `Bearer WqdPHH6b72NVWoH0m8oF_7dQy4EE3gfaBqSbFjJOb_0`,
      },
    };
  },
});

export { client, ssrCache };
