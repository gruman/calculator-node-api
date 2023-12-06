const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 8082;


const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const numberWords = {
  'plus': '+',
  'minus': '-',
  'dividedby': '/',
  'times': '*',
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'ten': 10,
  'eleven': 11,
  'twelve': 12,
  'thirteen': 13,
  'fourteen': 14,
  'fifteen': 15,
  'sixteen': 16,
  'seventeen': 17,
  'eighteen': 18,
  'nineteen': 19,
  'twenty': 20,
  'twenty-one': 21,
  'twenty-two': 22,
  'twenty-three': 23,
  'twenty-four': 24,
  'twenty-five': 25,
  'twenty-six': 26,
  'twenty-seven': 27,
  'twenty-eight': 28,
  'twenty-nine': 29,
  'thirty': 30,
};


app.get('/', (req, res) => {
  res.render('index', { results: '' });
});

app.post('/calculate', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).send('Data is required.');
  }

  const hasNumber = (str) => /\d/.test(str);
  const hasOperator = (str) => /[+\-/*]/.test(str);
  if (hasNumber(data))
  {
    res.render('index', { results: "No numbers allowed." });
  
    return;
  }

  if (hasOperator(data))
  {
    res.render('index', { results: "No operators allowed." });
  
    return;
  }

  const tokens = data.split(' ').map(token => numberWords[token] || token);
  const expression = tokens.join(' ');

  try {
    const result = eval(expression);
    res.render('index', { results: `${expression} = ${result}` });
  } catch (error) {
    return res.status(400).send('Invalid expression');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});