const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

// Mock Data: Water footprint values for products
const mockData = {
  apple: { grey: 265, blue: 260, green: 295 },
  orange: { grey: 190, blue: 150, green: 220 },
  banana: { grey: 110, blue: 100, green: 330 },
  tomato: { grey: 80, blue: 60, green: 120 },
  broccoli: { grey: 60, blue: 50, green: 160 },
  cauliflower: { grey: 300, blue: 600, green: 300 },
  maize: { grey: 500, blue: 600, green: 450 },
  carrot: { grey: 70, blue: 55, green: 100 },
  radish: { grey: 300, blue: 450, green: 150 },
  'bottle-gourd': { grey: 375, blue: 600, green: 225 },
};

// Route to fetch all products with water footprint data
app.get('/api/products', (req, res) => {
  res.json(mockData);
});

// Route to fetch data for a specific product
app.get('/api/products/:name', (req, res) => {
  const { name } = req.params;
  const product = mockData[name.toLowerCase()];

  if (product) {
    res.json({ name, ...product });
  } else {
    res.status(404).json({ error: `Product '${name}' not found `});
  }
});

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});