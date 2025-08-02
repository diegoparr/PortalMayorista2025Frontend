<template>
  <form>
    <div class="row">
      <div class="col-xs-12 col-md-3">
        <div class="form-group">
          <label for="v_pais">País</label>
          <input name="v_pais" type="text" class="form-control"
                  data-placement="left" required id="v_pais"
                 :title="'La tienda se encuentra en el país '+shop.v_nombre_pais"
                 v-model="shop.v_nombre_pais" readonly>
        </div>
      </div>
      <div class="col-xs-12 col-md-3">
        <div class="form-group">
          <label for="v_provincia">Provincia</label>
          <input name="v_provincia" type="text" class="form-control"
                  data-placement="left" required id="v_provincia"
                 :title="'La tienda se encuentra en la provincia '+shop.v_nombre_provincia"
                 v-model="shop.v_nombre_provincia" readonly>
        </div>
      </div>
      <div class="col-xs-12 col-md-3">
        <div class="form-group">
          <label for="v_ciudad">Ciudad</label>
          <input name="v_ciudad" type="text" class="form-control"
                  data-placement="left" required id="v_ciudad"
                 :title="'La tienda se encuentra en la ciudad '+shop.v_nombre_ciudad"
                 v-model="shop.v_nombre_ciudad" readonly>
        </div>
      </div>
      <div class="col-xs-12 col-md-3">
        <div class="form-group">
          <label for="v_tipo_documento">Tipo de Documento</label>
          <input name="v_tipo_documento" type="text" class="form-control"
                  data-placement="left" required id="v_tipo_documento"
                 :title="'La tienda posee el tipo de documento '+shop.tipo_documentos.v_des_tipo_documento"
                 v-model="shop.tipo_documentos.v_des_tipo_documento" readonly>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-3">
        <div class="form-group">
          <label for="v_documento">Documento</label>
          <input name="v_documento" type="text" class="form-control"
                  data-placement="left" required id="v_documento"
                 :title="'El documento de la tienda es '+shop.v_documento"
                 v-model="shop.v_documento" readonly>
        </div>
      </div>
      <div class="col-xs-12 col-md-3">
        <div class="form-group">
          <label for="v_nombre">Nombre de la Tienda</label>
          <input name="v_nombre" type="text" class="form-control"
                  data-placement="left" required id="v_nombre"
                 :title="'El nombre de la tienda es '+shop.v_nombre"
                 v-model="shop.v_nombre" readonly>
        </div>
      </div>
      <div class="col-xs-12 col-md-3">
        <div class="form-group">
          <label for="v_telefono_principal">Teléfono Principal</label>
          <input name="v_nombre" type="text" class="form-control"
                  data-placement="left" required id="v_telefono_principal"
                 :title="'El teléfono principal es '+principalPhone"
                 v-model="principalPhone" readonly>
        </div>
      </div>
      <div class="col-xs-12 col-md-3">
        <div class="form-group">
          <label for="v_telefono_secundario">Teléfono Secundario</label>
          <input name="v_nombre" type="text" class="form-control"
                  data-placement="left" required id="v_telefono_secundario"
                 :title="'El teléfono secundario es '+secondaryPhone"
                 v-model="secondaryPhone" readonly>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="form-group">
          <label for="v_asesor">Asesor</label>
          <input name="v_asesor" type="text" class="form-control"
                  data-placement="left" required id="v_asesor"
                 :title="'El Asesor es '" :value="shop.asesor.v_primer_nombre+' '+shop.asesor.v_primer_apellido"
                 readonly>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="form-group">
          <label for="v_cliente">Cliente</label>
          <input name="v_cliente" type="text" class="form-control"
                  data-placement="left" required id="v_cliente"
                 :title="'El Cliente es '" :value="shop.cliente.v_primer_nombre+' '+shop.cliente.v_primer_apellido"
                 readonly>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="form-group">
          <label for="v_direccion">Dirección</label>
          <input name="v_direccion" type="text" class="form-control"
                  data-placement="left" required id="v_direccion"
                 :title="'La dirección principal es '"
                 v-model="principalAddress" readonly>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 text-center">
        <h5><strong>Horario de Atención de la Tienda</strong></h5>
      </div>
      <div class="col-xs-6 col-md-3 text-center">
        <div class="contenedor-dia-semana">
          <label>Lunes</label>
          <input type="time" class="form-control" placeholder="Desde" v-model="shop.v_horario_lunes_tienda_desde"
                 name="horario_lunes_tienda_desde" id="horario_lunes_tienda_desde"
                 :disabled="shop.b_horario_lunes_tienda_no_laborable" readonly>
          <label for="laborable-lunes">
            <input type="checkbox" id="laborable-lunes" v-model="shop.b_horario_lunes_tienda_no_laborable" readonly> No laborable
          </label>
          <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_lunes_tienda_hasta"
                 name="horario_lunes_tienda_hasta" id="horario_lunes_tienda_hasta"
                 :disabled="shop.b_horario_lunes_tienda_no_laborable" readonly>
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
                 :disabled="shop.b_horario_martes_tienda_no_laborable" readonly>
          <label for="laborable-martes">
            <input type="checkbox" id="laborable-martes" v-model="shop.b_horario_martes_tienda_no_laborable" readonly> No
            laborable
          </label>
          <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_martes_tienda_hasta"
                 name="horario_martes_tienda_hasta" id="horario_martes_tienda_hasta"
                 :disabled="shop.b_horario_martes_tienda_no_laborable" readonly>
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
                 :disabled="shop.b_horario_miercoles_tienda_no_laborable" readonly>
          <label for="laborable-miercoles">
            <input type="checkbox" id="laborable-miercoles" v-model="shop.b_horario_miercoles_tienda_no_laborable" readonly> No
            laborable
          </label>
          <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_miercoles_tienda_hasta"
                 name="horario_miercoles_tienda_hasta" id="horario_miercoles_tienda_hasta"
                 :disabled="shop.b_horario_miercoles_tienda_no_laborable" readonly>
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
                 :disabled="shop.b_horario_jueves_tienda_no_laborable" readonly>
          <label for="laborable-jueves">
            <input type="checkbox" id="laborable-jueves" v-model="shop.b_horario_jueves_tienda_no_laborable" readonly> No
            laborable
          </label>
          <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_jueves_tienda_hasta"
                 name="horario_jueves_tienda_hasta" id="horario_jueves_tienda_hasta"
                 :disabled="shop.b_horario_jueves_tienda_no_laborable" readonly>
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
                 :disabled="shop.b_horario_viernes_tienda_no_laborable" readonly>
          <label for="laborable-viernes">
            <input type="checkbox" id="laborable-viernes" v-model="shop.b_horario_viernes_tienda_no_laborable" readonly> No
            laborable
          </label>
          <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_viernes_tienda_hasta"
                 name="horario_viernes_tienda_hasta" id="horario_viernes_tienda_hasta"
                 :disabled="shop.b_horario_viernes_tienda_no_laborable" readonly>
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
                 :disabled="shop.b_horario_sabado_tienda_no_laborable" readonly>
          <label for="laborable-sabado">
            <input type="checkbox" id="laborable-sabado" v-model="shop.b_horario_sabado_tienda_no_laborable" readonly> No
            laborable
          </label>
          <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_sabado_tienda_hasta"
                 name="horario_sabado_tienda_hasta" id="horario_sabado_tienda_hasta"
                 :disabled="shop.b_horario_sabado_tienda_no_laborable" readonly>
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
                 :disabled="shop.b_horario_domingo_tienda_no_laborable" readonly>
          <label for="laborable-domingo">
            <input type="checkbox" id="laborable-domingo" v-model="shop.b_horario_domingo_tienda_no_laborable" readonly> No
            laborable
          </label>
          <input type="time" class="form-control" placeholder="Hasta" v-model="shop.v_horario_domingo_tienda_hasta"
                 name="horario_domingo_tienda_hasta" id="horario_domingo_tienda_hasta"
                 :disabled="shop.b_horario_domingo_tienda_no_laborable" readonly>
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
                    v-model="shop.v_descripcion" readonly
                    name="v_descripcion" v-validate="'required|min:5|max:255'" data-vv-as="descripción"></textarea>
          <span v-show="errors.has('v_descripcion')"
                class="help-block text-center">{{ errors.first('v_descripcion')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_resena'))?'form-group':'form-group has-error'">
          <label for="v_resena">Reseña</label>
          <textarea class="form-control margen-textarea-modulo-tienda" id="v_resena" rows="3" name="v_resena"
                    v-model="shop.v_resena" readonly
                    v-validate="'required|min:5|max:50'" data-vv-as="reseña"></textarea>
          <span v-show="errors.has('v_resena')"
                class="help-block text-center">{{ errors.first('v_resena')}}</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <img :src="shop.v_rut" width="200" height="200"
             class="img-responsive img-previsualizar">
        <button class="btn btn-danger btn-block btn-flat" disabled>
          Imagen Rut
        </button>
      </div>
      <div class="col-xs-12 col-md-6">
        <img :src="shop.v_camara_comercio" width="200" height="200"
             class="img-responsive img-previsualizar">
        <button class="btn btn-danger btn-block btn-flat" disabled>
          Imagen Camara Comercio
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <img :src="shop.v_contrato" width="200" height="200"
             class="img-responsive img-previsualizar">
        <button class="btn btn-danger btn-block btn-flat" disabled>
          Imagen Contrato
        </button>
      </div>
      <div class="col-xs-12 col-md-6">
        <img :src="shop.v_logo" width="200" height="200"
             class="img-responsive img-previsualizar">
        <button class="btn btn-danger btn-block btn-flat" disabled>
          Imagen Logo
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" align="center">
        <img :src="shop.v_portada" width="200" height="200" style="margin: 10px;"
             class="centrar-imagen imagen-previsualizar">
        <button class="btn btn-danger btn-block btn-flat" disabled>
          Imagen Portada
        </button>
      </div>
    </div>
  </form>
</template>
<script>
  export default {
    data() {
      return {
        principalPhone: '',
        secondaryPhone: '',
        principalAddress: ''
      }
    },
    props: ['shop'],
    created() {
      $(function () {
        $('[]').tooltip()
      });
      let yo = this;
      for (let i = 0; i < this.shop.telefonos.length; i++) {
        let telefono = this.shop.telefonos[i];
        if (telefono.b_principal)
          yo.principalPhone = telefono.v_telefono;
        else
          yo.secondaryPhone = telefono.v_telefono;
      }
      for (let i = 0; i < this.shop.direcciones.length; i++) {
        let direccion = this.shop.direcciones[i];
        if (direccion.b_principal)
          yo.principalAddress = direccion.v_direccion;
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
    }
  }
</script>
