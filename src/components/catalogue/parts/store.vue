<template>
  <div class="catalogue-store-modal">
    <!-- Header del Modal -->
    <div class="modal-header-custom">
      <div class="header-content">
        <div class="header-icon">
          <i class="fa fa-plus-circle"></i>
        </div>
        <div class="header-text">
          <h2 class="modal-title">Crear Nueva Plantilla</h2>
          <p class="modal-subtitle">Asistente paso a paso para crear plantillas de catálogo</p>
        </div>
      </div>
    </div>

    <!-- Wizard Content -->
    <div class="wizard-container">
      <form-wizard title=""
                   color="#ff6633" 
                   v-on:on-change="cambioWizard"
                   nextButtonText="Siguiente" 
                   backButtonText="Atrás" 
                   finishButtonText="Registrar Plantilla"
                   subtitle="" 
                   :startIndex="0">
    <tab-content title="Selecciona la categoría" icon="fa fa-shopping-bag">
      <div class="wizard-step-content">
        <div class="step-header">
          <h3 class="step-title">
            <i class="fa fa-shopping-bag"></i>
            Selección de Categoría
          </h3>
          <p class="step-description">Elige la categoría principal para tu plantilla de catálogo</p>
        </div>
        
        <div class="breadcrumb-container">
          <ol class="breadcrumb">
            <li v-for="(categoriaSeleccionada,i) in categoriasSeleccionadas" :key="i">
              <a v-on:click="cambiar(i)" class="breadcrumb-link">{{categoriaSeleccionada.texto}}</a>
            </li>
          </ol>
        </div>
        
        <div class="form-section">
          <div class="form-group-wrapper">
            <div class="form-group">
              <label for="v_ciudad">
                <i class="fa fa-tags"></i>
                Categoría
              </label>
              <loader v-if="cargandoData" class="loading-inline"></loader>
              <model-select v-else-if="hayCategorias" 
                           :options="categorias" 
                           id="v_ciudad" 
                           v-model="categoria"
                           class="form-control modern-select" 
                           v-on:input="seleccionarCategoria"
                           data-placement="left" 
                           title="Selecciona la categoría"
                        required>
          </model-select>
              <div v-else class="empty-state">
                <i class="fa fa-info-circle"></i>
                <p>No hay más categorías disponibles</p>
        </div>
      </div>
              </div>
              </div>
            </div>
    </tab-content>
    <tab-content title="Ingresa los datos de la plantilla" icon="fa fa-cubes">
      <div class="wizard-step-content">
        <div class="step-header">
          <h3 class="step-title">
            <i class="fa fa-cubes"></i>
            Datos de la Plantilla
          </h3>
          <p class="step-description">Completa la información básica de tu plantilla de catálogo</p>
          </div>
        
        <loader v-if="cargandoData" class="loading-full"></loader>
        
                <template v-else>
          <div class="form-section">
            <div class="form-group-wrapper">
              <div class="form-group">
                <label for="v_nombre">
                  <i class="fa fa-tag"></i>
                  Nombre de la Plantilla
                </label>
                <input placeholder="Nombre de la Plantilla" 
                       name="v_nombre" 
                       type="text" 
                       class="form-control modern-input"
                       data-placement="left" 
                       required 
                       id="v_nombre"
                       title="Ingresa el nombre de la plantilla que deseas registrar" 
                       data-vv-as="nombre de la plantilla"
                       v-model="catalogo.v_nombre" 
                       v-validate="'required|min:5|max:255'">
                <span v-show="errors.has('v_nombre')" class="error-message">
                  <i class="fa fa-exclamation-triangle"></i>
                  {{ errors.first('v_nombre')}}
                </span>
              </div>
            </div>

            <div class="form-group-wrapper">
              <div class="form-group">
                <label for="v_descripcion">
                  <i class="fa fa-file-text"></i>
                  Descripción
                </label>
                <vue-editor ref="vueEditor"
                           :key="editorKey"
                           id="v_descripcion" 
                           v-model="catalogo.v_descripcion" 
                           :editorToolbar="customToolbar"
                           placeholder="Descripción detallada de la plantilla..."
                           :class="['modern-editor']"
                           :editorOptions="editorOptions"
                           @ready="onEditorReady">
                </vue-editor>
            </div>
          </div>

            <div class="form-group-wrapper">
              <div class="form-group">
                <label for="dropzone">
                  <i class="fa fa-images"></i>
                  Imágenes de la Plantilla
                </label>
                <vue-dropzone ref="myVueDropzone" 
                             id="dropzone" 
                             :options="dropzoneOptions"
                             v-on:vdropzone-success="obtenerImagene"
                             class="modern-dropzone">
                </vue-dropzone>
                <p class="dropzone-help">
                  <i class="fa fa-info-circle"></i>
                  Arrastra y suelta las imágenes aquí o haz clic para seleccionar archivos
                </p>
            </div>
          </div>
        </div>
      </template>
      </div>
    </tab-content>
    <tab-content title="Características de la Plantilla" icon="fa fa-search">
      <div class="wizard-step-content">
        <div class="step-header">
          <h3 class="step-title">
            <i class="fa fa-search"></i>
            Características de la Plantilla
          </h3>
          <p class="step-description">Define las características específicas de tu plantilla</p>
        </div>
        
        <loader v-if="cargandoData" class="loading-full"></loader>
        
      <!--Cuando hay caracteristicas en la categoria-->
      <template v-else-if="hayCaracteristicas && !cargandoData">
          <div class="characteristics-section">
            <h4 class="section-subtitle">
              <i class="fa fa-list"></i>
              Características Existentes
            </h4>
            <div class="characteristics-grid">
              <div v-for="(caracteristica,i) in caracteristicasApi" :key="i" class="characteristic-card">
                <div class="characteristic-header">
                  <h5 class="characteristic-name">{{caracteristica.v_nombre}}</h5>
                </div>
                <div class="characteristic-input">
                  <input type="text" 
                         class="form-control modern-input" 
                         :placeholder="caracteristica.v_nombre"
                         :id="'inputCaracteristica'+i">
          </div>
                <div class="characteristic-actions">
                  <button class="btn btn-success btn-sm" 
                          :id="'btnCaracteristica'+i"
                          v-on:click="llenarCaracteristica(caracteristica,i)">
                    <i class="fa fa-check"></i>
                  </button>
                  <button class="btn btn-warning btn-sm" 
                          v-on:click="reiniciarCaracteristica(caracteristica,i)">
                    <i class="fa fa-refresh"></i>
                  </button>
        </div>
              </div>
            </div>
          </div>

          <div class="add-characteristic-section">
            <h4 class="section-subtitle">
              <i class="fa fa-plus"></i>
              Agregar Nueva Característica
            </h4>
            <div class="form-row">
              <div class="form-group-wrapper">
                <div class="form-group">
                  <label for="n_v_nombre_caracteristica">
                    <i class="fa fa-tag"></i>
                    Nombre
                  </label>
                  <input placeholder="Nombre de la Característica" 
                         name="v_nombre_caracteristica" 
                         type="text"
                         class="form-control modern-input" 
                         v-model="nombre_caracteristica"
                         data-placement="left" 
                         required 
                         id="n_v_nombre_caracteristica"
                         title="Ingresa el nombre de la característica que deseas registrar" 
                         data-vv-as="característica"
                     v-validate="'required|min:5|max:255'">
                  <span v-show="errors.has('v_nombre_caracteristica')" class="error-message">
                    <i class="fa fa-exclamation-triangle"></i>
                    {{ errors.first('v_nombre_caracteristica')}}
                  </span>
            </div>
          </div>
              <div class="form-group-wrapper">
                <div class="form-group">
                  <label for="n_valor_caracteristica">
                    <i class="fa fa-key"></i>
                    Valor
                  </label>
                  <input placeholder="Valor de la Característica" 
                         name="valor_caracteristica" 
                         type="text"
                         class="form-control modern-input" 
                         v-model="valor_caracteristica"
                         data-placement="left" 
                         required 
                         id="n_valor_caracteristica"
                         title="Ingresa el valor de la característica que deseas registrar" 
                         data-vv-as="valor"
                     v-validate="'required|min:2|max:255'">
                  <span v-show="errors.has('valor_caracteristica')" class="error-message">
                    <i class="fa fa-exclamation-triangle"></i>
                    {{ errors.first('valor_caracteristica')}}
                  </span>
            </div>
          </div>
              <div class="form-group-wrapper">
                <button class="btn btn-primary btn-add" 
                        :disabled="!deshabilitarButtonPlus"
                    v-on:click="crearCaracteristica">
                  <i class="fa fa-plus"></i>
                  Agregar
            </button>
          </div>
        </div>
          </div>

          <div class="characteristics-list" v-if="caracteristicas.length > 0">
            <h4 class="section-subtitle">
              <i class="fa fa-check-circle"></i>
              Características Agregadas
            </h4>
            <div class="characteristics-table">
              <div v-for="caracteristica in caracteristicas" :key="caracteristica.nombre" class="characteristic-item">
                <div class="characteristic-info">
                  <span class="characteristic-name">{{caracteristica.nombre}}</span>
                  <span class="characteristic-value">{{caracteristica.valor}}</span>
                </div>
                <button class="btn btn-danger btn-sm"
                          v-on:click="eliminarCaracteristica(caracteristica.nombre)">
                  <i class="fa fa-trash"></i>
                  </button>
              </div>
          </div>
        </div>
      </template>
        
      <!--Cuando no hay caracteristicas en la categoria-->
      <template v-else>
          <div class="empty-characteristics">
            <div class="empty-icon">
              <i class="fa fa-info-circle"></i>
          </div>
            <h4>No existen características para esta categoría</h4>
            <p>Sé el primero en agregar características específicas para esta categoría</p>
        </div>
          
          <div class="add-characteristic-section">
            <h4 class="section-subtitle">
              <i class="fa fa-plus"></i>
              Agregar Nueva Característica
            </h4>
            <div class="form-row">
              <div class="form-group-wrapper">
                <div class="form-group">
                  <label for="v_nombre_caracteristica">
                    <i class="fa fa-tag"></i>
                    Nombre
                  </label>
                  <input placeholder="Nombre de la Característica" 
                         name="v_nombre_caracteristica" 
                         type="text"
                         class="form-control modern-input" 
                         v-model="nombre_caracteristica"
                         data-placement="left" 
                         required 
                         id="v_nombre_caracteristica"
                         title="Ingresa el nombre de la característica que deseas registrar" 
                         data-vv-as="característica"
                     v-validate="'required|min:5|max:255'">
                  <span v-show="errors.has('v_nombre_caracteristica')" class="error-message">
                    <i class="fa fa-exclamation-triangle"></i>
                    {{ errors.first('v_nombre_caracteristica')}}
                  </span>
            </div>
          </div>
              <div class="form-group-wrapper">
                <button class="btn btn-primary btn-add" 
                        :disabled="!deshabilitarButtonPlus"
                    v-on:click="crearCaracteristica">
                  <i class="fa fa-plus"></i>
                  Agregar
            </button>
          </div>
        </div>
          </div>
          
          <div class="characteristics-list" v-if="caracteristicas.length > 0">
            <h4 class="section-subtitle">
              <i class="fa fa-check-circle"></i>
              Características Agregadas
            </h4>
            <div class="characteristics-table">
              <div v-for="caracteristica in caracteristicas" :key="caracteristica.nombre" class="characteristic-item">
                <div class="characteristic-info">
                  <span class="characteristic-name">{{caracteristica.nombre}}</span>
                </div>
                <button class="btn btn-danger btn-sm"
                          v-on:click="eliminarCaracteristica(caracteristica.nombre)">
                  <i class="fa fa-trash"></i>
                  </button>
              </div>
          </div>
        </div>
      </template>
      </div>
    </tab-content>
    <template slot="footer" slot-scope="props">
      <div class=wizard-footer-left>
        <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()"
                       :style="props.fillButtonStyle">Atras
        </wizard-button>
      </div>
      <div class="wizard-footer-right">
        <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right"
                       :style="props.fillButtonStyle" :disabled="!deshabilitar">Siguiente
        </wizard-button>
        <wizard-button v-else @click.native="registrarCatalogo" class="wizard-footer-right finish-button"
                       :style="props.fillButtonStyle" :disabled="!registrar" id="submitButton"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando">Registrar
        </wizard-button>
      </div>
    </template>
  </form-wizard>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {ModelSelect} from 'vue-search-select';
  import {VueEditor} from 'vue2-editor';
  import vue2Dropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';
  import Loader from '../../parts/loader.vue';
  import AppService from '../../AppServices';
  import helpers from '../../../helpers';
  import ImageHandler from '../../../mixin/ImageHandler';

  export default {
    mixins: [ImageHandler],
    data() {
      return {
        siguienteTab: false,
        cargandoData: false,
        hayCategorias: true,
        hayCatalogos: false,
        seleccionoCategoria: false,
        categoriaPadre: null,
        categoriasIds: [],
        categoriasSeleccionadas: [],
        categorias: [],
        categoria: {
          value: '',
          text: ''
        },

        customToolbar: [
          ['bold', 'underline'],
          ['blockquote', 'code-block'],
          [{'header': 1}, {'header': 2}],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],
          [{'indent': '-1'}, {'indent': '+1'}],
          [{'direction': 'rtl'}],
          [{'size': ['small', false, 'large', 'huge']}],
          [{'header': [1, 2, 3, 4, 5, 6, false]}],
          [{'align': []}],
        ],
        editorOptions: {
          modules: {
            markdownShortcuts: false
          }
        },
        catalogo: {
          v_nombre: null,
          v_descripcion: null,
        },
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          acceptedFiles: 'image/*',
          addRemoveLinks: true,
          dictCancelUpload: 'Quitar',
          headers: {"My-Awesome-Header": "header value"}
        },
        images: [],
        paginationCatalogos: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        cargandoDataCatalogo: false,
        seleccionoCatalogo: false,
        utilizarMismasImagenes: false,
        catalogoNuevo: false,

        hayCaracteristicas: false,
        nombre_caracteristica: null,
        caracteristica_requerida: null,
        valor_caracteristica: null,
        caracteristicas: [],
        caracteristicasApi: [],
        caracteristicasUnicas: [],
        caracteristicasMultiples: [],
        registrarWizard: false,
        editorKey: 'editor-store',
        editorReady: false
      }
    },
    props: ['tienda'],
    created() {
      $(function () {
        $('[data-placement]').tooltip()
      });
      this.cargarCategorias(null);
    },
    mounted() {
      let yo = this;
      
      $('#modal').on('hidden.bs.modal', function (e) {
        // Limpiar el editor Quill para evitar conflictos
        yo.cleanEditor();
        yo.$emit('modal_close');
      });
      
      // El editor se inicializa automáticamente cuando se monta el componente
    },
    beforeDestroy() {
      // Limpiar el editor antes de destruir el componente
      this.cleanEditor();
    },
    methods: Object.assign({}, mapMutations([]), {
      getAppService() {
        return AppService;
      },
      // Método para limpiar el editor Quill
      cleanEditor() {
        if (this.$refs.vueEditor && this.$refs.vueEditor.quill) {
          this.$refs.vueEditor.quill = null;
        }
        this.editorReady = false;
      },
      
      // Método para inicializar el editor
      initializeEditor() {
        // El editor se inicializa automáticamente con el callback onEditorReady
        // No necesitamos lógica compleja aquí
      },
      
      // Callback cuando el editor está listo
      onEditorReady() {
        this.editorReady = true;
      },
      
      // Resetear el editor para nueva plantilla
      resetEditor() {
        this.catalogo.v_descripcion = '';
        // Limpiar el editor y permitir que se reinicialice
        this.cleanEditor();
        this.$nextTick(() => {
          this.editorReady = false;
        });
      },
      crearCaracteristica() {
        this.caracteristicas.push({
          indice: this.caracteristicas.length,
          nombre: this.nombre_caracteristica,
          valor: this.valor_caracteristica
        });
        this.nombre_caracteristica = null;
        this.caracteristica_requerida = null;
        this.valor_caracteristica = null;
        this.registrarWizard = true;
      },
      eliminarCaracteristica(valor) {
        this.caracteristicas = helpers.eliminarArrayObjetos(this.caracteristicas, 'nombre', valor);
      },
      cambiar(indice) {
        this.categoriasSeleccionadas = this.categoriasSeleccionadas.splice(0, indice);
        this.cargarCategorias(this.categoriasIds[indice - 1]);
        this.siguienteTab = false;
      },
      seleccionarCategoria(event) {
        this.categoriasIds.push(this.categoria.value !== '' ? this.categoria.value : null);
        this.categoriasSeleccionadas.push({
          texto: event.text,
          id: event.value
        });
        this.cargarCategorias(event.value);
      },
      obtenerImagene(file, response) {
        this.images.push(file);
        if (this.catalogo.v_nombre !== null && this.catalogo.v_descripcion !== null && this.catalogo.v_codigo !== null &&
          this.catalogo.n_precio !== null && this.catalogo.n_existencia !== null && this.catalogo.n_stock_min !== null)
          this.siguienteTab = true;
        if (this.seleccionoCatalogo)
          this.utilizarMismasImagenes = false;
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
        this.getAppService().getMethodsWithBearer("api/ecommerce/categorias", token, 'pluck', 1, null, where)
          .then(response => {
            yo.cargandoData = false;
            yo.categorias = response.body;
            if (yo.categorias.length >= 1)
              yo.hayCategorias = true;
            else {
              yo.seleccionoCategoria = true;
              yo.hayCategorias = false;
              yo.categoriaPadre = yo.categoriasSeleccionadas[0];
              yo.siguienteTab = true;
            }
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      crearNuevoCatalogo() {
        this.catalogoNuevo = true;
        this.seleccionoCatalogo = true;
      },
      registrarCatalogo() {
        let indiceCaracteristicas = 0;
        let token = this.getUsuario.token;
        let boton_registrar = $('#submitButton');
        boton_registrar.button('loading');
        let formData = new FormData();
        for (let i = 0; i < this.images.length; i++) {
          formData.append('images' + i, this.images[i]);
        }
        if (this.caracteristicas.length >= 1) {
          for (let i = 0; i < this.caracteristicas.length; i++) {
            formData.append('caracteristicaNombre' + indiceCaracteristicas, this.caracteristicas[i].nombre);
            formData.append('caracteristicaValor' + indiceCaracteristicas, this.caracteristicas[i].valor);
            indiceCaracteristicas++;
          }
        }
        if (this.hayCaracteristicas) {
          for (let i = 0; i < this.caracteristicasApi.length; i++) {
            formData.append('caracteristicaNombre' + indiceCaracteristicas, this.caracteristicasApi[i].v_nombre);
            formData.append('caracteristicaValor' + indiceCaracteristicas, this.caracteristicasApi[i].v_valor);
            indiceCaracteristicas++;
          }
        }

        /*if (this.catalogo) {
          formData.append('v_nombre', this.catalogo.v_nombre);
          formData.append('id_m_catalogos', this.catalogo.id_m_catalogos);
          formData.append('catalogo', true);
        }*/

        formData.append('v_nombre', this.catalogo.v_nombre);
        formData.append('b_activo', true);
        formData.append('v_descripcion', this.catalogo.v_descripcion);
        formData.append('id_m_categorias_fk', this.categoria.value);
        formData.append('nombre_categorias_fk', this.categoria.text);
        formData.append('id_m_categorias_principal_fk', this.categoriaPadre.id);
        formData.append('nombre_categorias_principal_fk', this.categoriaPadre.texto);
        formData.append('id_m_tiendas_fk', this.tienda.value);
        if (this.catalogoNuevo)
          formData.append('utilizarMismasImagenes', true);
        else
          formData.append('utilizarMismasImagenes', this.utilizarMismasImagenes);
        let yo = this;
        this.$http.post('api/ecommerce/catalogos', formData, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          console.log(response);
          boton_registrar.button('reset');
          yo.$toastr('success', response.body.mensaje, "Acción exitosa");
          $('#modal').modal('hide');
          yo.$emit('store');
        }, errors => {
          console.log(errors);
          if (errors.status === 422) {
            for (let err in errors.body.errors) {
              errors.body.errors[err].forEach(function (value) {
                yo.$toastr('error', value, helpers.ufirst(err));
              });
            }
          } else {
            let message = errors.body.mensaje;
            if (!message)
              message = errors.body.message;
            yo.$toastr('error', message, "Error desconocido");
          }
          boton_registrar.button('reset');
        });
      },
      seleccionarCatalogo(catalogo) {
        this.seleccionoCatalogo = true;
        this.catalogoNuevo = false;
        this.catalogo = catalogo;
      },
      getDataCatalogo(page) {
        this.cargandoDataCatalogo = true;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppService().getMethodsWithBearer("api/ecommerce/catalogos", token, 'paginate', page, "'valores_caracteristicas'", "['id_m_categorias_fk','=','" + this.categoria.value + "']")
          .then(response => {
            yo.cargandoData = false;
            yo.cargandoDataCatalogo = false;
            yo.hayCatalogos = (response.body.data.length > 0);
            if (response.body.data.length === 0) {
              yo.utilizarMismasImagenes = true;
            }
            yo.paginationCatalogos = response.body;
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
      },
      cambioWizard(from, to) {
        let yo = this;
        let token = this.getUsuario.token;
        
        switch (to) {
          case 0:
            this.siguienteTab = this.seleccionoCategoria;
            break;
          case 1:
            this.cargandoData = true;
            this.getDataCatalogo(1);
            break;
          case 2:
            this.cargandoData = true;
            this.getAppService().getMethodsWithBearer("api/ecommerce/caracteristicas", token, 'all', 1, "'valores_caracteristicas'", "['id_m_categorias_fk','=','" + this.categoria.value + "']")
              .then(response => {
                yo.cargandoData = false;
                if (response.body.length > 0) {
                  yo.hayCaracteristicas = true;
                  yo.registrarWizard = true;
                  yo.caracteristicasApi = response.body;
                } else
                  yo.caracteristicas = response.body;
              }, errors => this.getAppServices().mapErrorsResponses(this, errors));
            break;
        }
      },
      llenarCaracteristica(caracteristica, indice) {
        let input = $('#inputCaracteristica' + indice);
        let btn = $('#btnCaracteristica' + indice);
        caracteristica.v_valor = input.val();
        input.attr('disabled', 'disabled');
        btn.attr('disabled', 'disabled');
        this.registrarWizard = true;
      },
      reiniciarCaracteristica(caracteristica, indice) {
        let input = $('#inputCaracteristica' + indice);
        let btn = $('#btnCaracteristica' + indice);
        input.removeAttr('disabled');
        btn.removeAttr('disabled');
        input.val('');
        caracteristica.v_valor = '';
      }
    }),
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return this.siguienteTab;
      },
      registrar() {
        return this.registrarWizard;
      },
      deshabilitarButtonPlus() {
        return this.nombre_caracteristica !== null && this.nombre_caracteristica.trim() !== '' && !this.errors.has('v_nombre_caracteristica');
      },
      isActivedCatalogo: function () {
        return this.paginationCatalogos.current_page;
      },
      pagesNumberCatalogo: function () {
        if (!this.paginationCatalogos.to) {
          return [];
        }
        let from = this.paginationCatalogos.current_page - this.offset;
        if (from < 1)
          from = 1;
        let to = from + (this.offset * 2);
        if (to >= this.paginationCatalogos.last_page)
          to = this.paginationCatalogos.last_page;
        let pagesArray = [];
        while (from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;
      }
    }),
    components: {ModelSelect, VueEditor, vueDropzone: vue2Dropzone, Loader},
  }
</script>

<style scoped>
/* Modal Principal */
.catalogue-store-modal {
  background: white;
  border-radius: 15px;
  overflow: hidden;
}

/* Header del Modal */
.modal-header-custom {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 25px 30px;
  display: flex;
  align-items: center;
  position: relative;
}

.modal-header-custom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff6633, #ff8c42, #ff6633);
}

