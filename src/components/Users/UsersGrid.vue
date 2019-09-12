<template>
  <v-card fluid :disabled="isDisabledGrid()">
    <v-dialog v-model="dialog" width="500" @keydown.esc="cancel">
      <v-card>
        <v-toolbar color="amber" dark dense flat>
          <v-toolbar-title class="white--text">Borrado</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-4"
          >Se va a eliminar el registro. ¿Estas de acuerdo?</v-card-text
        >
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="deleteUser"
            >Aceptar</v-btn
          >
          <v-btn color="grey" text @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
              <v-btn
                @click="newUser(true)"
                class="mx-2"
                fab
                x-small
                color="amber"
                :disabled="!isDisabledButtons()"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-btn
                @click="editUser(true)"
                class="mx-2"
                fab
                x-small
                color="amber"
                :disabled="isDisabledButtons()"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                @click="openDialog()"
                class="mx-2"
                fab
                x-small
                color="amber"
                :disabled="isDisabledButtons()"
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
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'id'
        },
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
    isDisabledButtons() {
      let user = this.$store.state.user_selected
      return Object.keys(user).length === 0
    },
    isDisabledGrid() {
      return this.isNewMode || this.isEditMode
    },

    newUser(value) {
      this.$store.commit('newMode', value)
    },
    editUser(value) {
      this.$store.commit('editMode', value)
    },
    deleteUser() {
      let user = this.getUserSelected

      this.ref
        .doc(user.id)
        .delete()
        .then(function() {
          this.closeDialog()
          this.$toasted.show('Usuario borrado con éxito', {
            position: 'top-center',
            duration: 3000
          })
        })
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    cleanUserSelected() {
      this.$store.state.user_selected = ''
    }
  },
  computed: {
    isEditMode() {
      return this.$store.state.edit_mode
    },
    isNewMode() {
      this.cleanUserSelected
      return this.$store.state.new_mode
    },
    getUserSelected() {
      return this.$store.state.user_selected
    }
  }
}
</script>

<style lang=""></style>
