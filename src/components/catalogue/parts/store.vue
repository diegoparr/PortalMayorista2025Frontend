<template>
  <form-wizard title="Bienvenido al asistente de creación de plantillas"
               color="#fe7501" v-on:on-change="cambioWizard"
               nextButtonText="Siguiente" backButtonText="Atrás" finishButtonText="Registrar"
               subtitle="Completa cada paso para finalizar el proceso" :startIndex="0">
    <tab-content title="Selecciona la categoría" icon="fa fa-shopping-bag">
      <div class="row">
        <div class="col-xs-12">
          <ol class="breadcrumb">
            <li v-for="(categoriaSeleccionada,i) in categoriasSeleccionadas">
              <a v-on:click="cambiar(i)" class="categories-links">{{categoriaSeleccionada.texto}}</a>
            </li>
          </ol>
        </div>
        <div class="col-xs-12 col-md-7">
          <loader v-if="cargandoData"></loader>
          <model-select v-else-if="hayCategorias" :options="categorias" id="v_ciudad" v-model="categoria"
                        class="form-control" v-on:input="seleccionarCategoria"

                        data-placement="left" title="Selecciona la tienda"
                        required>
          </model-select>
          <h5 v-else class="text-center">No hay mas categorias</h5>
        </div>
      </div>
    </tab-content>
    <tab-content title="Ingresa los datos de la plantilla" icon="fa fa-cubes">
      <loader v-if="cargandoData"></loader>
      <!--TODO: Cuando hay catalogo en la categoria-->
     <!-- <template v-else-if="hayCatalogos && !cargandoData">
        <loader v-if="cargandoDataCatalogo"></loader>
        &lt;!&ndash;TODO: Mostrar todo en el catalogo de la categoria&ndash;&gt;
        <div class="row" v-else-if="!seleccionoCatalogo">
          <div class="col-xs-12 col-sm-3 col-md-3" v-for="catalogo in paginationCatalogos.data">
            <div class="box box-hipertienda shadow-box-products">
              <div class="box-header with-border">
                <h3 class="box-title">{{catalogo.v_nombre}}</h3>
              </div>
              <div class="box-body">
                <img :src="catalogo.v_imagen_portada" class="img-responsive img-product"
                     v-on:click="seleccionarCatalogo(catalogo)" style="cursor: pointer;">
              </div>
            </div>
          </div>
        </div>
        &lt;!&ndash;TODO: paginador del catalogo&ndash;&gt;
        <div class="row" v-if="!seleccionoCatalogo">
          <div class="col-xs-6 col-xs-offset-4 text-center">
            <ul class="pagination pagination-sm no-margin pull-left">
              <li v-if="paginationCatalogos.current_page > 1">
                <a href="" aria-label="Anterior"
                   @click.prevent="getDataCatalogo(paginationCatalogos.current_page - 1)">«</a>
              </li>
              <li v-for="pagina in pagesNumberCatalogo"
                  :class="[ pagina == isActivedCatalogo ? 'active' : '']">
                <a href="#"
                   @click.prevent="getDataCatalogo(pagina)">{{ pagina }}</a>
              </li>
              <li v-if="paginationCatalogos.current_page < paginationCatalogos.last_page">
                <a href="#" aria-label="Siguiente"
                   @click.prevent="getDataCatalogo(paginationCatalogos.current_page + 1)">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        &lt;!&ndash;TODO: Boton para crear un nuevo catalogo&ndash;&gt;
        <div class="row" v-if="!seleccionoCatalogo">
          <div class="col-xs-12 text-center">
            <button class="btn btn-primary"
                    @click.prevent="crearNuevoCatalogo">
              <i class="wizard-icon fa fa-cubes"></i>
              Registrar uno nuevo
            </button>
          </div>
        </div>
        &lt;!&ndash;TODO: Cuando selecciona el catalogo&ndash;&gt;
        <div class="row" v-if="seleccionoCatalogo">
          <div class="row">
            <div class="col-xs-12 col-md-8">
              <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
                <label for="v_nombre">Nombre</label>
                <template v-if="catalogoNuevo">
                  <input placeholder="Nombre del Catalogo" name="v_nombre" type="text" class="form-control"
                          data-placement="left" required id="c_v_nombre"
                         title="Ingresa el nombre del catalogo que deseas registrar" data-vv-as="nombre del catalogo"
                         v-model="catalogo.v_nombre" v-validate="'required|min:5|max:255'">
                </template>
                <template v-else>
                  <input placeholder="Nombre del Catalogo" name="v_nombre" type="text" class="form-control"
                          data-placement="left" required id="c_v_nombre"
                         title="Ingresa el nombre del catalogo que deseas registrar" data-vv-as="nombre del catalogo"
                         v-model="catalogo.v_nombre" v-validate="'required|min:5|max:255'">
                </template>
                <span v-show="errors.has('v_nombre')"
                      class="help-block text-center">{{ errors.first('v_nombre')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-4">
              <div :class="(!errors.first('v_codigo'))?'form-group':'form-group has-error'">
                <label for="v_codigo">Código</label>
                <input placeholder="Código" name="v_codigo" type="text" class="form-control"
                        data-placement="left" required id="c_v_codigo"
                       title="Código interno del catalogo" data-vv-as="código"
                       v-model="catalogo.v_codigo" v-validate="'required|min:2|max:255|alpha_num'">
                <span v-show="errors.has('v_codigo')"
                      class="help-block text-center">{{ errors.first('v_codigo')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-4">
              <div :class="(!errors.first('n_precio'))?'form-group':'form-group has-error'">
                <label for="c_n_precio">Precio</label>
                <input placeholder="Precio del catalogo" name="n_precio" type="text" class="form-control"
                        data-placement="left" required id="c_n_precio"
                       title="Indica el precio actual de tu catalogo" data-vv-as="precio"
                       v-model="catalogo.n_precio" v-validate="'required|min:1|max:999999999|decimal:2'">
                <span v-show="errors.has('n_precio')"
                      class="help-block text-center">{{ errors.first('n_precio')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-4">
              <div :class="(!errors.first('n_existencia'))?'form-group':'form-group has-error'">
                <label for="c_n_existencia">Existencia</label>
                <input placeholder="Existencia actual del catalogo" name="n_existencia" type="text"
                       class="form-control" data-vv-as="existencia"
                        data-placement="left" required id="c_n_existencia"
                       title="Indica la cantidad de existencia disponible que posees sobre el catalogo"
                       v-model="catalogo.n_existencia" v-validate="'required|min:1|max:999999999|numeric'">
                <span v-show="errors.has('n_existencia')"
                      class="help-block text-center">{{ errors.first('n_existencia')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-4">
              <div :class="(!errors.first('n_stock_min'))?'form-group':'form-group has-error'">
                <label for="c_n_stock_min">Stock Mínimo</label>
                <input placeholder="Código" name="n_stock_min" type="text" class="form-control"
                        data-placement="left" required id="c_n_stock_min"
                       title="Especifica la cantidad mínimo de existencia que debe existir de tu catalogo en la plataforma"
                       data-vv-as="stock mínimo"
                       v-model="catalogo.n_stock_min" v-validate="'required|min:1|max:999999999|numeric'">
                <span v-show="errors.has('n_stock_min')"
                      class="help-block text-center">{{ errors.first('n_stock_min')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <label for="v_descripcion">Descripción</label>
              <vue-editor v-model="catalogo.v_descripcion" :editorToolbar="customToolbar"
                          placeholder="Descripción del Catalogo"></vue-editor>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 margin-top-dragdrop-container">
              <label for="c_dropzone">Imagenes del Catalogo</label>
              <vue-dropzone ref="myVueDropzone" id="c_dropzone" :options="dropzoneOptions"
                            v-on:vdropzone-success="obtenerImagene"></vue-dropzone>
            </div>
          </div>
        </div>
      </template>-->
      <!--TODO: Cuando no hay catalogo en la categoria-->
      <template v-else>
        <div class="row">
          <div class="row" v-show="!hayCatalogos">

          </div>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
                <label for="v_nombre">Nombre</label>
                <input placeholder="Nombre de la Plantilla" name="v_nombre" type="text" class="form-control"
                        data-placement="left" required id="v_nombre"
                       title="Ingresa el nombre de la plantilla que deseas registrar" data-vv-as="nombre de la plantilla"
                       v-model="catalogo.v_nombre" v-validate="'required|min:5|max:255'">
                <span v-show="errors.has('v_nombre')"
                      class="help-block text-center">{{ errors.first('v_nombre')}}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <label for="v_descripcion">Descripción</label>
              <vue-editor id="v_descripcion" v-model="catalogo.v_descripcion" :editorToolbar="customToolbar"
                          placeholder="Descripción de la Plantilla"></vue-editor>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 margin-top-dragdrop-container">
              <label for="v_descripcion">Imagenes de la Plantilla</label>
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                            v-on:vdropzone-success="obtenerImagene"></vue-dropzone>
            </div>
          </div>
        </div>
      </template>
    </tab-content>
    <tab-content title="Características de la Plantilla" icon="fa fa-search">
      <loader v-if="cargandoData"></loader>
      <!--Cuando hay caracteristicas en la categoria-->
      <template v-else-if="hayCaracteristicas && !cargandoData">
        <div class="row">
          <div class="table-responsive no-padding">
            <table class="table table-hover">
              <tbody>
              <tr>
                <th class="text-center">Nombre</th>
                <th class="text-center">Valor</th>
                <th class="text-center">Opciones</th>
              </tr>
              <tr v-for="(caracteristica,i) in caracteristicasApi">
                <td class="text-center">{{caracteristica.v_nombre}}</td>
                <td class="text-center">
                  <input type="text" class="form-control" :placeholder="caracteristica.v_nombre"
                         :id="'inputCaracteristica'+i">
                </td>
                <td>
                  <button class="btn btn-primary" :id="'btnCaracteristica'+i"
                          v-on:click="llenarCaracteristica(caracteristica,i)"><i
                    class="fa fa-check" aria-hidden="true"></i></button>
                  <button class="btn btn-warning" v-on:click="reiniciarCaracteristica(caracteristica,i)"><i
                    class="fa fa-refresh" aria-hidden="true"></i></button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-5">
            <div :class="(!errors.first('v_nombre_caracteristica'))?'form-group':'form-group has-error'">
              <label for="n_v_nombre_caracteristica">Nombre</label>
              <input placeholder="Nombre de la Caracteristica" name="v_nombre_caracteristica" type="text"
                     class="form-control" v-model="nombre_caracteristica"
                      data-placement="left" required id="n_v_nombre_caracteristica"
                     title="Ingresa el nombre de la caracteristica que deseas registrar" data-vv-as="caracteristica"
                     v-validate="'required|min:5|max:255'">
              <span v-show="errors.has('v_nombre_caracteristica')"
                    class="help-block">{{ errors.first('v_nombre_caracteristica')}}</span>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <div :class="(!errors.first('valor_caracteristica'))?'form-group':'form-group has-error'">
              <label for="n_valor_caracteristica">Valor</label>
              <input placeholder="Valor" name="valor_caracteristica" type="text"
                     class="form-control" v-model="valor_caracteristica"
                      data-placement="left" required id="n_valor_caracteristica"
                     title="Ingresa el valor de la caracteristica que deseas registrar" data-vv-as="valor"
                     v-validate="'required|min:2|max:255'">
              <span v-show="errors.has('valor_caracteristica')"
                    class="help-block">{{ errors.first('valor_caracteristica')}}</span>
            </div>
          </div>
          <div class="col-xs-12 col-md-1 text-center">
            <button class="btn btn-success margin-top-button-plus" :disabled="!deshabilitarButtonPlus"
                    v-on:click="crearCaracteristica">
              <i class="fa fa-plus" aria-hidden="true"></i>
              <span id="NtextButtonCaracteristica">Registrar Caracteristica</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive no-padding">
            <table class="table table-hover">
              <tbody>
              <tr>
                <th class="text-center">Nombre</th>
                <th class="text-center">Valor</th>
                <th class="text-center">Opciones</th>
              </tr>
              <tr v-for="caracteristica in caracteristicas">
                <td class="text-center">{{caracteristica.nombre}}</td>
                <td class="text-center">{{caracteristica.valor}}</td>
                <td class="text-center">
                  <button class="btn btn-primary"
                          v-on:click="eliminarCaracteristica(caracteristica.nombre)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <!--Cuando no hay caracteristicas en la categoria-->
      <template v-else>
        <div class="row" v-show="!hayCaracteristicas">
          <div class="col-xs-12" align="center">
            <h4 class="font-green" style="color:green;">
              No existen características sobre esa categoría, sé el primero!
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-11">
            <div :class="(!errors.first('v_nombre_caracteristica'))?'form-group':'form-group has-error'">
              <label for="v_nombre_caracteristica">Nombre</label>
              <input placeholder="Nombre de la Caracteristica" name="v_nombre_caracteristica" type="text"
                     class="form-control" v-model="nombre_caracteristica"
                      data-placement="left" required id="v_nombre_caracteristica"
                     title="Ingresa el nombre de la caracteristica que deseas registrar" data-vv-as="caracteristica"
                     v-validate="'required|min:5|max:255'">
              <span v-show="errors.has('v_nombre_caracteristica')"
                    class="help-block">{{ errors.first('v_nombre_caracteristica')}}</span>
            </div>
          </div>

          <div class="col-xs-12 col-md-1 text-center">
            <button class="btn btn-success margin-top-button-plus" :disabled="!deshabilitarButtonPlus"
                    v-on:click="crearCaracteristica">
              <i class="fa fa-plus" aria-hidden="true"></i>
              <span id="textButtonCaracteristica">Registrar Caracteristica</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive no-padding">
            <table class="table table-hover">
              <tbody>
              <tr>
                <th class="text-center">Nombre</th>
                <th class="text-center">Opciones</th>
              </tr>
              <tr v-for="caracteristica in caracteristicas">
                <td class="text-center">{{caracteristica.nombre}}</td>
                <td class="text-center">
                  <button class="btn btn-primary"
                          v-on:click="eliminarCaracteristica(caracteristica.nombre)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
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

  export default {
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
        registrarWizard: false
      }
    },
    props: ['tienda'],
    created() {
      $(function () {
        $('[]').tooltip()
      });
      this.cargarCategorias(null);
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
    },
    methods: Object.assign({}, mapMutations([]), {
      getAppService() {
        return AppService;
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
        return this.nombre_caracteristica !== null && this.tipo !== null && !this.errors.has('v_tipo');
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
