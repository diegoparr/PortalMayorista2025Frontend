<template>
  <form v-on:submit.prevent="registrar" class="modern-form">
    <div class="row">
      <div class="col-xs-12 col-md-4">
        <div class="form-group modern-form-group">
          <label for="v_pais" class="modern-label">País</label>
          <model-select 
            :options="paises" 
            id="v_pais" 
            v-model="pais" 
            class="form-control modern-select"
            v-on:input="seleccionarPais"
            data-placement="top" 
            title="Selecciona el país en que se encuentra la tienda"
            required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group modern-form-group">
          <label for="v_provincia" class="modern-label">Provincia</label>
          <model-select 
            :options="provincias" 
            id="v_provincia" 
            v-model="provincia" 
            class="form-control modern-select"
            v-on:input="seleccionarProvincia"
            data-placement="top" 
            title="Selecciona la provincia"
            required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group modern-form-group">
          <label for="v_ciudad" class="modern-label">Ciudad</label>
          <model-select 
            :options="ciudades" 
            id="v_ciudad" 
            v-model="ciudad" 
            class="form-control modern-select"
            data-placement="top" 
            title="Selecciona la ciudad"
            required>
          </model-select>
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
        <div class="form-group modern-form-group">
          <label for="v_tipo_documento" class="modern-label">Tipo de Documento</label>
          <model-select 
            :options="tipo_documentos" 
            id="v_tipo_documento" 
            v-model="tipo_documento" 
            class="form-control modern-select"
            data-placement="top"
            title="Selecciona el tipo de documento de identificación que posee la tienda"
            required>
          </model-select>
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
              v-validate="'required|min:3|max:25|numeric'">
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
            title="Ingresa el nombre de la tienda">
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
            v-validate="'min:5|max:25|numeric'">
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
            data-vv-as="teléfono"
            v-model="tienda.v_telefono_secundario" 
            v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_secundario')"
                class="help-block text-center modern-error">{{ errors.first('v_telefono_secundario')}}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="form-group modern-form-group">
          <label for="v_asesor" class="modern-label">Asesor</label>
          <model-select 
            :options="usuarios_asesores" 
            v-model="usuario_asesor" 
            class="form-control modern-select"
            id="v_asesor"
            data-placement="top" 
            title="Selecciona el asesor encargado de la tienda"
            required>
          </model-select>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="form-group modern-form-group">
          <label for="v_cliente" class="modern-label">Cliente</label>
          <model-select 
            :options="usuarios_clientes" 
            v-model="usuario_cliente" 
            class="form-control modern-select"
            id="v_cliente"
            data-placement="top" 
            title="Selecciona el cliente dueño o representante de la tienda"
            required>
          </model-select>
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
            v-validate="'required|min:5|max:255'">
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
                 :disabled="tienda.horario_lunes_tienda_no_laborable">
          <label for="laborable-lunes" class="modern-checkbox-label">
            <input type="checkbox" id="laborable-lunes" v-model="tienda.horario_lunes_tienda_no_laborable" class="modern-checkbox"> No laborable
          </label>
          <input type="time" class="form-control modern-time-input" placeholder="Hasta" v-model="tienda.horario_lunes_tienda_hasta"
                 name="horario_lunes_tienda_hasta" id="horario_lunes_tienda_hasta"
                 :disabled="tienda.horario_lunes_tienda_no_laborable">
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
                    name="v_descripcion" v-validate="'required|min:5'" data-vv-as="descripción"></textarea>
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
                   id="v_rut">
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
                   id="v_camara_comercio">
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
            <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                   name="v_contrato"
                   type="file"
                   v-on:change="onFileChangeContrato"
                   data-vv-as="imagen contrato"
                   accept="image/*"
                   id="v_contrato">
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
                   id="v_logo">
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
            <input v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
                   name="v_portada"
                   type="file"
                   v-on:change="onFileChangePortada"
                   data-vv-as="imagen portada"
                   accept="image/*"
                   id="v_portada">
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
                  data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando">
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
      }
    },
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
    watch: {
      // Aplicar estilos cuando el modal se abre
      '$parent.$refs.modal': {
        handler(newVal) {
          if (newVal && newVal.style && newVal.style.display === 'block') {
            console.log('🚀 Modal abierto, aplicando estilos...');
            setTimeout(() => {
              this.forceSelectStyles();
            }, 500);
          }
        },
        deep: true
      },
      // Aplicar estilos cuando los datos de los selects cambian
      paises: {
        handler() {
          console.log('📊 Datos de países cargados, aplicando estilos...');
          this.$nextTick(() => {
            this.applyStylesToElements();
          });
        }
      },
      provincias: {
        handler() {
          console.log('📊 Datos de provincias cargados, aplicando estilos...');
          this.$nextTick(() => {
            this.applyStylesToElements();
          });
        }
      },
      ciudades: {
        handler() {
          console.log('📊 Datos de ciudades cargados, aplicando estilos...');
          this.$nextTick(() => {
            this.applyStylesToElements();
          });
        }
      },
      usuarios_asesores: {
        handler() {
          console.log('📊 Datos de asesores cargados, aplicando estilos...');
          this.$nextTick(() => {
            this.applyStylesToElements();
          });
        }
      },
      usuarios_clientes: {
        handler() {
          console.log('📊 Datos de clientes cargados, aplicando estilos...');
          this.$nextTick(() => {
            this.applyStylesToElements();
          });
        }
      }
    },
    updated() {
      // Aplicar estilos cuando el componente se actualiza
      console.log('🔄 Componente actualizado, aplicando estilos...');
      this.$nextTick(() => {
        this.applyStylesToElements();
      });
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('modal_close');
      });
      
      // Diagnosticar el problema con los selects
      this.diagnoseSelects();
      
      // Forzar estilos después de un delay
      setTimeout(() => {
        this.forceSelectStyles();
      }, 1000);
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
      diagnoseSelects() {
        console.log('🔍 Diagnóstico de selects...');
        
        // Buscar todos los elementos que podrían ser selects
        const vSelects = document.querySelectorAll('.v-select');
        const modelSelects = document.querySelectorAll('.model-select');
        const searchSelects = document.querySelectorAll('[class*="search-select"]');
        const uiDropdowns = document.querySelectorAll('.ui.fluid.search.selection.dropdown');
        
        console.log('📊 Elementos encontrados:');
        console.log('- v-selects:', vSelects.length);
        console.log('- model-selects:', modelSelects.length);
        console.log('- search-selects:', searchSelects.length);
        console.log('- ui-dropdowns:', uiDropdowns.length);
        
        // Verificar estilos aplicados
        vSelects.forEach((select, index) => {
          const computedStyle = window.getComputedStyle(select);
          console.log(`📋 v-select ${index + 1}:`, {
            background: computedStyle.background,
            border: computedStyle.border,
            color: computedStyle.color,
            display: computedStyle.display
          });
        });
        
        // Verificar si los CSS están cargados
        const styleSheets = Array.from(document.styleSheets);
        console.log('📋 Stylesheets cargados:', styleSheets.length);
        styleSheets.forEach((sheet, index) => {
          if (sheet.href) {
            console.log(`- ${index + 1}: ${sheet.href}`);
          }
        });
      },
      
      forceSelectStyles() {
        console.log('🎨 Forzando estilos de selects...');
        
        // Crear estilos inline críticos
        const criticalStyles = `
          .v-select {
            position: relative !important;
            width: 100% !important;
            font-family: inherit !important;
            margin-bottom: 0 !important;
          }
          
          .v-select .dropdown-toggle {
            background: #ffffff !important;
            border: 2px solid #e1e8ed !important;
            border-radius: 8px !important;
            padding: 12px 16px !important;
            font-size: 14px !important;
            transition: all 0.3s ease !important;
            color: #2c3e50 !important;
            cursor: pointer !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            min-height: 48px !important;
            box-sizing: border-box !important;
            text-align: center !important;
            margin: 0 !important;
            outline: none !important;
          }
          
          .v-select .dropdown-toggle:hover {
            border-color: #3498db !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15) !important;
          }
          
          .v-select .dropdown-toggle:focus {
            outline: none !important;
            border-color: #3498db !important;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1) !important;
          }
          
          .v-select .dropdown-toggle .clear,
          .v-select .dropdown-toggle .dropdown-toggle-button {
            display: none !important;
          }
          
          .v-select .dropdown-toggle .form-control {
            text-align: center !important;
            width: 100% !important;
            border: none !important;
            background: transparent !important;
            font-size: 14px !important;
            color: #2c3e50 !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          .v-select .dropdown-toggle .form-control::placeholder {
            text-align: center !important;
            color: #95a5a6 !important;
            font-style: italic !important;
          }
          
          .v-select .dropdown-menu {
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 10000 !important;
            background: #ffffff !important;
            border: 2px solid #3498db !important;
            border-radius: 8px !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
            max-height: 200px !important;
            overflow-y: auto !important;
            margin-top: 2px !important;
            padding: 0 !important;
            list-style: none !important;
            width: 100% !important;
            box-sizing: border-box !important;
            animation: slideDown 0.2s ease-out !important;
          }
          
          .v-select .dropdown-menu li {
            padding: 0 !important;
            margin: 0 !important;
            list-style: none !important;
          }
          
          .v-select .dropdown-menu li a {
            display: block !important;
            padding: 12px 16px !important;
            color: #2c3e50 !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            border-bottom: 1px solid #f0f0f0 !important;
            font-size: 14px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            background: transparent !important;
            line-height: 1.5 !important;
            text-align: center !important;
          }
          
          .v-select .dropdown-menu li a:hover {
            background-color: #3498db !important;
            color: white !important;
            transform: translateX(5px) !important;
          }
          
          .v-select .dropdown-menu li:last-child a {
            border-bottom: none !important;
          }
          
          .v-select .dropdown-menu li.highlighted a {
            background-color: #3498db !important;
            color: white !important;
          }
          
          /* ESTILOS PARA UI DROPDOWNS (Semantic UI) */
          .ui.fluid.search.selection.dropdown {
            position: relative !important;
            width: 100% !important;
            font-family: inherit !important;
            margin-bottom: 0 !important;
            background: #ffffff !important;
            border: 2px solid #e1e8ed !important;
            border-radius: 8px !important;
            padding: 12px 16px !important;
            font-size: 14px !important;
            transition: all 0.3s ease !important;
            color: #2c3e50 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            min-height: 48px !important;
            box-sizing: border-box !important;
            text-align: center !important;
            margin: 0 !important;
            outline: none !important;
          }
          
          .ui.fluid.search.selection.dropdown:hover {
            border-color: #3498db !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15) !important;
          }
          
          .ui.fluid.search.selection.dropdown:focus {
            outline: none !important;
            border-color: #3498db !important;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1) !important;
          }
          
          .ui.fluid.search.selection.dropdown .text {
            text-align: center !important;
            width: 100% !important;
            border: none !important;
            background: transparent !important;
            font-size: 14px !important;
            color: #2c3e50 !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 24px !important;
          }
          
          .ui.fluid.search.selection.dropdown .default.text {
            text-align: center !important;
            color: #95a5a6 !important;
            font-style: italic !important;
          }
          
          .ui.fluid.search.selection.dropdown input {
            text-align: center !important;
            width: 100% !important;
            border: none !important;
            background: transparent !important;
            font-size: 14px !important;
            color: #2c3e50 !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 24px !important;
          }
          
          .ui.fluid.search.selection.dropdown input:focus {
            outline: none !important;
            box-shadow: none !important;
          }
          
          .ui.fluid.search.selection.dropdown .dropdown.icon {
            position: absolute !important;
            right: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            color: #95a5a6 !important;
            font-size: 16px !important;
          }
          
          .ui.fluid.search.selection.dropdown .menu {
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 10000 !important;
            background: #ffffff !important;
            border: 2px solid #3498db !important;
            border-radius: 8px !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
            max-height: 200px !important;
            overflow-y: auto !important;
            margin-top: 2px !important;
            padding: 0 !important;
            list-style: none !important;
            width: 100% !important;
            box-sizing: border-box !important;
            animation: slideDown 0.2s ease-out !important;
          }
          
          .ui.fluid.search.selection.dropdown .menu .item {
            display: block !important;
            padding: 12px 16px !important;
            color: #2c3e50 !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            border-bottom: 1px solid #f0f0f0 !important;
            font-size: 14px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            background: transparent !important;
            line-height: 1.5 !important;
            text-align: center !important;
          }
          
          .ui.fluid.search.selection.dropdown .menu .item:hover {
            background-color: #3498db !important;
            color: white !important;
            transform: translateX(5px) !important;
          }
          
          .ui.fluid.search.selection.dropdown .menu .item:last-child {
            border-bottom: none !important;
          }
          
          .ui.fluid.search.selection.dropdown .menu .item.selected {
            background-color: #3498db !important;
            color: white !important;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `;
        
        // Remover estilos anteriores si existen
        const existingStyle = document.getElementById('forced-select-styles');
        if (existingStyle) {
          existingStyle.remove();
        }
        
        // Crear y agregar los nuevos estilos
        const styleElement = document.createElement('style');
        styleElement.id = 'forced-select-styles';
        styleElement.textContent = criticalStyles;
        document.head.appendChild(styleElement);
        
        console.log('✅ Estilos forzados aplicados');
        
        // Aplicar estilos directamente a los elementos DOM
        this.applyStylesToElements();
        
        // Verificar que se aplicaron
        setTimeout(() => {
          const vSelects = document.querySelectorAll('.v-select');
          vSelects.forEach((select, index) => {
            const computedStyle = window.getComputedStyle(select);
            console.log(`✅ v-select ${index + 1} después de forzar:`, {
              background: computedStyle.background,
              border: computedStyle.border,
              color: computedStyle.color
            });
          });
        }, 100);
      },
      
      applyStylesToElements() {
        console.log('🎯 Aplicando estilos directamente a elementos...');
        
        // Buscar todos los elementos ui dropdown (que es lo que realmente se está usando)
        const uiDropdowns = document.querySelectorAll('.ui.fluid.search.selection.dropdown');
        
        console.log(`🎨 Encontrados ${uiDropdowns.length} elementos ui dropdown`);
        
        uiDropdowns.forEach((dropdown, index) => {
          console.log(`🎨 Aplicando estilos a ui dropdown ${index + 1}`);
          
          // Aplicar estilos al contenedor principal
          dropdown.style.position = 'relative';
          dropdown.style.width = '100%';
          dropdown.style.fontFamily = 'inherit';
          dropdown.style.marginBottom = '0';
          
          // Aplicar estilos al dropdown principal
          dropdown.style.background = '#ffffff';
          dropdown.style.border = '2px solid #e1e8ed';
          dropdown.style.borderRadius = '8px';
          dropdown.style.padding = '12px 16px';
          dropdown.style.fontSize = '14px';
          dropdown.style.transition = 'all 0.3s ease';
          dropdown.style.color = '#2c3e50';
          dropdown.style.cursor = 'pointer';
          dropdown.style.width = '100%';
          dropdown.style.display = 'flex';
          dropdown.style.alignItems = 'center';
          dropdown.style.justifyContent = 'space-between';
          dropdown.style.minHeight = '48px';
          dropdown.style.boxSizing = 'border-box';
          dropdown.style.textAlign = 'center';
          dropdown.style.margin = '0';
          dropdown.style.outline = 'none';
          
          // Aplicar estilos al texto interno
          const textElement = dropdown.querySelector('.text');
          if (textElement) {
            console.log(`  - Aplicando estilos a text element`);
            textElement.style.textAlign = 'center';
            textElement.style.width = '100%';
            textElement.style.border = 'none';
            textElement.style.background = 'transparent';
            textElement.style.fontSize = '14px';
            textElement.style.color = '#2c3e50';
            textElement.style.padding = '0';
            textElement.style.margin = '0';
            textElement.style.boxShadow = 'none';
            textElement.style.display = 'flex';
            textElement.style.alignItems = 'center';
            textElement.style.justifyContent = 'center';
            textElement.style.minHeight = '24px';
          }
          
          // Aplicar estilos al input interno
          const inputElement = dropdown.querySelector('input');
          if (inputElement) {
            console.log(`  - Aplicando estilos a input element`);
            inputElement.style.textAlign = 'center';
            inputElement.style.width = '100%';
            inputElement.style.border = 'none';
            inputElement.style.background = 'transparent';
            inputElement.style.fontSize = '14px';
            inputElement.style.color = '#2c3e50';
            inputElement.style.padding = '0';
            inputElement.style.margin = '0';
            inputElement.style.boxShadow = 'none';
            inputElement.style.display = 'flex';
            inputElement.style.alignItems = 'center'; 
            inputElement.style.justifyContent = 'center';
            inputElement.style.minHeight = '24px';
          }
          
          // Aplicar estilos al icono del dropdown
          const iconElement = dropdown.querySelector('.dropdown.icon');
          if (iconElement) {
            console.log(`  - Aplicando estilos a dropdown icon`);
            iconElement.style.position = 'absolute';
            iconElement.style.right = '12px';
            iconElement.style.top = '50%';
            iconElement.style.transform = 'translateY(-50%)';
            iconElement.style.color = '#95a5a6';
            iconElement.style.fontSize = '16px';
          }
          
          // Aplicar estilos al menú dropdown
          const menuElement = dropdown.querySelector('.menu');
          if (menuElement) {
            console.log(`  - Aplicando estilos a menu element`);
            menuElement.style.position = 'absolute';
            menuElement.style.top = '100%';
            menuElement.style.left = '0';
            menuElement.style.right = '0';
            menuElement.style.zIndex = '10000';
            menuElement.style.background = '#ffffff';
            menuElement.style.border = '2px solid #3498db';
            menuElement.style.borderRadius = '8px';
            menuElement.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            menuElement.style.maxHeight = '200px';
            menuElement.style.overflowY = 'auto';
            menuElement.style.marginTop = '2px';
            menuElement.style.padding = '0';
            menuElement.style.listStyle = 'none';
            menuElement.style.width = '100%';
            menuElement.style.boxSizing = 'border-box';
          }
          
          // Aplicar estilos a los items del menú
          const menuItems = dropdown.querySelectorAll('.menu .item');
          menuItems.forEach((item, itemIndex) => {
            console.log(`  - Aplicando estilos a menu item ${itemIndex + 1}`);
            item.style.display = 'block';
            item.style.padding = '12px 16px';
            item.style.color = '#2c3e50';
            item.style.textDecoration = 'none';
            item.style.transition = 'all 0.3s ease';
            item.style.borderBottom = '1px solid #f0f0f0';
            item.style.fontSize = '14px';
            item.style.whiteSpace = 'nowrap';
            item.style.overflow = 'hidden';
            item.style.textOverflow = 'ellipsis';
            item.style.background = 'transparent';
            item.style.lineHeight = '1.5';
            item.style.textAlign = 'center';
          });
        });
        
        // También buscar elementos v-select por si acaso
        const vSelects = document.querySelectorAll('.v-select');
        if (vSelects.length > 0) {
          console.log(`🎨 También aplicando estilos a ${vSelects.length} elementos v-select`);
          vSelects.forEach((vSelect, index) => {
            console.log(`🎨 Aplicando estilos a v-select ${index + 1}`);
            
            // Aplicar estilos al contenedor principal
            vSelect.style.position = 'relative';
            vSelect.style.width = '100%';
            vSelect.style.fontFamily = 'inherit';
            vSelect.style.marginBottom = '0';
            
            // Buscar y aplicar estilos al dropdown toggle
            const dropdownToggle = vSelect.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
              console.log(`  - Aplicando estilos a dropdown-toggle`);
              dropdownToggle.style.background = '#ffffff';
              dropdownToggle.style.border = '2px solid #e1e8ed';
              dropdownToggle.style.borderRadius = '8px';
              dropdownToggle.style.padding = '12px 16px';
              dropdownToggle.style.fontSize = '14px';
              dropdownToggle.style.transition = 'all 0.3s ease';
              dropdownToggle.style.color = '#2c3e50';
              dropdownToggle.style.cursor = 'pointer';
              dropdownToggle.style.width = '100%';
              dropdownToggle.style.display = 'flex';
              dropdownToggle.style.alignItems = 'center';
              dropdownToggle.style.justifyContent = 'space-between';
              dropdownToggle.style.minHeight = '48px';
              dropdownToggle.style.boxSizing = 'border-box';
              dropdownToggle.style.textAlign = 'center';
              dropdownToggle.style.margin = '0';
              dropdownToggle.style.outline = 'none';
              
              // Ocultar elementos innecesarios
              const clearButton = dropdownToggle.querySelector('.clear');
              const toggleButton = dropdownToggle.querySelector('.dropdown-toggle-button');
              if (clearButton) clearButton.style.display = 'none';
              if (toggleButton) toggleButton.style.display = 'none';
              
              // Aplicar estilos al input interno
              const formControl = dropdownToggle.querySelector('.form-control');
              if (formControl) {
                console.log(`  - Aplicando estilos a form-control`);
                formControl.style.textAlign = 'center';
                formControl.style.width = '100%';
                formControl.style.border = 'none';
                formControl.style.background = 'transparent';
                formControl.style.fontSize = '14px';
                formControl.style.color = '#2c3e50';
                formControl.style.padding = '0';
                formControl.style.margin = '0';
                formControl.style.boxShadow = 'none';
                formControl.style.display = 'flex';
                formControl.style.alignItems = 'center';
                formControl.style.justifyContent = 'center';
              }
            }
            
            // Buscar y aplicar estilos al dropdown menu
            const dropdownMenu = vSelect.querySelector('.dropdown-menu');
            if (dropdownMenu) {
              console.log(`  - Aplicando estilos a dropdown-menu`);
              dropdownMenu.style.position = 'absolute';
              dropdownMenu.style.top = '100%';
              dropdownMenu.style.left = '0';
              dropdownMenu.style.right = '0';
              dropdownMenu.style.zIndex = '10000';
              dropdownMenu.style.background = '#ffffff';
              dropdownMenu.style.border = '2px solid #3498db';
              dropdownMenu.style.borderRadius = '8px';
              dropdownMenu.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
              dropdownMenu.style.maxHeight = '200px';
              dropdownMenu.style.overflowY = 'auto';
              dropdownMenu.style.marginTop = '2px';
              dropdownMenu.style.padding = '0';
              dropdownMenu.style.listStyle = 'none';
              dropdownMenu.style.width = '100%';
              dropdownMenu.style.boxSizing = 'border-box';
            }
          });
        }
        
        console.log('✅ Estilos aplicados directamente a elementos');
      },
      
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
        this.tienda.v_rut = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageRut(files[0]);
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
      },
      onFileChangeCamaraComercio(e) {
        this.tienda.v_camara_comercio = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageCamaraComercio(files[0]);
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
      },
      onFileChangeContrato(e) {
        this.tienda.v_contrato = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageContrato(files[0]);
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
      },
      onFileChangePortada(e) {
        this.tienda.v_portada = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImagePortada(files[0]);
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
      },
      onFileChangeLogo(e) {
        this.tienda.v_logo = event.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImageLogo(files[0]);
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
      },
      registrar() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
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
          formData.append('rut', this.tienda.v_rut);
          formData.append('camara_comercio', this.tienda.v_camara_comercio);
          formData.append('contrato', this.tienda.v_contrato);
          formData.append('logo', this.tienda.v_logo);
          formData.append('portada', this.tienda.v_portada);
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
          formData.append('b_horario_sabado_tienda_no_laborable', this.tienda.horario_sabado_tienda_no_laborable);
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
              // NO cerrar el modal cuando hay errores
              boton_registrar.button('reset');
              this.mapErrorsResponses(this, errors);
            });
        }).catch(() => {
          // NO cerrar el modal cuando hay errores de validación
          let boton_registrar = $('#submitButton');
          boton_registrar.button('reset');
          this.$toastr('error', 'Por favor, corrige los errores en el formulario', 'Errores de validación');
        });
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

