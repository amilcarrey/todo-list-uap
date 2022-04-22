// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export function getTasks() {
  const tasksCol = collection(db, 'tasks')
  return getDocs(tasksCol)
    .then(snap => snap.docs.map(doc => ({ ...doc.data(), id: doc.id })))
}

export function addTask(task) {
  const tasksCol = collection(db, 'tasks')
  return addDoc(tasksCol, task)
}

export function updateTask(id, task) {
  const taskWithoutId = { ...task }
  delete taskWithoutId.id
  return updateDoc(doc(db, 'tasks', id), taskWithoutId)
}

export function removeTask(id) {
  return deleteDoc(doc(db, 'tasks', id))
}