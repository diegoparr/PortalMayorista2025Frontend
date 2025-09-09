<template>
  <div class="shop-update-modal">
    <loader v-if="!peticionesCompletas"></loader>
    <form v-on:submit.prevent="actualizar" v-else class="modern-form">
      <!-- Header del Modal -->
      <div class="modal-header-custom">
        <div class="header-icon">
          <i class="fa fa-edit"></i>
        </div>
        <div class="header-content">
          <h2 class="shop-title">Editar Tienda</h2>
          <p class="shop-subtitle">Modifica la información de la tienda</p>
        </div>
      </div>

      <!-- Información de Ubicación -->
      <div class="info-section">
        <h3 class="section-title">
          <i class="fa fa-map-marker-alt"></i>
          Ubicación
        </h3>
        <div class="form-grid">
          <div class="form-group-modern">
            <label for="v_pais" class="modern-label">
              <i class="fa fa-globe"></i>
              País
            </label>
            <model-select :options="paises" id="v_pais" v-model="pais" class="modern-select"
                         v-on:input="seleccionarPais"
                        data-placement="left" title="Selecciona el país en que se encuentra la tienda"
                        placeholder="Selecciona un país"
                        required>
          </model-select>
        </div>
          <div class="form-group-modern">
            <label for="v_provincia" class="modern-label">
              <i class="fa fa-map"></i>
              Provincia
            </label>
            <model-select :options="provincias" id="v_provincia" v-model="provincia" class="modern-select"
                         v-on:input="seleccionarProvincia"
                        data-placement="left" title="Selecciona la provincia"
                        placeholder="Selecciona una provincia"
                        required>
          </model-select>
        </div>
          <div class="form-group-modern">
            <label for="v_ciudad" class="modern-label">
              <i class="fa fa-city"></i>
              Ciudad
            </label>
            <model-select :options="ciudades" id="v_ciudad" v-model="ciudad" class="modern-select"
                        data-placement="left" title="Selecciona la ciudad"
                        placeholder="Selecciona una ciudad"
                        required>
          </model-select>
        </div>
      </div>
      </div>
      <!-- Información de la Tienda -->
      <div class="info-section">
        <h3 class="section-title">
          <i class="fa fa-store"></i>
          Información de la Tienda
        </h3>
        <div class="form-grid">
          <div class="form-group-modern">
            <label for="v_tipo_persona" class="modern-label">
              <i class="fa fa-user-tag"></i>
              Tipo de Registro
            </label>
            <model-select v-on:input="seleccionarTipoEmpresa" :options="tipoPersonas" id="v_tipo_persona" v-model="v_tipo_persona" class="modern-select"
                        data-placement="left"
                        title="Selecciona el tipo de Persona"
                        placeholder="Selecciona tipo de registro"
                        required>
          </model-select>
        </div>
          <div class="form-group-modern">
            <label for="v_tipo_documento" class="modern-label">
              <i class="fa fa-id-card"></i>
              Tipo de Documento
            </label>
            <model-select :options="tipo_documentos" id="v_tipo_documento" v-model="tipo_documento" class="modern-select"
                        data-placement="left"
                        title="Selecciona el tipo de documento de identificación que posee la tienda"
                        placeholder="Selecciona tipo de documento"
                        required>
          </model-select>
        </div>
          <div class="form-group-modern">
            <label for="v_documento" class="modern-label">
              <i class="fa fa-hashtag"></i>
              Número de Documento
            </label>
            <input placeholder="Número de documento" name="v_documento" type="text" class="modern-input"
                  data-placement="left" required id="v_documento"
                 title="Ingresa el número de documento de identificación"
                 data-vv-as="documento de identificación"
                 v-model="shop.v_documento" v-validate="'required|min:3|max:25|numeric'">
          <span v-show="errors.has('v_documento')"
                  class="modern-error">{{ errors.first('v_documento')}}</span>
        </div>
      </div>
        <div class="form-grid">
          <div class="form-group-modern">
            <label for="v_nombre" class="modern-label">
              <i class="fa fa-store"></i>
              Nombre de la Tienda
            </label>
            <input placeholder="Nombre de la Tienda" name="v_nombre" type="text" class="modern-input"
                  data-placement="left" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="nombre de la tienda" v-model="shop.v_nombre" required id="v_nombre"
                 title="Ingresa el nombre de la tienda" v-on:change="nombreActualizar">
          <span v-show="errors.has('v_nombre')"
                  class="modern-error">{{ errors.first('v_nombre')}}</span>
        </div>
          <div class="form-group-modern">
            <label for="v_telefono_principal" class="modern-label">
              <i class="fa fa-phone"></i>
              Teléfono Principal
            </label>
            <input placeholder="Teléfono principal" name="v_telefono_principal" type="text" class="modern-input"
                  data-placement="left" id="v_telefono_principal"
                 title="Ingresa el teléfono" data-vv-as="teléfono" v-on:change="telefonoPrincipal"
                 v-model="shop.v_telefono_principal" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_principal')"
                  class="modern-error">{{ errors.first('v_telefono_principal')}}</span>
        </div>
          <div class="form-group-modern">
            <label for="v_telefono_secundario" class="modern-label">
              <i class="fa fa-mobile-alt"></i>
              Teléfono Secundario
            </label>
            <input placeholder="Teléfono Secundario" name="v_telefono_secundario" type="text" class="modern-input"
                  data-placement="left" id="v_telefono_secundario"
                 title="Ingresa el teléfono" data-vv-as="teléfono" v-on:change="telefonoSecundario"
                 v-model="shop.v_telefono_secundario" v-validate="'min:5|max:25|numeric'">
          <span v-show="errors.has('v_telefono_secundario')"
                  class="modern-error">{{ errors.first('v_telefono_secundario')}}</span>
        </div>
      </div>
        <div class="form-grid">
          <div class="form-group-modern">
            <label for="v_asesor" class="modern-label">
              <i class="fa fa-user-tie"></i>
              Asesor
            </label>
            <model-select :options="usuarios_asesores" v-model="usuario_asesor" class="modern-select"
                         id="v_asesor"
                        data-placement="left" title="Selecciona el asesor encargado de la tienda"
                        placeholder="Selecciona asesor"
                        required>
          </model-select>
        </div>
          <div class="form-group-modern">
            <label for="v_cliente" class="modern-label">
              <i class="fa fa-user"></i>
              Cliente
            </label>
            <model-select :options="usuarios_clientes" v-model="usuario_cliente" class="modern-select"
                         id="v_cliente"
                        data-placement="left" title="Selecciona el cliente dueño o representante de la tienda"
                        placeholder="Selecciona cliente"
                        required>
          </model-select>
        </div>
      </div>
        <div class="form-group-modern full-width">
          <label for="v_direccion" class="modern-label">
            <i class="fa fa-map-marker-alt"></i>
            Dirección
          </label>
          <input placeholder="Dirección" name="v_direccion" type="text" class="modern-input"
                  data-placement="left" required id="v_direccion" v-on:change="direccionPrincipal"
                 title="Ingresa la dirección principal de la tienda" data-vv-as="dirección"
                 v-model="shop.v_direccion" v-validate="'required|min:5|max:255'">
          <span v-show="errors.has('v_direccion')"
                class="modern-error">{{ errors.first('v_direccion')}}</span>
        </div>
      </div>
      <!-- Horarios de Atención -->
      <div class="info-section">
        <h3 class="section-title">
          <i class="fa fa-clock"></i>
          Horarios de Atención
        </h3>
        <div class="schedule-grid">
          <div class="schedule-card" :class="{ 'no-laborable': shop.b_horario_lunes_tienda_no_laborable }">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <h4>Lunes</h4>
        </div>
            <div class="time-inputs">
              <div class="time-group">
                <label>Desde</label>
                <input type="time" class="modern-time-input" placeholder="Desde" v-model="shop.v_horario_lunes_tienda_desde"
                   name="horario_lunes_tienda_desde" id="horario_lunes_tienda_desde"
                   :disabled="shop.b_horario_lunes_tienda_no_laborable">
              </div>
              <div class="time-group">
                <label>Hasta</label>
                <input type="time" class="modern-time-input" placeholder="Hasta" v-model="shop.v_horario_lunes_tienda_hasta"
                   name="horario_lunes_tienda_hasta" id="horario_lunes_tienda_hasta"
                   :disabled="shop.b_horario_lunes_tienda_no_laborable">
              </div>
            </div>
            <div class="no-laborable-check">
              <label class="checkbox-modern">
                <input type="checkbox" id="laborable-lunes" v-model="shop.b_horario_lunes_tienda_no_laborable">
                <span class="checkmark"></span>
                No laborable
              </label>
            </div>
            <div class="error-messages">
            <span v-show="errors.has('horario_lunes_tienda_desde')"
                    class="modern-error">{{ errors.first('horario_lunes_tienda_desde')}}</span>
            <span v-show="errors.has('horario_lunes_tienda_hasta')"
                    class="modern-error">{{ errors.first('horario_lunes_tienda_hasta')}}</span>
          </div>
        </div>
          <div class="schedule-card" :class="{ 'no-laborable': shop.b_horario_martes_tienda_no_laborable }">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <h4>Martes</h4>
            </div>
            <div class="time-inputs">
              <div class="time-group">
                <label>Desde</label>
                <input type="time" class="modern-time-input" placeholder="Desde" v-model="shop.v_horario_martes_tienda_desde"
                   name="horario_martes_tienda_desde" id="horario_martes_tienda_desde"
                   :disabled="shop.b_horario_martes_tienda_no_laborable">
              </div>
              <div class="time-group">
                <label>Hasta</label>
                <input type="time" class="modern-time-input" placeholder="Hasta" v-model="shop.v_horario_martes_tienda_hasta"
                   name="horario_martes_tienda_hasta" id="horario_martes_tienda_hasta"
                   :disabled="shop.b_horario_martes_tienda_no_laborable">
              </div>
            </div>
            <div class="no-laborable-check">
              <label class="checkbox-modern">
                <input type="checkbox" id="laborable-martes" v-model="shop.b_horario_martes_tienda_no_laborable">
                <span class="checkmark"></span>
                No laborable
              </label>
            </div>
            <div class="error-messages">
            <span v-show="errors.has('horario_martes_tienda_desde')"
                    class="modern-error">{{ errors.first('horario_martes_tienda_desde')}}</span>
            <span v-show="errors.has('horario_martes_tienda_hasta')"
                    class="modern-error">{{ errors.first('horario_martes_tienda_hasta')}}</span>
          </div>
        </div>
          <div class="schedule-card" :class="{ 'no-laborable': shop.b_horario_miercoles_tienda_no_laborable }">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <h4>Miércoles</h4>
            </div>
            <div class="time-inputs">
              <div class="time-group">
                <label>Desde</label>
                <input type="time" class="modern-time-input" placeholder="Desde" v-model="shop.v_horario_miercoles_tienda_desde"
                   name="horario_miercoles_tienda_desde" id="horario_miercoles_tienda_desde"
                   :disabled="shop.b_horario_miercoles_tienda_no_laborable">
              </div>
              <div class="time-group">
                <label>Hasta</label>
                <input type="time" class="modern-time-input" placeholder="Hasta" v-model="shop.v_horario_miercoles_tienda_hasta"
                   name="horario_miercoles_tienda_hasta" id="horario_miercoles_tienda_hasta"
                   :disabled="shop.b_horario_miercoles_tienda_no_laborable">
              </div>
            </div>
            <div class="no-laborable-check">
              <label class="checkbox-modern">
                <input type="checkbox" id="laborable-miercoles" v-model="shop.b_horario_miercoles_tienda_no_laborable">
                <span class="checkmark"></span>
                No laborable
              </label>
            </div>
            <div class="error-messages">
            <span v-show="errors.has('horario_miercoles_tienda_desde')"
                    class="modern-error">{{ errors.first('horario_miercoles_tienda_desde')}}</span>
            <span v-show="errors.has('horario_miercoles_tienda_hasta')"
                    class="modern-error">{{ errors.first('horario_miercoles_tienda_hasta')}}</span>
          </div>
        </div>
          
          <div class="schedule-card" :class="{ 'no-laborable': shop.b_horario_jueves_tienda_no_laborable }">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <h4>Jueves</h4>
            </div>
            <div class="time-inputs">
              <div class="time-group">
                <label>Desde</label>
                <input type="time" class="modern-time-input" placeholder="Desde" v-model="shop.v_horario_jueves_tienda_desde"
                   name="horario_jueves_tienda_desde" id="horario_jueves_tienda_desde"
                   :disabled="shop.b_horario_jueves_tienda_no_laborable">
              </div>
              <div class="time-group">
                <label>Hasta</label>
                <input type="time" class="modern-time-input" placeholder="Hasta" v-model="shop.v_horario_jueves_tienda_hasta"
                   name="horario_jueves_tienda_hasta" id="horario_jueves_tienda_hasta"
                   :disabled="shop.b_horario_jueves_tienda_no_laborable">
              </div>
            </div>
            <div class="no-laborable-check">
              <label class="checkbox-modern">
                <input type="checkbox" id="laborable-jueves" v-model="shop.b_horario_jueves_tienda_no_laborable">
                <span class="checkmark"></span>
                No laborable
              </label>
            </div>
            <div class="error-messages">
            <span v-show="errors.has('horario_jueves_tienda_desde')"
                    class="modern-error">{{ errors.first('horario_jueves_tienda_desde')}}</span>
            <span v-show="errors.has('horario_jueves_tienda_hasta')"
                    class="modern-error">{{ errors.first('horario_jueves_tienda_hasta')}}</span>
          </div>
        </div>
          
          <div class="schedule-card" :class="{ 'no-laborable': shop.b_horario_viernes_tienda_no_laborable }">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <h4>Viernes</h4>
      </div>
            <div class="time-inputs">
              <div class="time-group">
                <label>Desde</label>
                <input type="time" class="modern-time-input" placeholder="Desde" v-model="shop.v_horario_viernes_tienda_desde"
                   name="horario_viernes_tienda_desde" id="horario_viernes_tienda_desde"
                   :disabled="shop.b_horario_viernes_tienda_no_laborable">
              </div>
              <div class="time-group">
                <label>Hasta</label>
                <input type="time" class="modern-time-input" placeholder="Hasta" v-model="shop.v_horario_viernes_tienda_hasta"
                   name="horario_viernes_tienda_hasta" id="horario_viernes_tienda_hasta"
                   :disabled="shop.b_horario_viernes_tienda_no_laborable">
              </div>
            </div>
            <div class="no-laborable-check">
              <label class="checkbox-modern">
                <input type="checkbox" id="laborable-viernes" v-model="shop.b_horario_viernes_tienda_no_laborable">
                <span class="checkmark"></span>
                No laborable
              </label>
            </div>
            <div class="error-messages">
            <span v-show="errors.has('horario_viernes_tienda_desde')"
                    class="modern-error">{{ errors.first('horario_viernes_tienda_desde')}}</span>
            <span v-show="errors.has('horario_viernes_tienda_hasta')"
                    class="modern-error">{{ errors.first('horario_viernes_tienda_hasta')}}</span>
          </div>
        </div>
          
          <div class="schedule-card" :class="{ 'no-laborable': shop.b_horario_sabado_tienda_no_laborable }">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <h4>Sábado</h4>
            </div>
            <div class="time-inputs">
              <div class="time-group">
                <label>Desde</label>
                <input type="time" class="modern-time-input" placeholder="Desde" v-model="shop.v_horario_sabado_tienda_desde"
                   name="horario_sabado_tienda_desde" id="horario_sabado_tienda_desde"
                   :disabled="shop.b_horario_sabado_tienda_no_laborable">
              </div>
              <div class="time-group">
                <label>Hasta</label>
                <input type="time" class="modern-time-input" placeholder="Hasta" v-model="shop.v_horario_sabado_tienda_hasta"
                   name="horario_sabado_tienda_hasta" id="horario_sabado_tienda_hasta"
                   :disabled="shop.b_horario_sabado_tienda_no_laborable">
              </div>
            </div>
            <div class="no-laborable-check">
              <label class="checkbox-modern">
                <input type="checkbox" id="laborable-sabado" v-model="shop.b_horario_sabado_tienda_no_laborable">
                <span class="checkmark"></span>
                No laborable
              </label>
            </div>
            <div class="error-messages">
            <span v-show="errors.has('horario_sabado_tienda_desde')"
                    class="modern-error">{{ errors.first('horario_sabado_tienda_desde')}}</span>
            <span v-show="errors.has('horario_sabado_tienda_hasta')"
                    class="modern-error">{{ errors.first('horario_sabado_tienda_hasta')}}</span>
          </div>
        </div>
          
          <div class="schedule-card" :class="{ 'no-laborable': shop.b_horario_domingo_tienda_no_laborable }">
            <div class="day-header">
              <i class="fa fa-calendar-day"></i>
              <h4>Domingo</h4>
            </div>
            <div class="time-inputs">
              <div class="time-group">
                <label>Desde</label>
                <input type="time" class="modern-time-input" placeholder="Desde" v-model="shop.v_horario_domingo_tienda_desde"
                   name="horario_domingo_tienda_desde" id="horario_domingo_tienda_desde"
                   :disabled="shop.b_horario_domingo_tienda_no_laborable">
              </div>
              <div class="time-group">
                <label>Hasta</label>
                <input type="time" class="modern-time-input" placeholder="Hasta" v-model="shop.v_horario_domingo_tienda_hasta"
                   name="horario_domingo_tienda_hasta" id="horario_domingo_tienda_hasta"
                   :disabled="shop.b_horario_domingo_tienda_no_laborable">
              </div>
            </div>
            <div class="no-laborable-check">
              <label class="checkbox-modern">
                <input type="checkbox" id="laborable-domingo" v-model="shop.b_horario_domingo_tienda_no_laborable">
                <span class="checkmark"></span>
                No laborable
              </label>
            </div>
            <div class="error-messages">
            <span v-show="errors.has('horario_domingo_tienda_desde')"
                    class="modern-error">{{ errors.first('horario_domingo_tienda_desde')}}</span>
            <span v-show="errors.has('horario_domingo_tienda_hasta')"
                    class="modern-error">{{ errors.first('horario_domingo_tienda_hasta')}}</span>
          </div>
        </div>
      </div>
      </div>
      <!-- Descripción y Reseña -->
      <div class="info-section">
        <h3 class="section-title">
          <i class="fa fa-info-circle"></i>
          Información Adicional
        </h3>
        <div class="form-grid">
          <div class="form-group-modern">
            <label for="v_descripcion" class="modern-label">
              <i class="fa fa-align-left"></i>
              Descripción
            </label>
            <textarea class="modern-textarea" id="v_descripcion" rows="4"
                      v-model="shop.v_descripcion"
                      name="v_descripcion" v-validate="'required|min:5|max:255'" data-vv-as="descripción"
                      placeholder="Describe los productos y servicios de la tienda"></textarea>
            <span v-show="errors.has('v_descripcion')"
                  class="modern-error">{{ errors.first('v_descripcion')}}</span>
          </div>
          <div class="form-group-modern">
            <label for="v_resena" class="modern-label">
              <i class="fa fa-star"></i>
              Reseña
            </label>
            <textarea class="modern-textarea" id="v_resena" rows="4" name="v_resena"
                      v-model="shop.v_resena"
                      v-validate="'required|min:5|max:50'" data-vv-as="reseña"
                      placeholder="Reseña o testimonio de la tienda"></textarea>
            <span v-show="errors.has('v_resena')"
                  class="modern-error">{{ errors.first('v_resena')}}</span>
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
      <!-- Botón de Envío -->
      <div class="form-actions">
        <button type="submit" id="submitButton" :disabled="deshabilitar" class="btn-modern btn-update">
          <i class="fa fa-save"></i>
          <span>Actualizar Tienda</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Estilos para el modal de edición de tienda */
