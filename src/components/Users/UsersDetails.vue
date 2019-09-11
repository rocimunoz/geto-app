<template>
  <v-card fluid v-if="isEditMode">
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
                    @click="onButtonDeleteUser(false)"
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
      //Guardar usuario en Firebase
      if (this.$refs.form.validate()) {
        this.user_selected = this.getUserSelected
        let updateRef = this.ref.doc(this.user_selected.id)
        updateRef.update({
          nombre: evt.target.elements.nombre.value,
          apellido: evt.target.elements.apellidos.value,
          telefono: evt.target.elements.telefono.value,
          email: evt.target.elements.email.value
        })
        this.$store.commit('editMode', false)
        this.$toasted.show('Usuario actualizado con éxito', {
          position: 'top-center',
          duration: 3000
        })
      } else {
        evt.preventDefault()
      }
    }
  },
  computed: {
    getUserSelected() {
      return this.$store.state.user_selected
    },
    isEditMode() {
      return this.$store.state.edit_mode
    }
  }
}
</script>

<style lang=""></style>
