import createBareServer from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "http";
import { publicPath } from "ultraviolet-static";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { join } from "path";
import { hostname } from "os";

const bare = createBareServer("/bare/");
const app = express();

// Load the publicPath directory
app.use(express.static(publicPath));

const server = createServer((req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res, (err) => {
      if (err && err.code === "ENOENT") {
        res.status(404).sendFile(join(publicPath, "404.html"));
      } else {
        res.sendStatus(500);
      }
    });
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 80;

server.listen(port, () => {
  const address = server.address();

  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    bare.close();
  });
}
