<template>
  <div class="catalogue-update-modal">
    <!-- Header del Modal -->
    <div class="modal-header-custom">
      <div class="header-content">
        <div class="header-icon">
          <i class="fa fa-edit"></i>
        </div>
        <div class="header-text">
          <h2 class="modal-title">Editar Plantilla</h2>
          <p class="modal-subtitle">{{catalogo.v_nombre || 'Plantilla de Catálogo'}}</p>
        </div>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="tabs-navigation">
      <div class="tab-buttons">
        <button :class="['tab-button', { active: opcion === 'categorias' }]" 
                @click="seleccionoOpcion('categorias')">
          <i class="fa fa-tags"></i>
          Categoría
        </button>
        <button :class="['tab-button', { active: opcion === 'detalle' }]" 
                @click="seleccionoOpcion('detalle')">
          <i class="fa fa-edit"></i>
          Detalle
        </button>
        <button :class="['tab-button', { active: opcion === 'caracteristicas' }]" 
                @click="seleccionoOpcion('caracteristicas')">
          <i class="fa fa-list"></i>
          Características
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content-container">
      <template v-if="opcion=='categorias'">
        <div class="tab-content">
          <div class="content-header">
            <h3 class="content-title">
              <i class="fa fa-tags"></i>
              Gestión de Categorías
            </h3>
            <p class="content-description">Cambia la categoría de tu plantilla de catálogo</p>
              </div>

          <div class="categories-grid">
            <!-- Categoría Actual -->
            <div class="current-category-card">
              <div class="card-header">
                <h4 class="card-title">
                  <i class="fa fa-info-circle"></i>
                  Categoría Actual
                </h4>
              </div>
              <div class="card-content">
                <div class="category-info">
                  <div class="info-item">
                    <label>Categoría</label>
                    <span>{{catalogo.categoria.v_nombre}}</span>
            </div>
                  <div class="info-item">
                    <label>Categoría Principal</label>
                    <span>{{catalogo.categoria_principal.v_nombre}}</span>
          </div>
              </div>
              </div>
            </div>

            <!-- Nueva Categoría -->
            <div class="new-category-card">
              <div class="card-header">
                <h4 class="card-title">
                  <i class="fa fa-edit"></i>
                  Seleccionar Nueva Categoría
                </h4>
              </div>
              <div class="card-content">
                <loader v-if="cargandoData" class="loading-inline"></loader>
                
                <div v-else class="category-selection">
                  <div class="breadcrumb-container">
                    <ol class="breadcrumb">
                      <li v-for="(categoriaSeleccionada,i) in categoriasSeleccionadas" :key="i">
                        <a v-on:click="cambiar(i)" class="breadcrumb-link">{{categoriaSeleccionada.texto}}</a>
                      </li>
                    </ol>
                  </div>
                  
                  <div class="form-group-wrapper" v-if="hayCategorias">
                    <div class="form-group">
                      <label for="v_ciudad">
                        <i class="fa fa-tags"></i>
                        Categoría
                      </label>
                      <model-select :options="categorias" 
                                   id="v_ciudad" 
                                   v-model="categoria"
                                   class="form-control modern-select" 
                                   v-on:input="seleccionarCategoria"
                                   data-placement="left" 
                                   title="Selecciona la categoría"
                                  required>
                    </model-select>
                  </div>
                  </div>
                  
                  <div v-else class="empty-state">
                    <i class="fa fa-info-circle"></i>
                    <p>No hay más categorías disponibles</p>
                  </div>

                  <!-- Características de la Nueva Categoría -->
                  <div v-if="hayCaracteristicas" class="characteristics-preview">
                    <h5 class="preview-title">
                      <i class="fa fa-list"></i>
                      Características de la Nueva Categoría
                    </h5>
                    <div class="characteristics-grid">
                      <div v-for="(caracteristica,i) in caracteristicas" :key="i" class="characteristic-item">
                        <div class="characteristic-name">{{caracteristica.v_nombre}}</div>
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

                  <div class="action-buttons" v-if="seleccionoCategoria">
                    <v-btn color="primary" 
                           v-on:click="actualizarCategoria" 
                           id="submitButtonCategoria"
                            :disabled="disabledBtnCategory"
                           data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando"
                           class="btn-update">
                      <i class="fa fa-save"></i>
                      Actualizar Categoría
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="opcion=='detalle'">
        <div class="tab-content">
          <div class="content-header">
            <h3 class="content-title">
              <i class="fa fa-edit"></i>
              Editar Detalles
            </h3>
            <p class="content-description">Modifica la información básica de tu plantilla</p>
              </div>

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
                       title="Ingresa el nombre de la plantilla" 
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
                           :key="'editor-update-' + Math.random()"
                           id="v_descripcion" 
                           v-model="catalogo.v_descripcion" 
                           :editorToolbar="customToolbar"
                           placeholder="Descripción detallada de la plantilla..."
                           class="modern-editor"
                           :editorOptions="editorOptions">
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
                             v-on:vdropzone-mounted="agregarImagenes" 
                             v-on:vdropzone-removed-file="quitarImagen"
                             v-on:vdropzone-success="obtenerImagen"
                             class="modern-dropzone">
                </vue-dropzone>
                <p class="dropzone-help">
                  <i class="fa fa-info-circle"></i>
                  Arrastra y suelta las imágenes aquí o haz clic para seleccionar archivos
                </p>
              </div>
            </div>

            <div class="action-buttons">
              <v-btn color="primary" 
                     v-on:click="actualizarDetalle" 
                     id="submitButtonDetalle"
                          :disabled="disabledBtnDetalle"
                     data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando"
                     class="btn-update">
                <i class="fa fa-save"></i>
                Actualizar Detalles
                  </v-btn>
            </div>
          </div>
        </div>
      </template>
      <template v-if="opcion=='caracteristicas'">
        <div class="tab-content">
          <div class="content-header">
            <h3 class="content-title">
              <i class="fa fa-list"></i>
              Gestión de Características
            </h3>
            <p class="content-description">Administra las características de tu plantilla</p>
              </div>

          <div class="form-section">
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
                      Nombre de la Característica
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
                  <button class="btn btn-primary btn-add" 
                          :disabled="!deshabilitarButtonPlus"
                            v-on:click="crearCaracteristicaNueva">
                    <i class="fa fa-plus"></i>
                    Agregar
                  </button>
                  </div>
                </div>
            </div>

            <div class="characteristics-list" v-if="catalogo.caracteristicas && catalogo.caracteristicas.length > 0">
              <h4 class="section-subtitle">
                <i class="fa fa-check-circle"></i>
                Características Actuales
              </h4>
              <div class="characteristics-table">
                <div v-for="(caracteristica,i) in catalogo.caracteristicas" :key="i" class="characteristic-item">
                  <div class="characteristic-info">
                    <span class="characteristic-name">{{caracteristica.v_nombre}}</span>
                  </div>
                  <button class="btn btn-danger btn-sm"
                                v-on:click="eliminarCaracteristicaNueva(caracteristica.v_nombre)">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="empty-characteristics">
              <div class="empty-icon">
                <i class="fa fa-info-circle"></i>
                </div>
              <h4>No hay características registradas</h4>
              <p>Agrega características para describir mejor tu plantilla</p>
              </div>

            <div class="action-buttons">
              <v-btn color="primary" 
                     v-on:click="actualizarCaracteristicas"
                     id="submitButtonCaracteristicas"
                     data-loading-text="&lt;i class='pull-left fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando"
                     class="btn-update">
                <i class="fa fa-save"></i>
                Actualizar Características
              </v-btn>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Loader from '../../parts/loader.vue';
  import AppService from '../../AppServices';
  import helpers from '../../../helpers';
  import {ModelSelect} from 'vue-search-select';
  import {VueEditor} from 'vue2-editor';
  import vue2Dropzone from 'vue2-dropzone';

  export default {
    props: ['catalogo'],
    data() {
      return {
        cargandoData: false,
        hayCategorias: true,
        seleccionoCategoria: false,
        categoriaPadre: null,
        opcion: null,
        categoriasSeleccionadas: [],
        categoriasIds: [],
        categorias: [],
        categoria: {
          value: '',
          text: ''
        },
        caracteristicas: [],
        caracteristicasApi: [],
        deshabilitarBtnCategoria: true,

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
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          acceptedFiles: 'image/*',
          addRemoveLinks: true,
          dictCancelUpload: 'Quitar',
          headers: {"My-Awesome-Header": "header value"},
        },
        images: [],
        imagesCatalogo: [],
        imagesCatalogoEliminar: [],
        editoImagenes: false,
        editoImagenesActuales: false,
        agregoImagenes: false,

        hayCaracteristicas: false,
        nombre_caracteristica: null,
        valor_caracteristica: null,
        aceptoCaracteristicasActuales: true,
        caracteristicasNuevas: [],
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        // Limpiar el editor Quill para evitar conflictos
        if (yo.$refs.vueEditor && yo.$refs.vueEditor.quill) {
          yo.$refs.vueEditor.quill = null;
        }
        yo.$emit('modal_close');
      });
    },
    beforeDestroy() {
      // Limpiar el editor antes de destruir el componente
      if (this.$refs.vueEditor && this.$refs.vueEditor.quill) {
        this.$refs.vueEditor.quill = null;
      }
    },
    created() {
      $(function () {
        $('[data-placement]').tooltip()
      });
      console.log(this.catalogo);
    },
    components: {ModelSelect, Loader, VueEditor, vueDropzone: vue2Dropzone},
    methods: {
      getAppServices() {
        return AppService;
      },
      // Método para limpiar el editor Quill
      limpiarEditor() {
        if (this.$refs.vueEditor && this.$refs.vueEditor.quill) {
          this.$refs.vueEditor.quill = null;
        }
      },
      seleccionoOpcion(value) {
        // Limpiar el editor al cambiar de pestaña
        this.$nextTick(() => {
          this.limpiarEditor();
        });
        
        switch (value) {
          case 'categorias':
            this.cargarCategorias(null);
            break;
          case 'detalle':

            break;
          case 'caracteristicas':
            this.hayCaracteristicas = (this.catalogo.caracteristicas.length >= 1);
            break;
        }
        this.opcion = value;
      },
      cambiar(indice) {
        this.categoriasSeleccionadas = this.categoriasSeleccionadas.splice(0, indice);
        this.cargarCategorias(this.categoriasIds[indice - 1]);
      },
      seleccionarCategoria(event) {
        this.categoriasIds.push(this.categoria.value !== '' ? this.categoria.value : null);
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
            yo.cargandoData = false;
            yo.categorias = response.body;
            if (yo.categorias.length >= 1)
              yo.hayCategorias = true;
            else {
              yo.seleccionoCategoria = true;
              yo.hayCategorias = false;
              yo.categoriaPadre = yo.categoriasSeleccionadas[0];
              yo.getAppServices().getMethodsWithBearer("api/ecommerce/caracteristicas", token, 'all', 1, null, "['id_m_categorias_fk','=','" + yo.categoria.value + "']")
                .then(response => {
                  this.caracteristicas = response.body;
                  this.hayCaracteristicas = (response.body.length >= 1);
                  if (!this.hayCaracteristicas)
                    this.deshabilitarBtnCategoria = false;
                }, errors => this.getAppServices().mapErrorsResponses(this, errors))
            }
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      actualizarCategoria() {
        let token = this.getUsuario.token;
        let yo = this;
        let boton_actualizar = $('#submitButtonCategoria');
        boton_actualizar.button('loading');
        let formData = {};

        formData.opcion = this.opcion;
        formData.id_m_categorias_fk = this.categoria.value;
        formData.nombre_categorias_fk = this.categoria.text;
        formData.id_m_categorias_principal_fk = this.categoriaPadre.id;
        formData.nombre_categorias_principal_fk = this.categoriaPadre.texto;
        formData.v_nombre = this.catalogo.v_nombre;
        formData.v_descripcion = this.catalogo.v_descripcion;
        this.getAppServices().putMethodWithBearer("api/ecommerce/catalogos/" + this.catalogo.id_m_catalogos, formData, token)
          .then(response => {
            boton_actualizar.button('reset');
            $('#modal').modal('hide');
            yo.$emit('update');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors))
      },
      llenarCaracteristica(caracteristica, indice) {
        let input = $('#inputCaracteristica' + indice);
        let btn = $('#btnCaracteristica' + indice);
        //caracteristica.v_valor = input.val();
        input.attr('disabled', 'disabled');
        btn.attr('disabled', 'disabled');
        this.deshabilitarBtnCategoria = false;
        this.aceptoCaracteristicasActuales = false;
      },
      reiniciarCaracteristica(caracteristica, indice) {
        let input = $('#inputCaracteristica' + indice);
        let btn = $('#btnCaracteristica' + indice);
        input.removeAttr('disabled');
        btn.removeAttr('disabled');
        input.val('');
        //caracteristica.v_valor = '';
      },
      obtenerImagen(file) {
        this.images.push(file);
        this.editoImagenes = true;
        this.agregoImagenes = true;
      },
      agregarImagenes() {
        let yo = this;
        this.catalogo.imagenes.forEach(function (imagen) {
          let split = imagen.v_url.split("/");
          let nombre = split.pop();
          let file = {size: 123, name: nombre};
          let url = imagen.v_url;
          yo.$refs.myVueDropzone.manuallyAddFile(file, url);
          yo.imagesCatalogo.push(nombre);
        })
      },
      quitarImagen(file) {
        let yo = this;
        let imagesCatalogo = this.imagesCatalogo.length;
        this.editoImagenes = true;
        this.images = this.images.filter(function (image) {
          return image.name !== file.name;
        });
        this.imagesCatalogo = this.imagesCatalogo.filter(function (image) {
          let resp = false;
          if (image !== file.name) {
            resp = true;
            yo.imagesCatalogoEliminar.push(file.name);
          }
          return resp;
        });
        if (this.imagesCatalogo.lenght !== imagesCatalogo)
          this.editoImagenesActuales = true;
      },
      actualizarDetalle() {
        let token = this.getUsuario.token;
        let yo = this;
        let boton_actualizar = $('#submitButtonDetalle');
        boton_actualizar.button('loading');
        let formData = new FormData();
        let objData = {};
        objData.opcion = this.opcion;
        objData.v_nombre = this.catalogo.v_nombre;
        objData.v_descripcion = this.catalogo.v_descripcion;
        this.getAppServices().putMethodWithBearer("api/ecommerce/catalogos/" + this.catalogo.id_m_catalogos, objData, token)
          .then(response => {
            if (this.editoImagenes) {
              if (this.editoImagenesActuales) {
                formData.append('imagenesEliminar', true);
                for (let i = 0; i < this.imagesCatalogoEliminar.length; i++) {
                  formData.append('eliminarImagenes' + i, this.imagesCatalogoEliminar[i]);
                }
              }
              if (this.agregoImagenes) {
                formData.append('agregarImagenes', true);
                for (let i = 0; i < this.images.length; i++) {
                  formData.append('imagesNuevas' + i, this.images[i]);
                }
              }
              formData.append("modelo", "catalogo");
              formData.append("id_modelo", this.catalogo.id_m_catalogos);
              this.getAppServices().postMethodWithBearer("api/avanzamas/actualizar", formData, token).then(
                response => {
                  yo.$emit('update');
                  $('#modal').modal('hide');
                  yo.$toastr('success', "Se ha actualizado el recurso con éxito.", "Acción exitosa");
                }, errors => yo.getAppServices().mapErrorsResponses(yo, errors))
            } else {
              yo.$emit('update');
              $('#modal').modal('hide');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            }

          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
      },
      crearCaracteristica() {
        this.catalogo.caracteristicas.push({
          indice: this.caracteristicas.length,
          nombre: this.nombre_caracteristica,
          valor: this.valor_caracteristica
        });
        this.nombre_caracteristica = null;
        this.caracteristica_requerida = null;
        this.valor_caracteristica = null;
      },
      crearCaracteristicaNueva() {
        this.catalogo.caracteristicas.push({
          indice: this.caracteristicas.length,
          v_nombre: this.nombre_caracteristica,
          v_tipo: 'unica', // Tipo por defecto para nuevas características
          v_unidad: 'n/a', // Unidad por defecto
          b_requerido: false, // No requerido por defecto
          id_m_categorias_fk: this.catalogo.id_m_categorias_fk,
          id_m_categorias_principal_fk: this.catalogo.id_m_categorias_principal_fk,
          pivot: {
            //v_valor: this.valor_caracteristica
          }
        });
        this.nombre_caracteristica = null;
        this.caracteristica_requerida = null;
        this.valor_caracteristica = null;
      },
      eliminarCaracteristica(valor) {
        this.catalogo.caracteristicas = helpers.eliminarArrayObjetos(this.catalogo.caracteristicas, 'nombre', valor);
      },
      eliminarCaracteristicaNueva(valor) {
        this.catalogo.caracteristicas = helpers.eliminarArrayObjetos(this.catalogo.caracteristicas, 'v_nombre', valor);
        this.caracteristicasNuevas = helpers.eliminarArrayObjetos(this.caracteristicasNuevas, 'v_nombre', valor);
      },
      actualizarCaracteristicas() {
        let token = this.getUsuario.token;
        let yo = this;
        let boton_actualizar = $('#submitButtonCaracteristicas');
        boton_actualizar.button('loading');
        let formData = {};
        formData.opcion = 'caracteristicas';
        formData.id_m_categorias_fk = this.catalogo.id_m_categorias_fk;
        formData.caracteristicas = this.catalogo.caracteristicas;
        formData.v_nombre = this.catalogo.v_nombre;
        formData.v_descripcion = this.catalogo.v_descripcion;
        console.log(this.catalogo.caracteristicas);
        if (this.caracteristicas.length >= 1) {
          for (let i = 0; i < this.caracteristicas.length; i++) {
            formData.append('caracteristicaNombre' + i, this.caracteristicas[i].nombre);
            console.log( 'nombre ',this.caracteristicas[i].nombre);
          }
        }
        this.getAppServices().putMethodWithBearer("api/ecommerce/catalogos/" + this.catalogo.id_m_catalogos, formData, token)
          .then(response => {
            boton_actualizar.button('reset');
            $('#modal').modal('hide');
            yo.$emit('update');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors));
      }
    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      disabledBtnCategory() {
        return this.deshabilitarBtnCategoria;
      },
      disabledBtnDetalle() {
        return !(!this.errors.has('v_nombre') && !this.errors.has('v_codigo') && !this.errors.has('n_precio') && !this.errors.has('n_existencia')
          && !this.errors.has('n_stock_min')
        );
      },
      deshabilitarButtonPlus() {
        return this.nombre_caracteristica !== null && this.nombre_caracteristica.trim() !== '' && !this.errors.has('v_nombre_caracteristica');
      },
      disabledBtnCaracteristicas() {
        return this.aceptoCaracteristicasActuales;
      }
    })
  }
</script>

<style scoped>
/* Modal Principal */
.catalogue-update-modal {
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

/* Tabs Navigation */
.tabs-navigation {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 0 30px;
}

.tab-buttons {
  display: flex;
  gap: 0;
}

.tab-button {
  background: none;
  border: none;
  padding: 20px 30px;
  color: #666;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.tab-button:hover {
  background: #e9ecef;
  color: #333;
}

.tab-button.active {
  background: white;
  color: #ff6633;
  border-bottom-color: #ff6633;
  font-weight: 600;
}

.tab-button i {
  font-size: 14px;
}

/* Tab Content */
.tab-content-container {
  padding: 30px;
  min-height: 500px;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Content Header */
.content-header {
  margin-bottom: 30px;
  text-align: center;
}

.content-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.content-title i {
  color: #ff6633;
  font-size: 18px;
}

.content-description {
  color: #666;
  font-size: 16px;
  margin: 0;
}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  margin-bottom: 30px;
}

.current-category-card,
.new-category-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.card-header {
  background: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title i {
  color: #ff6633;
  font-size: 14px;
}

.card-content {
  padding: 25px;
}

/* Category Info */
.category-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.info-item span {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* Breadcrumb */
.breadcrumb-container {
  margin-bottom: 20px;
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
.loading-inline {
  text-align: center;
  padding: 40px 20px;
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
}

/* Characteristics Preview */
.characteristics-preview {
  margin-top: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.preview-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.preview-title i {
  color: #ff6633;
  font-size: 12px;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.characteristic-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.characteristic-name {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.characteristic-input {
  margin-bottom: 10px;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr auto;
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
  margin-bottom: 30px;
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

/* Action Buttons */
.action-buttons {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-update {
  background: linear-gradient(135deg, #ff6633 0%, #e55a2b 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-update:hover:not(:disabled) {
  background: linear-gradient(135deg, #e55a2b 0%, #d44a1a 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 102, 51, 0.3);
}

.btn-update:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .tab-content-container {
    padding: 20px;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .tab-buttons {
    flex-direction: column;
  }
  
  .tab-button {
    border-bottom: 1px solid #e9ecef;
    border-radius: 0;
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
