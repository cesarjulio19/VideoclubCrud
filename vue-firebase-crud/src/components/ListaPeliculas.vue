<template>
<div>
  <!--Autenticacion de la app-->
  <div v-if="!authUser">
    <div class="authentication">
  <form @submit.prevent="register">
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email1">
  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
  <label for="exampleInputPassword1" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleInputPassword1" v-model="password1">
  </div>
<button type="submit" class="btn btn-primary">Register</button>
</form>
<br>
<form @submit.prevent="signIn">
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" v-model="email1">
  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
  <label for="exampleInputPassword1" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleInputPassword2" v-model="password1">
  </div>
<button type="submit" class="btn btn-primary">Sign In</button><br>
</form>
</div>
  </div>
<!--Lista de peliculas-->
  <div v-else>
    <button @click="signOut()" id="desconectar">Desconectar</button>
    <div class="list row">
    <div class="col-md-6">
      <h4>Lista Peliculas</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == indexActual }"
          v-for="(pelicula, index) in peliculas"
          :key="index"
          @click="EstPelAct(pelicula, index)"
        >
          {{ pelicula.NomPel }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="EliminarTodas">
        Eliminar Todo
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="peliculaActual">
        <detalles-pelicula
          :pelicula="peliculaActual"
          @ActualizarLista="ActualizarLista"
        />
      </div>
      <div v-else>
        <br />
        <p>Por favor,elige una pelicula</p>
      </div>
    </div>
  </div>

  </div>
</div>
</template>

<script>
import ServicioDatosPelicula from "../servicios/ServicioDatosPelicula";
import DetallesPelicula from "./Pelicula";
import firebase from 'firebase'


export default {
  name: "lista-peliculas",
  components: { DetallesPelicula },
  data() {
    return {
      peliculas: [],
      peliculaActual: null,
      indexActual: -1,
      email1: '',
      password1: '',
      authUser: null
    };
  },
  methods: {
    onDataChange(items) {
      let _peliculas = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _peliculas.push({
          key: key,
          NomPel: data.NomPel,
          GenPel: data.GenPel,
          NomDir: data.NomDir,
          FechEst: data.FechEst,
        });
      });

      this.peliculas = _peliculas;
    },

    ActualizarLista() {
      this.peliculaActual = null;
      this.indexActual = -1;
    },

    EstPelAct(pelicula, index) {
      this.peliculaActual = pelicula;
      this.indexActual = index;
    },

    EliminarTodas() {
      ServicioDatosPelicula.eliminarTodo()
        .then(() => {
          this.ActualizarLista();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    register () {
      firebase.auth().createUserWithEmailAndPassword(this.email1, this.password1)
    },

    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email1, this.password1)
    },
    signOut () {
      firebase.auth().signOut()
      this.authUser = null
      this.email1 = null
      this.password1 = null
      
    }
  },
  mounted() {
    ServicioDatosPelicula.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    ServicioDatosPelicula.getAll().off("value", this.onDataChange);
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      this.authUser = user
    })
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

#desconectar{
  background-color: red;
  color: white;
}
</style>