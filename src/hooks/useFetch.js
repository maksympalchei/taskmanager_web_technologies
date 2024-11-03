import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp, setDoc, doc, query, where, getFirestore, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function useFetchData(collectionName) {
  const firestore = getFirestore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addData = async (newData) => {
    setLoading(true);
    try {
      await addDoc(collection(db, collectionName), { ...newData, createdAt: serverTimestamp() });
      fetchData(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addInvite = async (inviteData) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'invites'), { ...inviteData, createdAt: serverTimestamp() });
      fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const q = query(collection(db, collectionName), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }
      return null;
    } catch (error) {
      console.error("Error getting user by email:", error);
      return null;
    }
  };

  const registerUser = async (userId, userData) => {
    try {
      await setDoc(doc(db, collectionName, userId), {
        ...userData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const getUserDocument = async (userId) => {
    const userRef = doc(firestore, collectionName, userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return { documentId: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  };

  const getDocumentIdByUserId = async (userId) => {
    try {
      const q = query(collection(db, collectionName), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }
      return null;
    } catch (error) {
      console.error("Error getting documentId:", error);
      return null;
    }
  };

  const createTeam = async (teamData) => {
    const teamRef = await addDoc(collection(firestore, 'teams'), {
      ...teamData,
      members: [{
        userId: teamData.ownerId,
        role: 'owner',
      }],
      assignedTasks: [], 
      createdAt: serverTimestamp(),
    });
    return teamRef;
  };

  const updateUser = async (userId, updatedData) => {
    await updateDoc(doc(firestore, collectionName, userId), updatedData);
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return {
    data,
    loading,
    error,
    addData,
    addInvite,
    registerUser,
    updateUser,
    getDocumentIdByUserId,
    getUserDocument,
    createTeam,
    getUserByEmail,
  };
}

export default useFetchData;
