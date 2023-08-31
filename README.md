https://huggingface.co/docs/transformers.js/pipelines#tasks

# Getting Started with PROJECT

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

 clone this project after that 
 start backend
 ```sh
  npm i 
  node server
 ```
 backend will run on port 3001

 to start webapp
 ```sh 
  cd client
   npm start
 ```


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

BE apis

```
POST /api/add-review    # to add review
POST /api/analyze-review    # to do analysis
POST /api/update-vote    # to upvote or downvote
```
for analysis we used `@xenova/transformers` for sentiment analysis from happyface



NOTE: no db or state management has been used. data is stoed in array for testing ourpose onlu. we can integrate different db in backend to save data


## things which needs improvement:

 - css framework like tailwind need to added for better UI
 -  using redux or saga ro store data in  ui 