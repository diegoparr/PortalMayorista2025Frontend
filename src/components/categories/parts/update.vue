<template>
  <form v-on:submit.prevent="editar">
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
        v-if="hayCategorias" :items="categorias" id="id_m_categorias" v-model="categoria.id_m_categorias_fk"
        required dense
        return-object
        label="Seleccione la Categoria Padre"
        persistent-hint
        single-line
      ></v-select>
      <v-select
        v-else
        return-object
        label="Cargando Categorias..."
        prepend-icon="fa fa-spinner fa-spin"
        disabled
      ></v-select>
    </v-container>
    <v-container>
      <v-text-field
        id="v_nombre"
        name="v_nombre"
        v-validate="'required|alpha_spaces|min:2|max:100'"
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
            <i class="fa fa-user pull-left"></i> Editar
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
        padre: null,
        id: '',
        arrayCategorias: [],
        categoria: [],
        hayCategorias: false,
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
      let yo = this;
      yo.categoria = this.updateCategoria;
      this.preCargarCategorias(this.updateCategoria.id_m_categorias_fk);
      this.padre = this.categoria.id_m_categorias_fk === null;
      this.cargarCategorias();
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      });
    },
    props: ['updateCategoria'],
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

      preCargarCategorias(id) {
        let flag = true;
        this.id = id;
        let token = this.getUsuario.token;
        let where = '';
        let i = 0;

        while (i < 5) {
          where = "['id_m_categorias','=','" + this.id + "']";
          this.getAppServices().getMethodsWithBearer("api/ecommerce/categorias", token, '', 1, null, where)
            .then(response => {
              this.id = response.body.data[0].id_m_categorias_fk;
              this.arrayCategorias.push(response.body.data[0].id_m_categorias_fk);
              if (this.id == null) {
                flag = false;
              }
            });
          flag = false;
          i++;
        }
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
            if (yo.categorias.length >= 1)
              yo.hayCategorias = true;
            else {
              yo.seleccionoCategoria = true;
              yo.hayCategorias = false;
              yo.categoriaPadre = yo.categoriasSeleccionadas[0];
            }
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      editar() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          let formData = new FormData();
          formData.append('v_nombre', this.categoria.v_nombre);
          formData.append('nueva_cat', this.categoria.nueva_cat);
          formData.append('id_m_categorias_fk', this.categoria.id_m_categorias_fk);
          if(this.categoria.id_categoria_nueva!==null){
            formData.append('id_categoria_nueva', this.categoria.id_categoria_nueva);
          }
          if (this.padre) {
            this.categoria.id_m_categorias_fk = null;
            formData.append('id_m_categorias_fk', this.categoria.id_m_categorias_fk);
          }
          let yo = this;
          console.log(this.categoria);
          this.getAppServices().putMethodWithBearer('api/ecommerce/categorias/'+this.categoria.id_m_categorias, this.categoria, token)
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
