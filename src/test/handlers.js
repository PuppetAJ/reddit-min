const { http, HttpResponse } = require("msw");

module.exports = {
  handlers: [
    http.get("https://www.reddit.com/r/*", () => {
      return HttpResponse.json({
        data: {
          children: [
            {
              data: {
                id: "1",
                title: "PUBG: BATTLEGROUNDS",
              },
            },
          ],
        },
      });
    }),
    http.get("https://www.reddit.com/subreddits/*", () => {
      return HttpResponse.json({
        data: {
          children: [
            {
              data: {
                id: "1",
                title: "PUBG: BATTLEGROUNDS",
              },
            },
          ],
        },
      });
    }),
  ],
};
