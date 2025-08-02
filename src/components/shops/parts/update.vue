<template>
  <div class="shop-update-modal">
    <loader v-if="!peticionesCompletas"></loader>
    <form v-on:submit.prevent="actualizar" v-else>
      <div class="form-row mb-3">
        <div class="col-md-4 mb-3">
          <label for="v_pais">País</label>
          <model-select :options="paises" id="v_pais" v-model="pais" class="form-control"
                         v-on:input="seleccionarPais"
                        data-placement="left" title="Selecciona el país en que se encuentra la tienda"
                        placeholder="Selecciona un país"
                        required>
          </model-select>
        </div>
        <div class="col-md-4 mb-3">
          <label for="v_provincia">Provincia</label>
          <model-select :options="provincias" id="v_provincia" v-model="provincia" class="form-control"
                         v-on:input="seleccionarProvincia"
                        data-placement="left" title="Selecciona la provincia"
                        placeholder="Selecciona una provincia"
                        required>
          </model-select>
        </div>
        <div class="col-md-4 mb-3">
          <label for="v_ciudad">Ciudad</label>
          <model-select :options="ciudades" id="v_ciudad" v-model="ciudad" class="form-control"
                        data-placement="left" title="Selecciona la ciudad"
                        placeholder="Selecciona una ciudad"
                        required>
          </model-select>
        </div>
      </div>
      <div class="form-row mb-3">
        <div class="col-md-4 mb-3">
          <label for="v_tipo_persona">Tipo de Registro</label>
          <model-select v-on:input="seleccionarTipoEmpresa" :options="tipoPersonas" id="v_tipo_persona" v-model="v_tipo_persona" class="form-control"
                        data-placement="left"
                        title="Selecciona el tipo de Persona"
                        placeholder="Selecciona tipo de registro"
                        required>
          </model-select>
        </div>
        <div class="col-md-4 mb-3">
          <label for="v_tipo_documento">Tipo de Documento</label>
          <model-select :options="tipo_documentos" id="v_tipo_documento" v-model="tipo_documento" class="form-control"
                        data-placement="left"
                        title="Selecciona el tipo de documento de identificación que posee la tienda"
                        placeholder="Selecciona tipo de documento"
                        required>
          </model-select>
        </div>
        <div class="col-md-4 mb-3">
          <label for="v_documento">Documento</label>
          <input placeholder="Número de documento" name="v_documento" type="text" class="form-control"
                  data-placement="left" required id="v_documento"
                 title="Ingresa el número de documento de identificación"
                 data-vv-as="documento de identificación"
                 v-model="shop.v_documento" v-validate="'required|min:3|max:25|numeric'">
          <span v-show="errors.has('v_documento')"
                class="help-block text-center">{{ errors.first('v_documento')}}</span>
        </div>
      </div>
      <div class="form-row mb-3">
        <div class="col-md-4 mb-3">
          <label for="v_nombre">Nombre de la Tienda</label>
          <input placeholder="Nombre de la Tienda" name="v_nombre" type="text" class="form-control"
                  data-placement="left" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="nombre de la tienda" v-model="shop.v_nombre" required id="v_nombre"
                 title="Ingresa el nombre de la tienda" v-on:change="nombreActualizar">
          <span v-show="errors.has('v_nombre')"
                class="help-block text-center">{{ errors.first('v_nombre')}}</span>
        </div>
        <div class="col-md-4 mb-3">
          <label for="v_telefono_principal">Teléfono Principal</label>
          <input placeholder="Teléfono principal" name="v_telefono_principal" type="text" class="form-control"
                  data-placement="left" id="v_telefono_principal"
                 title="Ingresa el teléfono" data-vv-as="teléfono" v-on:change="telefonoPrincipal"
                 v-model="shop.v_telefono_principal" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_principal')"
                class="help-block text-center">{{ errors.first('v_telefono_principal')}}</span>
        </div>
        <div class="col-md-4 mb-3">
          <label for="v_telefono_secundario">Teléfono Secundario</label>
          <input placeholder="Teléfono Secundario" name="v_telefono_secundario" type="text" class="form-control"
                  data-placement="left" id="v_telefono_secundario"
                 title="Ingresa el teléfono" data-vv-as="teléfono" v-on:change="telefonoSecundario"
                 v-model="shop.v_telefono_secundario" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_secundario')"
                class="help-block text-center">{{ errors.first('v_telefono_secundario')}}</span>
        </div>
      </div>
      <div class="form-row mb-3">
        <div class="col-md-6 mb-3">
          <label for="v_asesor">Asesor</label>
          <model-select :options="usuarios_asesores" v-model="usuario_asesor" class="form-control"
                         id="v_asesor"
                        data-placement="left" title="Selecciona el asesor encargado de la tienda"
                        placeholder="Selecciona asesor"
                        required>
          </model-select>
        </div>
        <div class="col-md-6 mb-3">
          <label for="v_cliente">Cliente</label>
          <model-select :options="usuarios_clientes" v-model="usuario_cliente" class="form-control"
                         id="v_cliente"
                        data-placement="left" title="Selecciona el cliente dueño o representante de la tienda"
                        placeholder="Selecciona cliente"
                        required>
          </model-select>
        </div>
      </div>
      <div class="form-row mb-3">
        <div class="col-md-12 mb-3">
          <label for="v_direccion">Dirección</label>
          <input placeholder="Dirección" name="v_direccion" type="text" class="form-control"
                  data-placement="left" required id="v_direccion" v-on:change="direccionPrincipal"
                 title="Ingresa la dirección principal de la tienda" data-vv-as="dirección"
                 v-model="shop.v_direccion" v-validate="'required|min:5|max:255'">
          <span v-show="errors.has('v_direccion')"
                class="help-block text-center">{{ errors.first('v_direccion')}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-center mt-4 mb-2">
          <h5><strong>Horario de Atención de la Tienda</strong></h5>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-md-3 text-center">
          <div class="contenedor-dia-semana">
            <label>Lunes</label>
            <input type="time" class="form-control" placeholder="Desde" v-model="shop.v_horario_lunes_tienda_desde"
                   name="horario_lunes_tienda_desde" id="horario_lunes_tienda_desde"
                   :disabled="shop.b_horario_lunes_tienda_no_laborable">
            <label for="laborable-lunes">
              <input type="checkbox" id="laborable-lunes" v-model="shop.b_horario_lunes_tienda_no_laborable"> No laborable
            </label>
            <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_lunes_tienda_hasta"
                   name="horario_lunes_tienda_hasta" id="horario_lunes_tienda_hasta"
                   :disabled="shop.b_horario_lunes_tienda_no_laborable">
            <span v-show="errors.has('horario_lunes_tienda_desde')"
                  class="error-formulario">{{ errors.first('horario_lunes_tienda_desde')}}</span><br>
            <span v-show="errors.has('horario_lunes_tienda_hasta')"
                  class="error-formulario">{{ errors.first('horario_lunes_tienda_hasta')}}</span>
          </div>
        </div>
        <div class="col-xs-6 col-md-3 text-center">
          <div class="contenedor-dia-semana">
            <label>Martes</label>
            <input type="time" class="form-control" placeholder="Desde" v-model="shop.v_horario_martes_tienda_desde"
                   name="horario_martes_tienda_desde" id="horario_martes_tienda_desde"
                   :disabled="shop.b_horario_martes_tienda_no_laborable">
            <label for="laborable-martes">
              <input type="checkbox" id="laborable-martes" v-model="shop.b_horario_martes_tienda_no_laborable"> No
              laborable
            </label>
            <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_martes_tienda_hasta"
                   name="horario_martes_tienda_hasta" id="horario_martes_tienda_hasta"
                   :disabled="shop.b_horario_martes_tienda_no_laborable">
            <span v-show="errors.has('horario_martes_tienda_desde')"
                  class="error-formulario">{{ errors.first('horario_martes_tienda_desde')}}</span><br>
            <span v-show="errors.has('horario_martes_tienda_hasta')"
                  class="error-formulario">{{ errors.first('horario_martes_tienda_hasta')}}</span>
          </div>
        </div>
        <div class="col-xs-6 col-md-3 text-center">
          <div class="contenedor-dia-semana">
            <label>Miercoles</label>
            <input type="time" class="form-control" placeholder="Desde" v-model="shop.v_horario_miercoles_tienda_desde"
                   name="horario_miercoles_tienda_desde" id="horario_miercoles_tienda_desde"
                   :disabled="shop.b_horario_miercoles_tienda_no_laborable">
            <label for="laborable-miercoles">
              <input type="checkbox" id="laborable-miercoles" v-model="shop.b_horario_miercoles_tienda_no_laborable"> No
              laborable
            </label>
            <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_miercoles_tienda_hasta"
                   name="horario_miercoles_tienda_hasta" id="horario_miercoles_tienda_hasta"
                   :disabled="shop.b_horario_miercoles_tienda_no_laborable">
            <span v-show="errors.has('horario_miercoles_tienda_desde')"
                  class="error-formulario">{{ errors.first('horario_miercoles_tienda_desde')}}</span><br>
            <span v-show="errors.has('horario_miercoles_tienda_hasta')"
                  class="error-formulario">{{ errors.first('horario_miercoles_tienda_hasta')}}</span>
          </div>
        </div>
        <div class="col-xs-6 col-md-3 text-center">
          <div class="contenedor-dia-semana">
            <label>Jueves</label>
            <input type="time" class="form-control" placeholder="Desde" v-model="shop.v_horario_jueves_tienda_desde"
                   name="horario_jueves_tienda_desde" id="horario_jueves_tienda_desde"
                   :disabled="shop.b_horario_jueves_tienda_no_laborable">
            <label for="laborable-jueves">
              <input type="checkbox" id="laborable-jueves" v-model="shop.b_horario_jueves_tienda_no_laborable"> No
              laborable
            </label>
            <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_jueves_tienda_hasta"
                   name="horario_jueves_tienda_hasta" id="horario_jueves_tienda_hasta"
                   :disabled="shop.b_horario_jueves_tienda_no_laborable">
            <span v-show="errors.has('horario_jueves_tienda_desde')"
                  class="error-formulario">{{ errors.first('horario_jueves_tienda_desde')}}</span><br>
            <span v-show="errors.has('horario_jueves_tienda_hasta')"
                  class="error-formulario">{{ errors.first('horario_jueves_tienda_hasta')}}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-md-3 col-md-offset-2 text-center">
          <div class="contenedor-dia-semana">
            <label>Viernes</label>
            <input type="time" class="form-control" placeholder="Desde" v-model="shop.v_horario_viernes_tienda_desde"
                   name="horario_viernes_tienda_desde" id="horario_viernes_tienda_desde"
                   :disabled="shop.b_horario_viernes_tienda_no_laborable">
            <label for="laborable-viernes">
              <input type="checkbox" id="laborable-viernes" v-model="shop.b_horario_viernes_tienda_no_laborable"> No
              laborable
            </label>
            <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_viernes_tienda_hasta"
                   name="horario_viernes_tienda_hasta" id="horario_viernes_tienda_hasta"
                   :disabled="shop.b_horario_viernes_tienda_no_laborable">
            <span v-show="errors.has('horario_viernes_tienda_desde')"
                  class="error-formulario">{{ errors.first('horario_viernes_tienda_desde')}}</span><br>
            <span v-show="errors.has('horario_viernes_tienda_hasta')"
                  class="error-formulario">{{ errors.first('horario_viernes_tienda_hasta')}}</span>
          </div>
        </div>
        <div class="col-xs-6 col-md-3 text-center">
          <div class="contenedor-dia-semana">
            <label>Sabado</label>
            <input type="time" class="form-control" placeholder="Desde" v-model="shop.v_horario_sabado_tienda_desde"
                   name="horario_sabado_tienda_desde" id="horario_sabado_tienda_desde"
                   :disabled="shop.b_horario_sabado_tienda_no_laborable">
            <label for="laborable-sabado">
              <input type="checkbox" id="laborable-sabado" v-model="shop.b_horario_sabado_tienda_no_laborable"> No
              laborable
            </label>
            <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_sabado_tienda_hasta"
                   name="horario_sabado_tienda_hasta" id="horario_sabado_tienda_hasta"
                   :disabled="shop.b_horario_sabado_tienda_no_laborable">
            <span v-show="errors.has('horario_sabado_tienda_desde')"
                  class="error-formulario">{{ errors.first('horario_sabado_tienda_desde')}}</span><br>
            <span v-show="errors.has('horario_sabado_tienda_hasta')"
                  class="error-formulario">{{ errors.first('horario_sabado_tienda_hasta')}}</span>
          </div>
        </div>
        <div class="col-xs-6 col-md-3 text-center">
          <div class="contenedor-dia-semana">
            <label>Domingo</label>
            <input type="time" class="form-control" placeholder="Desde" v-model="shop.v_horario_domingo_tienda_desde"
                   name="horario_domingo_tienda_desde" id="horario_domingo_tienda_desde"
                   :disabled="shop.b_horario_domingo_tienda_no_laborable">
            <label for="laborable-domingo">
              <input type="checkbox" id="laborable-domingo" v-model="shop.b_horario_domingo_tienda_no_laborable"> No
              laborable
            </label>
            <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_domingo_tienda_hasta"
                   name="horario_domingo_tienda_hasta" id="horario_domingo_tienda_hasta"
                   :disabled="shop.b_horario_domingo_tienda_no_laborable">
            <span v-show="errors.has('horario_domingo_tienda_desde')"
                  class="error-formulario">{{ errors.first('horario_domingo_tienda_desde')}}</span><br>
            <span v-show="errors.has('horario_domingo_tienda_hasta')"
                  class="error-formulario">{{ errors.first('horario_domingo_tienda_hasta')}}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div :class="(!errors.first('v_descripcion'))?'form-group':'form-group has-error'">
            <label for="v_descripcion">Descripción</label>
            <textarea class="form-control margen-textarea-modulo-tienda" id="v_descripcion" rows="3"
                      v-model="shop.v_descripcion"
                      name="v_descripcion" v-validate="'required|min:5|max:255'" data-vv-as="descripción"></textarea>
            <span v-show="errors.has('v_descripcion')"
                  class="help-block text-center">{{ errors.first('v_descripcion')}}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div :class="(!errors.first('v_resena'))?'form-group':'form-group has-error'">
            <label for="v_resena">Reseña</label>
            <textarea class="form-control margen-textarea-modulo-tienda" id="v_resena" rows="3" name="v_resena"
                      v-model="shop.v_resena"
                      v-validate="'required|min:5|max:50'" data-vv-as="reseña"></textarea>
            <span v-show="errors.has('v_resena')"
                  class="help-block text-center">{{ errors.first('v_resena')}}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div v-if="!shop.v_rut">
            <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_rut') }">
              <label for="v_rut">Imagen Rut</label>
              <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                     name="v_rut"
                     type="file"
                     v-on:change="onFileChangeRut"
                     data-vv-as="imagen rut"
                     accept="image/*"
                     id="v_rut">
              <span v-show="errors.has('v_rut')"
                    class="help-block text-center">{{ errors.first('v_rut')}}
              </span>
            </div>
          </div>
          <div align="center" class="container-imgs" v-else>
            <img :src="imageRut"
                 width="200" height="200"
                 class="img-responsive img-previsualizar">
            <v-btn color="error" type="button" @click.prevent="removeImageRut" class="btn btn-danger btn-block btn-flat">
              <i class="fa fa-trash pull-left" aria-hidden="true"></i>
              Quitar Imagen Rut
            </v-btn>
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div v-if="!shop.v_camara_comercio">
            <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_camara_comercio') }">
              <label for="v_camara_comercio">Imagen Camara Comercio</label>
              <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                     name="v_camara_comercio"
                     type="file"
                     v-on:change="onFileChangeCamaraComercio"
                     data-vv-as="imagen camara comercio"
                     accept="image/*"
                     id="v_camara_comercio">
              <span v-show="errors.has('v_camara_comercio')"
                    class="help-block text-center">{{ errors.first('v_camara_comercio')}}
              </span>
            </div>
          </div>
          <div align="center" class="container-imgs" v-else>
            <img :src="imageCamaraComercio"
                 width="200" height="200"
                 class="img-responsive img-previsualizar">
            <v-btn color="error" type="button" @click.prevent="removeImageCamaraComercio" class="btn btn-danger btn-block btn-flat">
              <i class="fa fa-trash pull-left" aria-hidden="true"></i>
              Quitar Imagen Camara Comercio
            </v-btn>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div v-if="!shop.v_contrato">
            <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_contrato') }">
              <label for="v_contrato">Imagen Contrato</label>
              <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                     name="v_contrato"
                     type="file"
                     v-on:change="onFileChangeContrato"
                     data-vv-as="imagen contrato"
                     accept="image/*"
                     id="v_contrato">
              <span v-show="errors.has('v_contrato')"
                    class="help-block text-center">{{ errors.first('v_contrato')}}
              </span>
            </div>
          </div>
          <div align="center" class="container-imgs" v-else>
            <img :src="imageContrato"
                 width="200" height="200"
                 class="img-responsive img-previsualizar">
            <v-btn color="error" type="button" @click.prevent="removeImageContrato" class="btn btn-danger btn-block btn-flat">
              <i class="fa fa-trash pull-left" aria-hidden="true"></i>
              Quitar Imagen Contrato
            </v-btn>
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div v-if="!shop.v_logo">
            <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_logo') }">
              <label for="v_logo">Imagen Logo</label>
              <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                     name="v_logo"
                     type="file"
                     v-on:change="onFileChangeLogo"
                     data-vv-as="imagen logo"
                     accept="image/*"
                     id="v_logo">
              <span v-show="errors.has('v_logo')"
                    class="help-block text-center">{{ errors.first('v_logo')}}
              </span>
            </div>
          </div>
          <div align="center" class="container-imgs" v-else>
            <img :src="imageLogo"
                 width="200" height="200"
                 class="img-responsive img-previsualizar">
            <v-btn color="error" type="button" @click.prevent="removeImageLogo" class="btn btn-danger btn-block btn-flat">
              <i class="fa fa-trash pull-left" aria-hidden="true"></i>
              Quitar Imagen Logo
            </v-btn>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12" align="center">
          <div v-if="!shop.v_portada">
            <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_portada') }">
              <label for="v_portada">Imagen Portada</label>
              <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                     name="v_portada"
                     type="file"
                     v-on:change="onFileChangePortada"
                     data-vv-as="imagen portada"
                     accept="image/*"
                     id="v_portada">
              <span v-show="errors.has('v_portada')"
                    class="help-block text-center">{{ errors.first('v_portada')}}
              </span>
            </div>
          </div>
          <div align="center" class="container-imgs" v-else>
            <img :src="imagePortada"
                 width="200" height="200"
                 class="img-responsive img-previsualizar">
            <v-btn color="error" type="button" @click.prevent="removeImagePortada" class="btn btn-danger btn-block btn-flat">
              <i class="fa fa-trash pull-left" aria-hidden="true"></i>
              Quitar Imagen Portada
            </v-btn>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12" align="center">
          <div class="form-group">
            <v-btn color="primary" class="btn btn-warning btn-flat" type="submit" id="submitButton" :disabled="deshabilitar"
                    style="margin: 15px 0 0 0"
                    data-loading-text="&lt;i class='pull-left fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
              <i class="fa fa-pencil pull-left"></i> Editar
            </v-btn>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.shop-update-modal {
  padding: 20px 10px 10px 10px;
  border-radius: 8px;
  background: #fff;
}
.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
}
.form-row > .col-md-4,
.form-row > .col-md-6,
.form-row > .col-md-12 {
  padding-left: 10px;
  padding-right: 10px;
}
.mb-3 {
  margin-bottom: 1.5rem !important;
}
.mt-4 {
  margin-top: 2rem !important;
}
</style>

