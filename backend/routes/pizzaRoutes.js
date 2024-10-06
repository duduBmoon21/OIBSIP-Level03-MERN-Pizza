
const express = require('express');
const router = express.Router();
// const verifyToken = require('../middleware/authMiddleware');
const PizzaController = require('../controllers/pizzaController');


// Get all predefined pizzas
router.get('/', PizzaController.getPizzas);

// Get all pizza components (bases, sauces, cheeses, and veggies)
router.get('/components', PizzaController.getPizzaComponents);

// Create a custom pizza

router.post('/custom', PizzaController.createCustomPizza);

module.exports = router;
