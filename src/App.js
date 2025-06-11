import React from 'react';
import QuotesApp from './components/QuotesApp';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <QuotesApp />
      </div>
    </AuthProvider>
  );
}

export default App;
