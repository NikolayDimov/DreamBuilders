import { useState, useEffect } from 'react';
import { firestore_db } from '../../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import CatalogItem from '../../../menu/pages/Catalog/CatalogItem/CatalogItem';

import './LatestThreePosts.css';

export default function LatestThreePosts() {

    const [lastThreeItemsWithTimestamp, setLastThreeItemsWithTimestamp] = useState([]);

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

                // Sort itemsData based on createdAt property in ascending order
                itemsData.sort((a, b) => b.createdAt - a.createdAt);

                const lastThreeItems = itemsData.slice(0, 3);
                setLastThreeItemsWithTimestamp(lastThreeItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);


    return (
        <div className="container-fluid py-6 px-5">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
                <h1 className="display-5 text-uppercase mb-4">
                    Latest <span className="text-primary">Projects</span> From Our Catalog
                </h1>
            </div>

            <div className='latestThreePosts'>
                {lastThreeItemsWithTimestamp.map(item => (
                    <CatalogItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>

        </div>
    );
}