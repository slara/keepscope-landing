# KeepScope landing

Static Spanish landing page, published on GitHub Pages at https://keepscope.ai.

## Run locally with Docker

```sh
docker compose up --build -d
```

Open http://localhost:8088. The container serves only the landing HTML, CSS,
JavaScript, and assets. It binds to localhost, leaving other local web servers
on port 80 untouched.

After editing files, run the same command to rebuild and refresh the browser.
To use another port: `PORT=8090 docker compose up --build -d`.

```sh
docker compose ps
docker compose logs --tail=50 landing
docker compose down
```

The approval and restitution interactions are local simulations with fictional data.
They do not send data to an AI model. Contact
links open the visitor's email client; this repository does not host an inbox.

GitHub Actions publishes only HTML, CSS, JavaScript, CNAME, and assets. Product
and design notes are development documentation and are not served by the site.
