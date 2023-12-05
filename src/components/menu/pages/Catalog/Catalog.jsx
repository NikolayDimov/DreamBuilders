import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { firestore_db } from '../../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import CatalogItem from './CatalogItem/CatalogItem';

import './Catalog.css';

export default function Catalog() {
    const { isLoggedIn } = useAuth();
    // const { user } = useAuth();

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Adjust the number of items per page as needed
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsCollection = collection(firestore_db, 'houses');
                const querySnapshot = await getDocs(itemsCollection);
                const itemsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setItems(itemsData);
            } catch (error) {
                console.error("Error fetching items:", error);
                // You can add additional error handling logic here if needed
            } finally {
                // Set isLoading to false regardless of success or failure
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);


    // Logic to calculate the current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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


            <div className="container-fluid py-6 px-5">
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

                            {items.map(item =>
                                <CatalogItem
                                    key={item.id}
                                    item={item}
                                // onEdit={handleEditItem}
                                // onDelete={() => handleDeleteItem(item.id)}
                                />
                            )}

                            {items.length === 0 && (
                                <h3 className="no-articles">No Projects Items yet</h3>
                            )}

                        </article>

                        <div className="col-12">
                            <nav aria-label="Page navigation">
                                <ul className="pagination pagination-lg justify-content-center m-0">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <Link
                                            className="page-link rounded-0"
                                            to={`/catalog/${currentPage - 1}`}
                                            aria-label="Previous"
                                            onClick={() => paginate(currentPage - 1)}
                                        >
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </Link>
                                    </li>
                                    {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <Link
                                                className="page-link"
                                                to={`/catalog/${index + 1}`}
                                                onClick={() => paginate(index + 1)}
                                            >
                                                {index + 1}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(items.length / itemsPerPage) ? 'disabled' : ''}`}>
                                        <Link
                                            className="page-link rounded-0"
                                            to={`/catalog/${currentPage + 1}`}
                                            aria-label="Next"
                                            onClick={() => paginate(currentPage + 1)}
                                        >
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}