<script>
  import {ModelSelect} from 'vue-search-select';
  import {mapGetters, mapMutations} from 'vuex';
  import AppServices from '../../AppServices';
  import Loader from '../../parts/loader.vue';
  import Datepicker from "vuejs-datepicker";
  import RippleHandler from '../../../mixin/RippleHandler';

  export default {
    mixins: [RippleHandler],
    data() {
      return {
        actualizarDireccionPrincipal: false,
        actualizarTelefonoPrincipal: false,
        actualizarTelefonoSecundario: false,
        actualizarNombre: false,
        principalPhone: '',
        secondaryPhone: '',
        principalAddress: '',
        peticionesCompletas: false,
        imageRut: '',
        imageCamaraComercio: '',
        imageContrato: '',
        imagePortada: '',
        imageLogo: '',
        pais: {
          value: '',
          text: ''
        },
        provincia: {
          value: '',
          text: ''
        },
        ciudad: {
          value: '',
          text: ''
        },
        tipo_documento: {
          value: '',
          text: ''
        },
        v_tipo_persona: {
          value: '',
          text: ''
        },
        usuario_asesor: {
          value: '',
          text: ''
        },
        usuario_cliente: {
          value: '',
          text: ''
        },
        paises: [],
        provincias: [],
        ciudades: [],
        tipo_documentos: [],
        tipoPersonas: [{text:'Persona Natural', value:"Natural"}, {text:'Persona Jurídica', value:"Juridica"}],
        usuarios_asesores: [],
        usuarios_clientes: [],
      }
    },
    props: ['shop'],
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_documento') && !this.errors.has('v_nombre') && !this.errors.has('v_telefono_principal') && !this.errors.has('v_telefono_secundario')
          && !this.errors.has('v_direccion') && !this.errors.has('v_rut') && !this.errors.has('v_camara_comercio') && !this.errors.has('v_contrato')
          && !this.errors.has('v_logo') && !this.errors.has('v_portada')
        );
      }
    }),
    components: {ModelSelect, Loader, Datepicker},
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
    },
    created() {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
      
      let token = this.getUsuario.token;
      let yo = this;
      
      // Cargar datos externos (paises, provincias, ciudades, usuarios)
      this.getAppServices().getMethodWithoutBearer('api/paises')
        .then(response => {
          yo.paises = response.body;
          
          // Cargar datos dependientes si shop ya está disponible
          if (yo.shop && yo.shop.v_tipo_persona && yo.shop.id_m_paises_fk) {
            yo.loadDependentData();
          }
        }, errors => this.getAppServices().mapErrorsResponses(this, errors));
    },
    watch: {
      shop: {
        handler(newShop) {
          if (newShop) {
            this.initializeShopData(newShop);
            // Cargar datos dependientes después de inicializar
            this.loadDependentData();
          }
        },
        immediate: true
      }
    },
    methods: {
      initializeShopData(shop) {
        // Validar que shop existe antes de acceder a sus propiedades
        if (!shop) {
          console.error('Shop no está definido');
          return;
        }
        
        this.imageRut = shop.v_rut || '';
        this.imageCamaraComercio = shop.v_camara_comercio || '';
        this.imageContrato = shop.v_contrato || '';
        this.imageLogo = shop.v_logo || '';
        this.imagePortada = shop.v_portada || '';
        
        // Validar que telefonos existe antes de iterar
        if (shop.telefonos && Array.isArray(shop.telefonos)) {
          for (let i = 0; i < shop.telefonos.length; i++) {
            let telefono = shop.telefonos[i];
            if (telefono.b_principal)
              this.shop.v_telefono_principal = telefono.v_telefono;
            else
              this.shop.v_telefono_secundario = telefono.v_telefono;
          }
        }
        
        // Validar que direcciones existe antes de iterar
        if (shop.direcciones && Array.isArray(shop.direcciones)) {
          for (let i = 0; i < shop.direcciones.length; i++) {
            let direccion = shop.direcciones[i];
            if (direccion.b_principal)
              this.shop.v_direccion = direccion.v_direccion;
          }
        }
        
        this.pais = {
          value: shop.id_m_paises_fk || '',
          text: shop.v_nombre_pais || ''
        };
        this.provincia = {
          value: shop.id_m_provincias_fk || '',
          text: shop.v_nombre_provincia || ''
        };
        this.ciudad = {
          value: shop.id_m_ciudades_fk || '',
          text: shop.v_nombre_ciudad || ''
        };
        
        // Validar que tipo_documentos existe antes de acceder a sus propiedades
        let tipoDocumentoText = '';
        if (shop.tipo_documentos && shop.tipo_documentos.v_des_tipo_documento) {
          tipoDocumentoText = shop.tipo_documentos.v_des_tipo_documento;
        }
        
        this.tipo_documento = {
          value: shop.id_m_tipos_documentos_fk || '',
          text: tipoDocumentoText
        };
        
        let textoPersona = '';
        if(shop.v_tipo_persona === 'Natural')
          textoPersona = "Persona Natural";
        else
          textoPersona = "Persona Juridica";

        this.v_tipo_persona = {
          value: shop.v_tipo_persona || '',
          text: textoPersona
        };
        this.usuario_asesor = {
          value: shop.id_usuario_asesor_fk || '',
          text: ''
        };
        this.usuario_cliente = {
          value: shop.id_usuario_cliente_fk || '',
          text: ''
        };
      },
      loadDependentData() {
        let token = this.getUsuario.token;
        let yo = this;
        
        // Cargar tipos de documento
        if (this.shop && this.shop.v_tipo_persona && this.shop.id_m_paises_fk) {
          this.getAppServices().getMethodWithoutBearer("api/documentos/" + this.shop.v_tipo_persona+"/"+this.shop.id_m_paises_fk)
            .then(response => {
              this.tipo_documentos = response.body.tipo_documentos;
            }, errors => {
              console.log('Error cargando tipos de documento:', errors);
              // No mostrar error al usuario, solo log
              this.tipo_documentos = [];
            });
        }
        
        // Cargar provincias
        if (this.shop && this.shop.id_m_paises_fk) {
          this.getAppServices().getMethodWithoutBearer('api/provincias/' + this.shop.id_m_paises_fk)
            .then(response => {
              this.provincias = response.body.provincias;
              
              // Cargar ciudades
              if (this.shop && this.shop.id_m_provincias_fk) {
                this.getAppServices().getMethodWithoutBearer('api/ciudades/' + this.shop.id_m_provincias_fk)
                  .then(response => {
                    this.ciudades = response.body;
                    
                    // Cargar usuarios clientes
                    this.$http.get('api/avanzamas/usuarios?tipo=pluck&rol=rol_cliente', {
                      headers: {
                        Authorization: 'Bearer ' + token
                      }
                    }).then(response => {
                      this.usuarios_clientes = response.body;
                      
                      // Cargar usuarios asesores
                      this.$http.get('api/avanzamas/usuarios?tipo=pluck&rol=rol_asesor', {
                        headers: {
                          Authorization: 'Bearer ' + token
                        }
                      }).then(response => {
                        this.usuarios_asesores = response.body;
                        this.peticionesCompletas = true;
                      }, errors => {
                        console.log('Error cargando usuarios asesores:', errors);
                        this.usuarios_asesores = [];
                        this.peticionesCompletas = true;
                      });
                    }, errors => {
                      console.log('Error cargando usuarios clientes:', errors);
                      this.usuarios_clientes = [];
                      this.peticionesCompletas = true;
                    });
                  }, errors => {
                    console.log('Error cargando ciudades:', errors);
                    this.ciudades = [];
                    this.peticionesCompletas = true;
                  });
              } else {
                this.peticionesCompletas = true;
              }
            }, errors => {
              console.log('Error cargando provincias:', errors);
              this.provincias = [];
              this.peticionesCompletas = true;
            });
        } else {
          this.peticionesCompletas = true;
        }
      },
      getAppServices() {
        return AppServices;
      },
      seleccionarPais(event) {
        this.provincias = [];
        this.getAppServices().getMethodWithoutBearer('api/provincias/' + event.value)
          .then(response => {
            this.provincias = response.body.provincias;
            this.tipo_documentos = response.body.tipo_documentos;
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      seleccionarProvincia(event) {
        this.ciudades = [];
        this.getAppServices().getMethodWithoutBearer('api/ciudades/' + event.value)
          .then(response => {
            this.ciudades = response.body;
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      seleccionarTipoEmpresa(event) {
        console.log(event);
        let token = this.getUsuario.token;
        this.tipoDocumentos = [];
        
        // Usar el valor del país desde shop si está disponible, sino desde this.pais
        let paisId = this.shop && this.shop.id_m_paises_fk ? this.shop.id_m_paises_fk : (this.pais && this.pais.value ? this.pais.value : '');
        
        if (paisId && event.value) {
          this.getAppServices().getMethodWithoutBearer("api/documentos/" + event.value + "/" + paisId)
            .then(response => {
              this.tipo_documentos = response.body.tipo_documentos;
            }, errors => this.mapErrorsResponses(this, errors));
        }
      },
      onFileChangeRut(e) {
        this.shop.v_rut = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageRut(files[0]);
      },
      createImageRut(file) {
        let reader = new FileReader();
        let vm = this;
        this.actualizarRut = true;
        reader.onload = (e) => {
          vm.imageRut = e.target.result;
          let token = this.getUsuario.token;
          let formData = new FormData();
          formData.append('imagen', vm.shop.v_rut);
          formData.append('ruta', 'rut');
          formData.append('fieldname', 'v_rut');
          this.getAppServices().postMethodWithBearer('api/avanzamas/imagenes/' + this.shop.id_m_tiendas + '?tipo=tienda', formData, token)
            .then(response => {
              /*this.$emit('modal_close');
              $('#modal').modal('hide');*/
              this.$toastr('success', "Se actualizó la imagen con éxito", "Acción exitosa");
            }, errors => this.getAppServices().mapErrorsResponses(this, errors));
        };
        reader.readAsDataURL(file);
      },
      removeImageRut: function (e) {
        this.shop.v_rut = '';
      },
      onFileChangeCamaraComercio(e) {
        this.shop.v_camara_comercio = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageCamaraComercio(files[0]);
      },
      createImageCamaraComercio(file) {
        let reader = new FileReader();
        let vm = this;
        this.actualizarCamaraComercio = true;
        reader.onload = (e) => {
          vm.imageCamaraComercio = e.target.result;
          let token = this.getUsuario.token;
          let formData = new FormData();
          formData.append('imagen', vm.shop.v_camara_comercio);
          formData.append('ruta', 'camara_comercios');
          formData.append('fieldname', 'v_camara_comercio');
          this.getAppServices().postMethodWithBearer('api/avanzamas/imagenes/' + this.shop.id_m_tiendas + '?tipo=tienda', formData, token)
            .then(response => {
              this.$emit('modal_close');
              $('#modal').modal('hide');
              this.$toastr('success', "Se actualizó la imagen con éxito", "Acción exitosa");
            }, errors => this.getAppServices().mapErrorsResponses(this, errors));
        };
        reader.readAsDataURL(file);
      },
      removeImageCamaraComercio: function (e) {
        this.shop.v_camara_comercio = '';
      },
      onFileChangeContrato(e) {
        this.shop.v_contrato = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageContrato(files[0]);
      },
      createImageContrato(file) {
        let reader = new FileReader();
        let vm = this;
        this.actualizarContrato = true;
        reader.onload = (e) => {
          vm.imageContrato = e.target.result;
          let token = this.getUsuario.token;
          let formData = new FormData();
          formData.append('imagen', vm.shop.v_contrato);
          formData.append('ruta', 'contratos');
          formData.append('fieldname', 'v_contrato');
          this.getAppServices().postMethodWithBearer('api/avanzamas/imagenes/' + this.shop.id_m_tiendas + '?tipo=tienda', formData, token)
            .then(response => {
              this.$emit('modal_close');
              $('#modal').modal('hide');
              this.$toastr('success', "Se actualizó la imagen con éxito", "Acción exitosa");
            }, errors => this.getAppServices().mapErrorsResponses(this, errors));
        };
        reader.readAsDataURL(file);
      },
      removeImageContrato: function (e) {
        this.shop.v_contrato = '';
      },
      onFileChangePortada(e) {
        this.shop.v_portada = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImagePortada(files[0]);
      },
      createImagePortada(file) {
        let reader = new FileReader();
        let vm = this;
        this.actualizarPortada = true;
        reader.onload = (e) => {
          vm.imagePortada = e.target.result;
          let token = this.getUsuario.token;
          let formData = new FormData();
          formData.append('imagen', vm.shop.v_portada);
          formData.append('ruta', 'portadas');
          formData.append('fieldname', 'v_portada');
          this.getAppServices().postMethodWithBearer('api/avanzamas/imagenes/' + this.shop.id_m_tiendas + '?tipo=tienda', formData, token)
            .then(response => {
              this.$emit('modal_close');
              $('#modal').modal('hide');
              this.$toastr('success', "Se actualizó la imagen con éxito", "Acción exitosa");
            }, errors => this.getAppServices().mapErrorsResponses(this, errors));
        };

        reader.readAsDataURL(file);
      },
      removeImagePortada: function (e) {
        this.shop.v_portada = '';
      },
      onFileChangeLogo(e) {
        this.shop.v_logo = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageLogo(files[0]);
      },
      createImageLogo(file) {
        let reader = new FileReader();
        let vm = this;
        this.actualizarLogo = true;
        reader.onload = (e) => {
          vm.imageLogo = e.target.result;
          let token = this.getUsuario.token;
          let formData = new FormData();
          formData.append('imagen', vm.shop.v_logo);
          formData.append('ruta', 'logos');
          formData.append('fieldname', 'v_logo');
          this.getAppServices().postMethodWithBearer('api/avanzamas/imagenes/' + this.shop.id_m_tiendas + '?tipo=tienda', formData, token)
            .then(response => {
              this.$emit('modal_close');
              $('#modal').modal('hide');
              this.$toastr('success', "Se actualizó la imagen con éxito", "Acción exitosa");
            }, errors => this.getAppServices().mapErrorsResponses(this, errors));
        };
        reader.readAsDataURL(file);
      },
      removeImageLogo: function (e) {
        this.shop.v_logo = '';
      },
      direccionPrincipal() {
        this.actualizarDireccionPrincipal = true;
      },
      telefonoPrincipal() {
        this.actualizarTelefonoPrincipal = true;
      },
      telefonoSecundario() {
        this.actualizarTelefonoSecundario = true;
      },
      nombreActualizar() {
        this.actualizarNombre = true;
      },
      actualizar() {
        this.$validator.validateAll().then(() => {
          this.safeButtonClick(() => {
            let token = this.getUsuario.token;
            let boton_editar = $('#submitButton');
            boton_editar.button('loading');
            let yo = this;
            this.shop.actualizarDireccionPrincipal = this.actualizarDireccionPrincipal;
            this.shop.actualizarTelefonoPrincipal = this.actualizarTelefonoPrincipal;
            this.shop.actualizarTelefonoSecundario = this.actualizarTelefonoSecundario;
            this.shop.actualizarNombre = this.actualizarNombre;
            this.shop.id_usuario_asesor_fk = this.usuario_asesor.value;
            this.shop.id_usuario_cliente_fk = this.usuario_cliente.value;
            this.getAppServices().putMethodWithBearer('api/ecommerce/tiendas/' + this.shop.id_m_tiendas, this.shop, token)
              .then(response => {
                // Limpiar efectos ripple usando el mixin
                this.clearRippleEffects();
                
                boton_editar.button('reset');
                $('#modal').modal('hide');
                yo.$emit('update');
                yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              }, errors => {
                boton_editar.button('reset');
                yo.getAppServices().mapErrorsResponses(yo, errors);
              });
          });
        });
      }
    }
  }
</script>
