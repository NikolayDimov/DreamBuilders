import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import './App.module.css';
import Topbar from './components/common/Topbar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BackToTheTop from './components/common/BackToTheTop';
import Home from './components/common/Home/Home';

import Contacts from './components/NavbarMenuBtn/NavBarButtons/Contacts';
import About from './components/NavbarMenuBtn/NavBarButtons/About';
import Service from './components/NavbarMenuBtn/NavBarButtons/Service';
import Catalog from './components/NavbarMenuBtn/pages/Catalog/Catalog';
import OfferDetails from './components/NavbarMenuBtn/pages/Details/OfferDetails';

import Login from './components/NavbarMenuBtn/auth/Login';
import Register from './components/NavbarMenuBtn/auth/Register';
import MyProjects from './components/NavbarMenuBtn/pages/MyProjects/MyProjects';
import Logout from './components/NavbarMenuBtn/auth/Logout';
import Create from './components/NavbarMenuBtn/pages/Create/Create';


function App() {

	return (
		<AuthProvider>
			<Topbar />
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/contacts' element={<Contacts />} />
				<Route path='/about' element={<About />} />
				<Route path='/service' element={<Service />} />
				<Route path='/login' element={<Login />} />
				<Route path='/catalog' element={<Catalog />} />
				<Route path='/details' element={<OfferDetails />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/myProjects' element={<MyProjects />} />
				<Route path='/create' element={<Create />} />
				<Route path='/logout' element={<Logout />} />
			</Routes>

			<Footer />
			<BackToTheTop />
		</AuthProvider>
	);
}

export default App;
