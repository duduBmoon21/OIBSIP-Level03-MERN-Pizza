import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PizzaCustomization = () => {
  const [pizzaOptions, setPizzaOptions] = useState(null);
  const [selectedPizza, setSelectedPizza] = useState({ base: '', sauce: '', cheese: '', veggies: [] });

  useEffect(() => {
    const fetchPizzaOptions = async () => {
      const { data } = await api.get('/pizza/options');
      setPizzaOptions(data);
    };
    fetchPizzaOptions();
  }, []);

  const handleOrder = () => {
    api.post('/order', { pizzaDetails: selectedPizza });
  };

  return (
    <div>
      {/* Dropdowns for pizza options */}
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default PizzaCustomization;
