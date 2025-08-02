<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <div align="center" class="container-imgs">
        <div class="col-md-4 col-md-offset-4">
          <img :src="usuario.v_avatar"
               class="centrar-imagen imagen-previsualizar">
        <button class="btn btn-danger btn-block btn-flat" disabled>
          Imagen avatar
        </button>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_primer_nombre">Primer Nombre</label>
        <input name="v_primer_nombre" type="text" class="form-control"
                data-placement="left" required id="v_primer_nombre"
               :title="'El primer nombre del usuario es '+usuario.v_primer_nombre"
               v-model="usuario.v_primer_nombre" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_segundo_nombre">Segundo Nombre</label>
        <input name="v_segundo_nombre" type="text" class="form-control"
                data-placement="left" required id="v_segundo_nombre"
               :title="'El segundo nombre del usuario es '+usuario.v_segundo_nombre"
               v-model="usuario.v_segundo_nombre" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_primer_apellido">Primer Apellido</label>
        <input name="v_primer_apellido" type="text" class="form-control"
                data-placement="left" required id="v_primer_apellido"
               :title="'El primer apellido del usuario es '+usuario.v_primer_apellido"
               v-model="usuario.v_primer_apellido" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_segundo_apellido">Segundo Apellido</label>
        <input name="v_segundo_apellido" type="text" class="form-control"
                data-placement="left" required id="v_segundo_apellido"
               :title="'El segundo apellido del usuario es '+usuario.v_segundo_apellido"
               v-model="usuario.v_segundo_apellido" readonly>
      </div>
    </div>
    <div class="col-xs-6 col-md-6">
      <div class="form-group">
        <label for="name">Nombre de Usuario</label>
        <input name="email" type="text" class="form-control"
                data-placement="left" required id="name"
               :title="'El nombre de usuario es '+usuario.name"
               v-model="usuario.name" readonly>
      </div>
    </div>
    <div class="col-xs-6 col-md-6">
      <div class="form-group">
        <label for="email">Email</label>
        <input name="email" type="text" class="form-control"
                data-placement="left" required id="email"
               :title="'El email del usuario es '+usuario.email"
               v-model="usuario.email" readonly>
      </div>
    </div>
    <div class="col-xs-4 col-md-4">
      <div class="form-group">
        <label for="v_nombre_pais">Pais</label>
        <input name="v_nombre_pais" type="text" class="form-control"
                data-placement="left" required id="v_nombre_pais"
               :title="'El País del usuario es '+usuario.v_nombre_pais"
               v-model="usuario.v_nombre_pais" readonly>
      </div>
    </div>
    <div class="col-xs-4 col-md-4">
      <div class="form-group">
        <label for="v_nombre_provincia">Provincia</label>
        <input name="v_nombre_provincia" type="text" class="form-control"
                data-placement="left" required id="v_nombre_provincia"
               :title="'La provincia del usuario es '+usuario.v_nombre_provincia"
               v-model="usuario.v_nombre_provincia" readonly>
      </div>
    </div>
    <div class="col-xs-4 col-md-4">
      <div class="form-group">
        <label for="v_nombre_ciudad">Ciudad</label>
        <input name="v_nombre_ciudad" type="text" class="form-control"
                data-placement="left" required id="v_nombre_ciudad"
               :title="'La ciudad del usuario es '+usuario.v_nombre_ciudad"
               v-model="usuario.v_nombre_ciudad" readonly>
      </div>
    </div>
      <div class="col-xs-12">
        <div class="form-group">
          <label for="v_direccion">Dirección</label>
          <input name="v_direccion" type="text" class="form-control"
                  data-placement="left" required id="v_direccion"
                 :title="'La dirección principal es '"
                 v-model="direccionPrincipal" readonly>
        </div>
      </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_telefono_fijo">Teléfono Fijo</label>
        <input name="v_telefono_fijo" type="text" class="form-control"
                data-placement="left" required id="v_telefono_fijo"
               :title="'El teléfono principal es '+telefonoFijo"
               v-model="telefonoFijo" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_telefono_celular">Teléfono Celular</label>
        <input name="v_telefono_celular" type="text" class="form-control"
                data-placement="left" required id="v_telefono_celular"
               :title="'El teléfono secundario es '+telefonoCelular"
               v-model="telefonoCelular" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="v_sexo">Sexo</label>
        <input name="v_sexo" type="text" class="form-control"
                data-placement="left" required id="v_sexo"
               :title="'El sexo del usuario es '+usuario.v_sexo"
               v-model="usuario.v_sexo" readonly>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div class="form-group">
        <label for="d_fechanacimiento">Fecha de Nacimiento</label>
        <input name="d_fechanacimiento" type="text" class="form-control"
                data-placement="left" required id="d_fechanacimiento"
               :title="'La fecha de nacimiento del usuario es '+usuario.v_nombre_provincia"
               v-model="usuario.d_fechanacimiento" readonly>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        telefonoFijo: '',
        telefonoCelular: '',
        direccionPrincipal: ''
      }
    },
    props: ['usuario'],
    created() {
      $(function () {
        $('[]').tooltip()
      });
      let yo = this;
      for (let i = 0; i < this.usuario.direcciones.length; i++) {
        let direccion = this.usuario.direcciones[i];
        if (direccion.b_principal)
          yo.direccionPrincipal = direccion.v_direccion;
      }
      for (let i = 0; i < this.usuario.telefonos.length; i++) {
        let telefono = this.usuario.telefonos[i];
        if (telefono.v_tipo == 'Fijo')
          yo.telefonoFijo = telefono.v_telefono;
        else
          yo.telefonoCelular = telefono.v_telefono;
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    },

  }
</script>
