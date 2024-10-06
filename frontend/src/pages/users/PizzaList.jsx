import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pizza');
        setPizzas(response.data);
      } catch (err) {
        console.error('Error fetching pizzas:', err);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <h1>Available Pizzas</h1>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.name}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>Price: ${pizza.price.toFixed(2)}</p>
            <img src={pizza.imageUrl} alt={pizza.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
