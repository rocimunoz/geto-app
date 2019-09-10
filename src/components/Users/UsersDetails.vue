<template>
  <v-card fluid>
    <v-card-title>
      Detalle de usuarios:
      <div class="flex-grow-1"></div>
    </v-card-title>
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
    return { user_selected: {} }
  },

  computed: {
    getUserSelected() {
      return this.$store.state.user_selected
    }
  }
}
</script>

<style lang=""></style>
