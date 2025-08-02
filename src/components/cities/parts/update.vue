<template>
  <form v-on:submit.prevent="actualizar" >
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="v_nombre">Nombre de la Provincia</label>
            <input name="v_nombre_ciudad" type="text" class="form-control"
                    data-placement="left" required id="v_nombre_ciudad"
                   title="Ingrese el nombre de la ciudad" v-validate="'required|min:2|max:100'"
                   data-vv-as="nombre de la ciudad" v-model="ciudad.v_nombre_ciudad" >
            <span v-show="errors.has('v_nombre_ciudad')" class="help-block">{{ errors.first('v_nombre_ciudad')}}</span>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_hasc'))?'form-group':'form-group has-error'">
          <div class="form-group">
            <label for="v_hasc">Hasc</label>
            <input name="v_hasc" type="text" class="form-control"
                    data-placement="left" required id="v_hasc"
                   title="Ingrese el hasc" v-validate="'required|min:5|max:8'"
                   data-vv-as="hasc" v-model="ciudad.v_hasc" >
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
                   data-vv-as="latitud" v-model="ciudad.n_latitud" >
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
                   data-vv-as="longitud" v-model="ciudad.n_longitud" >
            <span v-show="errors.has('n_longitud')" class="help-block">{{ errors.first('n_longitud')}}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12" align="center">
          <div class="form-group">
            <v-btn color="primary" type="submit" id="submitButton" :disabled="deshabilitar"
                    data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
              <i class="fa fa-pencil pull-left"></i> Editar
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
          v_nombre_ciudad: null,
          v_hasc: null,
          n_latitud: null,
          n_longitud: null,
        },
      }
    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_nombre_ciudad') && !this.errors.has('v_hasc') && !this.errors.has('n_latitud') && !this.errors.has('n_longitud')
        );
      }
    }),
    props: ['updateCiudad'],
    created() {
      this.ciudad = this.updateCiudad;
      $(function () {
        $('[]').tooltip()
      });
    },
    components: {},
    methods: {

      actualizar() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_editar = $('#submitButton');
          boton_editar.button('loading');
          let yo = this;

          this.$http.put('api/avanzamas/ciudades/' + this.ciudad.id_m_ciudades, this.ciudad, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then(response => {
            boton_editar.button('reset');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            $('#modal').modal('hide');
            yo.$emit('actualizar');
          }, errors => {
            console.log(errors);
            if (errors.status === 422) {
              for (let err in errors.body.errors) {
                errors.body.errors[err].forEach(function (value) {
                  yo.$toastr('error', value, helpers.ufirst("validación"));
                });
              }
            } else
              yo.$toastr('error', errors.body.mensaje, "Error desconocido");
            boton_editar.button('reset');
          });
        });
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      })
    }
  }
</script>
