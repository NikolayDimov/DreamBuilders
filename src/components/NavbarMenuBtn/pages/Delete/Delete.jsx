// DeleteModal.js

import { useState } from 'react';
import './Delete.css';

export default function DeleteModal({ onDelete, onCancel, itemToDelete }) {
    const [isVisible, setIsVisible] = useState(true);

    const handleConfirm = () => {
        onDelete(itemToDelete);
        setIsVisible(false);
    };

    const handleCancel = () => {
        onCancel();
        setIsVisible(false);
    };

    return (
        <div className={`delete-modal ${isVisible ? 'visible' : 'hidden'}`}>
            <p>Are you sure you want to delete?</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}