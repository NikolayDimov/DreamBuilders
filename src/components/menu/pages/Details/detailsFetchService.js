import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { firestore_db } from "path-to-your-firebase-config";

export const fetchProjectDetails = async (id, user, setProjectDetails, setIsOwner, setComments) => {
    try {
        const projectRef = doc(firestore_db, "houses", id);
        const projectDoc = await getDoc(projectRef);

        if (projectDoc.exists()) {
            const projectData = projectDoc.data();
            setProjectDetails(projectData);

            if (projectData) {
                setIsOwner(user.uid && user.uid === projectData.owner_uid);

                // Fetch comments
                const commentsCollection = collection(firestore_db, "houses", id, "comments");
                const commentsSnapshot = await getDocs(commentsCollection);
                const commentsData = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setComments(commentsData);
            } else {
                console.log("Project data is null");
            }
        } else {
            console.log("Project not found");
        }
    } catch (error) {
        console.error("Error fetching project details:", error);
    }
};
