<template>
  <v-card fluid v-if="isEditMode">
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
                  @click="editUser(false)"
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
                  @click="editUser(false)"
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
    </v-container>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="getUserSelected.nombre"
              label="Nombre"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :value="getUserSelected.apellido"
              label="Apellidos"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Telefono"
              :value="getUserSelected.telefono"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Email"
              :value="getUserSelected.email"
              outlined
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
export default {
  data() {
    return {
      user_selected: {}
    }
  },
  methods: {
    editUser(value) {
      this.$store.commit('editMode', value)
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
