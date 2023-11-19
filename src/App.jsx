import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import './App.module.css';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BackToTheTop from './components/common/BackToTheTop';
import Home from './components/common/Home/Home';

import Contacts from './components/common/Contacts';
import About from './components/common/About';
import Service from './components/common/Service';
import Catalog from './components/NavbarMenuBtn/pages/Catalog/Catalog';
import Details from './components/NavbarMenuBtn/pages/Details/Details';

import Login from './components/NavbarMenuBtn/auth/Login';
import Register from './components/NavbarMenuBtn/auth/Register';
import MyProjects from './components/NavbarMenuBtn/pages/Profile/Profile';
import Logout from './components/NavbarMenuBtn/auth/Logout';
import Create from './components/NavbarMenuBtn/pages/Create/Create';
import DeleteModal from './components/NavbarMenuBtn/pages/Delete/Delete';
import Edit from './components/NavbarMenuBtn/pages/Edit/Edit';


function App() {

	return (
		<AuthProvider>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/contacts' element={<Contacts />} />
				<Route path='/about' element={<About />} />
				<Route path='/service' element={<Service />} />
				<Route path='/login' element={<Login />} />
				<Route path='/catalog' element={<Catalog />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/myProjects' element={<MyProjects />} />
				<Route path='/create' element={<Create />} />
				<Route path='/logout' element={<Logout />} />
				<Route path='/delete' element={<DeleteModal />} />

				<Route path='/catalog/:id' element={<Details />} />
				<Route path='/catalog/:id/edit' element={<Edit />} />
			</Routes>

			<Footer />
			<BackToTheTop />
		</AuthProvider>
	);
}

export default App;
