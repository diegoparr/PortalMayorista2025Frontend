<template>
  <form v-on:submit.prevent="registrar" >
    <div class="row">
      <div class="col-xs-6 col-md-4">
        <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="v_nombre_ciudad">Nombre de la ciudad</label>
            <input name="v_nombre_ciudad" type="text" class="form-control"
                    data-placement="left" required id="v_nombre_ciudad"
                   title="Ingrese el nombre la ciudad" v-validate="'required|alpha_spaces|min:2|max:100'"
                   data-vv-as="nombre de la ciudad" v-model="ciudad.v_nombre_ciudad" >
            <span v-show="errors.has('v_nombre_ciudad')" class="help-block">{{ errors.first('v_nombre_ciudad')}}</span>
          </div>
        </div>
      </div>
      <div class="col-xs-6 col-md-4">
        <div :class="(!errors.first('v_hasc'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="v_hasc">Hasc</label>
            <input name="v_hasc" type="text" class="form-control"
                    data-placement="left" required id="v_hasc"
                   title="Ingrese el hasc" v-validate="'required|min:5|max:5'"
                   data-vv-as="hasc" v-model="ciudad.v_hasc" >
            <span v-show="errors.has('v_hasc')" class="help-block">{{ errors.first('v_hasc')}}</span>
          </div>
        </div>
      </div>
      <div class="col-xs-6 col-md-4">
        <div :class="(!errors.first('n_latitud'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="n_latitud">Latitud</label>
            <input name="n_latitud" type="text" class="form-control"
                    data-placement="left" required id="n_latitud"
                   title="Ingrese la latitud" v-validate="'required|min:0|max:9999999'"
                   data-vv-as="latitud" v-model="ciudad.n_latitud" >
            <span v-show="errors.has('n_latitud')" class="help-block">{{ errors.first('n_latitud')}}</span>
          </div>
        </div>
      </div>
      <div class="col-xs-6 col-md-4">
        <div :class="(!errors.first('n_longitud'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="n_longitud">Longitud</label>
            <input name="n_longitud" type="text" class="form-control"
                    data-placement="left" required id="n_longitud"
                   title="Ingrese la longitud" v-validate="'required|min:0|max:99999999'"
                   data-vv-as="longitud" v-model="ciudad.n_longitud" >
            <span v-show="errors.has('n_longitud')" class="help-block">{{ errors.first('n_longitud')}}</span>
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
  import {mapGetters, mapMutations} from 'vuex';
  import helpers from '../../../helpers';
  export default {
    data() {
      return {
        ciudad: {
          v_nombre_ciudad: '',
          v_hasc: '',
          n_latitud: '',
          n_longitud: '',

        },
      }
    },
    props: ['pais','provincia'],
    created() {
        console.log("entre");
    },
    computed: Object.assign({}, mapGetters([
      'getUsuarioToken'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_nombre') && !this.errors.has('v_iso2') && !this.errors.has('v_iso3')
          && !this.errors.has('v_prefijo_telefonico') && !this.errors.has('n_latitud') && !this.errors.has('n_longitud')
        );
      }
    }),
    methods:{
      registrar() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuarioToken;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          let formData = new FormData();
          formData.append('id_m_paises_fk', this.pais.value);
          formData.append('v_nombre_pais', this.pais.text);
          formData.append('id_m_provincias_fk', this.provincia.value);
          formData.append('v_nombre_provincia', this.provincia.text);
          formData.append('v_nombre_ciudad', this.ciudad.v_nombre_ciudad);
          formData.append('v_hasc', this.ciudad.v_hasc);
          formData.append('n_latitud', this.ciudad.n_latitud);
          formData.append('n_longitud', this.ciudad.n_longitud);
          console.log(formData);
          let yo = this;
          this.$http.post('api/avanzamas/ciudades', formData, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
            .then(response => {
              boton_registrar.button('reset');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              $('#modal').modal('hide');
              yo.v_nombre = '';
              yo.v_iso2 = '';
              yo.v_iso3 = '';
              yo.v_prefijo_telefonico = '';
              yo.n_latitud = '';
              yo.n_longitud = '';
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
