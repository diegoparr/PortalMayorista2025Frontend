<template>
  <form v-on:submit.prevent="store" >
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <div :class="(!errors.first('name'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input name="name" type="text" class="form-control"
                    data-placement="left" required id="name"
                   title="Ingrese el nombre del rol" v-validate="'required|min:2|max:100'"
                   data-vv-as="nombre del rol" v-model="rol.name" >
            <span v-show="errors.has('name')" class="help-block">{{ errors.first('name')}}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-12" align="center">
          <div class="form-group">
            <v-btn color="primary" type="submit" id="submitButton" :disabled="deshabilitar"
                    data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando">
              <i class="fa fa-user pull-left"></i> Registrar
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import AppServices from '../../AppServices';
  import {mapGetters, mapMutations} from 'vuex';
  import helpers from '../../../helpers';
  export default {
    data() {
      return {
        rol: {
          name: null,
          guard_name: 'web',

        },
      }
    },
    created() {

    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('name'));
      }
    }),
    methods:{
      getAppServices() {
        return AppServices;
      },
      store() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          //let formData = new FormData();
          let yo = this;
          this.getAppServices().postMethodWithBearer('api/avanzamas/roles', this.rol, token)
            .then(response => {
              boton_registrar.button('reset');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              $('#modal').modal('hide');
              yo.name = '';
              yo.$emit('registro');
            }, errors => {
              if (errors.status === 422) {
                for (let err in errors.body.errors) {
                  errors.body.errors[err].forEach(function (value) {
                    yo.$toastr('error', value, err.charAt(0).toUpperCase() + err.slice(1));
                  });
                }
              } else
                yo.$toastr('error', errors.body.mensaje, "Error desconocido");
              boton_registrar.button('reset');
            });
        });
      },

    }
  }
</script>
