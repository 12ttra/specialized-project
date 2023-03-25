const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express()
const port = 3001

app.use(morgan('combined'));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', './src/sources/views');

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})