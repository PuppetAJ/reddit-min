const { http, HttpResponse } = require("msw");
const { BsDisplay } = require("react-icons/bs");

// Make wild card after specific paths
module.exports = {
  handlers: [
    http.get("https://www.reddit.com/search*", ({ request }) => {
      const url = new URL(request.url);

      const searchParams = url.searchParams.get("q");
      // console.log(searchParams);

      if (searchParams === "react") {
        return HttpResponse.json({
          data: {
            after: "t3_1",
            children: [
              {
                data: {
                  id: "1",
                  title: "React is epic",
                  num_comments: 100,
                  subreddit_name_prefixed: "r/React",
                  subreddit: "React",
                  author: "test_author",
                  score: 100,
                  created_utc: 1634054400,
                  selftext_html: "<p>Test post</p>",
                  permalink: "/r/React/comments/1/test",
                },
              },
            ],
          },
        });
      }

      if (searchParams === "nomore") {
        return HttpResponse.json({
          data: {
            after: null,
            children: [],
          },
        });
      }

      return HttpResponse.json({
        data: {
          children: [
            {
              data: {
                id: "1",
                title: "PUBG: BATTLEGROUNDS",
                num_comments: 100,
              },
            },
          ],
        },
      });
    }),
    http.get("https://www.reddit.com/r/*/comments/*/*", () => {
      return HttpResponse.json([
        {
          data: {
            children: [
              {
                data: {
                  id: "1",
                  title: "PUBG: BATTLEGROUNDS",
                  num_comments: 100,
                },
              },
            ],
          },
        },
        {
          data: {
            children: [
              {
                data: {
                  id: "2",
                  author: "test_author",
                  num_comments: 100,
                  score: 100,
                  created_utc: 1634054400,
                  body_html: "<p>Test comment</p>",
                },
              },
            ],
          },
        },
      ]);
    }),

    http.get("https://www.reddit.com/r/React/about.json", () => {
      // console.log("reached!!!!!! 2");
      return HttpResponse.json({
        data: {
          display_name: "React",
          subscribers: 100,
          accounts_active: 100,
        },
      });
    }),

    http.get("https://www.reddit.com/r/react/*", ({ request }) => {
      // console.log("reached!!!!!!");
      const url = new URL(request.url);

      const searchParams = url.searchParams.get("after");
      // console.log(searchParams);

      if (searchParams === "t3_1") {
        return HttpResponse.json({
          data: {
            after: "t3_2",
            children: [
              {
                data: {
                  id: "2",
                  title: "React is epic 2",
                  num_comments: 100,
                  subreddit_name_prefixed: "r/React",
                  subreddit: "React",
                },
              },
            ],
          },
        });
      }

      return HttpResponse.json({
        data: {
          after: "t3_1",
          children: [
            {
              data: {
                id: "1",
                title: "React is epic",
                num_comments: 100,
                subreddit_name_prefixed: "r/React",
              },
            },
          ],
        },
      });
    }),

    // http.get(
    //   "https://www.reddit.com/r/react/hot.json?raw_json=1&after=t3_1",
    //   () => {
    //     console.log("reached!!!!");
    //     return HttpResponse.json({
    //       data: {
    //         after: "t3_2",
    //         children: [
    //           {
    //             data: {
    //               id: "2",
    //               title: "React is epic 2",
    //               num_comments: 100,
    //               subreddit_name_prefixed: "r/React",
    //               subreddit: "React",
    //             },
    //           },
    //         ],
    //       },
    //     });
    //   }
    // ),

    http.get("https://www.reddit.com/r/*/about.json", ({ request }) => {
      // console.log(request);
      return HttpResponse.json({
        data: {
          display_name: "PUBG",
          subscribers: 100,
          accounts_active: 100,
        },
      });
    }),

    http.get("https://www.reddit.com/r/*/*", () => {
      return HttpResponse.json({
        data: {
          children: [
            {
              data: {
                id: "1",
                title: "PUBG: BATTLEGROUNDS",
                num_comments: 100,
                subreddit_name_prefixed: "r/PUBG",
                author: "test_author",
                score: 100,
                created_utc: 1634054400,
                selftext_html: "<p>Test post</p>",
                permalink: "/r/PUBG/comments/1/test",
              },
            },
          ],
        },
      });
    }),

    http.get("https://www.reddit.com/subreddits/*", () => {
      return HttpResponse.json({
        data: {
          subscribers: 100,
          before: "t3_0",
          after: "t3_1",
          children: [
            {
              data: {
                id: "1",
                title: "PUBG: BATTLEGROUNDS",
                display_name_prefixed: "r/PUBG",
                display_name: "PUBG",
              },
            },
            {
              data: {
                id: "2",
                title: "React is epic",
                display_name_prefixed: "r/React",
                display_name: "React",
              },
            },
          ],
        },
      });
    }),
  ],
};
