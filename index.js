import http from "http";

import { getMemberDetails, getTeamsForOrg } from "./data.js";

http
  .createServer(function (req, res) {
    if (req.url.includes("/members")) {
      getMemberDetails().then((response) => {
        res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
        res.write(JSON.stringify(response));
        res.end();
      });
    } else if (req.url.includes("/teams")) {
      getTeamsForOrg({ org: "mdn" }).then((response) => {
        res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
        res.write(JSON.stringify(response));
        res.end();
      });
    } else {
      res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
      res.write(JSON.stringify({ msg: "Hello World" }));
      res.end();
    }
  })
  .listen(8080);
