import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/guards/AuthGuard';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import BackToTheTop from './components/common/BackToTheTop';
import Home from './components/common/Home/Home';

import Contacts from './components/common/Contacts';
import About from './components/common/About';
import Service from './components/common/Service';
import Catalog from './components/menu/pages/Catalog/Catalog';
import Details from './components/menu/pages/Details/Details';

import Login from './components/menu/auth/Login/Login';
import Register from './components/menu/auth/Register/Register';
import Logout from './components/menu/auth/Logout/Logout';
import Create from './components/menu/pages/Create/Create';
import DeleteModal from './components/menu/pages/Delete/Delete';
import Edit from './components/menu/pages/Edit/Edit';
import Profile from './components/menu/pages/Profile/Profile';


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
				<Route path='/profile' element={<Profile />} />
				<Route path='/delete' element={<DeleteModal />} />
				<Route path='/catalog/:id' element={<Details />} />

				<Route element={<AuthGuard />}>
					<Route path='/create' element={<Create />} />
					<Route path='/catalog/:id/edit' element={<Edit />} />
					<Route path='/logout' element={<Logout />} />
				</Route>

				<Footer />
			</Routes>

			<BackToTheTop />
		</AuthProvider>
	);
}

export default App;
