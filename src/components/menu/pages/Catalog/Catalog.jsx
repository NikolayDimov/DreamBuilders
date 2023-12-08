import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { firestore_db } from '../../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import CatalogItem from './CatalogItem/CatalogItem';
import Pagination from './Pagination';

import './Catalog.css';

export default function Catalog() {
    const { isLoggedIn } = useAuth();
    // const { user } = useAuth();

    const [items, setItems] = useState([]);
    console.log(items);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsCollection = collection(firestore_db, 'houses');
                const querySnapshot = await getDocs(itemsCollection);
                const itemsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                // Convert createdAt strings to Date objects for accurate sorting
                itemsData.forEach(item => {
                    item.createdAt = new Date(item.createdAt);
                });
                itemsData.sort((a, b) => b.createdAt - a.createdAt);
                setItems(itemsData);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                // Set isLoading to false regardless of success or failure
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);


    // Logic to calculate the current items based on pagination
    const indexOfLastItem = currentPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
                        <h6 className="text-uppercase text-white m-0"><Link to="/profile">My Project Page</Link></h6>
                    }
                </div>
            </div>
            {/* Page Header Start */}


            <div className="container-fluid py-6 px-5 container-catalog">
                {isLoading ? (
                    // Show a spinner or loading message while data is being fetched
                    <div className="text-center">
                        <span className="loader"></span>
                    </div>
                ) : (
                    // Render the content when data has been loaded
                    <>
                        <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
                            <h1 className="display-5 text-uppercase mb-4">
                                Latest <span className="text-primary">Projects</span> In Our Catalog
                            </h1>
                        </div>
                        <article className="row g-5 catalog_page">

                            {currentItems.map(item =>
                                <CatalogItem
                                    key={item.id}
                                    item={item}
                                />
                            )}

                            {items.length === 0 && (
                                <h3 className="no-articles">No Projects Items yet</h3>
                            )}

                        </article>

                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={items.length}
                            paginate={paginate}
                        />
                    </>
                )}
            </div>
        </>
    );
}