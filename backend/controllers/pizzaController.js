const pizzas = [
    {
      name: 'Vegetarian Supreme',
      description: 'Tomato sauce, mozzarella, assorted vegetables',
      base: 'Whole Wheat',
      sauces: ['Marinara'],
      cheeses: ['Mozzarella'],
      veggies: ['Roasted Peppers', 'Spinach', 'Mushrooms'],
      price: 7.95,
      size: 'medium',
      imageUrl: 'http://localhost:5173/images/vegan-pesto.jpg',
    },
    {
      name: 'BBQ Chicken',
      description: 'BBQ sauce, grilled chicken, red onions, and mozzarella',
      base: 'Gluten-Free',
      sauces: ['Honey BBQ'],
      cheeses: ['Mozzarella'],
      veggies: ['Red Onions'],
      price: 9.95,
      size: 'large',
      imageUrl: 'http://localhost:5173/images/bbq-chickenpizza.jpg',
    },
    {
      name: 'Pesto Delight',
      description: 'Pesto sauce, mozzarella, fresh basil, and artichokes',
      base: 'Flatbread',
      sauces: ['Pesto'],
      cheeses: ['Mozzarella'],
      veggies: ['Artichokes', 'Basil'],
      price: 8.95,
      size: 'medium',
      imageUrl: 'http://localhost:5173/images/pesto-delight.jpg',
    },
    {
      name: 'Meat Lover’s',
      description: 'Tomato sauce, mozzarella, pepperoni, sausage, and bacon',
      base: 'Stuffed Crust',
      sauces: ['Marinara'],
      cheeses: ['Mozzarella'],
      veggies: [],
      price: 11.95,
      size: 'large',
      imageUrl: 'http://localhost:5173/images/images/pss.jpg',
    },
  ];
  
  // Get all predefined pizzas
  exports.getPizzas = (req, res) => {
    res.json(pizzas);
  };
  
  // Existing methods for pizza components and custom pizza creation...
  
  // Get available bases, sauces, cheeses, and veggies
  const bases = [
    { item: 'Thin', price: 0.1 },
    { item: 'Thick', price: 0.1 },
    { item: 'Cheese Stuffed', price: 0.1 },
    { item: 'Deep Dish', price: 0.1 },
    { item: 'Gluten-Free', price: 0.2 },
  ];
  
  const sauces = [
    { item: 'Tomato', price: 0.1 },
    { item: 'Pesto', price: 0.1 },
    { item: 'Alfredo', price: 0.1 },
    { item: 'BBQ', price: 0.1 },
    { item: 'Buffalo', price: 0.1 },
  ];
  
  const cheeses = [
    { item: 'Mozzarella', price: 0.1 },
    { item: 'Parmesan', price: 0.1 },
    { item: 'Cheddar', price: 0.1 },
    { item: 'Feta', price: 0.1 },
  ];
  
  const veggies = [
    { item: 'Artichokes', price: 0.1 },
    { item: 'Basil', price: 0.1 },
    { item: 'Black Olives', price: 0.1 },
    { item: 'Broccoli', price: 0.1 },
    { item: 'Mushrooms', price: 0.1 },
  ];
  
exports.getPizzaComponents = async (req, res) => {
    try {
      const components = { 
        bases,  // Whatever data you're fetching
        sauces,
        cheeses,
        veggies,
      };
      console.log(components);  // Add this to see the output in your terminal
      res.status(200).json(components);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching pizza components' });
    }
  };
  
  // Create a custom pizza
  exports.createCustomPizza = (req, res) => {
    console.log(req.body); // Log to check what data is received
    const { base, sauce, cheese, veggies } = req.body;
  
    const customPizza = {
      base,
      sauce,
      cheese,
      veggies,
      price: calculatePrice(base, sauce, cheese, veggies),
    };
  
    res.status(201).json(customPizza);
  };
  
  const calculatePrice = (base, sauce, cheese, selectedVeggies) => {
    let totalPrice = 0;
  
    // Add prices based on selected components
    totalPrice += bases.find(b => b.item === base)?.price || 0;
    totalPrice += sauces.find(s => s.item === sauce)?.price || 0;
    totalPrice += cheeses.find(c => c.item === cheese)?.price || 0;
  
    // For veggies, map through selectedVeggies and add their prices
    selectedVeggies.forEach(veggie => {
      const veggiePrice = veggies.find(v => v.item === veggie)?.price || 0;
      totalPrice += veggiePrice;
    });
  
    return totalPrice;
  };
  