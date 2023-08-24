import {ChakraProvider} from '@chakra-ui/react'
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Budget from './components/Budget';


function App() {
  return (
    <ChakraProvider >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
