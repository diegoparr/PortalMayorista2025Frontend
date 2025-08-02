<template>
 <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="row">
          <div class="col-xs-12">
            <h3 class="box-title">
            <v-btn color="info" type="button" v-show="permisoStore" v-on:click="btnCrearCiudad"
                    :disabled="!provinciaSeleccionada">
              <i class="fa fa-upload  pull-left"></i>
              {{(provinciaSeleccionada) ? 'Registrar ciudad en ' + provincia.text : 'Selecciona el país y la provincia'}}
            </v-btn>
            </h3>
          </div>
          <div class="row">
            <br>
            <div class="col-xs-6">
              <model-select :options="paises" id="v_pais" v-model="pais" class="form-control"
                             v-on:input="seleccionarPais"
                            data-placement="left" title="Selecciona el pais"
                            required>
              </model-select>
            </div>
            <div class="col-xs-6">
              <model-select :options="provincias" id="v_provincia" v-model="provincia" class="form-control"
                             v-on:input="seleccionarProvincia"
                            data-placement="left" title="Selecciona la Provincia"
                            required>
              </model-select>
            </div>
          </div>
        </div>
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">

          <tbody>
          <tr>
            <th class="text-center">Nombre Provincia</th>
            <th class="text-center">Opciones</th>
          </tr>
          <tr v-if="!provinciaSeleccionada">
            <td colspan="2">Selecciona primero el pais y la provincia</td>
          </tr>
          <tr v-else-if="!dataCiudades  && provinciaSeleccionada">
            <td colspan="2">
              <div class="loader">
                <hr>
              </div>
            </td>
          </tr>
          <template v-else-if="dataCiudades">
            <tr v-for="ciudad in pagination.data">
              <td class="text-center">{{ciudad.v_nombre_ciudad}}</td>
              <td class="text-center">
                <v-btn color="info" type="button" v-on:click="btnVerCiudad(ciudad)"
                        :id="'buttonShow'+ciudad.id_m_ciudades" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i></v-btn>
                <v-btn color="primary"  type="button" v-show="permisoUpdate"
                        :id="'buttonUpdate'+ciudad.id_m_ciudades" v-on:click="btnEditarCiudad(ciudad)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>
                <v-btn color="error" type="button" v-show="permisoDestroy"
                        :id="'buttonDestroy'+ciudad.id_m_ciudades" v-on:click="btnBorrarCiudad(ciudad)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2">No hay provincias registradas en {{pais.text}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="col-xs-12">
            <ul class="pagination pagination-sm no-margin pull-right" v-show="paisSeleccionado">
              <li v-if="pagination.current_page > 1">
                <a href="" aria-label="Anterior"
                   @click.prevent="cambiarPagina(1,provincia.value)">
                  <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                </a>
              </li>
              <li v-if="pagination.current_page > 1">
                <a href="" aria-label="Anterior"
                   @click.prevent="cambiarPagina(pagination.current_page - 1,provincia.value)">
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                </a>
              </li>
              <li v-for="pagina in pagesNumber" :class="[ pagina == isActived ? 'active' : '']">
                <a href="#"
                   @click.prevent="cambiarPagina(pagina,provincia.value)">{{ pagina }}</a>
              </li>
              <li v-if="pagination.current_page < pagination.last_page">
                <a href="#" aria-label="Siguiente"
                   @click.prevent="cambiarPagina(pagination.current_page + 1,provincia.value)">
                  <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>
              </li>
              <li v-if="pagination.current_page != pagination.last_page">
                <a href="#" aria-label="Siguiente"
                   @click.prevent="cambiarPagina(pagination.last_page ,provincia.value)">
                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                </a>
              </li>
            </ul>

          </div>
    </div>
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title text-center" id="modalTitle"></h4>
          </div>
          <div class="modal-body">
            <store v-if="mostrarModal=='registro'" v-on:registro="cambiarPagina(1,provincia.value)"
                       v-on:cerrar_modal="limpiarModal" :pais= "pais":provincia="provincia">
            </store>
            <show v-else-if="mostrarModal=='ver'" :ciudad="ciudadShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal=='editar'" :updateCiudad="ciudadUpdate"
                    v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1,provincia.value)">
            </update>
          </div>

        </div>
      </div>
    </div>
    <div class="modal fade bs-example-modal-sm" id="modalDestroy" tabindex="-1" role="dialog"
         aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title text-center">¿Seguro que deseas eliminar el recurso?</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12" align="center">
                <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarCiudad"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando"><i
                  class="fa fa-trash pull-left"></i>
                  Eliminar Recurso
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppServices from "../AppServices";
import { mapGetters, mapMutations } from "vuex";
import { ModelSelect } from "vue-search-select";
import Store from "./parts/store.vue";
import Show from "./parts/show.vue";
import Update from "./parts/update.vue";
import helpers from "../../helpers";
export default {
  data() {
    return {
      mostrarModal: null,
      dataCiudades: false,
      hayCiudades: false,
      paisSeleccionado: false,
      dataProvincias: false,
      provinciaSeleccionada: false,
      permisoStore: false,
      permisoShow: false,
      permisoUpdate: false,
      permisoDestroy: false,
      permisoIndexCiudades: false,
      id_pais: null,
      id_provincia: null,
      paises: [],
      pais: {
        value: "",
        text: ""
      },
      provincias: [],
      provincia: {
        value: "",
        text: ""
      },
      ciudadShow: null,
      ciudadUpdate: null,
      idCiudadEliminar: null,
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
        data: []
      },
      offset: 4
    };
  },
  methods: Object.assign(
    {},
    mapMutations([
      "setValorBusquedaIndex",
      "setValorBusquedaShow",
      "setValorBusquedaStore",
      "setValorBusquedaUpdate",
      "setValorBusquedaDestroy"
    ]),
    {
      getAppServices() {
        return AppServices;
      },
      btnCrearCiudad() {
        this.mostrarModal = "registro";
        $("#modal").modal("show");
        $("#modalTitle").html(this.pais.text);
      },
      seleccionarPais(event) {
        this.paisSeleccionado = true;
        this.provinciaSeleccionada = false;
        this.provincias = [];
        this.$http.get("api/provincias/" + event.value).then(
          response => {
            this.provincias = response.body.provincias;
            this.tipo_documentos = response.body.tipo_documentos;
          },
          errors => {
            this.$toastr(
              "error",
              "Disculpa pero en estos momentos no estamos operando en ese país.",
              "Error"
            );
          }
        );
      },
      seleccionarProvincia() {
        this.provinciaSeleccionada = true;
        this.obtenerData(1, this.provincia.value);
      },
      obtenerData(pagina, provincia) {
        this.dataCiudades = false;
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices()
          .getMethodsWithBearer(
            "api/avanzamas/ciudades",
            token,
            "paginate",
            pagina,
            null,
            "['id_m_provincias_fk','=','" + provincia + "']",
            "'v_nombre_ciudad','asc'"
          )
          .then(
            response => {
              this.pagination = response.body;
              this.dataCiudades = true;
              if (this.pagination.data.length > 0) this.hayCiudades = true;
              else this.hayCiudades = false;
            },
            errors => {
              yo.$router.push({ name: "panel" });
              yo.$toastr(
                "error",
                "Ocurrió un error cargando las ciudades",
                "Cargando Ciudades"
              );
            }
          );
      },
      btnVerCiudad(ciudad) {
        let boton_loading = $("#buttonShow" + ciudad.id_m_ciudades);
        boton_loading.button("loading");
        let token = this.getUsuario.token;
        let yo = this;
        this.$http
          .get("api/avanzamas/ciudades/" + ciudad.id_m_ciudades, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(
            response => {
              this.ciudadShow = response.body;
              console.log('data de la ciudad',this.ciudadShow);
              this.mostrarModal = "ver";
              $("#modal").modal("show");
              $("#modalTitle").html(response.body.v_nombre_provincia);
              boton_loading.button("reset");
            },
            errors => {
              $("#modal").modal("hide");
              this.$toastr(
                "error",
                "Ocurrió un error intentando cargar tus datos del servidor.",
                "Error"
              );
            }
          );
      },
      btnEditarCiudad(ciudad) {
        let boton_loading = $("#buttonUpdate" + ciudad.id_m_ciudades);
        boton_loading.button("loading");
        let token = this.getUsuario.token;
        let yo = this;
        this.$http
          .get("api/avanzamas/ciudades/" + ciudad.id_m_ciudades, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(
            response => {
              yo.ciudadUpdate = response.body;
              this.mostrarModal = "editar";
              $("#modal").modal("show");
              $("#modalTitle").html(response.body.v_nombre_provincia);
              boton_loading.button("reset");
            },
            errors => {
              $("#modal").modal("hide");
              this.$toastr(
                "error",
                "Ocurrió un error intentando cargar tus datos del servidor.",
                "Error"
              );
            }
          );
      },
      btnBorrarCiudad(ciudad) {
        $("#modalDestroy").modal("show");
        this.idCiudadEliminar = ciudad.id_m_ciudades;
        this.id_pais = ciudad.id_m_paises_fk;
        this.id_provincia = ciudad.id_m_provincias_fk;
      },
      eliminarCiudad() {
        let yo = this;
        let token = this.getUsuario.token;
        let boton_eliminar = $("#btnEliminar");
        boton_eliminar.button("loading");
        this.$http
          .delete("api/avanzamas/ciudades/" + this.idCiudadEliminar, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(
            response => {
              $("#modalDestroy").modal("hide");
              yo.$toastr("success", response.body.mensaje, "Acción exitosa");
              boton_eliminar.button("reset");
              yo.cambiarPagina(1, this.id_provincia);
            },
            errors => {
              yo.$toastr("error", errors.body.mensaje, "Error desconocido");
              boton_eliminar.button("reset");
            }
          );
      },
      cambiarPagina(pagina, provincia) {
        this.pagination.current_page = pagina;
        this.obtenerData(pagina, provincia);
      },
      limpiarModal() {
        this.mostrarModal = "ninguno";
      }
    }
  ),
  components: { ModelSelect, Store, Show, Update },
  computed: Object.assign(
    {},
    mapGetters([
      "getUsuarioToken",
      "getIndex",
      "obtenerPermisoIndex",
      "obtenerPermisoStore",
      "obtenerPermisoShow",
      "obtenerPermisoUpdate",
      "obtenerPermisoDestroy",
      "getUsuario"
    ]),
    {
      isActived: function() {
        return this.pagination.current_page;
      },
      pagesNumber: function() {
        if (!this.pagination.to) {
          return [];
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1) {
          from = 1;
        }
        let to = from + this.offset * 2;
        if (to >= this.pagination.last_page) {
          to = this.pagination.last_page;
        }
        let pagesArray = [];
        while (from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;
      }
    }
  ),
  created() {
    let yo = this;
    let token = this.getUsuario.token;
    this.sizeContainer = this.$route.meta.sizeContainer;
    this.$emit("load_data", {
      show: false
    });
    this.$http;
    this.getAppServices()
      .getMethodWithoutBearer("api/paises")
      .then(
        response => {
          yo.paises = response.body;
        },
        errors => {
          yo.$router.push({ name: "panel" });
          yo.$toastr(
            "error",
            "Ocurrió un error cargando las paises",
            "Cargando Pais"
          );
        }
      );
    let permiso = "index.ciudades." + this.getUsuario.rol;
    this.setValorBusquedaIndex(permiso);
    if (this.obtenerPermisoIndex) {
      yo.setValorBusquedaStore("store.ciudades." + yo.getUsuario.rol);
      yo.setValorBusquedaShow("show.ciudades." + yo.getUsuario.rol);
      yo.setValorBusquedaUpdate("update.ciudades." + yo.getUsuario.rol);
      yo.setValorBusquedaDestroy("destroy.ciudades." + yo.getUsuario.rol);
      yo.permisoStore = !!yo.obtenerPermisoStore;
      yo.permisoShow = !!yo.obtenerPermisoShow;
      yo.permisoUpdate = !!yo.obtenerPermisoUpdate;
      yo.permisoDestroy = !!yo.obtenerPermisoDestroy;
      //        this.obtenerData(this.pagination.current_page);
    } else {
      yo.$router.push({ name: "panel" });
      yo.$toastr(
        "error",
        "No posee permisos para acceder a esta acción",
        "Acceso denegado"
      );
    }
  }
};
</script>
