<template>
  <form v-on:submit.prevent="registro">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 text-xs-center" style="color: #ec6920"><h5>Registrar Publicidad</h5></div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div :class="(!errors.first('v_descripcion'))?'form-group':'form-group has-error'">
            <v-text-field
              required
              prepend-icon="description"
              id="v_descripcion"
              name="v_descripcion"
              label="Descripción"
              v-validate="'required|min:2|max:100'"
              data-vv-as="descripcion"
              v-model="publicidad.v_descripcion">
            </v-text-field>
            <span v-show="errors.has('v_descripcion')" class="help-block">{{ errors.first('v_descripcion')}}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <v-select
            required
            v-on:change="cambiarPosicion"
            :items="posicionesPantalla"
            prepend-icon="settings_overscan"
            v-model="publicidad.v_posicion_pantalla"
            label="Posicion"
            class="input-group"
          ></v-select>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class="form-group">
            <v-autocomplete
              ref="publicidad.id_m_paises_fk"
              prepend-icon="fa fa-globe"
              :items="paises"
              v-model="publicidad.id_m_paises_fk"
              v-on:input="seleccionarPais"
              label="Pais"
              item-value="value"
              required
            ></v-autocomplete>
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div class="form-group">
            <v-autocomplete
              ref="provincia"
              prepend-icon="fa fa-globe"
              :items="provincias"
              v-model="provincia"
              label="Provincia"
              return-object
              item-value
              required>
            </v-autocomplete>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <v-autocomplete
              ref="categorias"
              prepend-icon="category"
              :items="categorias"
              v-model="publicidad.id_m_categorias_fk"
              label="Categoria"
              item-value="value"
              required
              v-if="categoriasLista"
            ></v-autocomplete>
            <v-autocomplete
              v-else
              prepend-icon="category"
              label="Cargando Categorias..."
              item-value="value"
              disabled>
            </v-autocomplete>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div :class="(!errors.first('publicidad.d_fecha_inicio'))?'form-group':'form-group has-error'">
            <v-menu
              ref="dateInicio"
              :close-on-content-click="false"
              v-model="dateInicio"
              :nudge-right="40"
              :return-value.sync="publicidad.d_fecha_inicio"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                required
                slot="activator"
                v-model="publicidad.d_fecha_inicio"
                label="Fecha inicial"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="publicidad.d_fecha_inicio"
                             @input="$refs.dateInicio.save(publicidad.d_fecha_inicio)"></v-date-picker>
            </v-menu>
            <span v-show="errors.has('publicidad.d_fecha_inicio')"
                  class="help-block text-center">{{ errors.first('d_fecha_fin')}}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div :class="(!errors.first('publicidad.d_fecha_fin'))?'form-group':'form-group has-error'">
            <v-menu
              ref="dateFin"
              :close-on-content-click="false"
              v-model="dateFin"
              :nudge-right="40"
              :return-value.sync="publicidad.d_fecha_fin"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px">
              <v-text-field
                required
                slot="activator"
                v-model="publicidad.d_fecha_fin"
                label="Fecha final"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="publicidad.d_fecha_fin"
                             @input="$refs.dateFin.save(publicidad.d_fecha_fin)"></v-date-picker>
            </v-menu>
            <span v-show="errors.has('publicidad.d_fecha_fin')"
                  class="help-block text-center">{{ errors.first('d_fecha_fin')}}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div>
            <v-tabs
              color="secondary"
              dark
              slider-color="accent">
              <v-tab ripple @click="cambiarTipoPublicidad" v-if="!publicidadPrincipal">
                <a class="white--text">Tienda</a>
              </v-tab>
              <v-tab ripple v-else>
                <a class="white--text">Tienda</a>
              </v-tab>
              <v-tab-item>
                <div class="row">
                  <div class="col-xs-12 col-sm-6">
                    <v-select
                      prepend-icon="store"
                      :items="shops"
                      v-model="publicidad.id_m_tiendas_fk"
                      label="Tienda"
                      v-on:input="seleccionarTienda"
                      item-value="value"
                    ></v-select>
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    <v-select
                      prepend-icon="shopping_basket"
                      :items="products"
                      v-model="publicidad.id_m_productos_fk"
                      label="Producto"
                      class=""
                      item-value="value"
                      v-if="dataProducts"
                    ></v-select>
                    <v-select
                      v-else
                      prepend-icon="shopping_basket"
                      label="Producto"
                      disabled
                    ></v-select>
                  </div>
                </div>
              </v-tab-item>
              <v-tab ripple @click="cambiarTipoPublicidad" v-if="publicidadPrincipal">
                <a class="white--text">Externa</a>
              </v-tab>
              <v-tab ripple v-else>
                <a class="white--text">Externa</a>
              </v-tab>
              <v-tab-item>
                <div class="row">
                  <div class="col-xs-12">
                    <div :class="(!errors.first('v_url'))?'form-group':'form-group has-error'">
                      <v-text-field
                        prepend-icon="fa-globe"
                        id="v_url"
                        name="v_url"
                        label="Direccion Web"
                        v-validate="'min:2|max:100'"
                        data-vv-as="url"
                        v-model="publicidad.v_url">
                      </v-text-field>
                      <span v-show="errors.has('v_url')" class="help-block">{{ errors.first('v_url')}}</span>
                    </div>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs>
          </div>
        </div>
      </div>
      <div v-if="publicidad.v_posicion_pantalla==='principal'">
        <div class="row container">
          <div class="col-xs-12 col-md-6">
            <span style="color: #ec6920">Imagen Grande</span>
            <input
              required
              v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
              name="v_imagen"
              type="file"
              v-on:change="onFileChange"
              data-vv-as="imagen"
              accept="image/*"
              id="v_imagen"
            ></div>
          <div class="col-xs-12 col-md-6 text-xs-center">
            <img :src="imagen" alt="" style="height: 200px; width: 150px">
          </div>
        </div>
        <div class="row container">
          <div class="col-xs-12 col-md-6">
            <span style="color: #ec6920">Imagen Movil</span>
            <input
              required
              v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
              name="v_imagen_movil"
              type="file"
              v-on:change="onFileChangeMovil"
              data-vv-as="imagen_movil"
              accept="image/*"
              id="v_imagen_movil">
          </div>
          <div class="col-xs-12 col-md-6 text-xs-center">
            <img :src="imagen_movil" alt="" style="height: 200px; width: 150px">
          </div>
        </div>
      </div>
      <div v-else-if="publicidad.v_posicion_pantalla==='lateral'">
        <div class="row container">
          <div class="col-xs-12 col-md-6">
            <span style="color: #ec6920">Imagen Grande</span>
            <input
              required
              v-validate="'required|image|mimes:image/jpeg,image/png,image/jpg'"
              name="v_imagen"
              type="file"
              v-on:change="onFileChange"
              data-vv-as="imagen"
              accept="image/*"
              id="v_imagen_lateral">
          </div>
          <div class="col-xs-12 col-md-6 text-xs-center">
            <img :src="imagen" alt="" style="height: 200px; width: 150px">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-12" align="center">
          <div class="form-group">
            <v-btn color="primary" type="submit" id="submitButton" :disabled="deshabilitar"
                   data-loading-text="&lt;i class='pull-left fa fa-spinner fa-spin '&gt;&lt;/i&gt; Registrando">
              <i class="fa fa-user pull-left"></i> Registrar
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import AppServices from '../../AppServices';
  import {mapGetters} from 'vuex';
  import Loader from '../../parts/loader.vue';
  import {ModelSelect} from 'vue-search-select';

  export default {
    data() {
      return {
        publicidadPrincipal: true,
        dataProducts: false,
        dataPais: false,
        shops: [],
        paises: [],
        categorias: [],
        categoriasLista: false,
        provincias: [],
        provincia: [],
        products: [],
        imagen: null,
        imagen_movil: null,
        posicionesPantalla: [
          {value: 'principal', text: 'Principal'},
          {value: 'lateral', text: 'Lateral'}
        ],
        validacionDatePicker: {
          to: new Date(1950, 0, 1),
          from: new Date()
        },
        dateInicio: false,
        dateFin: false,
        publicidad: {
          id_m_paises_fk: null,
          v_nombre_provincia: null,
          id_m_provincias_fk: null,
          v_url: null,
          v_descripcion: null,
          v_imagen: null,
          v_imagen_movil: null,
          v_posicion_pantalla: null,
          d_fecha_inicio: null,
          d_fecha_fin: null,
          id_m_categorias_fk: null,
          id_m_tiendas_fk: null,
          id_m_productos_fk: null,
        },
      }
    },
    mounted() {
      let yo = this;
      $('#modal').on('hidden.bs.modal', function (e) {
        yo.$emit('cerrar_modal');
      });
    },
    created() {
      let token = this.getUsuario.token;
      this.getAppServices().getMethodsWithBearer("api/ecommerce/tiendas", token, 'pluck')
        .then(response => {
            this.shops = response.body;
          }, errors => yo.getAppServices().mapErrorsResponses(yo, errors)
        );
      this.getMethodWithoutBearer(this.urlsApi().endpointsPublicos.paises).then(response => {
        this.paises = response.body;
      }, errors => this.mapErrorsResponses(this, errors));
      this.getAppServices().getMethodsWithBearer("api/ecommerce/categorias", token, 'pluck')
        .then(response => {
          this.categorias = response.body;
          this.categoriasLista = true;
        }, errors => this.getAppServices().mapErrorsResponses(this, errors));
    },
    components: {ModelSelect, Loader},
    computed: Object.assign({}, mapGetters([
      'getUsuario'
    ]), {
      deshabilitar() {
        return !(!this.errors.has('v_nombre') && !this.errors.has('category')
        );
      }
    }),
    methods: {
      cambiarTipoPublicidad() {
        this.publicidadPrincipal = !this.publicidadPrincipal;
        if (this.publicidadPrincipal) {
          this.publicidad.v_url = null
        } else {
          this.publicidad.id_m_tiendas_fk = null
          this.publicidad.id_m_productos_fk = null
        }
      },
      cambiarPosicion() {
        this.imagen_movil = null;
        this.publicidad.v_imagen_movil = null;
      },
      seleccionarPais(event) {
        this.dataPais = false;
        this.getAppServices().getMethodWithoutBearer('api/provincias/' + event)
          .then(response => {
            this.provincias = response.body.provincias;
            this.dataPais = true;
          }, errors => this.getAppServices().mapErrorsResponses(this, errors));
      },
      seleccionarTienda() {
        this.dataProducts = false;
        let token = this.getUsuario.token;
        this.getAppServices().getMethodsWithBearer("api/ecommerce/productos", token, 'pluck', null, null, "['id_m_tiendas_fk','=','" + this.publicidad.id_m_tiendas_fk + "']")
          .then(response => {
            this.products = response.body;
            this.dataProducts = true;
          }, errors => {
            console.log(errors);
          });
      },
      onFileChange(e) {
        this.publicidad.v_imagen = e.target.files[0];
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imagen = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      onFileChangeMovil(e) {
        this.publicidad.v_imagen_movil = e.target.files[0];
        let filesMovil = e.target.files || e.dataTransfer.files;
        if (!filesMovil.length)
          return;
        this.createImageMovil(filesMovil[0]);
      },
      createImageMovil(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.imagen_movil = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      getAppServices() {
        return AppServices;
      },
      registro() {
        this.$validator.validateAll().then(() => {
          let token = this.getUsuario.token;
          let boton_registrar = $('#submitButton');
          boton_registrar.button('loading');
          let formData = new FormData();
          this.publicidad.v_nombre_provincia = this.provincia.text;
          this.publicidad.id_m_provincias_fk = this.provincia.value;
          formData.append('v_descripcion', this.publicidad.v_descripcion);
          formData.append('v_imagen', this.publicidad.v_imagen);
          formData.append('v_posicion_pantalla', this.publicidad.v_posicion_pantalla);
          formData.append('d_fecha_inicio', this.publicidad.d_fecha_inicio);
          formData.append('d_fecha_fin', this.publicidad.d_fecha_fin);
          formData.append('id_m_categorias_fk', this.publicidad.id_m_categorias_fk);
          formData.append('id_m_provincias_fk', this.publicidad.id_m_provincias_fk);
          formData.append('v_nombre_provincia', this.publicidad.v_nombre_provincia);
          formData.append('id_m_paises_fk', this.publicidad.id_m_paises_fk);

          if (this.publicidad.v_imagen_movil) {
            formData.append('v_imagen_movil', this.publicidad.v_imagen_movil);
          }
          if (this.publicidad.id_m_tiendas_fk) {
            formData.append('id_m_tiendas_fk', this.publicidad.id_m_tiendas_fk);
          }
          if (this.publicidad.id_m_productos_fk) {
            formData.append('id_m_productos_fk', this.publicidad.id_m_productos_fk);
          }
          console.log(this.publicidad)
          let yo = this;
          this.getAppServices().postMethodWithBearer('api/ecommerce/publicidades', formData, token)
            .then(response => {
                boton_registrar.button('reset');
                yo.$toastr('success', response.body.mensaje, "Acción exitosa");
                $('#modal').modal('hide');
                yo.$emit('registro');
              }, errors => {
                if (errors.status === 422) {
                  for (let err in errors.body.errors) {
                    errors.body.errors[err].forEach(function (value) {
                      yo.$toastr('error', value, err.charAt(0).toUpperCase() + err.slice(1));
                    });
                  }
                } else
                  yo.$toastr('error', errors.body.mensaje, "Error desconocido");
                boton_registrar.button('reset');
              }
            );
        });
      },
    }
  }
</script>
