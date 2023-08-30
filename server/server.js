import express  from 'express';
import { pipeline } from '@xenova/transformers';
import cors from 'cors'
const app = express();

app.use(cors());
app.use(express.json());

let reviews = [];

app.post('/api/add-review', (req, res) => {
  const review = {
    id: reviews.length == 0 ? 100:  100+reviews.length+1,
    text: req.body.text,
    dateTime: new Date().toLocaleString(),
    upvotes: 0,
    downvotes: 0,
    sentiment: {
      'label': '',
      'score': 0
    }
  };
  reviews.push(review);
  res.status(201).json(review);
});
const handleAnalyze = async (reviews) => {
  try {
      let classifier = await pipeline('sentiment-analysis');
      for(let r of reviews){
        let sentiment = await classifier(r.text);
        console.log("sentiments", sentiment);
        r.sentiment['label'] = sentiment[0].label
        r.sentiment['score'] = sentiment[0].score
      }
    return reviews
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
  }
};
app.post('/api/update-vote', (req, res) =>{
  let {reviewId, voteType}  = req.body
  let  _reviews = reviews.map(r =>{
    if(r.id === reviewId){
      if(voteType == 'up'){
        r.upvotes += 1
      } else if (voteType == 'down'){
          r.downvotes += -1
               
      }
    }
  })
  const sortedReviews = reviews.sort(
    (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
  );
  return  res.status(201).json(sortedReviews);
})

app.get('/api/get-reviews', (req, res) => {
  const sortedReviews = reviews.sort(
    (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
  );
  res.json(sortedReviews);
});
app.get('/api/analyze-reviews', async (req, res) => {
  let list = await handleAnalyze(reviews)
  const sortedReviews = list.sort(
    (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
  );
    
  res.json(sortedReviews);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
