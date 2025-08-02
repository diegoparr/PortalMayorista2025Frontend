<template>
  <div class="row">
    <div class="col-xs-12 col-md-12 text-center">
      <div class="radio">
        <label class="margin-radios">
          <input type="radio" name="optionsRadios" value="categorias" v-on:click="seleccionoOpcion('categorias')">
          Categoria
        </label>
        <label class="margin-radios">
          <input type="radio" name="optionsRadios" value="detalle" v-on:click="seleccionoOpcion('detalle')">
          Detalle
        </label>
        <label class="margin-radios">
          <input type="radio" name="optionsRadios" value="caracteristicas"
                 v-on:click="seleccionoOpcion('caracteristicas')">
          Caracteristicas
        </label>
      </div>
      <template v-if="opcion=='categorias'">
        <div class="row">
          <div class="col-xs-12 col-md-4">
            <div class="box box-success">
              <div class="box-header with-border">
                <h3 class="box-title">Categoria Actual</h3>
              </div>
              <div class="box-body">
                <table class="table table-bordered">
                  <tbody>
                  <tr>
                    <th class="text-center">Categoria Actual</th>
                    <th class="text-center">Categoria Principal</th>
                  </tr>
                  <tr>
                    <td class="text-center">{{catalogo.categoria.v_nombre}}</td>
                    <td class="text-center">{{catalogo.categoria_principal.v_nombre}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-8">
            <div class="box box-success">
              <div class="box-header with-border">
                <h3 class="box-title">Selecciona la nueva categoría</h3>
              </div>
              <div class="box-body">
                <loader v-if="cargandoData"></loader>
                <div class="row" v-else>
                  <div class="col-xs-12">
                    <ol class="breadcrumb">
                      <li v-for="(categoriaSeleccionada,i) in categoriasSeleccionadas">
                        <a v-on:click="cambiar(i)" class="categories-links">{{categoriaSeleccionada.texto}}</a>
                      </li>
                    </ol>
                  </div>
                  <div class="col-xs-12 col-md-7 col-md-offset-3" v-if="hayCategorias">
                    <loader v-if="cargandoData"></loader>
                    <model-select :options="categorias" id="v_ciudad" v-model="categoria"
                                  class="form-control" v-on:input="seleccionarCategoria"

                                  data-placement="left" title="Selecciona la tienda"
                                  required>
                    </model-select>
                  </div>
                  <div class="col-xs-12 text-center" v-if="!hayCategorias">
                    <h5>No hay mas categorias</h5>
                  </div>
                  <div class="col-xs-12" v-if="hayCaracteristicas">
                    <div class="row">
                      <div class="table-responsive no-padding">
                        <table class="table table-hover">
                          <tbody>
                          <tr>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Valor</th>
                            <th class="text-center">Opciones</th>
                          </tr>
                          <tr v-for="(caracteristica,i) in caracteristicas">
                            <td class="text-center">{{caracteristica.v_nombre}}</td>
                            <td class="text-center">
                              <input type="text" class="form-control" :placeholder="caracteristica.v_nombre"
                                     :id="'inputCaracteristica'+i">
                            </td>
                            <td>
                              <v-btn color="info" :id="'btnCaracteristica'+i"
                                      v-on:click="llenarCaracteristica(caracteristica,i)"><i
                                class="fa fa-check" aria-hidden="true"></i></v-btn>
                              <v-btn color="primary" v-on:click="reiniciarCaracteristica(caracteristica,i)">
                                <i class="fa fa-refresh" aria-hidden="true"></i>
                              </v-btn>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12" v-if="seleccionoCategoria">
                    <v-btn color="primary" v-on:click="actualizarCategoria" id="submitButtonCategoria"
                            :disabled="disabledBtnCategory"
                            data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
                      Actualizar Categoria de la Plantilla
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="opcion=='detalle'">
        <div class="row">
          <div class="col-xs-12">
            <div class="box box-success">
              <div class="box-header with-border">
                <h3 class="box-title">{{catalogo.v_nombre}}</h3>
              </div>
              <div class="box-body">
                <div class="col-xs-12 col-md-12">
                  <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
                    <label for="v_nombre">Nombre</label>
                    <input placeholder="Nombre del Catalogo" name="v_nombre" type="text" class="form-control"
                            data-placement="left" required id="v_nombre"
                           title="Ingresa el nombre del catalogo que deseas registrar" data-vv-as="nombre del catalogo"
                           v-model="catalogo.v_nombre" v-validate="'required|min:5|max:255'">
                    <span v-show="errors.has('v_nombre')"
                          class="help-block text-center">{{ errors.first('v_nombre')}}</span>
                  </div>
                </div>
                <div class="col-xs-12">
                  <label for="v_descripcion">Descripción</label>
                  <vue-editor id="v_descripcion" v-model="catalogo.v_descripcion" :editorToolbar="customToolbar"
                              placeholder="Descripción del Catalogo"></vue-editor>
                </div>
                <div class="col-xs-12 margin-top-dragdrop-container">
                  <label for="v_descripcion">Imagenes del Catalogo</label>
                  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                v-on:vdropzone-mounted="agregarImagenes" v-on:vdropzone-removed-file="quitarImagen"
                                v-on:vdropzone-success="obtenerImagen"></vue-dropzone>
                </div>
                <div class="col-xs-12" style="margin: 10px 0 0 0;">
                  <v-btn color="primary" v-on:click="actualizarDetalle" id="submitButtonDetalle"
                          :disabled="disabledBtnDetalle"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
                    Actualizar Detalle de la Plantilla
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="opcion=='caracteristicas'">
        <div class="row">
          <div class="col-xs-12">
            <div class="box box-success">
              <div class="box-header with-border">
                <h3 class="box-title">{{catalogo.v_nombre}}</h3>
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-xs-12 col-md-11">
                    <div :class="(!errors.first('v_nombre_caracteristica'))?'form-group':'form-group has-error'">
                      <label for="n_v_nombre_caracteristica">Nombre</label>
                      <input placeholder="Nombre de la Caracteristica" name="v_nombre_caracteristica" type="text"
                             class="form-control" v-model="nombre_caracteristica"
                              data-placement="left" required id="n_v_nombre_caracteristica"
                             title="Ingresa el nombre de la caracteristica que deseas registrar"
                             data-vv-as="caracteristica"
                             v-validate="'required|min:5|max:255'">
                      <span v-show="errors.has('v_nombre_caracteristica')"
                            class="help-block">{{ errors.first('v_nombre_caracteristica')}}</span>
                    </div>
                  </div>

                  <div class="col-xs-12 col-md-1 text-center">
                    <v-btn color="primary" :disabled="!deshabilitarButtonPlus"
                            v-on:click="crearCaracteristicaNueva">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      <span id="NtextButtonCaracteristica">Registrar Caracteristica</span>
                    </v-btn>
                  </div>
                </div>
                <div class="table-responsive no-padding">
                  <table class="table table-hover">
                    <tbody>
                    <tr>
                      <th class="text-center">Nombre</th>
                      <th class="text-center">Opciones</th>
                    </tr>
                    <tr v-for="(caracteristica,i) in catalogo.caracteristicas">
                      <td class="text-center">{{caracteristica.v_nombre}}</td>
                      <td>
                        <v-btn color="error"
                                v-on:click="eliminarCaracteristicaNueva(caracteristica.v_nombre)">
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </v-btn>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-xs-12" style="margin: 10px 0 0 0;">
                  <v-btn color="primary" v-on:click="actualizarCaracteristicas"
                          id="submitButtonCaracteristicas"

                          data-loading-text="&lt;i class='pull-left fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
                    Actualizar Detalle de la Plantilla
                  </v-btn>
                </div>
              </div>
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
        yo.$emit('modal_close');
      });
    },
    created() {
      $(function () {
        $('[]').tooltip()
      });
      console.log(this.catalogo);
    },
    components: {ModelSelect, Loader, VueEditor, vueDropzone: vue2Dropzone},
    methods: {
      getAppServices() {
        return AppService;
      },
      seleccionoOpcion(value) {
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
        return this.nombre_caracteristica !== null && this.tipo !== null && !this.errors.has('v_tipo');
      },
      disabledBtnCaracteristicas() {
        return this.aceptoCaracteristicasActuales;
      }
    })
  }
</script>