.shop-update-modal {
  padding: 0;
  border-radius: 0;
  background: #fff;
  max-height: 80vh;
  overflow-y: auto;
}

.modern-form {
  padding: 0;
}

/* Header del Modal */
.modal-header-custom {
  background: linear-gradient(135deg, #ff6633 0%, #7c7c7c 100%);
  color: white;
  padding: 25px 30px;
  margin: -20px -20px 30px -20px;
  border-radius: 0;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 15px rgba(255,102,51,0.3);
}

.header-icon {
  font-size: 2.5rem;
  opacity: 0.9;
}

.header-content h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.header-content p {
  margin: 5px 0 0 0;
  opacity: 0.9;
  font-size: 1rem;
}

/* Secciones de Información */
.info-section {
  margin-bottom: 30px;
  padding: 0 20px;
}

.section-title {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  border-bottom: 2px solid #ff6633;
  padding-bottom: 10px;
}

.section-title i {
  color: #ff6633;
  font-size: 1.2rem;
}

/* Grid de Formulario */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.form-group-modern {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group-modern.full-width {
  grid-column: 1 / -1;
}

/* Labels Modernos */
.modern-label {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
}

.modern-label i {
  color: #ff6633;
  font-size: 0.9rem;
}

/* Inputs Modernos */
.modern-input, .modern-select, .modern-textarea {
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fff;
}

.modern-input:focus, .modern-select:focus, .modern-textarea:focus {
  outline: none;
  border-color: #ff6633;
  box-shadow: 0 0 0 3px rgba(255,102,51,0.1);
  transform: translateY(-1px);
}

.modern-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  line-height: 1.5;
}

/* Errores */
.modern-error {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
}

/* Grid de Horarios */
.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.schedule-card {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.schedule-card:hover {
  border-color: #ff6633;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255,102,51,0.1);
}

.schedule-card.no-laborable {
  background: #f8f9fa;
  border-color: #dee2e6;
  opacity: 0.7;
}

.day-header {
  margin-bottom: 15px;
}

.day-header i {
  font-size: 1.5rem;
  color: #ff6633;
  margin-bottom: 8px;
  display: block;
}

.day-header h4 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
}

.time-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.time-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.time-group label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.modern-time-input {
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.3s ease;
}

.modern-time-input:focus {
  outline: none;
  border-color: #ff6633;
  box-shadow: 0 0 0 2px rgba(255,102,51,0.1);
}

.modern-time-input:disabled {
  background: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

/* Checkbox Moderno */
.no-laborable-check {
  margin-bottom: 10px;
}

.checkbox-modern {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  justify-content: center;
}

.checkbox-modern input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #e9ecef;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.checkbox-modern input[type="checkbox"]:checked + .checkmark {
  background: #ff6633;
  border-color: #ff6633;
}

.checkbox-modern input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.error-messages {
  min-height: 20px;
}

/* Botón de Envío */
.form-actions {
  text-align: center;
  padding: 30px 20px;
  background: #f8f9fa;
  margin: 30px -20px -20px -20px;
  border-top: 1px solid #e9ecef;
}

.btn-modern {
  background: linear-gradient(135deg, #ff6633 0%, #e55a2b 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(255,102,51,0.3);
}

.btn-modern:hover:not(:disabled) {
  background: linear-gradient(135deg, #e55a2b 0%, #ff6633 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255,102,51,0.4);
}

.btn-modern:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-modern i {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-header-custom {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .schedule-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .info-section {
    padding: 0 15px;
  }
  
  .form-actions {
    padding: 20px 15px;
  }
  
  .btn-modern {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .schedule-grid {
    grid-template-columns: 1fr;
  }
  
  .time-inputs {
    flex-direction: row;
    gap: 15px;
  }
  
  .time-group {
    flex: 1;
  }
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
          // Solo mostrar la vista previa, no subir automáticamente
          // La imagen se subirá cuando el usuario presione "Guardar"
        };
        reader.readAsDataURL(file);
      },
      removeImageRut: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.shop.v_rut = '';
        this.imageRut = '';
        // No disparar actualización automática
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
          // Solo mostrar la vista previa, no subir automáticamente
          // La imagen se subirá cuando el usuario presione "Guardar"
        };
        reader.readAsDataURL(file);
      },
      removeImageCamaraComercio: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.shop.v_camara_comercio = '';
        this.imageCamaraComercio = '';
        // No disparar actualización automática
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
          // Solo mostrar la vista previa, no subir automáticamente
          // La imagen se subirá cuando el usuario presione "Guardar"
        };
        reader.readAsDataURL(file);
      },
      removeImageContrato: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.shop.v_contrato = '';
        this.imageContrato = '';
        // No disparar actualización automática
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
          // Solo mostrar la vista previa, no subir automáticamente
          // La imagen se subirá cuando el usuario presione "Guardar"
        };
        reader.readAsDataURL(file);
      },
      removeImagePortada: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.shop.v_portada = '';
        this.imagePortada = '';
        // No disparar actualización automática
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
          // Solo mostrar la vista previa, no subir automáticamente
          // La imagen se subirá cuando el usuario presione "Guardar"
        };
        reader.readAsDataURL(file);
      },
      removeImageLogo: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.shop.v_logo = '';
        this.imageLogo = '';
        // No disparar actualización automática
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
            // Preparar datos para envío, limpiando campos de imagen vacíos
            let updateData = { ...this.shop };
            
            // Limpiar campos de imagen que están vacíos
            const imageFields = ['v_rut', 'v_camara_comercio', 'v_contrato', 'v_logo', 'v_portada'];
            imageFields.forEach(field => {
                console.log(`Campo ${field}:`, updateData[field], typeof updateData[field]);
                
                // Solo eliminar si está vacío, es un array vacío, o es un objeto vacío (pero NO si es un File)
                if (updateData[field] === '' || 
                    (Array.isArray(updateData[field]) && updateData[field].length === 0) ||
                    (typeof updateData[field] === 'object' && updateData[field] !== null && 
                     !(updateData[field] instanceof File) && Object.keys(updateData[field]).length === 0)) {
                    console.log(`Eliminando campo vacío: ${field}`);
                    delete updateData[field];
                } else if (updateData[field] instanceof File) {
                    console.log(`Manteniendo archivo válido: ${field}`);
                }
            });
            
            console.log('Datos a enviar:', updateData);
            
            updateData.actualizarDireccionPrincipal = this.actualizarDireccionPrincipal;
            updateData.actualizarTelefonoPrincipal = this.actualizarTelefonoPrincipal;
            updateData.actualizarTelefonoSecundario = this.actualizarTelefonoSecundario;
            updateData.actualizarNombre = this.actualizarNombre;
            updateData.id_usuario_asesor_fk = this.usuario_asesor.value;
            updateData.id_usuario_cliente_fk = this.usuario_cliente.value;
            
            this.getAppServices().putMethodWithBearer('api/ecommerce/tiendas/' + this.shop.id_m_tiendas, updateData, token)
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
