<template>
  <form v-on:submit.prevent="store" >
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="v_nombre_provincia">Nombre de la provincia</label>
            <input name="v_nombre" type="text" class="form-control"
                    data-placement="left" required id="v_nombre_provincia"
                   title="Ingrese el nombre la provincia" v-validate="'required|alpha_spaces|min:2|max:100'"
                   data-vv-as="nombre de la provincia" v-model="provincia.v_nombre_provincia" >
            <span v-show="errors.has('v_nombre_provincia')" class="help-block">{{ errors.first('v_nombre_provincia')}}</span>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_hasc'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="v_hasc">Hasc</label>
            <input name="v_hasc" type="text" class="form-control"
                    data-placement="left" required id="v_hasc"
                   title="Ingrese el hasc" v-validate="'required|min:5|max:5'"
                   data-vv-as="hasc" v-model="provincia.v_hasc" >
            <span v-show="errors.has('v_hasc')" class="help-block">{{ errors.first('v_hasc')}}</span>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('n_latitud'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="n_latitud">Latitud</label>
            <input name="n_latitud" type="text" class="form-control"
                    data-placement="left" required id="n_latitud"
                   title="Ingrese la latitud" v-validate="'required|min:0|max:9999999'"
                   data-vv-as="latitud" v-model="provincia.n_latitud" >
            <span v-show="errors.has('n_latitud')" class="help-block">{{ errors.first('n_latitud')}}</span>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('n_longitud'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="n_longitud">Longitud</label>
            <input name="n_longitud" type="text" class="form-control"
                    data-placement="left" required id="n_longitud"
                   title="Ingrese la longitud" v-validate="'required|min:0|max:99999999'"
                   data-vv-as="longitud" v-model="provincia.n_longitud" >
            <span v-show="errors.has('n_longitud')" class="help-block">{{ errors.first('n_longitud')}}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12" align="center">
          <div class="form-group">
            <v-btn class="btn btn-hipertienda btn-flat" type="submit" id="submitButton" :disabled="deshabilitar"
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
        provincia: {
          v_nombre_provincia: null,
          v_hasc: null,
          n_latitud: null,
          n_longitud: null,

        },
        dataPais: null,
      }
    },
    props: ['pais'],
    created() {
      this.dataPais = this.pais;
      console.log("pais",this.pais);

    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_nombre') && !this.errors.has('v_iso2') && !this.errors.has('v_iso3')
          && !this.errors.has('v_prefijo_telefonico') && !this.errors.has('n_latitud') && !this.errors.has('n_longitud')
        );
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
          let formData = new FormData();
          formData.append('id_m_paises_fk', this.pais.value);
          formData.append('v_nombre_pais', this.pais.text);
          formData.append('v_nombre_provincia', this.provincia.v_nombre_provincia);
          formData.append('v_hasc', this.provincia.v_hasc);
          formData.append('n_latitud', this.provincia.n_latitud);
          formData.append('n_longitud', this.provincia.n_longitud);
          console.log(formData);
          let yo = this;
          this.getAppServices().postMethodWithBearer('api/avanzamas/provincias',  formData, token)
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
