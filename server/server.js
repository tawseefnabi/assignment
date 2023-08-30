const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

let reviews = [];

app.post('/api/add-review', (req, res) => {
  console.log("er", req.body);
  const review = {
    id: Date.now(),
    text: req.body.text,
    dateTime: new Date().toLocaleString(),
    upvotes: 0,
    downvotes: 0,
  };
  reviews.push(review);
  res.status(201).json(review);
});

app.get('/api/get-reviews', (req, res) => {
  const sortedReviews = reviews.sort(
    (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
  );
  console.log("===", sortedReviews);
  res.json(sortedReviews);
});
app.get('/api/analyze-reviews', (req, res) => {
  const sortedReviews = reviews.sort(
    (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
  );
  console.log("===", sortedReviews);
  res.json(sortedReviews);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
