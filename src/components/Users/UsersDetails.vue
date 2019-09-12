<template>
  <v-card fluid v-if="hasShowDetails">
    <v-form @submit="onSubmit" id="form-user" ref="form" lazy-validation>
      <v-container text-xs-right>
        <v-row>
          <v-col cols="12" sm="10">
            <v-card-title>
              Detalle de usuarios
            </v-card-title>
          </v-col>

          <v-col cols="12" sm="1">
            <v-card-actions align-end>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    type="submit"
                    form="form-user"
                    v-on="on"
                    class="mx-2"
                    fab
                    x-small
                    color="amber"
                  >
                    <v-icon>mdi-account-check</v-icon></v-btn
                  >
                </template>
                <span>Guardar cambios edicion</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="onCloseDetails()"
                    v-on="on"
                    class="mx-2"
                    fab
                    x-small
                    color="amber"
                    ><v-icon>mdi-cancel</v-icon></v-btn
                  >
                </template>
                <span>Cancelar cambios edicion</span>
              </v-tooltip>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="getUserSelected.nombre"
              label="Nombre"
              name="nombre"
              outlined
              required
              :rules="[v => !!v || 'El nombre es obligatorio']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="getUserSelected.apellido"
              label="Apellidos"
              name="apellidos"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Telefono"
              name="telefono"
              :value="getUserSelected.telefono"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Email"
              name="email"
              :value="getUserSelected.email"
              :rules="emailRules"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-switch
              :value="getUserSelected.esSocio"
              label="Es Socio"
              name="socio"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  data() {
    return {
      user_selected: {},
      ref: firebase.firestore().collection('usuarios'),
      emailRules: [
        v => !!v || 'El email es obligatorio',
        v => /.+@.+\..+/.test(v) || 'Introduzca un email válido'
      ]
    }
  },
  methods: {
    onSubmit(evt) {
      let objUser = {
        nombre: evt.target.elements.nombre.value,
        apellido: evt.target.elements.apellidos.value,
        telefono: evt.target.elements.telefono.value,
        email: evt.target.elements.email.value,
        esSocio: evt.target.elements.socio.value
      }
      if (this.$refs.form.validate()) {
        this.user_selected = this.getUserSelected
        if (this.isEditMode) {
          let updateRef = this.ref.doc(this.user_selected.id)
          updateRef.update(objUser).then(function() {
            //showToastedMessage('Usuario actualizado con exito')
          })
        } else if (this.isNewMode) {
          this.ref.add(objUser).then(function(docRef) {
            // this.showToastedMessage('Usuario creado con exito')
          })
        }

        this.onCloseDetails()
      } else {
        evt.preventDefault()
      }
    },
    onCloseDetails() {
      if (this.isEditMode) {
        this.$store.commit('editMode', false)
      } else if (this.isNewMode) {
        this.$store.commit('newMode', false)
      }
    },
    showToastedMessage(message) {
      this.$toasted.show(message, {
        position: 'top-center',
        duration: 3000
      })
    }
  },
  computed: {
    getUserSelected() {
      return this.$store.state.user_selected
    },
    isEditMode() {
      return this.$store.state.edit_mode
    },
    isNewMode() {
      return this.$store.state.new_mode
    },
    hasShowDetails() {
      return this.$store.state.edit_mode || this.$store.state.new_mode
    }
  }
}
</script>

<style lang=""></style>
