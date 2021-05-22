<template>
<!--Datos de las Peliculas-->
<div v-if="peliculaActual" class="edit-form">
    <h4>Pelicula</h4>
    <form>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="peliculaActual.NomPel"
        />
      </div>

      <div class="form-group">
        <label for="genero">Genero</label>
        <input
          type="text"
          class="form-control"
          id="genero"
          v-model="peliculaActual.GenPel"
        />
      </div>

      <div class="form-group">
        <label for="director">Director</label>
        <input
          type="text"
          class="form-control"
          id="director"
          v-model="peliculaActual.NomDir"
        />
      </div>

      <div class="form-group">
        <label for="estreno">Fecha Estreno</label>
        <input
          type="text"
          class="form-control"
          id="estreno"
          v-model="peliculaActual.FechEst"
        />
      </div>

    </form>

    <button class="badge badge-danger mr-2" @click="eliminarPelicula">
      Eliminar
    </button>

    <button type="submit" class="badge badge-success" @click="actualizarPelicula">
      Actualizar
    </button>
    <p>{{ mensaje }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor, elija una pelicula</p>
  </div>
  
</template>

<script>
import ServicioDatosPelicula from "../servicios/ServicioDatosPelicula";

export default {
  name: "pelicula",
  props: ["pelicula"],
  data() {
    return {
      peliculaActual: null,
      mensaje: "",
    };
  },
  watch: {
    pelicula: function(pelicula) {
      this.peliculaActual = { ...pelicula };
      this.mensaje = "";
    },
  },
  methods: {

    actualizarPelicula() {
      const data = {
        FechEst: this.peliculaActual.FechEst,
        GenPel: this.peliculaActual.GenPel,
        NomDir: this.peliculaActual.NomDir,
        NomPel: this.peliculaActual.NomPel,
      };

      ServicioDatosPelicula.actualizar(this.peliculaActual.key, data)
        .then(() => {
          this.mensaje = "Esta pelicula se ha actualizado correctamente!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    eliminarPelicula() {
      ServicioDatosPelicula.eliminar(this.peliculaActual.key)
        .then(() => {
          this.$emit("ActualizarLista");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.mensaje = "";
    this.peliculaActual = { ...this.pelicula }
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

button{
    background-color: rgb(79, 79, 231);
}
</style>