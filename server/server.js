// server.js
import express from 'express';
import { readFile } from 'fs/promises';
import Fuse from 'fuse.js';
import cors from 'cors';

const app = express();
const port = 3000;
const cars = JSON.parse(
    await readFile(
      new URL('./cars.json', import.meta.url)
    )
  );

const fuse = new Fuse(cars, {
    keys: ['make', 'model'],
    threshold: 0.3
});
app.use(cors());

app.get('/cars', (req, res) => {
  setTimeout(() => {
    res.send(cars);
  }, 2000);
});

app.get('/car/:id', (req, res) => {
  const { id } = req.params;
  const car = cars.find(car => car.id === parseInt(id, 10));
  
  if (!car) {
    return res.status(404).send('Car not found');
  }
  
  res.json(car);
});

app.get('/cars/similar/:id', (req, res) => {
  const { id } = req.params;
  const { limit } = req.query;
  const car = cars.find(car => car.id === parseInt(id, 10));
  
  if (!car) {
    return res.status(404).send('Car not found');
  }

  let similarCars = cars.filter(c => (c.category === car.category) && (c.id !== car.id));
  
  if (limit) {
    similarCars = similarCars.slice(0, parseInt(limit, 10));
  }
  res.json(similarCars);
});
  
  app.get('/cars/compare', (req, res) => {
    const { carId } = req.query;
    
    if (!carId) {
      return res.status(400).send('No car IDs provided');
    }
  
    const carIds = Array.isArray(carId) ? carId : [carId];
    const carsToCompare = cars.filter(car => carIds.includes(car.id.toString()));
  
    if (carsToCompare.length === 0) {
      return res.status(404).send('No cars found with the provided IDs');
    }
  
    res.json(carsToCompare);
  });


app.get('car/search', (req, res) => {
    const { text, limit } = req.query;
    if (!text || !limit) {
      return res.status(400).send('Missing query parameters: text and limit are required');
    }
  
    const results = fuse.search(text, { limit: parseInt(limit, 10) });
    const topResults = results.map(result => result.item);
  
    res.json(topResults);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});