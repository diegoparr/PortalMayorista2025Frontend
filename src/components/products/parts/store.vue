<template>
  <form-wizard title="Bienvenido al asistente de creación de productos"
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
    <tab-content title="Selecciona de nuestro catalogo tú producto" icon="fa fa-cubes">
      <loader v-if="cargandoData"></loader>
      <!--TODO: Cuando hay catalogo en la categoria-->
      <template v-else-if="hayCatalogos && !cargandoData">
        <loader v-if="cargandoDataCatalogo"></loader>
        <!--TODO: Mostrar todo en el catalogo de la categoria-->
        <div class="row" v-else-if="!seleccionoCatalogo">
          <div class="col-xs-12 col-sm-3 col-md-3" v-for="catalogo in paginationCatalogos.data">
            <div class="box box-hipertienda shadow-box-products">
              <div class="box-header with-border">
                <h3 class="box-title">{{catalogo.v_nombre}}</h3>
              </div>
              <div class="box-body">
                <img :src="getImageUrl(catalogo.v_imagen_portada)" class="img-responsive img-product"
                     v-on:click="seleccionarCatalogo(catalogo)" style="cursor: pointer;">
              </div>
            </div>
          </div>
        </div>
        <!-- TODO: paginador del catalogo-->
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
        <!-- TODO: Boton para crear un nuevo catalogo-->
        <div class="row" v-if="!seleccionoCatalogo">
          <div class="col-xs-12 text-center">
            <v-btn color="info"
                    @click.prevent="crearNuevoCatalogo">
              <i class="wizard-icon fa fa-cubes"></i>
              Registrar uno nuevo
            </v-btn>
          </div>
        </div>
        <!-- TODO: Cuando selecciona el catalogo-->
        <div class="row" v-if="seleccionoCatalogo">
          <div class="row">
            <div class="col-xs-12 col-md-8">
              <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
                <label for="v_nombre">Nombre</label>
                <template v-if="catalogoNuevo">
                  <input placeholder="Nombre del Producto" name="v_nombre" type="text" class="form-control"
                          data-placement="left" required id="c_v_nombre"
                         title="Ingresa el nombre del producto que deseas registrar" data-vv-as="nombre del producto"
                         v-model="producto.v_nombre" v-validate="'required|min:5|max:255'">
                </template>
                <template v-else>
                  <input placeholder="Nombre del Producto" name="v_nombre" type="text" class="form-control"
                          data-placement="left" required id="c_v_nombre"
                         title="Ingresa el nombre del producto que deseas registrar" data-vv-as="nombre del producto"
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
                       title="Código interno del producto" data-vv-as="código"
                       v-model="producto.v_codigo" v-validate="'required|min:2|max:255|alpha_num'">
                <span v-show="errors.has('v_codigo')"
                      class="help-block text-center">{{ errors.first('v_codigo')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-3">
              <div :class="(!errors.first('n_precio'))?'form-group':'form-group has-error'">
                <label for="c_n_precio">Precio</label>
                <input placeholder="Precio del producto" name="n_precio" type="text" class="form-control"
                        data-placement="left" required id="c_n_precio"
                       title="Indica el precio actual de tu producto" data-vv-as="precio"
                       v-model="producto.n_precio" v-validate="'required|min:1|max:999999999|decimal:2'">
                <span v-show="errors.has('n_precio')"
                      class="help-block text-center">{{ errors.first('n_precio')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-3">
              <div :class="(!errors.first('n_existencia'))?'form-group':'form-group has-error'">
                <label for="c_n_existencia">Existencia</label>
                <input placeholder="Existencia actual del producto" name="n_existencia" type="text"
                       class="form-control" data-vv-as="existencia"
                        data-placement="left" required id="c_n_existencia"
                       title="Indica la cantidad de existencia disponible que posees sobre el producto"
                       v-model="producto.n_existencia" v-validate="'required|min:1|max:999999999|numeric'">
                <span v-show="errors.has('n_existencia')"
                      class="help-block text-center">{{ errors.first('n_existencia')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-3">
              <div :class="(!errors.first('n_stock_min'))?'form-group':'form-group has-error'">
                <label for="c_n_stock_min">Stock Mínimo</label>
                <input placeholder="Stock Mínimo" name="n_stock_min" type="text" class="form-control"
                        data-placement="left" required id="c_n_stock_min"
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
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div :class="(!errors.first('v_resena'))?'form-group':'form-group has-error'">
                <label for="v_resena">Reseña</label>
                <textarea name="v_resena" id="v_resena" class="form-control" v-model="producto.v_resena"
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
                    <label for="n_posee-descuento">
                      <input type="checkbox" id="n_posee-descuento" v-model="producto.b_descuento"> ¿Poseé descuentos?
                    </label>
                  </div>
                  <template v-if="producto.b_descuento">
                    <div class="contendor-input-descuento">
                      <div :class="(!errors.first('n_porcentaje_descuento'))?'form-group':'form-group has-error'">
                        <label for="porcentaje_descuento">% de descuento</label>
                        <input type="number" id="porcentaje_descuento" class="form-control" min="1" max="100"
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
          <div class="row">
            <div class="col-xs-12">
              <label for="v_descripcion">Descripción</label>
              <vue-editor v-model="producto.v_descripcion" :editorToolbar="customToolbar"
                          placeholder="Descripción del Producto"></vue-editor>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 margin-top-dragdrop-container">
              <label for="c_dropzone">Imagenes del Producto</label>
              <vue-dropzone ref="myVueDropzone" id="c_dropzone" :options="dropzoneOptions"
                            v-on:vdropzone-success="obtenerImagene"></vue-dropzone>
            </div>
          </div>
        </div>
      </template>
      <!--TODO: Cuando no hay catalogo en la categoria-->
      <template v-else>
        <div class="row">
          <div class="row" v-show="!hayCatalogos">
            <div class="col-xs-12" align="center">
              <h4 class="font-green" style="color: green;">
                No hay productos en esa categoría registrados en nuestro catalogo, sé el primero!</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-8">
              <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
                <label for="v_nombre">Nombre</label>
                <input placeholder="Nombre del Producto" name="v_nombre" type="text" class="form-control"
                        data-placement="left" required id="v_nombre"
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
                        data-placement="left" required id="v_codigo"
                       title="Código interno del producto" data-vv-as="código"
                       v-model="producto.v_codigo" v-validate="'required|min:2|max:255|alpha_num'">
                <span v-show="errors.has('v_codigo')"
                      class="help-block text-center">{{ errors.first('v_codigo')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-3">
              <div :class="(!errors.first('n_precio'))?'form-group':'form-group has-error'">
                <label for="n_precio">Precio</label>
                <input placeholder="Precio del producto" name="n_precio" type="text" class="form-control"
                        data-placement="left" required id="n_precio"
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
                        data-placement="left" required id="n_existencia"
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
                        data-placement="left" required id="n_stock_min"
                       title="Especifica la cantidad mínimo de existencia que debe existir de tu producto en la plataforma"
                       data-vv-as="stock mínimo"
                       v-model="producto.n_stock_min" v-validate="'required|min:1|max:999999999|numeric'">
                <span v-show="errors.has('n_stock_min')"
                      class="help-block text-center">{{ errors.first('n_stock_min')}}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-3">
              <div class="form-group">
                <label for="n_tipo">Tipo</label>
                <select id="n_tipo" v-model="producto.v_tipo" class="form-control">
                  <option value="nuevo">Nuevo</option>
                  <option value="usado">Usado</option>
                </select>
              </div>
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
                      <input type="checkbox" id="posee-descuento" v-model="producto.b_descuento"> ¿Poseé descuento?
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
          <div class="row">
            <div class="col-xs-12">
              <label for="v_descripcion">Descripción</label>
              <vue-editor id="v_descripcion" v-model="producto.v_descripcion" :editorToolbar="customToolbar"
                          placeholder="Descripción del Producto"></vue-editor>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 margin-top-dragdrop-container">
              <label for="v_descripcion">Imagenes del Producto</label>
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                            v-on:vdropzone-success="obtenerImagene"></vue-dropzone>
            </div>
          </div>
        </div>
      </template>
    </tab-content>
    <tab-content title="Características del Producto" icon="fa fa-search">
      <loader v-if="cargandoData"></loader>
      <!--Cuando hay caracteristicas en la categoria-->
      <!--<template v-else-if="hayCaracteristicas && !cargandoData">
        <div class="row">
          <div class="table-responsive no-padding">
            <table class="table table-hover">
              <caption class="text-center"><h4>Caracteristicas por defecto</h4></caption>
              <tbody>
                <tr>
                  <th class="text-center">Nombre</th>
                  <th class="text-center">Valor</th>
                  <th class="text-center">Opciones</th>
                </tr>
                <tr v-for="(caracteristica,i) in caracteristicasApi">
                  <td class="text-center">{{caracteristica.v_nombre}}</td>
                  <td class="text-center">
                    <input type="text" class="form-control" placeholder="Ingrese el valor de la característica"
                           :id="'inputCaracteristica'+i" v-if="caracteristica.v_tipo === 'unica'">
                    &lt;!&ndash;<model-select :options="tipos" id="v_tipo" v-model="v_tipo" class="form-control" v-else

                                  data-placement="left" title="Selecciona el tipo"
                                  required>
                    </model-select>&ndash;&gt;
                    <multi-select :options="caracteristica.valores_caracteristicas"
                                  :selected-options="caracteristica.valores_caracteristicas"
                                  placeholder="Seleccion"
                                  v-else>
                    </multi-select>

                  </td>

                  <td>
                    &lt;!&ndash;<button class="btn btn-primary" :id="'btnCaracteristica'+i"
                            v-on:click="llenarCaracteristica(caracteristica,i)"><i
                      class="fa fa-check" aria-hidden="true"></i></button>
                    <button class="btn btn-warning" v-on:click="reiniciarCaracteristica(caracteristica,i)"><i
                      class="fa fa-refresh" aria-hidden="true"></i></button>&ndash;&gt;
                    <button class="btn btn-warning"
                            v-on:click="editarCaracteristica(caracteristica, true)">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-danger"
                            v-on:click="eliminarCaracteristica(caracteristica.nombre, 'unica', true)">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        &lt;!&ndash;<div class="row">
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
                     v-validate="'required|min:1|max:255'">
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
        </div>&ndash;&gt;
      </template>-->
      <!--Cuando no hay caracteristicas en la categoria-->
      <template v-else>
        <div class="row" v-show="!hayCaracteristicas">
          <div class="col-xs-12" align="center">
            <h4 class="font-green" style="color:green;">
              No existen características sobre esa categoría, sé el primero!
            </h4>
          </div>
        </div>
      </template>
        <div class="row">
          <div class="col-xs-12 col-md-4">
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
          <div class="col-xs-12 col-md-4">
            <div :class="(!errors.first('v_tipo'))?'form-group':'form-group has-error'">
              <div class="form-group">
                <label for="v_nombre">Tipo Caracteristica</label>
                <model-select :options="tipos" id="v_tipo" v-model="v_tipo" class="form-control"

                              data-placement="left" title="Selecciona el tipo"
                              required>
                </model-select>
                <span v-show="errors.has('v_tipo')" class="help-block">{{ errors.first('v_tipo')}}</span>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-4"  v-if="mostrarMultiple">
            <div class="col-xs-6 col-md-6">
              <div :class="(!errors.first('valor_caracteristica'))?'form-group':'form-group has-error'">
                <label for="valor_caracteristica">Valor</label>
                <input placeholder="Valor" name="valor_caracteristica" type="text"
                       class="form-control" v-model="valor_caracteristica"
                        data-placement="left" id="valor_caracteristica"
                       title="Ingresa el valor de la caracteristica que deseas registrar" data-vv-as="valor"
                       v-validate="'required|min:1|max:255'">
                <span v-show="errors.has('valor_caracteristica')"
                      class="help-block">{{ errors.first('valor_caracteristica') }}</span>
              </div>
            </div>
            <div class="col-xs-6 col-md-1 text-left">
              <v-btn type="button" color="primary" :disabled="!deshabilitarButtonPlus2"
                      v-on:click="crearValores">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <span>Agregar Valor</span>
              </v-btn>
            </div>

          </div>
          <div class="col-xs-12 col-md-4" v-else>
            <div :class="(!errors.first('valor_caracteristica'))?'form-group':'form-group has-error'">
              <label for="valor_caracteristica">Valor</label>
              <input placeholder="Valor" name="valor_caracteristica" type="text"
                     class="form-control" v-model="valor_caracteristica"
                      data-placement="left" required id="valor_caracteristica"
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
                <td class="text-center">{{item.valor}}</td>
                <td class="text-center">
                  <v-btn color="error"
                          v-on:click="eliminarValor(item.valor)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-xs-12 col-md-12 text-center">
            <v-btn color="success" :disabled="!deshabilitarButtonPlus"
                    v-on:click="crearCaracteristica">
              <i class="fa fa-plus pull-left" aria-hidden="true"></i>
              <span>Agregar Caracteristica</span>
            </v-btn>
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

                    <v-btn color="primary"
                            v-on:click="editarCaracteristica(caracteristica)">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </v-btn>
                    <v-btn color="error"
                            v-on:click="eliminarCaracteristica(caracteristica.nombre,'unica')">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </v-btn>
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
                <td class="text-center"><span v-for="item in caracMult.valores">{{item.valor}} <br></span> </td>
                <td class="text-center">
                  <v-btn color="primary"
                          v-on:click="editarCaracteristica(caracMult)">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </v-btn>
                  <v-btn color="error"
                          v-on:click="eliminarCaracteristica(caracMult.nombre, 'multiple')">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
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
        <wizard-button v-else @click.native="registrarProducto" class="wizard-footer-right finish-button"
                       :style="props.fillButtonStyle" :disabled="!registrar" id="submitButton"
                       data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando">Registrar
        </wizard-button>
      </div>
    </template>
  </form-wizard>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {ModelSelect, MultiSelect } from 'vue-search-select';
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
        valores: [],
        tipos:  [{text: 'unica', value: 'unica'}, {text: 'multiple', value: 'multiple'}],
        v_tipo: {
          value: "",
          text: ""
        },
        options: [
          { value: '1', text: 'aa' + ' - ' + '1' },
          { value: '2', text: 'ab' + ' - ' + '2' },
          { value: '3', text: 'bc' + ' - ' + '3' },
          { value: '4', text: 'cd' + ' - ' + '4' },
          { value: '5', text: 'de' + ' - ' + '5' }
        ],

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
        producto: {
          v_nombre: null,
          v_descripcion: null,
          v_resena: null,
          v_codigo: null,
          n_precio: null,
          n_existencia: null,
          n_stock_min: null,
          v_tipo: 'nuevo',
          b_descuento: false,
          n_porcentaje_descuento: 1,
          n_precio_descuento: 0
        },
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 1.5,
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
        catalogo: null,
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
      crearValores() {
        this.valores.push({
          valor: this.valor_caracteristica
        });
        this.valor_caracteristica = null;
      },
      eliminarValor(valor) {
        this.valores = helpers.eliminarArrayObjetos(this.valores, 'valor', valor);
      },
      totalDescuento(precio, porcentaje) {
        return precio * porcentaje / 100;
      },
      getAppService() {
        return AppService;
      },
      crearCaracteristica() {
        this.eliminarCaracteristica(this.nombre_caracteristica, this.v_tipo.value, false);

        if(this.v_tipo.value ==='unica'){
          this.caracteristicas.push({
            indice: this.caracteristicas.length,
            tipo: this.v_tipo.value,
            nombre: this.nombre_caracteristica,
            valor: this.valor_caracteristica
          });
        }
        else if(this.v_tipo.value ==='multiple'){
          this.caracteristicasMultiples.push({
            indice: this.caracteristicasMultiples.length,
            tipo: this.v_tipo.value,
            nombre: this.nombre_caracteristica,
            valores: this.valores
          });
        }
        this.nombre_caracteristica = null;
        this.caracteristica_requerida = null;
        this.valor_caracteristica = null;
        this.registrarWizard = true;
        this.valores = [];
      },
      editarCaracteristica(caracteristica, api = false)
      {
        if(api)
        {
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
            this.valores = caracteristica.valores;
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
            this.v_tipo.value = caracteristica.tipo;
            this.v_tipo.text = caracteristica.tipo;
            this.valores = caracteristica.valores;
          }
          this.flag = false;
        }

      },
      eliminarCaracteristica(valor, tipo = 'unica', api = false) {
        if(api)
        {
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
        if (this.producto.v_nombre !== null && this.producto.v_descripcion !== null && this.producto.v_codigo !== null &&
          this.producto.n_precio !== null && this.producto.n_existencia !== null && this.producto.n_stock_min !== null)
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
      registrarProducto() {
        let indiceCaracteristicas = 0;
        let indiceCaracteristicasMultiples = 0;
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
            formData.append('caracteristicaTipo' + indiceCaracteristicas, this.caracteristicas[i].tipo);
            indiceCaracteristicas++;
          }
        }
        if (this.caracteristicasMultiples.length >= 1) {
         let valores = []
          for (let i = 0; i < this.caracteristicasMultiples.length; i++) {
            valores = [];
            this.caracteristicasMultiples[i].valores.forEach(function(item) {
              console.log(item);
              valores.push(item.valor);
            });

            /*for(let j = 0; j < this.caracteristicasMultiples[i].valores.length; j++)
            {
              valores.push(this.caracteristicasMultiples[i].valores[j]);
            }*/
            formData.append('caracteristicaNombre' + indiceCaracteristicas, this.caracteristicasMultiples[i].nombre);
            formData.append('caracteristicaValor' + indiceCaracteristicas, valores);
            formData.append('caracteristicaTipo' + indiceCaracteristicas, this.caracteristicasMultiples[i].tipo);
            indiceCaracteristicas++;
          }
        }
        if (this.hayCaracteristicas) {
          for (let i = 0; i < this.caracteristicasApi.length; i++) {
            formData.append('caracteristicaNombre' + indiceCaracteristicas, this.caracteristicasApi[i].v_nombre);
            formData.append('caracteristicaValor' + indiceCaracteristicas, this.caracteristicasApi[i].v_valor);
            formData.append('caracteristicaTipo' + indiceCaracteristicas, this.caracteristicas[i].tipo);
            indiceCaracteristicas++;
          }
        }
        if (this.catalogo) {
          formData.append('v_nombre', this.catalogo.v_nombre);
          formData.append('id_m_catalogos', this.catalogo.id_m_catalogos);
          formData.append('catalogo', true);
        }
        else {
          formData.append('v_nombre', this.producto.v_nombre);
          formData.append('catalogo', false);
        }
        formData.append('v_descripcion', this.producto.v_descripcion);
        formData.append('v_resena', this.producto.v_resena);
        formData.append('b_descuento', this.producto.b_descuento);
        formData.append('n_porcentaje_descuento', this.producto.n_porcentaje_descuento);
        formData.append('n_precio_descuento', this.producto.n_precio_descuento);
        formData.append('v_codigo', this.producto.v_codigo);
        formData.append('n_precio', this.producto.n_precio);
        formData.append('n_existencia', this.producto.n_existencia);
        formData.append('n_stock_min', this.producto.n_stock_min);
        formData.append('v_tipo', 'unica');
        formData.append('id_m_categorias_fk', this.categoria.value);
        formData.append('nombre_categorias_fk', this.categoria.text);
        formData.append('id_m_categorias_principal_fk', this.categoriaPadre.id);
        formData.append('nombre_categorias_principal_fk', this.categoriaPadre.texto);
        formData.append('id_m_tiendas_fk', this.tienda.value);
        formData.append('v_tipo', this.producto.v_tipo);
        if (this.catalogoNuevo)
          formData.append('utilizarMismasImagenes', true);
        else
          formData.append('utilizarMismasImagenes', this.utilizarMismasImagenes);
        let yo = this;
        this.postMethodWithBearer(this.urlsApi().endpointProductosRegistrar, formData, token)
          .then(response => {
            boton_registrar.button('reset');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            $('#modal').modal('hide');
            yo.$emit('store');
          }, errors => this.mapErrorsResponses(this, errors));
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
                  let data = response.body;
                  //yo.hayCaracteristicas = true;
                  yo.registrarWizard = true;
                  data.forEach( item => {
                    if (item.v_tipo === 'unica') {
                      yo.caracteristicas.push({
                        indice: this.caracteristicas.length,
                        tipo: item.v_tipo,
                        nombre: item.v_nombre,
                        valor: item.v_valor
                      });
                    }
                    else if (item.v_tipo === 'multiple') {
                      this.caracteristicasMultiples.push({
                        indice: this.caracteristicasMultiples.length,
                        tipo: item.v_tipo,
                        nombre: item.v_nombre,
                        valores: item.valores_caracteristicas
                      });
                    }
                  })
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
      calcularDescuento() {
        let total = this.producto.n_precio - this.totalDescuento(this.producto.n_precio, this.producto.n_porcentaje_descuento);
        this.producto.n_precio_descuento = total;
        return this.formatInvoice(total);
      },
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
      },
      deshabilitarButtonPlus2() {
        return this.valor_caracteristica !== null;
      },
      mostrarMultiple() {
        console.log('this.v_tipo.value')
        return this.v_tipo.value === 'multiple';
      },
    }),
    components: {ModelSelect, MultiSelect, VueEditor, vueDropzone: vue2Dropzone, Loader},
  }
</script>

<style scoped>
/* Estilos específicos para el form-wizard para asegurar que se carguen en producción */

/* Estilos del wizard principal */
.vue-form-wizard {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* Header del wizard */
.vue-form-wizard .wizard-header {
  text-align: center;
  padding: 20px 0;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.vue-form-wizard .wizard-title {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.vue-form-wizard .wizard-subtitle {
  font-size: 16px;
  color: #7f8c8d;
  font-weight: 400;
}

/* Navegación del wizard */
.vue-form-wizard .wizard-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background: #ffffff;
  border-bottom: 1px solid #e1e8ed;
}

.vue-form-wizard .wizard-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  position: relative;
}

.vue-form-wizard .wizard-nav-item .wizard-nav-link {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ecf0f1;
  color: #95a5a6;
  font-size: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.vue-form-wizard .wizard-nav-item.active .wizard-nav-link {
  background: #fe7501;
  color: #ffffff;
  border-color: #e67e22;
  transform: scale(1.1);
}

.vue-form-wizard .wizard-nav-item.completed .wizard-nav-link {
  background: #27ae60;
  color: #ffffff;
  border-color: #2ecc71;
}

.vue-form-wizard .wizard-nav-item .wizard-nav-text {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #7f8c8d;
  text-align: center;
  max-width: 120px;
}

.vue-form-wizard .wizard-nav-item.active .wizard-nav-text {
  color: #fe7501;
  font-weight: 600;
}

.vue-form-wizard .wizard-nav-item.completed .wizard-nav-text {
  color: #27ae60;
  font-weight: 600;
}

/* Líneas conectoras entre pasos */
.vue-form-wizard .wizard-nav-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 30px;
  left: 50px;
  width: 40px;
  height: 2px;
  background: #ecf0f1;
  z-index: 1;
}

.vue-form-wizard .wizard-nav-item.completed:not(:last-child)::after {
  background: #27ae60;
}

/* Contenido del wizard */
.vue-form-wizard .wizard-content {
  padding: 30px;
  background: #ffffff;
  min-height: 300px;
}

/* Footer del wizard */
.vue-form-wizard .wizard-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: #f8f9fa;
  border-top: 1px solid #e1e8ed;
  border-radius: 0 0 8px 8px;
}

.vue-form-wizard .wizard-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.vue-form-wizard .wizard-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.vue-form-wizard .wizard-btn-prev {
  background: #95a5a6;
  color: #ffffff;
}

.vue-form-wizard .wizard-btn-prev:hover:not(:disabled) {
  background: #7f8c8d;
}

.vue-form-wizard .wizard-btn-next {
  background: #fe7501;
  color: #ffffff;
}

.vue-form-wizard .wizard-btn-next:hover:not(:disabled) {
  background: #e67e22;
}

.vue-form-wizard .wizard-btn-finish {
  background: #27ae60;
  color: #ffffff;
}

.vue-form-wizard .wizard-btn-finish:hover:not(:disabled) {
  background: #2ecc71;
}

/* Iconos del wizard */
.wizard-icon {
  font-size: 16px;
}

/* Estilos específicos para los pasos */
.tab-content {
  padding: 20px 0;
}

.tab-content .breadcrumb {
  background: transparent;
  padding: 0;
  margin-bottom: 20px;
}

.tab-content .breadcrumb li a {
  color: #fe7501;
  cursor: pointer;
  text-decoration: none;
}

.tab-content .breadcrumb li a:hover {
  color: #e67e22;
  text-decoration: underline;
}

/* Estilos para las cajas de productos */
.shadow-box-products {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.shadow-box-products:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Estilos para los botones de Vuetify */
.v-btn {
  border-radius: 6px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-btn--info {
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}

.v-btn--primary {
  background-color: #007bff !important;
  border-color: #007bff !important;
}

.v-btn--success {
  background-color: #28a745 !important;
  border-color: #28a745 !important;
}

.v-btn--warning {
  background-color: #ffc107 !important;
  border-color: #ffc107 !important;
  color: #212529 !important;
}

.v-btn--error {
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
}

/* Estilos para el loader */
.loader {
  text-align: center;
  padding: 40px;
}

/* Estilos para los formularios */
.form-group {
  margin-bottom: 20px;
}

.form-control {
  border-radius: 6px;
  border: 2px solid #e1e8ed;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #fe7501;
  box-shadow: 0 0 0 3px rgba(254, 117, 1, 0.1);
}

/* Estilos para la paginación */
.pagination {
  margin: 20px 0;
}

.pagination li a {
  color: #fe7501;
  border-color: #e1e8ed;
}

.pagination li.active a {
  background-color: #fe7501;
  border-color: #fe7501;
}

.pagination li a:hover {
  color: #e67e22;
  border-color: #e67e22;
}

/* Estilos para las imágenes de productos */
.img-product {
  height: 150px;
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
}

/* Estilos para las cajas de características */
.box-hipertienda {
  border-radius: 8px;
  border: 1px solid #e1e8ed;
  background: #ffffff;
}

.box-hipertienda .box-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e1e8ed;
  padding: 15px;
  border-radius: 8px 8px 0 0;
}

.box-hipertienda .box-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.box-hipertienda .box-body {
  padding: 20px;
}

/* Estilos para los enlaces de categorías */
.categories-links {
  color: #fe7501;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
}

.categories-links:hover {
  color: #e67e22;
  text-decoration: underline;
}

/* Estilos para los mensajes de error */
.help-block {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
}

.form-group.has-error .form-control {
  border-color: #dc3545;
}

/* Estilos para los botones de características */
.btn-caracteristica {
  margin: 5px;
  border-radius: 4px;
}

/* Estilos para el modal del wizard */
.modal-content {
  border-radius: 8px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e1e8ed;
  border-radius: 8px 8px 0 0;
}

.modal-title {
  color: #2c3e50;
  font-weight: 600;
}

.modal-footer {
  background: #f8f9fa;
  border-top: 1px solid #e1e8ed;
  border-radius: 0 0 8px 8px;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .vue-form-wizard .wizard-nav {
    flex-direction: column;
    gap: 20px;
  }
  
  .vue-form-wizard .wizard-nav-item:not(:last-child)::after {
    display: none;
  }
  
  .vue-form-wizard .wizard-content {
    padding: 20px 15px;
  }
  
  .vue-form-wizard .wizard-card-footer {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
