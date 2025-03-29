const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your db.json file
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
  })
);

// Use default middlewares (logging, static files, etc.)
server.use(middlewares);

// Use the JSON Server router
server.use(router);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
