<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <div class="form-group">
        <v-text-field
          v-validate="'required|alpha_spaces|min:2|max:100'"
          name="name"
          v-model="permiso.name"
          label="Nombre del permiso"
          disabled
        ></v-text-field>
        <v-switch
          label="Todos los permisos"
          v-model="permiso.all"
          disabled
        ></v-switch>
        <v-text-field
          v-validate="'required|alpha_spaces|min:2|max:100'"
          name="name"
          v-model="permiso.field"
          label="Campo a relacionar"
          disabled
        ></v-text-field>
        <v-textarea
          name="description"
          label="Descripcion del permiso"
          :value="permiso.field"
          v-model="permiso.field"
          hint="Este permiso permite...."
          disabled
        ></v-textarea>
        <v-text-field
          v-validate="'required|alpha_spaces|min:2|max:100'"
          name="route_name"
          v-model="permiso.route_name"
          label="Nombre de la ruta"
          disabled
        ></v-text-field>
        <v-text-field
          v-validate="'required|alpha_spaces|min:2|max:100'"
          name="icon"
          v-model="permiso.icon"
          label="Icono de ruta icon"
          disabled
        ></v-text-field>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['permiso'],
    created() {
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    },

  }
</script>
