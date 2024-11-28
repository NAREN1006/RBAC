import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from './Routes/RoutePage';  // Import RoutePage

const App = () => {
  return (
    <BrowserRouter>
      <RoutePage />
    </BrowserRouter>
  );
};

export default App;
