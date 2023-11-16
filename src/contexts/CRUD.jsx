// import { firestore_db } from '../../../../firebase';
// import { doc, updateDoc, deleteDoc } from 'firebase/firestore';



// const handleEditItem = async () => {
//     try {
//         const itemRef = doc(firestore_db, 'items', editItem.id);
//         await updateDoc(itemRef, { name: editItem.name });
//         setEditItem(null);
//     } catch (error) {
//         console.error('Error editing item:', error);
//     }
// };


// const handleDeleteItem = async (itemId) => {
//     try {
//         const itemRef = doc(firestore_db, 'items', itemId);
//         await deleteDoc(itemRef);
//     } catch (error) {
//         console.error('Error deleting item:', error);
//     }
// };


// export { handleEditItem, handleDeleteItem };
