import {
  obtenerUsuario, //Funcion para obtener el usuario registrado
  guardarUsuario, //Funcion que registra un nuevo usuario
  eliminaUsuario, //funcion que elimina un usuario
  obtenerUsuarioXid, //funcion para obtener el usuario por id
  actualizarUsuario, //funcion que actualiza el usuario  
} from "./ConfigFirebase.js";

const usuarioForm = document.getElementById("form-firebase");
const usuarioContenido = document.getElementById("usuarios");

let editarUsuario = false;
let id = "";

//DOMContentLoaded sirve para realizar acciones cuando el DOM ha terminado de cargar
window.addEventListener("DOMContentLoaded", async (e) => {
  obtenerUsuario((querySnapshot) => {
    usuarioContenido.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const usuarioInfo = doc.data();

      usuarioContenido.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h5 class="h4">CI: ${usuarioInfo.ci}</h4>
        <p>Nombre(s): ${usuarioInfo.nombre}</p>
        <p>Apellido(s): ${usuarioInfo.apellido}</p>
        <p>Direccion(s): ${usuarioInfo.direccion}</p>
        <p>Telefono(s): ${usuarioInfo.telefono}</p>
        <p></p>
        <div>
          <button class="btn btn-primary btn-eliminar" data-id="${doc.id}">
            Eliminar
          </button>
          <button class="btn btn-secondary btn-actualizar" data-id="${doc.id}">
            Actualizar
          </button>
        </div>
      </div>`;
    });

    const btnsEliminar = usuarioContenido.querySelectorAll(".btn-eliminar");
    btnsEliminar.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await eliminaUsuario(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEditar = usuarioContenido.querySelectorAll(".btn-actualizar");
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await obtenerUsuarioXid(e.target.dataset.id);
          const usuarioInfo = doc.data();
          usuarioForm["nombre"].value = usuarioInfo.nombre;
          usuarioForm["apellido"].value = usuarioInfo.apellido;
          usuarioForm["ci"].value = usuarioInfo.ci;
          usuarioForm["direccion"].value = usuarioInfo.direccion;
          usuarioForm["telefono"].value = usuarioInfo.telefono;
          editarUsuario = true;
          id = doc.id;
          usuarioForm["btn-form-firebase"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

usuarioForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //es para que no refresque la pagina

  const nombre = usuarioForm["nombre"];
  const apellido = usuarioForm["apellido"];
  const ci = usuarioForm["ci"];
  const direccion = usuarioForm["direccion"];
  const telefono = usuarioForm["telefono"];
  try {
    if (!editarUsuario) { // se condiciona con este flag para ver si es o no nuevo usuario
      await guardarUsuario(nombre.value, apellido.value, ci.value, direccion.value, telefono.value);
    } else {
      await actualizarUsuario(id, {
        nombre: nombre.value,
        apellido: apellido.value,
        ci: ci.value,
        direccion: direccion.value,
        telefono: telefono.value        
      });

      editarUsuario = false;
      id = "";
      usuarioForm["btn-form-firebase"].innerText = "Guardar";
    }

    usuarioForm.reset(); // limpia los campos llenados depsues de registrar o actualizar al usuario    
  } catch (error) {
    console.log(error);
  }
});