.header-content {
  display: flex;
  align-items: center;
}

.header-icon {
  background: rgba(255, 255, 255, 0.2);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  backdrop-filter: blur(10px);
}

.header-icon i {
  font-size: 20px;
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-subtitle {
  margin: 5px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
}

/* Wizard Container */
.wizard-container {
  padding: 30px;
}

/* Wizard Step Content */
.wizard-step-content {
  min-height: 400px;
}

.step-header {
  margin-bottom: 30px;
  text-align: center;
}

.step-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.step-title i {
  color: #ff6633;
  font-size: 18px;
}

.step-description {
  color: #666;
  font-size: 16px;
  margin: 0;
}

/* Breadcrumb */
.breadcrumb-container {
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ff6633;
}

.breadcrumb {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb li:not(:last-child)::after {
  content: '>';
  margin: 0 10px;
  color: #666;
}

.breadcrumb-link {
  color: #ff6633;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.breadcrumb-link:hover {
  background: #ff6633;
  color: white;
  text-decoration: none;
}

/* Form Sections */
.form-section {
  margin-bottom: 30px;
}

.form-group-wrapper {
  margin-bottom: 20px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.form-group-wrapper:hover {
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-group label i {
  color: #ff6633;
  font-size: 12px;
}

/* Modern Inputs */
.modern-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
}

.modern-input:focus {
  border-color: #ff6633;
  box-shadow: 0 0 0 3px rgba(255, 102, 51, 0.1);
  outline: none;
}

.modern-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
}

/* Error Messages */
.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
}

/* Loading States */
.loading-full {
  text-align: center;
  padding: 60px 20px;
}

.loading-inline {
  text-align: center;
  padding: 20px;
}

/* Empty States */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.empty-state i {
  font-size: 48px;
  color: #ddd;
  margin-bottom: 15px;
  display: block;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}

/* Dropzone */
.modern-dropzone {
  border: 2px dashed #ff6633 !important;
  border-radius: 12px !important;
  background: #fff5f2 !important;
  transition: all 0.3s ease !important;
}

.modern-dropzone:hover {
  border-color: #e55a2b !important;
  background: #fff0eb !important;
}

.dropzone-help {
  margin-top: 10px;
  color: #666;
  font-size: 12px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

/* Editor */
.modern-editor {
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
  min-height: 200px;
  transition: opacity 0.3s ease;
}

/* Prevenir parpadeo del editor */
.modern-editor .ql-editor {
  min-height: 150px;
}

.modern-editor .ql-toolbar {
  border-bottom: 1px solid #e1e5e9;
}

/* Estado de carga del editor */
.modern-editor.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Placeholder del editor */
.editor-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px 20px;
  background: #f8f9fa;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

.editor-placeholder i {
  color: #ff6633;
  font-size: 16px;
}

/* Characteristics Section */
.characteristics-section {
  margin-bottom: 30px;
}

.section-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.section-subtitle i {
  color: #ff6633;
  font-size: 14px;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.characteristic-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.characteristic-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.characteristic-header {
  margin-bottom: 15px;
}

.characteristic-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.characteristic-input {
  margin-bottom: 15px;
}

.characteristic-actions {
  display: flex;
  gap: 8px;
}

/* Add Characteristic Section */
.add-characteristic-section {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid #e9ecef;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 15px;
  align-items: end;
}

.btn-add {
  background: linear-gradient(135deg, #ff6633 0%, #e55a2b 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-add:hover:not(:disabled) {
  background: linear-gradient(135deg, #e55a2b 0%, #d44a1a 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 102, 51, 0.3);
}

.btn-add:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Characteristics List */
.characteristics-list {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
}

.characteristics-table {
  padding: 0;
}

.characteristic-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.characteristic-item:last-child {
  border-bottom: none;
}

.characteristic-item:hover {
  background: #f8f9fa;
}

.characteristic-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.characteristic-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.characteristic-value {
  color: #666;
  font-size: 12px;
}

/* Empty Characteristics */
.empty-characteristics {
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 30px;
}

.empty-characteristics .empty-icon {
  font-size: 64px;
  color: #ddd;
  margin-bottom: 20px;
}

.empty-characteristics h4 {
  color: #333;
  margin-bottom: 10px;
}

.empty-characteristics p {
  color: #666;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .wizard-container {
    padding: 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .characteristics-grid {
    grid-template-columns: 1fr;
  }
  
  .breadcrumb {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .breadcrumb li:not(:last-child)::after {
    display: none;
  }
}
</style>
