import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore_db } from "../../../../../firebase";

export const addCommentHandler = async (id, commentForm, fetchProjectDetails, resetCommentForm) => {
    const { name, email, commentText } = commentForm;
    // console.log(commentForm)

    // Validate form values
    if (!name || !email || !commentText) {
        // Handle form validation error (you can display an error message)
        return;
    }

    try {
        // Add the comment to Firestore
        const commentsCollection = collection(firestore_db, "houses", id, "comments");
        await addDoc(commentsCollection, {
            name,
            email,
            commentText,
            timestamp: serverTimestamp(),
        });

        // Reset the form fields
        resetCommentForm();

        // Fetch project details to refresh the comments list if needed
        await fetchProjectDetails();
    } catch (error) {
        console.error("Error adding comment:", error);
        console.log("Log Error adding comment:", error);
    }
};
