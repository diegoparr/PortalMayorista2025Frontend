<template>
  <form v-on:submit.prevent="actualizar" >
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
        <div class="col-xs-12" align="center">
          <div class="form-group">
            <v-btn color="banner" type="submit" id="submitButton" :disabled="deshabilitar"
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
        rol:[]
      }
    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('name'));
      }
    }),
    props: ['updateRol'],
    created() {
      this.rol = this.updateRol;
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

          yo.getAppServices().putMethodWithBearer("api/avanzamas/roles/" + this.rol.id,this.rol, token)
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
