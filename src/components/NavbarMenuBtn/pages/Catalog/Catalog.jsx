import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { firestore_db } from '../../../../firebase';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
// import { collection, getDocs} from 'firebase/firestore';
import ProjectItem from '../CatalogItem/CatalogItem';



export default function Catalog() {
    const { isLoggedIn } = useAuth();

    const [items, setItems] = useState([]);
    // const [newItem, setNewItem] = useState('');
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const itemsCollection = collection(firestore_db, 'houses');
            const querySnapshot = await getDocs(itemsCollection);
            const itemsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setItems(itemsData);
        };

        fetchItems();
    }, []);



    // const handleAddItem = async () => {
    //     try {
    //       const itemsCollection = collection(firestore_db, 'items');
    //       await addDoc(itemsCollection, { name: newItem });
    //       setNewItem('');
    //     } catch (error) {
    //       console.error('Error adding item:', error);
    //     }
    //   };
    
      const handleEditItem = async () => {
        try {
          const itemRef = doc(firestore_db, 'items', editItem.id);
          await updateDoc(itemRef, { name: editItem.name });
          setEditItem(null);
        } catch (error) {
          console.error('Error editing item:', error);
        }
      };
    
      const handleDeleteItem = async (itemId) => {
        try {
          const itemRef = doc(firestore_db, 'items', itemId);
          await deleteDoc(itemRef);
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };


    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header">
                <h1 className="display-3 text-uppercase text-white mb-3">All Projects</h1>
                <div className="d-inline-flex text-white">
                    <h6 className="text-uppercase m-0">
                        <Link to="/">Home</Link>
                    </h6>
                    <h6 className="text-white m-0 px-3">/</h6>
                    {isLoggedIn &&
                        <h6 className="text-uppercase text-white m-0"><Link to="/myProjects">My Projects</Link></h6>
                    }
                </div>
            </div>
            {/* Page Header Start */}

           
            <div className="container-fluid py-6 px-5">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
                    <h1 className="display-5 text-uppercase mb-4">
                        Latest <span className="text-primary">Projects</span> In Our Catalog
                    </h1>
                </div>
                <div className="row g-5">

                    {items.map(item =>
                        <ProjectItem
                            key={item.id}
                            item={item}
                            onEdit={handleEditItem}
                            onDelete={() => handleDeleteItem(item.id)}
                        />
                    )}

                    {items.length === 0 && (
                        <h3 className="no-articles">No Projects Items yet</h3>
                    )}

                </div>
            </div>
        </>

    );
}