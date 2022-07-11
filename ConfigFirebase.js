// Se importa un sdk de firebase para hacer la conexión con firebase según el proyecto creado
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
// Como se creo una base de datos en firestore se debe importar un cdn para poder utilizar la base de datos
import {
  getFirestore,
  collection,  
  onSnapshot, //escucha cambios en tiempo real
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"; 

// Configuracion de Firebase para la web
const firebaseConfig = {
  apiKey: "AIzaSyCoY0RzRIQr6-pDlEI6PqyRPAN-35RYRGo",

  authDomain: "crud-java-b2ff9.firebaseapp.com",

  projectId: "crud-java-b2ff9",

  storageBucket: "crud-java-b2ff9.appspot.com",

  messagingSenderId: "752955963099",

  appId: "1:752955963099:web:cd3a863c65093567c9fefe"

};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);


export const db = getFirestore(); //esta funcion hace que se conecte con las credenciales proporcionados

//funcion para guardar una colección
export const guardarUsuario = (nombre, apellido, ci, direccion, telefono) =>
  addDoc(collection(db, "Afiliado"), { nombre, apellido, ci, direccion, telefono });

//funcion para obtener todos los usuarios registrados  
export const obtenerUsuario = (callback) =>
  onSnapshot(collection(db, "Afiliado"), callback);

//funcion para eliminar todos los usuarios
export const eliminaUsuario = (id) => deleteDoc(doc(db, "Afiliado", id));

//funcion que obtiene un usuario por su id, sirve para eliminar o editar
export const obtenerUsuarioXid = (id) => getDoc(doc(db, "Afiliado", id));

//funcion que actualiza un usuario por su id y lo que se vaya ingresar por pantalla
export const actualizarUsuario = (id, objUsuario) =>
  updateDoc(doc(db, "Afiliado", id), objUsuario);

