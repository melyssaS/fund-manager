import React from 'react';
import Dashboard from './pages/Dashboard';
import { FundProvider } from './context/fundContext';

function App() {
  return (
    <FundProvider>
    <Dashboard/>
    </FundProvider>
  );
}

export default App;
