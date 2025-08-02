<template>
  <form v-on:submit.prevent="actualizar" >
  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
        <div class="form-group">
          <label for="v_nombre">País</label>
          <input name="v_nombre" type="text" class="form-control"
                  data-placement="left" required id="v_nombre"
                 title="Ingrese el nombre del país" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="nombre del país" v-model="pais.v_nombre" >
          <span v-show="errors.has('v_nombre')" class="help-block">{{ errors.first('v_nombre')}}</span>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div :class="(!errors.first('v_iso2'))?'form-group':'form-group has-error'">
        <div class="form-group">
          <label for="v_iso2">Iso 2</label>
          <input name="v_iso2" type="text" class="form-control"
                  data-placement="left" required id="v_iso2"
                 title="Ingrese el iso 2" v-validate="'required|alpha|min:2|max:2'"
                 data-vv-as="iso 2" v-model="pais.v_iso2" >
          <span v-show="errors.has('v_iso2')" class="help-block">{{ errors.first('v_iso2')}}</span>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div :class="(!errors.first('v_iso3'))?'form-group':'form-group has-error'">
        <div class="form-group">
          <label for="v_iso3">Iso 3</label>
          <input name="v_iso3" type="text" class="form-control"
                  data-placement="left" required id="v_iso3"
                 title="Ingrese el iso 3" v-validate="'required|alpha|min:3|max:3'"
                 data-vv-as="iso 3" v-model="pais.v_iso3" >
          <span v-show="errors.has('v_iso3')" class="help-block">{{ errors.first('v_iso3')}}</span>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-6">
      <div :class="(!errors.first('v_prefijo_telefonico'))?'form-group':'form-group has-error'">
        <div class="form-group">
          <label for="v_prefijo_telefonico">Prefijo Telefónico</label>
          <input name="v_prefijo_telefonico" type="text" class="form-control"
                  data-placement="left" required id="v_prefijo_telefonico"
                 title="Ingrese el prefijo telefónico" v-validate="'required|numeric|min:2|max:5'"
                 data-vv-as="Prefijo telefónico" v-model="pais.v_prefijo_telefonico" >
          <span v-show="errors.has('v_prefijo_telefonico')" class="help-block">{{ errors.first('v_prefijo_telefonico')}}</span>
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
                 data-vv-as="latitud" v-model="pais.n_latitud" >
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
                 data-vv-as="longitud" v-model="pais.n_longitud" >
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
  import AppServices from '../../AppServices';
  import {mapGetters, mapMutations} from 'vuex';
  import helpers from '../../../helpers';
  export default {
      data() {
        return {
          pais:[]
        }
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
      props: ['updatePais'],
      created() {
        this.pais = this.updatePais;
        $(function () {
          $('[]').tooltip()
        });
      },
      components: {},
      methods: {
        getAppServices() {
          return AppServices;
        },
        actualizar() {
          let yo = this;
          let token = this.getUsuario.token;
          this.$validator.validateAll().then(() => {

            let boton_editar = $('#submitButton');
            boton_editar.button('loading');

            yo.getAppServices().putMethodWithBearer("api/avanzamas/paises/" + this.pais.id_m_paises,this.pais, token)
            .then(response => {
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
