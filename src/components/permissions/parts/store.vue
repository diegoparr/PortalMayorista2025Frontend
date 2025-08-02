<template>
  <form v-on:submit.prevent="registro">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <v-text-field
              v-validate="'required|alpha_spaces|min:2|max:100'"
              name="name"
              v-model="permiso.name"
              label="Nombre del permiso"
            ></v-text-field>
            <span v-show="errors.has('name')" class="help-block">{{ errors.first('name')}}</span>
            <v-switch
              label="Todos los permisos"
              v-model="permiso.all"
            ></v-switch>
            <v-text-field
              v-if="permiso.all"
              label="Campo a relacionar" disabled
            ></v-text-field>
            <v-text-field
              v-else
              v-validate="'required|alpha_spaces|min:2|max:100'"
              name="name"
              v-model="permiso.field"
              label="Campo a relacionar"
            ></v-text-field>
            <v-textarea
              name="description"
              label="Descripcion del permiso"
              :value="permiso.field"
              v-model="permiso.field"
              hint="Este permiso permite...."
            ></v-textarea>
            <v-text-field
              v-validate="'required|alpha_spaces|min:2|max:100'"
              name="route_name"
              v-model="permiso.route_name"
              label="Nombre de la ruta"
            ></v-text-field>
            <v-text-field
              v-validate="'required|alpha_spaces|min:2|max:100'"
              name="icon"
              v-model="permiso.icon"
              label="Icono de ruta icon"
            ></v-text-field>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12" align="center">
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
        permiso: {
          name: null,
          all: false,
          field: null,
          description: null,
          route_name: null,
          icon: null,
        },
      }
    },
    props: ['rol'],
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_nombre') && !this.errors.has('v_iso2') && !this.errors.has('v_iso3')
          && !this.errors.has('v_prefijo_telefonico') && !this.errors.has('n_latitud') && !this.errors.has('n_longitud')
        );
      }
    }),
    methods: {
      getAppServices() {
        return AppServices;
      },
      registro() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          let formData = new FormData();
          formData.append('guard_name', 'web');
          formData.append('rol', this.rol.text);
          formData.append('name', this.permiso.name);
          formData.append('all', this.permiso.all);
          formData.append('field', this.permiso.field);
          formData.append('description', this.permiso.description);
          formData.append('route_name', this.permiso.route_name);
          formData.append('icon', this.permiso.icon);
          console.log(formData);
          let yo = this;
          this.getAppServices().postMethodWithBearer('api/avanzamas/permisos', formData, token)
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
                    yo.$toastr('error', value, helpers.ufirst(err));
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
