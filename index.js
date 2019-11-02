const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.use('/apps', require('./routes'))

// app.get('/apps', (req, res) => {
//     res.send('HELLO')
// });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.asdfasdfasdfasf
app.get('*', (req, res) => {
    console.log('the dirname', __dirname)
    res.sendFile('/client/build/index.html ' ,  { root : __dirname })})
  
  const port = process.env.PORT || 5000;
  app.listen(port);
  
  console.log(`Listening on ${port}`);