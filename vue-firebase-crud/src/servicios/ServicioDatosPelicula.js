import firebase from "../firebase";

const db = firebase.ref("/Pelicula");
// clase con funciones para crear,leer,eliminar y actualizar datos
class ServicioDatosPelicula {
  getAll() {
    return db;
  }

  crear(pelicula) {
    return db.push(pelicula);
  }

  actualizar(key, value) {
    return db.child(key).update(value);
  }

  eliminar(key) {
    return db.child(key).remove();
  }

  eliminarTodo() {
    return db.remove();
  }
}

export default new ServicioDatosPelicula();