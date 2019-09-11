<template>
  <v-card fluid :disabled="isEditMode">
    <v-card-title>
      Listado de Usuarios
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      show-select
      single-select
      :search="search"
      :headers="headers"
      :items="usuarios"
      :items-per-page="5"
      no-data-text="No existen datos"
      class="elevation-1"
      expand
      @input="toggleUserDetails($event)"
    >
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th align:right :colspan="headers.length">
              <v-btn @click="newUser()" class="mx-2" fab x-small color="amber">
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-btn
                @click="editUser(true)"
                class="mx-2"
                fab
                x-small
                color="amber"
                :disabled="isDisabled()"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                @click="deleteUser()"
                class="mx-2"
                fab
                x-small
                color="amber"
                :disabled="isDisabled()"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </th>
          </tr>
        </thead>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  //name: 'users-grid',
  mounted() {},
  data() {
    return {
      item: {},
      search: '',
      headers: [
        { text: 'Id', align: 'left', sortable: false, value: 'id' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellido', value: 'apellido' },
        { text: 'Es socio', value: 'es_socio' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Email', value: 'email' }
      ],
      usuarios: [],
      ref: firebase.firestore().collection('usuarios'),
      selected: []
    }
  },
  created() {
    this.ref.onSnapshot(querySnapshot => {
      this.usuarios = []
      querySnapshot.forEach(doc => {
        let esSocio = doc.data().esSocio
        let esSocioString
        if (esSocio) {
          esSocioString = 'Si'
        } else {
          esSocioString = 'No'
        }
        this.usuarios.push({
          id: doc.id,
          nombre: doc.data().nombre,
          apellido: doc.data().apellido,
          telefono: doc.data().telefono,
          email: doc.data().email,
          es_socio: esSocioString
        })
      })
    })
  },
  methods: {
    toggleUserDetails(event) {
      if (event.length === 1) {
        this.$store.commit('toggleUserDetails', event[0])
      } else {
        this.$store.commit('toggleUserDetails', '')
      }
    },
    isDisabled() {
      let user = this.$store.state.user_selected
      return Object.keys(user).length === 0
    },

    newUser() {
      alert('nuevo usuario')
    },
    editUser(value) {
      this.$store.commit('editMode', value)
    },
    deleteUser() {
      alert('Borrar usuario')
    }
  },
  computed: {
    isEditMode() {
      return this.$store.state.edit_mode
    }
  }
}
</script>

<style lang=""></style>
