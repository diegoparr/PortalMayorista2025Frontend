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
        <label class="margin-radios">
          <input type="radio" name="optionsRadios" value="inventario"
                 v-on:click="seleccionoOpcion('inventario')">
          Inventario
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
                    <td class="text-center">{{producto.categoria.v_nombre}}</td>
                    <td class="text-center">{{producto.categoria_principal.v_nombre}}</td>
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
                                  data-toggle="tooltip"
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
                              <button class="btn btn-primary" :id="'btnCaracteristica'+i"
                                      v-on:click="llenarCaracteristica(caracteristica,i)"><i
                                class="fa fa-check" aria-hidden="true"></i></button>
                              <button class="btn btn-warning" v-on:click="reiniciarCaracteristica(caracteristica,i)">
                                <i
                                  class="fa fa-refresh" aria-hidden="true"></i></button>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12" v-if="seleccionoCategoria">
                    <button class="btn btn-warning" v-on:click="actualizarCategoria" id="submitButtonCategoria"
                            :disabled="disabledBtnCategory"
                            data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
                      Actualizar Categoria del Producto
                    </button>
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
                <h3 class="box-title">{{producto.v_nombre}}</h3>
              </div>
              <div class="box-body">
                <div class="col-xs-12 col-md-8">
                  <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
                    <label for="v_nombre">Nombre</label>
                    <input placeholder="Nombre del Producto" name="v_nombre" type="text" class="form-control"
                           data-toggle="tooltip" data-placement="left" required id="v_nombre"
                           title="Ingresa el nombre del producto que deseas registrar" data-vv-as="nombre del producto"
                           v-model="producto.v_nombre" v-validate="'required|min:5|max:255'">
                    <span v-show="errors.has('v_nombre')"
                          class="help-block text-center">{{ errors.first('v_nombre')}}</span>
                  </div>
                </div>
                <div class="col-xs-12 col-md-4">
                  <div :class="(!errors.first('v_codigo'))?'form-group':'form-group has-error'">
                    <label for="v_codigo">Código</label>
                    <input placeholder="Código" name="v_codigo" type="text" class="form-control"
                           data-toggle="tooltip" data-placement="left" required id="v_codigo"
                           title="Código interno del producto" data-vv-as="código"
                           v-model="producto.v_codigo" v-validate="'required|min:2|max:255|alpha_num'">
                    <span v-show="errors.has('v_codigo')"
                          class="help-block text-center">{{ errors.first('v_codigo')}}</span>
                  </div>
                </div>
                <div class="col-xs-12 col-md-3">
                  <div :class="(!errors.first('n_precio'))?'form-group':'form-group has-error'">
                    <label for="n_precio">Precio</label>
                    <input placeholder="Precio del producto" name="n_precio" type="text" class="form-control"
                           data-toggle="tooltip" data-placement="left" required id="n_precio"
                           title="Indica el precio actual de tu producto" data-vv-as="precio"
                           v-model="producto.n_precio" v-validate="'required|min:1|max:999999999|decimal:2'">
                    <span v-show="errors.has('n_precio')"
                          class="help-block text-center">{{ errors.first('n_precio')}}</span>
                  </div>
                </div>
                <div class="col-xs-12 col-md-3">
                  <div :class="(!errors.first('n_existencia'))?'form-group':'form-group has-error'">
                    <label for="n_existencia">Existencia</label>
                    <input placeholder="Existencia actual del producto" name="n_existencia" type="text"
                           class="form-control" data-vv-as="existencia"
                           data-toggle="tooltip" data-placement="left" required id="n_existencia"
                           title="Indica la cantidad de existencia disponible que posees sobre el producto"
                           v-model="producto.n_existencia" v-validate="'required|min:1|max:999999999|numeric'">
                    <span v-show="errors.has('n_existencia')"
                          class="help-block text-center">{{ errors.first('n_existencia')}}</span>
                  </div>
                </div>
                <div class="col-xs-12 col-md-3">
                  <div :class="(!errors.first('n_stock_min'))?'form-group':'form-group has-error'">
                    <label for="n_stock_min">Stock Mínimo</label>
                    <input placeholder="Stock Mínimo" name="n_stock_min" type="text" class="form-control"
                           data-toggle="tooltip" data-placement="left" required id="n_stock_min"
                           title="Especifica la cantidad mínimo de existencia que debe existir de tu producto en la plataforma"
                           data-vv-as="stock mínimo"
                           v-model="producto.n_stock_min" v-validate="'required|min:1|max:999999999|numeric'">
                    <span v-show="errors.has('n_stock_min')"
                          class="help-block text-center">{{ errors.first('n_stock_min')}}</span>
                  </div>
                </div>
                <div class="col-xs-12 col-md-3">
                  <div class="form-group">
                    <label for="c_n_tipo">Tipo</label>
                    <select id="c_n_tipo" v-model="producto.v_tipo" class="form-control">
                      <option value="nuevo">Nuevo</option>
                      <option value="usado">Usado</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div :class="(!errors.first('v_resena'))?'form-group':'form-group has-error'">
                      <label for="n_resena">Reseña</label>
                      <textarea name="v_resena" id="n_resena" class="form-control" v-model="producto.v_resena"
                                data-vv-as="reseña del producto" v-validate="'required|min:5|max:255'">
                </textarea>
                      <span v-show="errors.has('v_resena')"
                            class="help-block text-center">{{ errors.first('v_resena')}}</span>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <div class="contenedor-descuento-producto">
                      <div class="primer-segmento-descuento-productos">
                        <div class="contenedor-pregunta-descuento">
                          <label for="posee-descuento">
                            <input type="checkbox" id="posee-descuento" v-model="producto.b_descuento"> ¿Poseé
                            descuento?
                          </label>
                        </div>
                        <template v-if="producto.b_descuento">
                          <div class="contendor-input-descuento">
                            <div :class="(!errors.first('n_porcentaje_descuento'))?'form-group':'form-group has-error'">
                              <label for="n_porcentaje_descuento">% de descuento</label>
                              <input type="number" id="n_porcentaje_descuento" class="form-control" min="1" max="100"
                                     name="n_porcentaje_descuento" v-model="producto.n_porcentaje_descuento"
                                     data-vv-as="reseña del producto"
                                     v-validate="'required|numeric|min:1|max:100'">
                              <span v-show="errors.has('n_porcentaje_descuento')"
                                    class="help-block text-center">{{ errors.first('n_porcentaje_descuento')}}</span>
                            </div>
                          </div>
                        </template>
                      </div>
                      <template v-if="producto.b_descuento">
                        <div class="segundo-segmento-descuento-productos">
                          <strong>
                            <span>{{calcularDescuento}}</span>
                          </strong>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12">
                  <label for="v_descripcion">Descripción</label>
                  <vue-editor id="v_descripcion" v-model="producto.v_descripcion" :editorToolbar="customToolbar"
                              placeholder="Descripción del Producto"></vue-editor>
                </div>
                <div class="col-xs-12 margin-top-dragdrop-container">
                  <label for="v_descripcion">Imagenes del Producto</label>
                  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                v-on:vdropzone-mounted="agregarImagenes" v-on:vdropzone-removed-file="quitarImagen"
                                v-on:vdropzone-success="obtenerImagen"></vue-dropzone>
                </div>
                <div class="col-xs-12" style="margin: 10px 0 0 0;">
                  <button class="btn btn-warning" v-on:click="actualizarDetalle" id="submitButtonDetalle"
                          :disabled="disabledBtnDetalle"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
                    Actualizar Detalle del Producto
                  </button>
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
                <h3 class="box-title">{{producto.v_nombre}}</h3>
              </div>
              <div class="box-body">

                <div class="row">
                  <div class="col-xs-12 col-md-4">
                    <div :class="(!errors.first('v_nombre_caracteristica'))?'form-group':'form-group has-error'">
                      <label for="v_nombre_caracteristica">Nombre</label>
                      <input placeholder="Nombre de la Caracteristica" name="v_nombre_caracteristica" type="text"
                             class="form-control" v-model="nombre_caracteristica"
                             data-toggle="tooltip" data-placement="left" required id="v_nombre_caracteristica"
                             title="Ingresa el nombre de la caracteristica que deseas registrar"
                             data-vv-as="caracteristica"
                             v-validate="'required|min:5|max:255'">
                      <span v-show="errors.has('v_nombre_caracteristica')"
                            class="help-block">{{ errors.first('v_nombre_caracteristica')}}</span>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-4">
                    <div :class="(!errors.first('v_tipo'))?'form-group':'form-group has-error'">
                      <div class="form-group">
                        <label for="v_nombre">Tipo Caracteristica</label>
                        <model-select :options="tipos" id="v_tipo" v-model="v_tipo" class="form-control"
                                      data-toggle="tooltip"
                                      data-placement="left" title="Selecciona el tipo"
                                      required>
                        </model-select>
                        <span v-show="errors.has('v_tipo')" class="help-block">{{ errors.first('v_tipo')}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-md-4" v-if="mostrarMultiple">
                    <div class="col-xs-6 col-md-6">
                      <div :class="(!errors.first('valor_caracteristica'))?'form-group':'form-group has-error'">
                        <label for="valor_caracteristica">Valor</label>
                        <input placeholder="Valor" name="valor_caracteristica" type="text"
                               class="form-control" v-model="valor_caracteristica"
                               data-toggle="tooltip" data-placement="left" id="valor_caracteristica"
                               title="Ingresa el valor de la caracteristica que deseas registrar" data-vv-as="valor"
                               v-validate="'required|min:1|max:255'">
                        <span v-show="errors.has('valor_caracteristica')"
                              class="help-block">{{ errors.first('valor_caracteristica') }}</span>
                      </div>
                    </div>
                    <div class="col-xs-6 col-md-1 text-left">
                      <button type="button" class="btn btn-success margin-top-button-plus"
                              :disabled="!deshabilitarButtonPlus2"
                              v-on:click="crearValores">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        <span>Agregar Valor</span>
                      </button>
                    </div>

                  </div>
                  <div class="col-xs-12 col-md-4" v-else>
                    <div :class="(!errors.first('valor_caracteristica'))?'form-group':'form-group has-error'">
                      <label for="valor_caracteristica">Valor</label>
                      <input placeholder="Valor" name="valor_caracteristica" type="text"
                             class="form-control" v-model="valor_caracteristica"
                             data-toggle="tooltip" data-placement="left" required id="valor_caracteristica"
                             title="Ingresa el valor de la caracteristica que deseas registrar" data-vv-as="valor"
                             v-validate="'required|min:1|max:255'">
                      <span v-show="errors.has('valor_caracteristica')"
                            class="help-block">{{ errors.first('valor_caracteristica')}}</span>
                    </div>
                  </div>
                  <div class="col-md-12 text-center" v-if="mostrarMultiple">
                    <table class="table table-hover">
                      <tbody>
                      <tr>
                        <th class="text-center">Valor</th>
                        <th class="text-center">Opciones</th>
                      </tr>
                      <tr v-for="item in valores">
                        <td class="text-center">{{item.value}}</td>
                        <td class="text-center">
                          <button class="btn btn-primary"
                                  v-on:click="eliminarValor(item.value)">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-xs-12 col-md-12 text-center">
                    <button class="btn btn-success margin-top-button-plus" :disabled="!deshabilitarButtonPlus"
                            v-on:click="crearCaracteristica">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      <span>Agregar Caracteristica</span>
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="table-responsive no-padding col-md-6">
                    <table class="table table-hover">
                      <caption class="text-center"> Caracteristicas Únicas</caption>
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

                          <button class="btn btn-warning"
                                  v-on:click="editarCaracteristica(caracteristica)">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-danger"
                                  v-on:click="eliminarCaracteristica(caracteristica.nombre,'unica')">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="table-responsive no-padding col-md-6">
                    <table class="table table-hover">
                      <caption class="text-center"> Caracteristicas Múltiples</caption>
                      <tbody>
                      <tr>
                        <th class="text-center">Nombre</th>
                        <th class="text-center">Valores</th>
                        <th class="text-center">Opciones</th>
                      </tr>
                      <tr v-for="caracMult in caracteristicasMultiples">
                        <td class="text-center">{{caracMult.nombre}}</td>
                        <td class="text-center"><span v-for="item in caracMult.valor">{{item.value}} <br></span></td>
                        <td class="text-center">
                          <button class="btn btn-warning"
                                  v-on:click="editarCaracteristica(caracMult)">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-danger"
                                  v-on:click="eliminarCaracteristica(caracMult.nombre, 'multiple')">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-xs-12" style="margin: 10px 0 0 0;">
                  <button class="btn btn-warning" v-on:click="actualizarCaracteristicas"
                          id="submitButtonCaracteristicas"
                          :disabled="disabledBtnCaracteristicas"
                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
                    Actualizar Caracteristicas del Producto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="opcion=='inventario'">
        <div class="row">
          <div class="col-xs-12">
            <div class="box box-success">
              <div class="box-header with-border">
                <h2 class="box-title">{{producto.v_nombre}}</h2>
              </div>
              <div class="box-body">
                <div class="col-md-6">
                  <div class="table-responsive no-padding">
                    <table class="table table-hover">
                      <tbody>
                      <tr>
                        <th class="text-center">Caracteristica</th>
                        <th class="text-center">Valor</th>
                      </tr>

                      <tr v-for="(mult,i) in multiples">
                        <td class="text-center">{{mult.nombre}}</td>
                        <td class="text-center">
                          <model-select :options="mult.valor2"
                                        :id="'valor_multiple'+i" v-model="valor_multiple[i]"
                                        class="form-control"
                                        data-toggle="tooltip"
                                        data-placement="left" title="Selecciona un valor"
                                        required>
                          </model-select>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-center">
                          Precio
                        </td>
                        <td class="text-center">
                          <input class="form-control" type="number" v-model="precio"/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Stock
                        </td>
                        <td>
                          <input class="form-control" type="number" v-model="stock"/>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-center" colspan="2">
                          <button type="button" class="btn btn-success" v-on:click="crearVariacion">Añadir Variación
                          </button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="table-responsive no-padding">
                    <table class="table table-hover">
                      <tbody>
                      <tr>
                        <th class="text-center">Variacion</th>
                        <th class="text-center">Precio</th>
                        <th class="text-center">Stock</th>
                        <th class="text-center">Opciones</th>
                      </tr>
                      <!--<tr v-for="(caracteristica,i) in producto.caracteristicas">
                        <td class="text-center">{{caracteristica.v_nombre}}</td>
                        <td class="text-center">
                          <input type="text" class="form-control" :value="caracteristica.pivot.v_valor"
                                 :placeholder="caracteristica.v_nombre"
                                 :id="'inputCaracteristica'+i">
                        </td>
                        <td>
                          <button class="btn btn-primary" :id="'btnCaracteristica'+i"
                                  v-on:click="llenarCaracteristica(caracteristica,i)"><i
                            class="fa fa-check" aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-warning" v-on:click="reiniciarCaracteristica(caracteristica,i)"><i
                            class="fa fa-refresh" aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-danger"
                                  v-on:click="eliminarCaracteristicaNueva(caracteristica.v_nombre)">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>-->
                      <tr v-for="(vari,i) in variaciones">
                        <td class="text-center"><span v-for="valor in vari.valoresString">{{valor}} </span></td>
                        <td class="text-center">{{vari.precio}}</td>
                        <td class="text-center">{{vari.stock}}</td>
                        <td>
                          <button class="btn btn-warning" :id="'btnCaracteristica'+i"
                                  v-on:click="editarVariacion(vari,i)">
                            <i class="fa fa-edit" aria-hidden="true"></i>
                          </button>

                          <button class="btn btn-danger"
                                  v-on:click="eliminarVariacion(vari)">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-xs-12" style="margin: 10px 0 0 0;">
                  <button class="btn btn-warning" v-on:click="actualizarInventario()"
                          id="submitButtonInventario"

                          data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
                    Actualizar Inventario del Producto
                  </button>
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
  import _ from 'lodash';
  import {ModelSelect, MultiSelect} from 'vue-search-select';
  import {VueEditor} from 'vue2-editor';
  import vue2Dropzone from 'vue2-dropzone';

  export default {
    props: ['tienda', 'producto'],
    data() {
      return {
        cargandoData: false,
        hayCategorias: true,
        precio: 0,
        stock: 0,
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
        valor_multiple: [],
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
          maxFilesize: 1.5,
          acceptedFiles: 'image/*',
          addRemoveLinks: true,
          dictCancelUpload: 'Quitar',
          headers: {"My-Awesome-Header": "header value"},
        },
        images: [],
        imagesProducto: [],
        imagesProductoEliminar: [],
        editoImagenes: false,
        editoImagenesActuales: false,
        agregoImagenes: false,

        hayCaracteristicas: false,
        nombre_caracteristica: null,
        valor_caracteristica: null,
        aceptoCaracteristicasActuales: false,
        caracteristicasNuevas: [],
        unicas: [],
        multiples: [],
        valores: [],
        searchText: '', // If value is falsy, reset searchText & searchItem
        items: [],
        lastSelectItem: {},
        variaciones: [],
        variacion: {valores: [], precio: 0, stock: 0},
        tipos: [{text: 'unica', value: 'unica'}, {text: 'multiple', value: 'multiple'}],
        v_tipo: {
          value: "",
          text: ""
        },
        caracteristicasMultiples: [],

      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
      let nombAnte = '';
      let flag = false;
      let valMult = [];
      let valMult2 = [];
      this.producto.caracteristicas.forEach(item => {
        if (item.v_tipo === 'unica') {
          this.unicas.push({nombre: item.v_nombre, valor: item.pivot.v_valor});
          this.caracteristicas.push({
            indice: this.caracteristicas.length,
            tipo: item.v_tipo,
            nombre: item.v_nombre,
            valor: item.pivot.v_valor
          })
        }
        else {
          if (item.v_nombre !== nombAnte) {
            nombAnte = item.v_nombre;
            valMult = [];
            valMult2 = [];
            console.log('item', item);
            this.multiples.push({nombre: nombAnte, valor: valMult, valor2: valMult2});
            this.caracteristicasMultiples.push({
              indice: this.caracteristicas.length,
              tipo: item.v_tipo,
              nombre: item.v_nombre,
              valor: valMult,
              valor2: valMult2
            });

          }
          valMult.push({value: item.pivot.v_valor, text: item.v_nombre});
          valMult2.push({value: item.v_nombre+'_'+item.pivot.v_valor, text: item.pivot.v_valor});
        }
      });



      this.producto.variaciones.forEach(item => {
        let varia = {valoresString: [], valores: [], precio: 0, stock: 0};
        varia.stock = item.n_stock;
        varia.precio = item.n_precio;
        console.log('item mounted', item);
        item.valores.forEach(val => {
          varia.valores.push(val.v_valor_string);
          varia.valoresString.push(val.v_valor_string);
        });
        this.variaciones.push(varia);
      });
      //this.multiples.push({nombre: nombAnte, valor: valMult})

    },
    created() {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      });
    },
    components: {ModelSelect, MultiSelect, Loader, VueEditor, vueDropzone: vue2Dropzone},
    methods: {
      crearValores() {
        console.log('valor', this.valor_caracteristica);
        console.log('nombre', this.nombre_caracteristica);
        this.valores.push({
          text: this.nombre_caracteristica,
          value: this.valor_caracteristica
        });
        this.valor_caracteristica = null;
      },
      eliminarValor(valor) {
        this.valores = helpers.eliminarArrayObjetos(this.valores, 'value', valor);
      },
      onSelect(items, lastSelectItem) {
        this.items = items
        this.lastSelectItem = lastSelectItem
      },

      // deselect option
      reset() {
        this.items = [] // reset
      },
      // select option from parent component
      selectOption() {
        this.items = _.unionWith(this.items, [this.options[0]], _.isEqual)
      },
      totalDescuento(precio, porcentaje) {
        return precio * porcentaje / 100;
      },
      seleccionoOpcion(value) {
        switch (value) {
          case 'categorias':
            this.cargarCategorias(null);
            break;
          case 'detalle':

            break;
          case 'caracteristicas':
            this.hayCaracteristicas = (this.producto.caracteristicas.length >= 1);
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
      crearVariacion() {
        helpers.eliminarArrayObjetos2(this.variaciones, 'valores', this.valor_multiple);

        console.log('array', this.valor_multiple);
        this.variacion.valoresString = this.valor_multiple;
        let yo = this;
        let res;
        this.valor_multiple.forEach(function(entry) {
          res =entry.split("_");
          yo.variacion.valores.push(entry);
        }, this);
        //this.variacion.valores = this.valor_multiple;
        this.variacion.stock = this.stock;
        this.variacion.precio = this.precio;
        /*if(this.variaciones.length > 0){
          this.variaciones.valores.forEach( function(valor, indice, array) {
            console.log("En el índice " + indice + " hay este valor: " +"array " + array );
          });
        }*/
        console.log('variacion', this.variacion);
        this.variaciones.push(this.variacion);

        //helpers.eliminarArrayObjetos(this.variaciones,'valores', this.variacion.valores);

        console.log('varia', this.variaciones);

        this.variacion = {valoresString: [], valores: [], precio: 0, stock: 0};
        this.stock = 0;
        this.precio = 0;
        this.valor_multiple = [];

      },
      editarVariacion(variacion, i) {
        console.log("variacion", variacion);
        this.stock = variacion.stock;
        this.precio = variacion.precio;
        let yo = this;
        let res;
        yo.valor_multiple = [];
        variacion.valores.forEach(function (vari) {
          console.log('vari', vari);
          yo.valor_multiple.push(vari);

          console.log('agregue' + i, vari);
          console.log('multiple', yo.valor_multiple);

        });

      },
      eliminarVariacion(variacion) {
        console.log("variacion eliminar", variacion);
        helpers.eliminarArrayObjetos2(this.variaciones, 'valores', variacion.valores);
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
        this.getMethodsWithBearer(this.urlsApi().endpointsCategorias.index, token, 'pluck', 1, null, where)
          .then(response => {
            yo.cargandoData = false;
            yo.categorias = response.body;
            if (yo.categorias.length >= 1)
              yo.hayCategorias = true;
            else {
              yo.seleccionoCategoria = true;
              yo.hayCategorias = false;
              yo.categoriaPadre = yo.categoriasSeleccionadas[0];
              yo.getMethodsWithBearer(this.urlsApi().endpointsCaracteristicas.index, token, 'all', 1, null, "['id_m_categorias_fk','=','" + yo.categoria.value + "']")
                .then(response => {
                  this.caracteristicas = response.body;
                  this.hayCaracteristicas = (response.body.length >= 1);
                  if (!this.hayCaracteristicas)
                    this.deshabilitarBtnCategoria = false;
                }, errors => this.mapErrorsResponses(this, errors))
            }
          }, errors => this.mapErrorsResponses(this, errors));
      },
      actualizarCategoria() {
        let token = this.getUsuario.token;
        let yo = this;
        let boton_actualizar = $('#submitButtonCategoria');
        boton_actualizar.button('loading');
        let formData = {};
        formData.caracteristicas = this.caracteristicas;
        formData.opcion = this.opcion;
        formData.id_m_categorias_fk = this.categoria.value;
        formData.nombre_categorias_fk = this.categoria.text;
        formData.id_m_categorias_principal_fk = this.categoriaPadre.id;
        formData.nombre_categorias_principal_fk = this.categoriaPadre.texto;
        formData.id_m_tiendas_fk = this.tienda.value;
        this.putMethodWithBearer(this.urlsApi().endpointProductosEditar + this.producto.id_m_productos, formData, token)
          .then(response => {
            boton_actualizar.button('reset');
            $('#modal').modal('hide');
            yo.$emit('update');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
          }, errors => yo.mapErrorsResponses(yo, errors))
      },
      llenarCaracteristica(caracteristica, indice) {
        let input = $('#inputCaracteristica' + indice);
        let btn = $('#btnCaracteristica' + indice);
        console.log("valor de input", input.val());
        caracteristica.v_valor = input.val();
        input.attr('disabled', 'disabled');
        btn.attr('disabled', 'disabled');
        this.deshabilitarBtnCategoria = false;
        //this.aceptoCaracteristicasActuales = true;
      },
      reiniciarCaracteristica(caracteristica, indice) {
        let input = $('#inputCaracteristica' + indice);
        let btn = $('#btnCaracteristica' + indice);
        input.removeAttr('disabled');
        btn.removeAttr('disabled');
        input.val('');
        caracteristica.v_valor = '';
      },
      obtenerImagen(file) {
        this.images.push(file);
        this.editoImagenes = true;
        this.agregoImagenes = true;
      },
      agregarImagenes() {
        let yo = this;
        this.producto.imagenes.forEach(function (imagen) {
          let split = imagen.v_url.split("/");
          let nombre = split.pop();
          let file = {size: 123, name: nombre};
          let url = imagen.v_url;
          yo.$refs.myVueDropzone.manuallyAddFile(file, url);
          yo.imagesProducto.push(nombre);
        })
      },
      quitarImagen(file) {
        console.log("archivo a eliminar", file);
        let yo = this;
        let imagesProducto = this.imagesProducto.length;
        this.editoImagenes = true;
        this.images = this.images.filter(function (image) {
          return image.name !== file.name;
        });
        this.imagesProducto = this.imagesProducto.filter(function (image) {
          let resp = false;
          if (image !== file.name) {
            resp = true;
            console.log("eliminar", yo.imagesProductoEliminar);
          }
          return resp;
        });
        yo.imagesProductoEliminar.push(file.name);
        if (this.imagesProducto.lenght !== imagesProducto)
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
        objData.v_nombre = this.producto.v_nombre;
        objData.v_codigo = this.producto.v_codigo;
        objData.n_precio = this.producto.n_precio;
        objData.n_existencia = this.producto.n_existencia;
        objData.n_stock_min = this.producto.n_stock_min;
        objData.v_descripcion = this.producto.v_descripcion;
        objData.v_tipo = this.producto.v_tipo;

        objData.v_resena = this.producto.v_resena;
        objData.b_descuento = this.producto.b_descuento;
        objData.n_porcentaje_descuento = this.producto.n_porcentaje_descuento;
        objData.n_precio_descuento = this.producto.n_precio_descuento;
        this.putMethodWithBearer(this.urlsApi().endpointsProductos.actualizar + this.producto.id_m_productos, objData, token)
          .then(response => {
            if (this.editoImagenes) {
              if (this.editoImagenesActuales) {
                formData.append('imagenesEliminar', true);
                for (let i = 0; i < this.imagesProductoEliminar.length; i++) {
                  formData.append('eliminarImagenes' + i, this.imagesProductoEliminar[i]);
                }
              }
              if (this.agregoImagenes) {
                formData.append('agregarImagenes', true);
                for (let i = 0; i < this.images.length; i++) {
                  formData.append('imagesNuevas' + i, this.images[i]);
                }
              }
              formData.append("modelo", "producto");
              formData.append("id_modelo", this.producto.id_m_productos);
              this.postMethodWithBearer(this.urlsApi().endpointsManejoImagenes.actualizar, formData, token).then(
                response => {
                  yo.$emit('update');
                  $('#modal').modal('hide');
                  yo.$toastr('success', "Se ha actualizado el recurso con éxito.", "Acción exitosa");
                }, errors => yo.mapErrorsResponses(yo, errors))
            } else {
              yo.$emit('update');
              $('#modal').modal('hide');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            }

          }, errors => yo.mapErrorsResponses(yo, errors));
      },
      crearCaracteristica() {
        this.eliminarCaracteristica(this.nombre_caracteristica, this.v_tipo.value, false);

        if (this.v_tipo.value === 'unica') {
          this.caracteristicas.push({
            indice: this.caracteristicas.length,
            tipo: this.v_tipo.value,
            nombre: this.nombre_caracteristica,
            valor: this.valor_caracteristica
          });
        }
        else if (this.v_tipo.value === 'multiple') {
          console.log("valore", this.valores);
          this.caracteristicasMultiples.push({
            indice: this.caracteristicasMultiples.length,
            tipo: this.v_tipo.value,
            nombre: this.nombre_caracteristica,
            valor: this.valores
          });
        }
        this.nombre_caracteristica = null;
        this.caracteristica_requerida = null;
        this.valor_caracteristica = null;
        this.registrarWizard = true;
        this.valores = [];
      },
      editarCaracteristica(caracteristica, api = false) {
        console.log("editando", caracteristica);
        if (api) {
          if (caracteristica.tipo === 'unica') {
            this.nombre_caracteristica = caracteristica.nombre;
            this.v_tipo.value = caracteristica.tipo;
            this.v_tipo.text = caracteristica.tipo;
            this.valor_caracteristica = caracteristica.valor;
          }
          if (caracteristica.tipo === 'multiple') {
            this.nombre_caracteristica = caracteristica.nombre;
            this.v_tipo.value = caracteristica.tipo;
            this.v_tipo.text = caracteristica.tipo;
            this.valor_caracteristica = '';
            this.valores = caracteristica.valor;
          }
          this.flag = true;
        }
        else {
          if (caracteristica.tipo === 'unica') {
            this.nombre_caracteristica = caracteristica.nombre;
            this.v_tipo.value = caracteristica.tipo;
            this.v_tipo.text = caracteristica.tipo;
            this.valor_caracteristica = caracteristica.valor;
          }
          if (caracteristica.tipo === 'multiple') {
            this.nombre_caracteristica = caracteristica.nombre;
            this.valor_caracteristica = '';
            this.v_tipo.value = caracteristica.tipo;
            this.v_tipo.text = caracteristica.tipo;
            this.valores = caracteristica.valor;
          }
          this.flag = false;
        }

      },
      eliminarCaracteristica(valor, tipo = 'unica', api = false) {
        if (api) {
          if (tipo === 'unica')
            this.caracteristicas = helpers.eliminarArrayObjetos(this.caracteristicas, 'nombre', valor);
          else
            this.caracteristicasMultiples = helpers.eliminarArrayObjetos(this.caracteristicasMultiples, 'nombre', valor);
        }
        else {
          if (tipo === 'unica')
            this.caracteristicas = helpers.eliminarArrayObjetos(this.caracteristicas, 'nombre', valor);
          else
            this.caracteristicasMultiples = helpers.eliminarArrayObjetos(this.caracteristicasMultiples, 'nombre', valor);
        }

      },
      actualizarCaracteristicas() {
        let token = this.getUsuario.token;
        let yo = this;
        let boton_actualizar = $('#submitButtonCaracteristicas');
        boton_actualizar.button('loading');
        let formData = {};
        formData.opcion = 'caracteristicas';
        formData.id_m_categorias_fk = this.producto.id_m_categorias_fk;
        formData.caracteristicas = [];
        this.caracteristicas.forEach(caract => {
          formData.caracteristicas.push({
            "id_m_categorias_fk": this.producto.id_m_categorias_fk,
            "id_m_categorias_principal_fk": this.producto.id_m_categorias_principal_fk,
            "v_tipo": caract.tipo,
            "v_nombre": caract.nombre,
            "v_valor": caract.valor
          });
        })

        this.caracteristicasMultiples.forEach(multiple => {
          formData.caracteristicas.push({
            "id_m_categorias_fk": this.producto.id_m_categorias_fk,
            "id_m_categorias_principal_fk": this.producto.id_m_categorias_principal_fk,
            "v_tipo": multiple.tipo,
            "v_nombre": multiple.nombre,
            "v_valor": multiple.valor
          });
        })

        this.putMethodWithBearer(this.urlsApi().endpointsProductos.actualizar + this.producto.id_m_productos, formData, token)
          .then(response => {
            boton_actualizar.button('reset');
            $('#modal').modal('hide');
            yo.$emit('update');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
          }, errors => yo.mapErrorsResponses(yo, errors));
      },
      actualizarInventario() {
        let token = this.getUsuario.token;
        let yo = this;
        let boton_actualizar = $('#submitButtonInventario');
        boton_actualizar.button('loading');
        let formData = {};
        formData.opcion = 'inventario';
        let varia = [];
        let entry;
        console.log('las vari', this.variaciones)

        formData.variaciones = this.variaciones;
        this.putMethodWithBearer(this.urlsApi().endpointsProductos.actualizar + this.producto.id_m_productos, formData, token)
          .then(response => {
            boton_actualizar.button('reset');
            $('#modal').modal('hide');
            yo.$emit('update');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
          }, errors => yo.mapErrorsResponses(yo, errors));
      },
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
        console.log('status boton', this.aceptoCaracteristicasActuales);
        return this.aceptoCaracteristicasActuales;
      },
      calcularDescuento() {
        let total = this.producto.n_precio - this.totalDescuento(this.producto.n_precio, this.producto.n_porcentaje_descuento);
        this.producto.n_precio_descuento = total;
        return this.formatInvoice(total);
      },
      deshabilitarButtonPlus2() {
        return this.valor_caracteristica !== null;
      },
      mostrarMultiple() {
        return this.v_tipo.value === 'multiple';
      },
    })
  }
</script>
