<template>
  <form v-on:submit.prevent="registro">
    <v-container>
      <v-layout>
        <v-flex sm6 md4>
          <v-switch label="Categoria Padre" v-model="padre"></v-switch>
        </v-flex>
        <v-flex sm6 md4>
          <v-switch label="Nueva Categoria" v-model="categoria.nueva_cat" disabled></v-switch>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="!padre">
      <v-select
        v-if="hayCategorias" :items="categorias" id="id_m_categorias" v-model="category"
        required dense
        return-object
        label="Seleccione la Categoria Padre"
        persistent-hint
        single-line
      ></v-select>
    </v-container>
    <v-container>
      <v-text-field
        id="v_nombre"
        name="v_nombre"
        label="Nombre de la categoría"
        single-line
        v-model="categoria.v_nombre"
        required
      ></v-text-field>
    </v-container>
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
        categoria: {
          v_nombre: null,
          v_id_m_categorias_fk: null,
          nueva_cat: true,
          id_categoria_nueva: null
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
        padre: true,
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
    components: {ModelSelect, Loader},
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
      cambiar(indice) {
        this.categoriasSeleccionadas = this.categoriasSeleccionadas.splice(0, indice);
        this.categoriasIds = this.categoriasIds.splice(0, indice);
        this.cargarCategorias(this.categoriasIds[indice - 1]);
      },
      seleccionarCategoria(event) {
        this.categoriasIds.push(this.category.value !== '' ? this.category.value : null);
        console.log(this.categoriasIds);

        this.categoriasSeleccionadas.push({
          texto: event.text,
          id: event.value
        });
        this.cargarCategorias(event.value);
      },
      cargarCategorias(id) {
        this.cargandoData = true;
        let yo = this;
        let token = this.getUsuario.token;
        let where = '';
        if (id)
          where = "['id_m_categorias_fk','=','" + id + "']";
        else
          where = "['id_m_categorias_fk','=',null]";
        this.getAppServices().getMethodsWithBearer("api/ecommerce/categorias", token, 'pluck', 1, null, where)
          .then(response => {
            yo.categorias = response.body;
            if (yo.categorias.length >= 1) {
              yo.hayCategorias = true;
            }
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
          formData.append('v_nombre', this.categoria.v_nombre);
          formData.append('nueva_cat', this.categoria.nueva_cat);
          if (!this.padre) {
            formData.append('id_m_categorias_fk', this.category.value);
          }
          console.log(formData);
          let yo = this;
          this.getAppServices().postMethodWithBearer('api/ecommerce/categorias', formData, token)
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
<style scoped>

</style>
