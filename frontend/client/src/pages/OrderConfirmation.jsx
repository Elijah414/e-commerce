import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Thank you!</h1>
      <p>Your order has been placed successfully.</p>
      <button onClick={() => navigate('/')} style={{ marginTop: '1rem'}}>
        Go to Home
      </button>
    </div>
  );
}
