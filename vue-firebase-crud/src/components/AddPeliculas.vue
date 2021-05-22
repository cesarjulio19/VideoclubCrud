<template>
<div>
  <!--Autenticacion de la app-->
  <div v-if="!authUser">
    <div class="authentication">
  <form @submit.prevent="register">
  <div class="mb-3">
  <label for="exampleInputEmail3" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" v-model="email1">
  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
  <label for="exampleInputPassword3" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleInputPassword3" v-model="password1">
  </div>
<button type="submit" class="btn btn-primary">Register</button>
</form>
<br>
<form @submit.prevent="signIn">
  <div class="mb-3">
  <label for="exampleInputEmail4" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleInputEmail4" aria-describedby="emailHelp" v-model="email1">
  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
  <label for="exampleInputPassword4" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleInputPassword4" v-model="password1">
  </div>
<button type="submit" class="btn btn-primary">Sign In</button><br>
</form>
</div>

  </div>
  <!--Método para añadir peliculas a nuestra app-->
  <div v-else>
    <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required
          v-model="pelicula.NomPel"
          name="nombre"
        />
      </div>

      <div class="form-group">
        <label for="genero">Genero</label>
        <input
          type="text"
          class="form-control"
          id="genero"
          required
          v-model="pelicula.GenPel"
          name="genero"
        />
      </div>

      <div class="form-group">
        <label for="estreno">Fecha Estreno</label>
        <input
          type="text"
          class="form-control"
          id="estreno"
          required
          v-model="pelicula.FechEst"
          name="estreno"
        />
      </div>

      <div class="form-group">
        <label for="director">Director</label>
        <input
          type="text"
          class="form-control"
          id="director"
          required
          v-model="pelicula.NomDir"
          name="director"
        />
      </div>

      <button @click="guardarPelicula" class="btn btn-success">guardar</button>
    </div>

    <div v-else>
      <h4>Se ha guardado con exito!</h4>
      <button class="btn btn-success" @click="nuevaPelicula">Añadir</button>
    </div>
  </div>

  </div>
</div>
</template>

<script>
import ServicioDatosPelicula from "../servicios/ServicioDatosPelicula";
import firebase from 'firebase'

export default {
  name: "add-pelicula",
  data() {
    return {
      pelicula: {
        FechEst: "",
        GenPel: "",
        NomDir: "",
        NomPel: ""
      },
      submitted: false,
      email1: '',
      password1: '',
      authUser: null
    };
  },
  methods: {
    guardarPelicula() {
      var data = {
        FechEst: this.pelicula.FechEst,
        GenPel: this.pelicula.GenPel,
        NomDir: this.pelicula.NomDir,
        NomPel: this.pelicula.NomPel,
        
      };

      ServicioDatosPelicula.crear(data)
        .then(() => {
          console.log("Se ha creado una nueva pelicula con exito!");
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    nuevaPelicula() {
      this.submitted = false;
      this.pelicula = {
        FechEst: "",
        GenPel: "",
        NomDir: "",
        NomPel: ""
      };
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
  created () {
    firebase.auth().onAuthStateChanged(user => {
      this.authUser = user
    })
  }
};
</script>