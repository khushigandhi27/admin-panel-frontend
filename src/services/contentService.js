import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

// Upload Content
export const uploadContent = async (contentData) => {
  const contentRef = collection(db, "content");
  await addDoc(contentRef, contentData);
  return "Content uploaded successfully!";
};

// Get all content
export const getContent = async () => {
  const contentRef = collection(db, "content");
  const snapshot = await getDocs(contentRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update Task Status (Open/Closed)
export const updateTaskStatus = async (taskId, status) => {
  const taskRef = doc(db, "content", taskId);
  await updateDoc(taskRef, { status });
  return `Task marked as ${status}`;
};
