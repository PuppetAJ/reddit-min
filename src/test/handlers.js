const { http, HttpResponse } = require("msw");

module.exports = {
  handlers: [
    http.get("https://www.reddit.com/r/all/hot.json", () => {
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