.modern-section-title {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 700;
  margin: 30px 0 20px 0;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}

.modern-section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2980b9);
  border-radius: 2px;
}

.modern-day-container {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.modern-day-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  margin: 5px 0;
  background: #ffffff;
  color: #2c3e50;
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
  margin: 10px 0;
  font-size: 12px;
  color: #7f8c8d;
  cursor: pointer;
}

.modern-checkbox {
  margin-right: 8px;
  transform: scale(1.2);
  accent-color: #3498db;
}

.modern-textarea {
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
}

/* Botón de envío moderno */
.btn-registrar {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border: none;
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.btn-registrar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
  background: linear-gradient(135deg, #2980b9, #1f5f8b);
}

.btn-registrar:active {
  transform: translateY(0);
}

/* Responsive design */
@media (max-width: 768px) {
  .modern-form {
    padding: 20px;
    margin: 10px;
  }
  
  .modern-day-container {
    padding: 15px;
    margin: 5px 0;
  }
  
  .modern-section-title {
    font-size: 16px;
  }
}

/* Animaciones suaves */
.modern-form-group {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estados de error mejorados */
.modern-form-group.has-error .modern-input,
.modern-form-group.has-error .modern-select {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.modern-form-group.has-error .modern-label {
  color: #e74c3c;
}

/* Mejoras para imágenes */
.container-imgs {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  border: 2px dashed #dee2e6;
  transition: all 0.3s ease;
}

.container-imgs:hover {
  border-color: #3498db;
  background: #f0f8ff;
}

/* Estilos para las imágenes previas */
.img-preview {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

/* Botones de eliminar imagen */
.btn-remove-img {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-remove-img:hover {
  background: #c0392b;
  transform: scale(1.05);
}
</style>
