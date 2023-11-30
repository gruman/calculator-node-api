const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const { data } = req.query;

  if (!data) {
    return res.status(400).send('Data is required.');
  }

  const operations = {
    'plus': '+',
    'minus': '-',
    'dividedby': '/',
    'times': '*'
  };

  const tokens = data.split('/').map(token => operations[token] || token);

  let expression = '';
  tokens.forEach((token, index) => {
    if (operations.hasOwnProperty(token)) {
      expression += ` ${operations[token]} `;
    } else {
      expression += `${token} `;
    }
  });

  let result;
  try {
    result = eval(tokens.join(''));
  } catch (error) {
    return res.status(400).send('Invalid expression');
  }

  res.send(`${expression} = ${result}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
