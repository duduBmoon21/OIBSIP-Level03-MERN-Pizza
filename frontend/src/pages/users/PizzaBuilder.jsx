import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PizzaBuilder = () => {
  const [bases, setBases] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedSauce, setSelectedSauce] = useState('');
  const [selectedCheese, setSelectedCheese] = useState('');
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [customPizza, setCustomPizza] = useState(null);

  useEffect(() => {
    const fetchPizzaComponents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/pizza/components');
        console.log(response.data);  // Check if this logs the correct components
        setBases(response.data.bases);
        setSauces(response.data.sauces);
        setCheeses(response.data.cheeses);
        setVeggies(response.data.veggies);
      } catch (error) {
        console.error('Error fetching pizza components:', error);
      }
    };
  
    fetchPizzaComponents();
  }, []);

  const handleSubmit = async () => {
    const pizzaData = {
        base: selectedBase,
        sauce: selectedSauce,
        cheese: selectedCheese,
        veggies: selectedVeggies,
      };
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/pizza/custom', pizzaData);
      setCustomPizza(response.data);
    } catch (error) {
      console.error('Error creating custom pizza:', error);
    }
  };

  return (
    <div>
      <h1>Build Your Custom Pizza</h1>

      <h2>Select a Base</h2>
      <select onChange={(e) => setSelectedBase(e.target.value)}>
        <option value="">Choose a base</option>
        {bases.map(base => <option key={base.item} value={base.item}>{base.item}</option>)}
      </select>

      <h2>Select a Sauce</h2>
      <select onChange={(e) => setSelectedSauce(e.target.value)}>
        <option value="">Choose a sauce</option>
        {sauces.map(sauce => <option key={sauce.item} value={sauce.item}>{sauce.item}</option>)}
      </select>

      <h2>Select a Cheese</h2>
      <select onChange={(e) => setSelectedCheese(e.target.value)}>
        <option value="">Choose a cheese</option>
        {cheeses.map(cheese => <option key={cheese.item} value={cheese.item}>{cheese.item}</option>)}
      </select>

      <h2>Select Veggies</h2>
      {veggies.map(veggie => (
        <div key={veggie.item}>
          <input
            type="checkbox"
            id={veggie.item}
            value={veggie.item}
            onChange={() => {
              setSelectedVeggies(prev => 
                prev.includes(veggie.item) ? prev.filter(v => v !== veggie.item) : [...prev, veggie.item]
              );
            }}
          />
          <label htmlFor={veggie.item}>{veggie.item}</label>
        </div>
      ))}

      <button onClick={handleSubmit}>Create Pizza</button>

      {customPizza && (
        <div>
          <h2>Your Custom Pizza</h2>
          <p>Base: {customPizza.base}</p>
          <p>Sauce: {customPizza.sauce}</p>
          <p>Cheese: {customPizza.cheese}</p>
          <p>Veggies: {customPizza.veggies.join(', ')}</p>
          <p>Total Price: ${customPizza.price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default PizzaBuilder;
