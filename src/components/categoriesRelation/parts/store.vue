<template>
  <form v-on:submit.prevent="registro" >
      <div class="row">
        <div class="col-xs-12 col-md-12">
          <div :class="(!errors.first('v_descripcion'))?'form-group':'form-group has-error'">
            <div class="form-group">
              <label for="v_descripcion">Descripción de la Relación</label>
              <input name="v_descripcion" type="text" class="form-control"
                     data-placement="left" required id="v_descripcion"
                     title="Ingrese el nombre de la relacion" v-validate="'required|min:2|max:100'"
                     data-vv-as="nombre de la categoría" v-model="data.v_descripcion" >
              <span v-show="errors.has('v_descripcion')" class="help-block">{{ errors.first('v_descripcion')}}</span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-12">
          <div class="form-group">
            <label >Seleccione las Categorias a agrupar</label>
          <model-select v-if="hayCategorias" :options="categorias" id="id_m_categorias" v-model="category"
                        class="form-control" v-on:input="seleccionarCategoria" v-validate="'required'"

                        data-placement="left" title="Selecciona la tienda" placeholder="Seleccione la categoria"
                        required>
          </model-select>

            <h5 v-else class="text-center">No hay mas categorias</h5>
          </div>
        </div>

        <div class="col-xs-12">
          <table class="table table-hover">
            <caption class="text-center"> Categorias Seleccionadas</caption>
            <tbody>
            <tr>
              <th class="text-center">Nombre</th>
              <th class="text-center">Opciones</th>
            </tr>
            <tr v-for="seleccionada in data.categorias">
              <td class="text-center">{{seleccionada.texto}}</td>
              <td class="text-center">
                <v-btn class="btn btn-danger" type="button"
                        @click="eliminaSeleccionada(seleccionada.texto)">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    <div class="row">

      <div class="row">
        <div class="col-xs-12 col-md-12" align="center">
          <div class="form-group">
            <v-btn color="primary" type="submit" id="submitButton" :disabled="deshabilitar"
                    data-loading-text="&lt;i class='pull-left fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando">
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
  import Loader from '../../parts/loader.vue';
  import {ModelSelect} from 'vue-search-select';

  export default {
    data() {
      return {
        data: {
          v_descripcion: null,
          categorias: []
        },
        hayCategorias: true,
        seleccionoCategoria: false,
        categoriaPadre: null,
        categoriasIds: [],
        categoriasSeleccionadas: [],
        categorias: [],
        category: {
          value: '',
          text: ''
        },
      }
    },
    created() {
      this.cargarCategorias(null);
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      });
    },
    components: {ModelSelect,  Loader},
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_nombre') && !this.errors.has('category')
        );
      }
    }),
    methods: {
      getAppServices() {
        return AppServices;
      },
      eliminaSeleccionada(valor) {
            this.data.categorias = helpers.eliminarArrayObjetos(this.data.categorias, 'texto', valor);
      },
      seleccionarCategoria(event) {
        this.data.categorias.push({
          texto: event.text,
          id: event.value
        });
      },
      cargarCategorias() {
        this.cargandoData = true;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/categorias", token, 'pluck', null, null, null)
        .then(response => {
            yo.categorias = response.body;
            if (yo.categorias.length >= 1)
              yo.hayCategorias = true;
            else {
              yo.seleccionoCategoria = true;
              yo.hayCategorias = false;
              yo.categoriaPadre = yo.categoriasSeleccionadas[0];
            }

          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      registro() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          let formData = new FormData();
          formData.append('v_descripcion', this.data.v_descripcion);
          formData.append('categorias', this.categoriasSeleccionadas);

          let yo = this;
          this.getAppServices().postMethodWithBearer('api/ecommerce/relacionCategorias', this.data, token)
            .then(response => {
              boton_registrar.button('reset');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              $('#modal').modal('hide');
              yo.v_nombre = '';
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
