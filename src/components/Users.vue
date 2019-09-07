<template>
<v-card fluid>
   <v-card-title>Listado de Usuarios
      <div class="flex-grow-1"></div>
      <v-text-field v-model="search" append-icon="search" label="Search"
        single-line hide-details></v-text-field>
    </v-card-title>
  <v-data-table show-select single-select
    :search="search"
    :headers="headers"
    :items="usuarios"
    :items-per-page="5"
    no-data-text="No existen datos"
    class="elevation-1"
    expand
  ></v-data-table>
</v-card>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
    mounted() {
        console.log("evento mounted");
       /*  firebase.auth().signInWithEmailAndPassword('rocimunoz@gmail.com', 'r1m9p8a5').then(
          function(user){
              console.log("logueado");
          }
      ); */
       
    },
    data(){
        return{
             search:'',
             headers: [
             {text: 'Id',align: 'left',sortable: false,value: 'id'},
             { text: 'Nombre', value: 'nombre' },
             { text: 'Apellido', value: 'apellido' },
             { text: 'Es socio', value: 'es_socio' },
             { text: 'Telefono', value: 'telefono' },
             { text: 'Email', value: 'email' }],
            usuarios: [],
             ref: firebase.firestore().collection('usuarios'),
            
        }
    },
     created () {
      this.ref.onSnapshot((querySnapshot) => {
      this.usuarios = [];
      querySnapshot.forEach((doc) => {
        this.usuarios.push({
          id: doc.id,
          nombre: doc.data().nombre,
          apellido: doc.data().apellido,
          telefono: doc.data().telefono,
          email: doc.data().email,
          es_socio: doc.data().esSocio,
        });
      });
    }); 
    
  },
  methods: {
    
  },
   
}
</script>

<style lang="">
    
</style>