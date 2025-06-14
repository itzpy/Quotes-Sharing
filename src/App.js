import React from 'react';
import QuotesApp from './components/QuotesApp';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App min-h-screen transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
          <QuotesApp />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
