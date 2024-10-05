import React, { useState } from 'react';

const Payment = ({ totalAmount, placeOrder }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleFakePayment = async () => {
    // Fake payment process using test mode
    try {
      // Simulate payment processing delay
      setTimeout(() => {
        console.log('Payment successful');
        setPaymentSuccess(true);
        // Call placeOrder function to handle order placement
        placeOrder();
      }, 1000); // Delay to mimic payment gateway processing
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div>
      <h2>Complete Your Payment</h2>
      <p>Total Amount: ${totalAmount}</p>

      {!paymentSuccess ? (
        <button onClick={handleFakePayment} style={styles.button}>
          Pay Now (Test Mode)
        </button>
      ) : (
        <p style={styles.successMessage}>Payment successful! Your order has been placed.</p>
      )}
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  successMessage: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
};

export default Payment;
