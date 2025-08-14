<template>
  <form v-on:submit.prevent="registrar" class="modern-form">

    <div class="row">
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_pais'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_pais" class="modern-label">País</label>
          <model-select 
            :options="paises" 
            id="v_pais" 
            v-model="pais" 
            class="form-control modern-select"
            v-on:input="seleccionarPais"
            data-placement="top" 
            title="Selecciona el país en que se encuentra la tienda"
            v-validate="'required'"
            data-vv-as="país"
            required>
          </model-select>
          <span v-show="errors.has('v_pais')"
                class="help-block text-center modern-error">{{ errors.first('v_pais')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_provincia'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_provincia" class="modern-label">Provincia</label>
          <model-select 
            :options="provincias" 
            id="v_provincia" 
            v-model="provincia" 
            class="form-control modern-select"
            v-on:input="seleccionarProvincia"
            data-placement="top" 
            title="Selecciona la provincia"
            v-validate="'required'"
            data-vv-as="provincia"
            required>
          </model-select>
          <span v-show="errors.has('v_provincia')"
                class="help-block text-center modern-error">{{ errors.first('v_provincia')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_ciudad'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_ciudad" class="modern-label">Ciudad</label>
          <model-select 
            :options="ciudades" 
            id="v_ciudad" 
            v-model="ciudad" 
            class="form-control modern-select"
            data-placement="top" 
            title="Selecciona la ciudad"
            v-validate="'required'"
            data-vv-as="ciudad"
            required>
          </model-select>
          <span v-show="errors.has('v_ciudad')"
                class="help-block text-center modern-error">{{ errors.first('v_ciudad')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_tipo_persona'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_tipo_persona" class="modern-label">Tipo de Registro</label>
          <model-select 
            v-on:input="seleccionarTipoEmpresa" 
            :options="tipoPersonas"
            id="v_tipo_persona"  
            data-placement="left"
            title="Selecciona el tipo de Registro" 
            data-vv-as="Tipo de Registro"
            v-model="v_tipo_persona" 
            v-validate="'required'"
            class="form-control modern-select">
          </model-select>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_tipo_documento'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_tipo_documento" class="modern-label">Tipo de Documento</label>
          <model-select 
            :options="tipo_documentos" 
            id="v_tipo_documento" 
            v-model="tipo_documento" 
            class="form-control modern-select"
            data-placement="top"
            title="Selecciona el tipo de documento de identificación que posee la tienda"
            v-validate="'required'"
            data-vv-as="tipo de documento"
            required>
          </model-select>
          <span v-show="errors.has('v_tipo_documento')"
                class="help-block text-center modern-error">{{ errors.first('v_tipo_documento')}}</span>
        </div>
      </div>

      <div class="col-xs-12 col-md-4">
        <div class="form-group modern-form-group">
          <label for="v_documento" class="modern-label">Documento</label>
          <div :class="(!errors.first('v_documento'))?'form-group':'form-group has-error'">
                      <input 
            placeholder="Documento" 
            name="v_documento" 
            type="text" 
            class="form-control modern-input"
            data-placement="top" 
            required 
            id="v_documento"
            title="Ingresa el número de documento de identificación"
            data-vv-as="documento de identificación"
            v-model="tienda.v_documento" 
            v-validate="'required|min:3|max:25|numeric'"
            @blur="validarCampo('v_documento')">
            <span v-show="errors.has('v_documento')"
                  class="help-block text-center modern-error">{{ errors.first('v_documento')}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_nombre'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_nombre" class="modern-label">Nombre de la Tienda</label>
          <input 
            placeholder="Nombre de la Tienda" 
            name="v_nombre" 
            type="text" 
            class="form-control modern-input"
            data-placement="top" 
            v-validate="'required|alpha_spaces|min:2|max:100'"
            data-vv-as="nombre de la tienda" 
            v-model="tienda.v_nombre" 
            required 
            id="v_nombre"
            title="Ingresa el nombre de la tienda"
            @blur="validarCampo('v_nombre')">
          <span v-show="errors.has('v_nombre')"
                class="help-block text-center modern-error">{{ errors.first('v_nombre')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_telefono_principal'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_telefono_principal" class="modern-label">Teléfono Principal</label>
          <input 
            placeholder="Teléfono principal" 
            name="v_telefono_principal" 
            type="text" 
            class="form-control modern-input"
            data-placement="top" 
            id="v_telefono_principal"
            title="Ingresa el teléfono" 
            data-vv-as="teléfono"
            v-model="tienda.v_telefono_principal" 
            v-validate="'required|min:5|max:25|numeric'"
            @blur="validarCampo('v_telefono_principal')"
            required>
          <span v-show="errors.has('v_telefono_principal')"
                class="help-block text-center modern-error">{{ errors.first('v_telefono_principal')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div :class="(!errors.first('v_telefono_secundario'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_telefono_secundario" class="modern-label">Teléfono Secundario</label>
          <input 
            placeholder="Teléfono Secundario" 
            name="v_telefono_secundario" 
            type="text" 
            class="form-control modern-input"
            data-placement="top" 
            id="v_telefono_secundario"
            title="Ingresa el teléfono" 
            data-vv-as="teléfono secundario"
            v-model="tienda.v_telefono_secundario" 
            v-validate="'min:10|max:25|numeric'">
          <span v-show="errors.has('v_telefono_secundario')"
                class="help-block text-center modern-error">{{ errors.first('v_telefono_secundario')}}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_asesor'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_asesor" class="modern-label">Asesor</label>
          <model-select 
            :options="usuarios_asesores" 
            v-model="usuario_asesor" 
            class="form-control modern-select"
            id="v_asesor"
            data-placement="top" 
            title="Selecciona el asesor encargado de la tienda"
            v-validate="'required'"
            data-vv-as="asesor"
            required>
          </model-select>
          <span v-show="errors.has('v_asesor')"
                class="help-block text-center modern-error">{{ errors.first('v_asesor')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_cliente'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_cliente" class="modern-label">Cliente</label>
          <model-select 
            :options="usuarios_clientes" 
            v-model="usuario_cliente" 
            class="form-control modern-select"
            id="v_cliente"
            data-placement="top" 
            title="Selecciona el cliente dueño o representante de la tienda"
            v-validate="'required'"
            data-vv-as="cliente"
            required>
          </model-select>
          <span v-show="errors.has('v_cliente')"
                class="help-block text-center modern-error">{{ errors.first('v_cliente')}}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div :class="(!errors.first('v_direccion'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_direccion" class="modern-label">Dirección</label>
          <input 
            placeholder="Dirección" 
            name="v_direccion" 
            type="text" 
            class="form-control modern-input"
            data-placement="top" 
            required 
            id="v_direccion"
            title="Ingresa la dirección principal de la tienda" 
            data-vv-as="dirección"
            v-model="tienda.v_direccion" 
            v-validate="'required|min:5|max:255'"
            @blur="validarCampo('v_direccion')">
          <span v-show="errors.has('v_direccion')"
                class="help-block text-center modern-error">{{ errors.first('v_direccion')}}</span>
        </div>
      </div>
    </div>
    
    <!-- Horarios de atención con diseño moderno -->
    <div class="row">
      <div class="col-xs-12 text-center">
        <h5 class="modern-section-title"><strong>Horario de Atención de la Tienda</strong></h5>
      </div>
      <div class="col-xs-6 col-md-3 text-center">
        <div class="contenedor-dia-semana modern-day-container">
          <label class="modern-day-label">Lunes</label>
          <input type="time" class="form-control modern-time-input" placeholder="Desde" v-model="tienda.horario_lunes_tienda_desde"
                 name="horario_lunes_tienda_desde" id="horario_lunes_tienda_desde"
                 :disabled="tienda.horario_lunes_tienda_no_laborable"
                 v-validate="'required_if:horario_lunes_tienda_no_laborable,false'"
                 data-vv-as="horario lunes desde">
          <label for="laborable-lunes" class="modern-checkbox-label">
            <input type="checkbox" id="laborable-lunes" v-model="tienda.horario_lunes_tienda_no_laborable" class="modern-checkbox"> No laborable
          </label>
          <input type="time" class="form-control modern-time-input" placeholder="Hasta" v-model="tienda.horario_lunes_tienda_hasta"
                 name="horario_lunes_tienda_hasta" id="horario_lunes_tienda_hasta"
                 :disabled="tienda.horario_lunes_tienda_no_laborable"
                 v-validate="'required_if:horario_lunes_tienda_no_laborable,false'"
                 data-vv-as="horario lunes hasta">
          <span v-show="errors.has('horario_lunes_tienda_desde')"
                class="error-formulario modern-error">{{ errors.first('horario_lunes_tienda_desde')}}</span><br>
          <span v-show="errors.has('horario_lunes_tienda_hasta')"
                class="error-formulario modern-error">{{ errors.first('horario_lunes_tienda_hasta')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-3 text-center">
        <div class="contenedor-dia-semana modern-day-container">
          <label class="modern-day-label">Martes</label>
          <input type="time" class="form-control modern-time-input" placeholder="Desde" v-model="tienda.horario_martes_tienda_desde"
                 name="horario_martes_tienda_desde" :disabled="tienda.horario_martes_tienda_no_laborable">
          <label for="laborable-martes" class="modern-checkbox-label">
            <input type="checkbox" id="laborable-martes" v-model="tienda.horario_martes_tienda_no_laborable" class="modern-checkbox"> No
            laborable
          </label>
          <input type="time" class="form-control modern-time-input" placeholder="Hasta" v-model="tienda.horario_martes_tienda_hasta"
                 name="horario_martes_tienda_hasta" :disabled="tienda.horario_martes_tienda_no_laborable">
          <span v-show="errors.has('horario_martes_tienda_desde')"
                class="error-formulario modern-error">{{ errors.first('horario_martes_tienda_desde')}}</span><br>
          <span v-show="errors.has('horario_martes_tienda_hasta')"
                class="error-formulario modern-error">{{ errors.first('horario_martes_tienda_hasta')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-3 text-center">
        <div class="contenedor-dia-semana modern-day-container">
          <label class="modern-day-label">Miercoles</label>
          <input type="time" class="form-control modern-time-input" placeholder="Desde" v-model="tienda.horario_miercoles_tienda_desde"
                 name="horario_miercoles_tienda_desde" :disabled="tienda.horario_miercoles_tienda_no_laborable">
          <label for="laborable-miercoles" class="modern-checkbox-label">
            <input type="checkbox" id="laborable-miercoles" v-model="tienda.horario_miercoles_tienda_no_laborable" class="modern-checkbox"> No
            laborable
          </label>
          <input type="time" class="form-control modern-time-input" placeholder="Hasta" v-model="tienda.horario_miercoles_tienda_hasta"
                 name="horario_miercoles_tienda_hasta" :disabled="tienda.horario_miercoles_tienda_no_laborable">
          <span v-show="errors.has('horario_miercoles_tienda_desde')"
                class="error-formulario modern-error">{{ errors.first('horario_miercoles_tienda_desde')}}</span><br>
          <span v-show="errors.has('horario_miercoles_tienda_hasta')"
                class="error-formulario modern-error">{{ errors.first('horario_miercoles_tienda_hasta')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-3 text-center">
        <div class="contenedor-dia-semana modern-day-container">
          <label class="modern-day-label">Jueves</label>
          <input type="time" class="form-control modern-time-input" placeholder="Desde" v-model="tienda.horario_jueves_tienda_desde"
                 name="horario_jueves_tienda_desde" :disabled="tienda.horario_jueves_tienda_no_laborable">
          <label for="laborable-jueves" class="modern-checkbox-label">
            <input type="checkbox" id="laborable-jueves" v-model="tienda.horario_jueves_tienda_no_laborable" class="modern-checkbox"> No
            laborable
          </label>
          <input type="time" class="form-control modern-time-input" placeholder="Hasta" v-model="tienda.horario_jueves_tienda_hasta"
                 name="horario_jueves_tienda_hasta" :disabled="tienda.horario_jueves_tienda_no_laborable">
          <span v-show="errors.has('horario_jueves_tienda_desde')"
                class="error-formulario modern-error">{{ errors.first('horario_jueves_tienda_desde')}}</span><br>
          <span v-show="errors.has('horario_jueves_tienda_hasta')"
                class="error-formulario modern-error">{{ errors.first('horario_jueves_tienda_hasta')}}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-6 col-md-3 col-md-offset-2 text-center">
        <div class="contenedor-dia-semana modern-day-container">
          <label class="modern-day-label">Viernes</label>
          <input type="time" class="form-control modern-time-input" placeholder="Desde" v-model="tienda.horario_viernes_tienda_desde"
                 name="horario_viernes_tienda_desde" :disabled="tienda.horario_viernes_tienda_no_laborable">
          <label for="laborable-viernes" class="modern-checkbox-label">
            <input type="checkbox" id="laborable-viernes" v-model="tienda.horario_viernes_tienda_no_laborable" class="modern-checkbox"> No
            laborable
          </label>
          <input type="time" class="form-control modern-time-input" placeholder="Hasta" v-model="tienda.horario_viernes_tienda_hasta"
                 name="horario_viernes_tienda_hasta" :disabled="tienda.horario_viernes_tienda_no_laborable">
          <span v-show="errors.has('horario_viernes_tienda_desde')"
                class="error-formulario modern-error">{{ errors.first('horario_viernes_tienda_desde')}}</span><br>
          <span v-show="errors.has('horario_viernes_tienda_hasta')"
                class="error-formulario modern-error">{{ errors.first('horario_viernes_tienda_hasta')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-3 text-center">
        <div class="contenedor-dia-semana modern-day-container">
          <label class="modern-day-label">Sabado</label>
          <input type="time" class="form-control modern-time-input" placeholder="Desde" v-model="tienda.horario_sabado_tienda_desde"
                 name="horario_sabado_tienda_desde" :disabled="tienda.horario_sabado_tienda_no_laborable">
          <label for="laborable-sabado" class="modern-checkbox-label">
            <input type="checkbox" id="laborable-sabado" v-model="tienda.horario_sabado_tienda_no_laborable" class="modern-checkbox"> No
            laborable
          </label>
          <input type="time" class="form-control modern-time-input" placeholder="Hasta" v-model="tienda.horario_sabado_tienda_hasta"
                 name="horario_sabado_tienda_hasta" :disabled="tienda.horario_sabado_tienda_no_laborable">
          <span v-show="errors.has('horario_sabado_tienda_desde')"
                class="error-formulario modern-error">{{ errors.first('horario_sabado_tienda_desde')}}</span><br>
          <span v-show="errors.has('horario_sabado_tienda_hasta')"
                class="error-formulario modern-error">{{ errors.first('horario_sabado_tienda_hasta')}}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-3 text-center">
        <div class="contenedor-dia-semana modern-day-container">
          <label class="modern-day-label">Domingo</label>
          <input type="time" class="form-control modern-time-input" placeholder="Desde" v-model="tienda.horario_domingo_tienda_desde"
                 name="horario_domingo_tienda_desde" :disabled="tienda.horario_domingo_tienda_no_laborable">
          <label for="laborable-domingo" class="modern-checkbox-label">
            <input type="checkbox" id="laborable-domingo" v-model="tienda.horario_domingo_tienda_no_laborable" class="modern-checkbox"> No
            laborable
          </label>
          <input type="time" class="form-control modern-time-input" placeholder="Hasta" v-model="tienda.horario_domingo_tienda_hasta"
                 name="horario_domingo_tienda_hasta" :disabled="tienda.horario_domingo_tienda_no_laborable">
          <span v-show="errors.has('horario_domingo_tienda_desde')"
                class="error-formulario modern-error">{{ errors.first('horario_domingo_tienda_desde')}}</span><br>
          <span v-show="errors.has('horario_domingo_tienda_hasta')"
                class="error-formulario modern-error">{{ errors.first('horario_domingo_tienda_hasta')}}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_descripcion'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_descripcion" class="modern-label">Descripción</label>
          <textarea class="form-control modern-textarea" id="v_descripcion" rows="3"
                    v-model="tienda.v_descripcion"
                    name="v_descripcion" v-validate="'required|min:5|max:500'" data-vv-as="descripción"></textarea>
          <span v-show="errors.has('v_descripcion')"
                class="help-block text-center modern-error">{{ errors.first('v_descripcion')}}</span>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div :class="(!errors.first('v_resena'))?'form-group modern-form-group':'form-group modern-form-group has-error'">
          <label for="v_resena" class="modern-label">Reseña</label>
          <textarea maxlength="255" class="form-control modern-textarea" id="v_resena" rows="3" name="v_resena"
                    v-model="tienda.v_resena"
                    v-validate="'required|min:5|max:255'" data-vv-as="reseña"></textarea>
          <span v-show="errors.has('v_resena')"
                class="help-block text-center modern-error">{{ errors.first('v_resena')}}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div v-if="!tienda.v_rut">
          <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_rut') }">
            <label for="v_rut" class="modern-label">Imagen Rut</label>
            <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                   name="v_rut"
                   type="file"
                   v-on:change="onFileChangeRut"
                   data-vv-as="imagen rut"
                   accept="image/*"
                   id="v_rut"
                   required>
            <span v-show="errors.has('v_rut')"
                  class="help-block text-center modern-error">{{ errors.first('v_rut')}}
            </span>
          </div>
        </div>
        <div align="center" class="container-imgs" v-else>
          <img :src="imageRut"
               width="200" height="200"
               class="img-responsive img-previsualizar">
          <v-btn color="error" type="button" @click="removeImageRut" class="btn btn-danger btn-block btn-flat">
            <i class="fa fa-trash pull-left" aria-hidden="true"></i>
            Quitar Imagen Rut
          </v-btn>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div v-if="!tienda.v_camara_comercio">
          <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_camara_comercio') }">
            <label for="v_camara_comercio" class="modern-label">Imagen Camara Comercio</label>
            <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                   name="v_camara_comercio"
                   type="file"
                   v-on:change="onFileChangeCamaraComercio"
                   data-vv-as="imagen camara comercio"
                   accept="image/*"
                   id="v_camara_comercio"
                   required>
            <span v-show="errors.has('v_camara_comercio')"
                  class="help-block text-center modern-error">{{ errors.first('v_camara_comercio')}}
            </span>
          </div>
        </div>
        <div align="center" class="container-imgs" v-else>
          <img :src="imageCamaraComercio"
               width="200" height="200"
               class="img-responsive img-previsualizar">
          <v-btn color="error" type="button" @click="removeImageCamaraComercio" class="btn btn-danger btn-block btn-flat">
            <i class="fa fa-trash pull-left" aria-hidden="true"></i>
            Quitar Imagen Camara Comercio
          </v-btn>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div v-if="!tienda.v_contrato">
          <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_contrato') }">
            <label for="v_contrato" class="modern-label">Imagen Contrato</label>
            <input v-validate="'required|image|mimes:image/png,image/jpg'"
                   name="v_contrato"
                   type="file"
                   v-on:change="onFileChangeContrato"
                   data-vv-as="imagen contrato"
                   accept="image/*"
                   id="v_contrato"
                   required>
            <span v-show="errors.has('v_contrato')"
                  class="help-block text-center modern-error">{{ errors.first('v_contrato')}}
            </span>
          </div>
        </div>
        <div align="center" class="container-imgs" v-else>
          <img :src="imageContrato"
               width="200" height="200"
               class="img-responsive img-previsualizar">
          <v-btn color="error" type="button" @click="removeImageContrato" class="btn btn-danger btn-block btn-flat">
            <i class="fa fa-trash pull-left" aria-hidden="true"></i>
            Quitar Imagen Contrato
          </v-btn>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div v-if="!tienda.v_logo">
          <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_logo') }">
            <label for="v_logo" class="modern-label">Imagen Logo</label>
            <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                   name="v_logo"
                   type="file"
                   v-on:change="onFileChangeLogo"
                   data-vv-as="imagen logo"
                   accept="image/*"
                   id="v_logo"
                   required>
            <span v-show="errors.has('v_logo')"
                  class="help-block text-center modern-error">{{ errors.first('v_logo')}}
            </span>
          </div>
        </div>
        <div align="center" class="container-imgs" v-else>
          <img :src="imageLogo"
               width="200" height="200"
               class="img-responsive img-previsualizar">
          <v-btn color="error" type="button" @click="removeImageLogo" class="btn btn-danger btn-block btn-flat">
            <i class="fa fa-trash pull-left" aria-hidden="true"></i>
            Quitar Imagen Logo
          </v-btn>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" align="center">
        <div v-if="!tienda.v_portada">
          <div :class="{'form-group container-imgs': true, 'form-group has-error': errors.has('v_portada') }">
            <label for="v_portada" class="modern-label">Imagen Portada</label>
            <input v-validate="'required|image|mimes:image/png,image/jpg'"
                   name="v_portada"
                   type="file"
                   v-on:change="onFileChangePortada"
                   data-vv-as="imagen portada"
                   accept="image/*"
                   id="v_portada"
                   required>
            <span v-show="errors.has('v_portada')"
                  class="help-block text-center modern-error">{{ errors.first('v_portada')}}
            </span>
          </div>
        </div>
        <div align="center" class="container-imgs" v-else>
          <img :src="imagePortada"
               width="200" height="200"
               class="img-responsive img-previsualizar">
          <v-btn color="error" type="button" @click="removeImagePortada" class="btn btn-danger btn-block btn-flat">
            <i class="fa fa-trash pull-left" aria-hidden="true"></i>
            Quitar Imagen Portada
          </v-btn>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" align="center" style="margin: 10px 0 0 0">
        <div class="form-group">
          <v-btn color="primary" type="submit" id="submitButton" :disabled="deshabilitar"
                  data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Comprimiendo y registrando...">
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
  import {ModelSelect} from 'vue-search-select';

  export default {
    data() {
      return {
        imageRut: '',
        imageCamaraComercio: '',
        imageContrato: '',
        imagePortada: '',
        imageLogo: '',
        tienda: {
          v_documento: null,
          v_nombre: null,
          v_rut: null,
          v_camara_comercio: null,
          v_contrato: null,
          v_portada: null,
          v_logo: null,
          v_telefono_principal: null,
          v_telefono_secundario: null,
          v_direccion: null,
          horario_lunes_tienda_desde: '07:00',
          horario_lunes_tienda_hasta: '05:00',
          horario_lunes_tienda_no_laborable: false,
          horario_martes_tienda_desde: '07:00',
          horario_martes_tienda_hasta:'05:00',
          horario_martes_tienda_no_laborable: false,
          horario_miercoles_tienda_desde: '07:00',
          horario_miercoles_tienda_hasta:'05:00',
          horario_miercoles_tienda_no_laborable: false,
          horario_jueves_tienda_desde: '07:00',
          horario_jueves_tienda_hasta: '05:00',
          horario_jueves_tienda_no_laborable: false,
          horario_viernes_tienda_desde: '07:00',
          horario_viernes_tienda_hasta: '05:00',
          horario_viernes_tienda_no_laborable: false,
          horario_sabado_tienda_desde: '07:00',
          horario_sabado_tienda_hasta: '05:00',
          horario_sabado_tienda_no_laborable: false,
          horario_domingo_tienda_desde: '07:00',
          horario_domingo_tienda_hasta: '05:00',
          horario_domingo_tienda_no_laborable: false,
          v_descripcion: null,
          v_resena: null
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
        v_tipo_persona: {
          value: '',
          text: ''
        },
        tipo_documento: {
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
        tipoPersonas: [{text:'Persona Natural', value:"Natural"}, {text:'Persona Jurídica', value:"Juridica"}],
        tipo_documentos: [],
        usuarios_asesores: [],
        usuarios_clientes: [],
        tieneErroresDeValidacion: false,
      }
    },
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_pais') && !this.errors.has('v_provincia') && !this.errors.has('v_ciudad') && 
                 !this.errors.has('v_tipo_persona') && !this.errors.has('v_tipo_documento') && !this.errors.has('v_documento') && 
                 !this.errors.has('v_nombre') && !this.errors.has('v_telefono_principal') && !this.errors.has('v_telefono_secundario') &&
                 !this.errors.has('v_asesor') && !this.errors.has('v_cliente') && !this.errors.has('v_direccion') && 
                 !this.errors.has('v_rut') && !this.errors.has('v_camara_comercio') && !this.errors.has('v_contrato') &&
                 !this.errors.has('v_logo') && !this.errors.has('v_portada') && !this.errors.has('v_descripcion') && 
                 !this.errors.has('v_resena') && !this.errors.has('horario_lunes_tienda_desde') && !this.errors.has('horario_lunes_tienda_hasta')
        );
      }
    }),
    watch: {
      // Watcher para limpiar la marca de errores cuando se corrigen
      'errors': {
        handler(newErrors) {
          if (newErrors && Object.keys(newErrors).length === 0) {
            this.limpiarMarcaErrores();
          }
        },
        deep: true
      }
    },
    updated() {
      // Eliminar la aplicación de estilos dinámicos
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        // Solo cerrar el modal si no hay errores de validación
        if (!yo.tieneErroresDeValidacion) {
          yo.$emit('modal_close');
        } else {
          // Prevenir que se cierre el modal si hay errores
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
      
      // Prevenir cierre del modal con ESC o clic fuera si hay errores
      $('#modal').on('keydown.dismiss.bs.modal', function (e) {
        if (e.keyCode === 27 && yo.tieneErroresDeValidacion) { // ESC key
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
      
      $('#modal').on('click.dismiss.bs.modal', function (e) {
        if (yo.tieneErroresDeValidacion) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
    },
    created() {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      });
      let token = this.getUsuario.token;
      this.getAppServices().getMethodWithoutBearer('api/paises')
        .then(response => {
          this.paises = response.body;
        }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      this.$http.get('api/avanzamas/usuarios?tipo=pluck&rol=rol_cliente', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(response => {
        this.usuarios_clientes = response.body;
      }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      this.$http.get('api/avanzamas/usuarios?tipo=pluck&rol=rol_asesor', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(response => {
        this.usuarios_asesores = response.body;
      }, errors => this.getAppServices().mapErrorsResponses(this, errors));
    },
    methods: {
      getAppServices() {
        return AppServices;
      },
      seleccionarPais(event) {
        this.provincias = [];
        this.getMethodWithoutBearer('api/provincias/' + event.value)
          .then(response => {
            this.provincias = response.body.provincias;
            //this.tipo_documentos = response.body.tipo_documentos;
          }, errors => this.mapErrorsResponses(this, errors));
      },
      seleccionarTipoEmpresa(event) {
        console.log(event);
        let token = this.getUsuario.token;
        this.tipoDocumentos = [];
        this.getAppServices().getMethodWithoutBearer("api/documentos/" + event.value+"/"+this.pais.value)
          .then(response => {
            this.tipo_documentos = response.body.tipo_documentos;
          }, errors => this.mapErrorsResponses(this, errors));
      },
      seleccionarProvincia(event) {
        this.ciudades = [];
        this.getMethodWithoutBearer('api/ciudades/' + event.value)
          .then(response => {
            this.ciudades = response.body;
          }, errors => this.mapErrorsResponses(this, errors));
      },
      onFileChangeRut(e) {
        if (this.validarArchivo(e.target.files[0], 'RUT')) {
          this.tienda.v_rut = e.target.files[0];
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImageRut(files[0]);
        }
      },
      createImageRut(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imageRut = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImageRut: function (e) {
        this.tienda.v_rut = '';
        this.imageRut = '';
      },
      onFileChangeCamaraComercio(e) {
        if (this.validarArchivo(e.target.files[0], 'Cámara de Comercio')) {
          this.tienda.v_camara_comercio = e.target.files[0];
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImageCamaraComercio(files[0]);
        }
      },
      createImageCamaraComercio(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imageCamaraComercio = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImageCamaraComercio: function (e) {
        this.tienda.v_camara_comercio = '';
        this.imageCamaraComercio = '';
      },
      onFileChangeContrato(e) {
        if (this.validarArchivo(e.target.files[0], 'Contrato')) {
          this.tienda.v_contrato = e.target.files[0];
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImageContrato(files[0]);
        }
      },
      createImageContrato(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imageContrato = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImageContrato: function (e) {
        this.tienda.v_contrato = '';
        this.imageContrato = '';
      },
      onFileChangePortada(e) {
        if (this.validarArchivo(e.target.files[0], 'Portada')) {
          this.tienda.v_portada = e.target.files[0];
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImagePortada(files[0]);
        }
      },
      createImagePortada(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imagePortada = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImagePortada: function (e) {
        this.tienda.v_portada = '';
        this.imagePortada = '';
      },
      onFileChangeLogo(e) {
        if (this.validarArchivo(e.target.files[0], 'Logo')) {
          this.tienda.v_logo = e.target.files[0];
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImageLogo(files[0]);
        }
      },
      createImageLogo(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imageLogo = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImageLogo: function (e) {
        this.tienda.v_logo = '';
        this.imageLogo = '';
      },
      // Nuevo método para validar archivos
      validarArchivo(file, tipo) {
        const maxSizeMB = 2; // 2MB máximo
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        
        if (!file) {
          this.$toastr('error', `Debes seleccionar un archivo para ${tipo}`, 'Archivo requerido');
          return false;
        }
        
        if (file.size > maxSizeBytes) {
          this.$toastr('error', `El archivo ${tipo} es demasiado grande. Máximo ${maxSizeMB}MB permitido.`, 'Archivo muy grande');
          return false;
        }
        
        // Validar tipo de archivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          this.$toastr('error', `El archivo ${tipo} debe ser una imagen (JPG, PNG)`, 'Tipo de archivo inválido');
          return false;
        }
        
        // Mostrar información sobre el archivo
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        this.$toastr('info', `${tipo}: ${fileSizeMB}MB - Se comprimirá automáticamente`, 'Archivo válido');
        
        return true;
      },
      // Nuevo método para comprimir imágenes
      async comprimirImagen(file, maxWidth = 800, quality = 0.8) {
        return new Promise((resolve) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = () => {
            // Calcular nuevas dimensiones manteniendo proporción
            let { width, height } = img;
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Dibujar imagen redimensionada
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convertir a blob con calidad especificada
            canvas.toBlob((blob) => {
              // Crear nuevo archivo con nombre original
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            }, 'image/jpeg', quality);
          };
          
          img.src = URL.createObjectURL(file);
        });
      },
      registrar() {
        // Validar todos los campos requeridos antes de enviar
        if (!this.validarFormularioCompleto()) {
          this.$toastr('error', 'Por favor, completa todos los campos requeridos', 'Formulario incompleto');
          return;
        }

        // Validar con vee-validate antes de enviar
        this.$validator.validateAll().then(() => {
          // Si pasa todas las validaciones, proceder con el envío
          this.enviarFormulario();
        }).catch(() => {
          // Mostrar resumen de errores
          this.mostrarResumenErrores();
        });
      },
      // Método separado para enviar el formulario
      async enviarFormulario() {
        let token = this.getUsuario.token;
        let boton_registrar = $('#submitButton');
        boton_registrar.button('loading');
        
        try {
          // Comprimir todas las imágenes antes de enviar
          const rutComprimido = await this.comprimirImagen(this.tienda.v_rut, 800, 0.7);
          const camaraComercioComprimida = await this.comprimirImagen(this.tienda.v_camara_comercio, 800, 0.7);
          const contratoComprimido = await this.comprimirImagen(this.tienda.v_contrato, 800, 0.7);
          const logoComprimido = await this.comprimirImagen(this.tienda.v_logo, 600, 0.8);
          const portadaComprimida = await this.comprimirImagen(this.tienda.v_portada, 1000, 0.7);
          
          let formData = new FormData();
          formData.append('id_m_paises_fk', this.pais.value);
          formData.append('id_m_provincias_fk', this.provincia.value);
          formData.append('id_m_ciudades_fk', this.ciudad.value);
          formData.append('v_nombre_pais', this.pais.text);
          formData.append('v_nombre_provincia', this.provincia.text);
          formData.append('v_nombre_ciudad', this.ciudad.text);
          formData.append('id_m_tipos_documentos_fk', this.tipo_documento.value);
          formData.append('v_documento', this.tienda.v_documento);
          formData.append('v_tipo_persona', this.v_tipo_persona.value);
          formData.append('v_nombre', this.tienda.v_nombre);
          formData.append('v_telefono_principal', this.tienda.v_telefono_principal);
          if (this.tienda.v_telefono_secundario)
            formData.append('v_telefono_secundario', this.tienda.v_telefono_secundario);
          formData.append('id_usuario_asesor_fk', this.usuario_asesor.value);
          formData.append('id_usuario_cliente_fk', this.usuario_cliente.value);
          formData.append('v_direccion', this.tienda.v_direccion);
          formData.append('rut', rutComprimido);
          formData.append('camara_comercio', camaraComercioComprimida);
          formData.append('contrato', contratoComprimido);
          formData.append('logo', logoComprimido);
          formData.append('portada', portadaComprimida);
        formData.append('v_horario_lunes_tienda_desde', this.tienda.horario_lunes_tienda_desde);
        formData.append('v_horario_lunes_tienda_hasta', this.tienda.horario_lunes_tienda_hasta);
        formData.append('b_horario_lunes_tienda_no_laborable', this.tienda.horario_lunes_tienda_no_laborable);
        formData.append('v_horario_martes_tienda_desde', this.tienda.horario_martes_tienda_desde);
        formData.append('v_horario_martes_tienda_hasta', this.tienda.horario_martes_tienda_hasta);
        formData.append('b_horario_martes_tienda_no_laborable', this.tienda.horario_martes_tienda_no_laborable);
        formData.append('v_horario_miercoles_tienda_desde', this.tienda.horario_miercoles_tienda_desde);
        formData.append('v_horario_miercoles_tienda_hasta', this.tienda.horario_miercoles_tienda_hasta);
        formData.append('b_horario_miercoles_tienda_no_laborable', this.tienda.horario_miercoles_tienda_no_laborable);
        formData.append('v_horario_jueves_tienda_desde', this.tienda.horario_jueves_tienda_desde);
        formData.append('v_horario_jueves_tienda_hasta', this.tienda.horario_jueves_tienda_hasta);
        formData.append('b_horario_jueves_tienda_no_laborable', this.tienda.horario_jueves_tienda_no_laborable);
        formData.append('v_horario_viernes_tienda_desde', this.tienda.horario_viernes_tienda_desde);
        formData.append('v_horario_viernes_tienda_hasta', this.tienda.horario_viernes_tienda_hasta);
        formData.append('b_horario_viernes_tienda_no_laborable', this.tienda.horario_viernes_tienda_no_laborable);
        formData.append('v_horario_sabado_tienda_desde', this.tienda.horario_sabado_tienda_desde);
        formData.append('v_horario_sabado_tienda_hasta', this.tienda.horario_sabado_tienda_hasta);
        formData.append('v_horario_sabado_tienda_no_laborable', this.tienda.horario_sabado_tienda_no_laborable);
        formData.append('v_horario_domingo_tienda_desde', this.tienda.horario_domingo_tienda_desde);
        formData.append('v_horario_domingo_tienda_hasta', this.tienda.horario_domingo_tienda_hasta);
        formData.append('b_horario_domingo_tienda_no_laborable', this.tienda.horario_domingo_tienda_no_laborable);
        formData.append('v_descripcion', this.tienda.v_descripcion);
        formData.append('v_resena', this.tienda.v_resena);
        
        let yo = this;
        this.postMethodWithBearer('api/ecommerce/tiendas', formData, token)
          .then(response => {
            boton_registrar.button('reset');
            yo.$toastr('success', response.body.mensaje, "Acción exitosa");
            $('#modal').modal('hide');
            yo.$emit('store');
          }, errors => {
            // NO cerrar el modal cuando hay errores del servidor
            boton_registrar.button('reset');
            
            // Marcar que hay errores de validación ANTES de procesar la respuesta
            this.marcarModalConErrores();
            
            // Procesar errores sin cerrar el modal
            this.procesarErroresServidor(errors);
            
            // Mostrar mensaje específico para mantener el modal abierto
            this.$toastr('error', 'Por favor, corrige los errores indicados y vuelve a intentar', 'Errores de validación');
          });
          
        } catch (error) {
          boton_registrar.button('reset');
          console.error('Error al comprimir imágenes:', error);
          this.$toastr('error', 'Error al procesar las imágenes. Por favor, verifica que sean válidas.', 'Error de procesamiento');
        }
      },
      // Método para mostrar resumen de errores
      mostrarResumenErrores() {
        const errores = this.errors.items;
        if (errores.length > 0) {
          let mensaje = 'Errores encontrados:\n';
          errores.forEach(error => {
            mensaje += `• ${error.msg}\n`;
          });
          this.$toastr('error', mensaje, 'Corrige los siguientes errores');
          this.marcarModalConErrores();
        }
      },
      // Nuevo método para validar el formulario completo antes de enviar
      validarFormularioCompleto() {
        // Validar campos de ubicación
        if (!this.pais.value || !this.provincia.value || !this.ciudad.value) {
          this.$toastr('error', 'Debes seleccionar país, provincia y ciudad', 'Ubicación requerida');
          return false;
        }

        // Validar tipo de persona y documento
        if (!this.v_tipo_persona.value || !this.tipo_documento.value) {
          this.$toastr('error', 'Debes seleccionar tipo de registro y tipo de documento', 'Tipo de registro requerido');
          return false;
        }

        // Validar campos obligatorios de la tienda
        if (!this.tienda.v_documento || !this.tienda.v_nombre || !this.tienda.v_direccion) {
          this.$toastr('error', 'Debes completar documento, nombre y dirección de la tienda', 'Datos básicos requeridos');
          return false;
        }

        // Validar teléfono principal
        if (!this.tienda.v_telefono_principal) {
          this.$toastr('error', 'El teléfono principal es obligatorio', 'Teléfono requerido');
          return false;
        }

        // Validar teléfono secundario si se proporciona
        if (this.tienda.v_telefono_secundario && this.tienda.v_telefono_secundario.length < 10) {
          this.$toastr('error', 'El teléfono secundario debe tener al menos 10 caracteres', 'Teléfono secundario inválido');
          return false;
        }

        // Validar asesor y cliente
        if (!this.usuario_asesor.value || !this.usuario_cliente.value) {
          this.$toastr('error', 'Debes seleccionar asesor y cliente', 'Asesor y cliente requeridos');
          return false;
        }

        // Validar descripción y reseña
        if (!this.tienda.v_descripcion || !this.tienda.v_resena) {
          this.$toastr('error', 'Debes completar descripción y reseña de la tienda', 'Descripción requerida');
          return false;
        }

        // Validar imágenes obligatorias
        if (!this.tienda.v_rut || !this.tienda.v_camara_comercio || !this.tienda.v_contrato || !this.tienda.v_logo || !this.tienda.v_portada) {
          this.$toastr('error', 'Debes subir todas las imágenes requeridas (RUT, Cámara de Comercio, Contrato, Logo y Portada)', 'Imágenes requeridas');
          return false;
        }
        
        // Mostrar información sobre el tamaño total de archivos
        const totalSize = this.calcularTamanioTotalArchivos();
        if (totalSize > 10) { // Si es mayor a 10MB
          this.$toastr('warning', `Tamaño total de archivos: ${totalSize.toFixed(2)}MB. Las imágenes se comprimirán automáticamente.`, 'Archivos grandes detectados');
        }

        // Validar horarios (al menos un día debe tener horarios válidos)
        if (!this.validarHorarios()) {
          this.$toastr('error', 'Debes configurar al menos un día con horarios válidos', 'Horarios requeridos');
          return false;
        }

        return true;
      },
      // Nuevo método para validar horarios
      validarHorarios() {
        const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        let hayHorariosValidos = false;

        for (let dia of dias) {
          const noLaborable = this.tienda[`horario_${dia}_tienda_no_laborable`];
          const desde = this.tienda[`horario_${dia}_tienda_desde`];
          const hasta = this.tienda[`horario_${dia}_tienda_hasta`];

          if (!noLaborable && desde && hasta) {
            hayHorariosValidos = true;
            break;
          }
        }

        return hayHorariosValidos;
      },
      // Método para calcular el tamaño total de archivos
      calcularTamanioTotalArchivos() {
        let totalSize = 0;
        const archivos = [
          this.tienda.v_rut,
          this.tienda.v_camara_comercio,
          this.tienda.v_contrato,
          this.tienda.v_logo,
          this.tienda.v_portada
        ];
        
        archivos.forEach(archivo => {
          if (archivo && archivo.size) {
            totalSize += archivo.size / (1024 * 1024); // Convertir a MB
          }
        });
        
        return totalSize;
      },
      // Método para procesar errores del servidor sin cerrar el modal
      procesarErroresServidor(errors) {
        console.log('Procesando errores del servidor:', errors);
        
        if (errors.status === 422) {
          // Errores de validación del servidor
          for (let err in errors.body.errors) {
            errors.body.errors[err].forEach(function (value) {
              this.$toastr('error', value, 'Error de validación');
            }.bind(this));
          }
        } else if (errors.status === 401) {
          this.$toastr('error', "Las credenciales ingresadas no son correctas. Verifica y vuelve a intentarlo.", "Credenciales Inválidas");
        } else if (errors.status === 413) {
          this.$toastr('error', "Los archivos son demasiado grandes. Se comprimirán automáticamente en el próximo intento.", "Archivos muy grandes");
        } else {
          let message = errors.body.mensaje || errors.body.message || "Error desconocido del servidor";
          this.$toastr('error', message, "Error del servidor");
        }
      },

      // Método para marcar el modal cuando hay errores de validación
      marcarModalConErrores() {
        this.tieneErroresDeValidacion = true;
        const modalElement = document.getElementById('modal');
        if (modalElement) {
          modalElement.classList.add('has-validation-errors');
        }
      },
      // Método para limpiar la marca de errores cuando se corrigen
      limpiarMarcaErrores() {
        this.tieneErroresDeValidacion = false;
        const modalElement = document.getElementById('modal');
        if (modalElement) {
          modalElement.classList.remove('has-validation-errors');
        }
      },
      // Método para validar un campo específico en tiempo real
      validarCampo(campo) {
        this.$validator.validate(campo).then(() => {
          // Campo válido
        }).catch(() => {
          // Campo inválido - ya se muestra el error automáticamente
        });
      },
      // Método para limpiar todos los errores de validación
      limpiarErrores() {
        this.$validator.reset();
        this.limpiarMarcaErrores();
      },
    },
    components: {ModelSelect}
  }
</script>

<style scoped>
/* Estilos modernos para el formulario de registro de tiendas */

.modern-form {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.modern-form-group {
  margin-bottom: 25px;
  position: relative;
}

.modern-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-input,
.modern-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #ffffff;
  color: #2c3e50;
}

.modern-input:focus,
.modern-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  transform: translateY(-1px);
}

.modern-input::placeholder {
  color: #95a5a6;
  font-style: italic;
}

.modern-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
}

.modern-error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  display: block;
  font-weight: 500;
}

/* ===== ESTILOS ESPECÍFICOS PARA CENTRADO PERFECTO ===== */

/* Asegurar centrado absoluto del texto en model-select */
.modern-form .model-select .ui.fluid.search.selection.dropdown {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 48px !important;
  padding: 12px 16px !important;
  box-sizing: border-box !important;
}

/* Centrar texto de manera absoluta */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: calc(100% - 60px) !important;
  text-align: center !important;
  color: #2c3e50 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  pointer-events: none !important;
  z-index: 2 !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  height: auto !important;
  min-height: auto !important;
}

/* Estilos para texto por defecto */
.modern-form .model-select .ui.fluid.search.selection.dropdown .default.text {
  color: #95a5a6 !important;
  font-style: italic !important;
  font-weight: normal !important;
}

/* Estilos para texto seleccionado */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text:not(.default) {
  color: #2c3e50 !important;
  font-weight: 500 !important;
}

/* Asegurar que el icono no interfiera */
.modern-form .model-select .ui.fluid.search.selection.dropdown .dropdown.icon {
  position: absolute !important;
  right: 12px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: #95a5a6 !important;
  font-size: 16px !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

/* Override final para garantizar centrado */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text,
.modern-form .model-select .ui.fluid.search.selection.dropdown .default.text,
.modern-form .model-select .ui.fluid.search.selection.dropdown .text:not(.default) {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  text-align: center !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  pointer-events: none !important;
  z-index: 2 !important;
  width: calc(100% - 60px) !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  line-height: 1.2 !important;
  font-size: 14px !important;
}

/* ===== SOLUCIÓN AGRESIVA PARA VUE-SEARCH-SELECT ===== */

/* Estilos para cualquier estructura HTML que genere vue-search-select */
.modern-form .model-select .ui.fluid.search.selection.dropdown *,
.modern-form .model-select .v-select .dropdown-toggle * {
  text-align: center !important;
}

/* Estilos específicos para el texto dentro del dropdown */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text,
.modern-form .model-select .v-select .dropdown-toggle .form-control {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: calc(100% - 60px) !important;
  text-align: center !important;
  color: #2c3e50 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  pointer-events: none !important;
  z-index: 2 !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  height: auto !important;
  min-height: auto !important;
}

/* Estilos para el texto por defecto */
.modern-form .model-select .ui.fluid.search.selection.dropdown .default.text,
.modern-form .model-select .v-select .dropdown-toggle .form-control::placeholder {
  color: #95a5a6 !important;
  font-style: italic !important;
  font-weight: normal !important;
}

/* Estilos para el texto seleccionado */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text:not(.default),
.modern-form .model-select .v-select .dropdown-toggle .form-control:not([placeholder]) {
  color: #2c3e50 !important;
  font-weight: 500 !important;
}

/* Asegurar que el icono no interfiera */
.modern-form .model-select .ui.fluid.search.selection.dropdown .dropdown.icon,
.modern-form .model-select .v-select .dropdown-toggle .dropdown-toggle-button {
  position: absolute !important;
  right: 12px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: #95a5a6 !important;
  font-size: 16px !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

/* Override final para cualquier estructura HTML */
.modern-form .model-select .ui.fluid.search.selection.dropdown .text,
.modern-form .model-select .ui.fluid.search.selection.dropdown .default.text,
.modern-form .model-select .ui.fluid.search.selection.dropdown .text:not(.default),
.modern-form .model-select .v-select .dropdown-toggle .form-control,
.modern-form .model-select .v-select .dropdown-toggle .form-control::placeholder,
.modern-form .model-select .v-select .dropdown-toggle .form-control:not([placeholder]) {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  text-align: center !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  pointer-events: none !important;
  z-index: 2 !important;
  width: calc(100% - 60px) !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  line-height: 1.2 !important;
  font-size: 14px !important;
}

/* Estilos específicos para el input interno */
.modern-form .model-select .ui.fluid.search.selection.dropdown input,
.modern-form .model-select .v-select .dropdown-toggle input {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  background: transparent !important;
  color: #2c3e50 !important;
  font-size: 14px !important;
  text-align: center !important;
  outline: none !important;
  box-sizing: border-box !important;
}

/* Estilos para los horarios */
.modern-section-title {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.modern-day-container {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #e1e8ed;
}

.modern-day-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
}

.modern-time-input {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 13px;
  transition: all 0.3s ease;
  background: #ffffff;
  color: #2c3e50;
  margin-bottom: 8px;
}

.modern-time-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
}

.modern-checkbox-label {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  font-size: 12px;
  color: #7f8c8d;
  cursor: pointer;
}

.modern-checkbox {
  margin-right: 6px;
  transform: scale(1.1);
}

.modern-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #ffffff;
  color: #2c3e50;
  resize: vertical;
  min-height: 80px;
}

.modern-textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  transform: translateY(-1px);
}





/* Estilos para las imágenes */
.container-imgs {
  margin-bottom: 20px;
}

/* Estilos para cuando hay errores de validación */
.modal.has-validation-errors {
  background-color: rgba(231, 76, 60, 0.05);
}

.modal.has-validation-errors .modal-content {
  border: 2px solid #e74c3c;
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.3);
}

.modal.has-validation-errors .modal-header {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
}

.modal.has-validation-errors .modal-header .close {
  color: white;
  opacity: 0.8;
}

.modal.has-validation-errors .modal-header .close:hover {
  opacity: 1;
}

/* Indicador visual de errores */
.modal.has-validation-errors::before {
  content: "⚠️ Errores de validación detectados";
  position: fixed;
  top: 20px;
  right: 20px;
  background: #e74c3c;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
}

.img-previsualizar {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
}

.centrar-imagen {
  display: block;
  margin: 0 auto;
}

.imagen-previsualizar {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
}
</style>
