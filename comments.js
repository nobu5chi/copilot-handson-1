// Create web server
const express = require('express');
const app = express();
// Create a router
const router = express.Router();
// Add a middleware to parse the request body
router.use(express.json());
// Add a middleware to log the request
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
});
// Add a middleware to handle the requests
router.use((req, res, next) => {
  res.json({ message: 'This is a comment' });
});
// Add the router to the application
app.use('/comments', router);
// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Run the server
// $ node comments.js

// Test the server
// $ curl http://localhost:3000/comments
// {"message":"This is a comment"}