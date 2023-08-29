import {ChakraProvider} from '@chakra-ui/react'
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Budget from './components/Budget';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nav" element={<Nav />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
