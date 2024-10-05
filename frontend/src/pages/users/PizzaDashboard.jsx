import React from 'react'
import { useState,useEffect } from "react";

import axios from "axios";


function PizzaDashboard() {
    const [pizzaVarieties, setPizzaVarieties] = useState([]);
    const [customOptions, setCustomOptions] = useState({});
    const [selectedBase, setSelectedBase] = useState("");
    const [selectedSauce, setSelectedSauce] = useState("");
    const [selectedCheese, setSelectedCheese] = useState("");
    const [selectedVeggies, setSelectedVeggies] = useState([]);
    const [orderMessage, setOrderMessage] = useState("");

    useEffect(() => {
        // Fetch available pizza varieties
        axios.get("http://localhost:5000/api/pizzas/varieties")
            .then((res) => setPizzaVarieties(res.data))
            .catch((err) => console.error("Error fetching pizza varieties:", err));

        // Fetch customization options
        axios.get("http://localhost:5000/api/pizzas/custom-options")
            .then((res) => setCustomOptions(res.data))
            .catch((err) => console.error("Error fetching custom options:", err));
    }, []);

    // Handle custom pizza order submission
    const handleCustomOrder = (e) => {
        e.preventDefault();
        if (!selectedBase || !selectedSauce || !selectedCheese || selectedVeggies.length === 0) {
            setOrderMessage("Please select all pizza options.");
            return;
        }

        axios.post("http://localhost:5000/api/pizzas/custom-order", {
            base: selectedBase,
            sauce: selectedSauce,
            cheese: selectedCheese,
            veggies: selectedVeggies
        })
        .then((res) => setOrderMessage(res.data.message))
        .catch((err) => setOrderMessage("Error processing order"));
    };


  return (
    <div>
            <h1>Pizza Dashboard</h1>

            <h2>Available Pizza Varieties</h2>
            <ul>
                {pizzaVarieties.map((pizza) => (
                    <li key={pizza.id}>
                        {pizza.name} - {pizza.description} - ${pizza.price}
                    </li>
                ))}
            </ul>

            <h2>Create Your Custom Pizza</h2>
            <form onSubmit={handleCustomOrder}>
                <div>
                    <label>Pizza Base</label>
                    <select value={selectedBase} onChange={(e) => setSelectedBase(e.target.value)}>
                        <option value="">Select Base</option>
                        {customOptions.pizzaBaseOptions?.map((base, index) => (
                            <option key={index} value={base}>{base}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Sauce</label>
                    <select value={selectedSauce} onChange={(e) => setSelectedSauce(e.target.value)}>
                        <option value="">Select Sauce</option>
                        {customOptions.sauceOptions?.map((sauce, index) => (
                            <option key={index} value={sauce}>{sauce}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Cheese</label>
                    <select value={selectedCheese} onChange={(e) => setSelectedCheese(e.target.value)}>
                        <option value="">Select Cheese</option>
                        {customOptions.cheeseOptions?.map((cheese, index) => (
                            <option key={index} value={cheese}>{cheese}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Veggies</label>
                    {customOptions.veggieOptions?.map((veggie, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                value={veggie}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedVeggies([...selectedVeggies, veggie]);
                                    } else {
                                        setSelectedVeggies(selectedVeggies.filter((v) => v !== veggie));
                                    }
                                }}
                            />
                            {veggie}
                        </div>
                    ))}
                </div>

                <button type="submit">Order Custom Pizza</button>
            </form>

            {orderMessage && <p>{orderMessage}</p>}
        </div>
  )
}

export default PizzaDashboard