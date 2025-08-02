<template>
  <div :class="sizeContainer">
    <div class="box">
      <div class="box-header">
        <div class="row">
          <div class="col-md-12">
            <!-- <v-btn color="info" type="button"
                   v-show="permisoStore" v-on:click="btnCrearUsuario">
              <i class="fa fa-user pull-left"></i>
             Registrar Usuario
            </v-btn> -->

          </div>
          <div class="col-xs-12 col-md-6 pt-3">
            <label>Periodo</label>
            <model-select :options="filtrodias" id="rol" v-model="periodo" class="form-control"
                           v-on:input="seleccionarUsuario"
                          data-placement="left" title="Selecciona el periodo"
                          required>
            </model-select>
          </div>
          <div class="col-xs-12 col-md-6  pt-3">
            <label>Usuario</label>
            <model-select :options="usuarios" id="rol" v-model="rol" class="form-control"
                           v-on:input="seleccionarUsuario"
                          data-placement="left" title="Selecciona el usuario"
                          required>
            </model-select>
          </div>
        </div>
      </div>
      <div class="box-body table-responsive no-padding">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>Nombre Tienda</th>
            <th>Contacto</th>
            <th>Email</th>
            <th>Fecha Visita</th>
            <th>Asesor</th>
            <th>Opciones</th>
            
          </tr>
          </thead>
          <tbody>
          <tr v-if="!usuarioSeleccionado">
            <td colspan="2">Selecciona primero el asesor y el filtro de dias</td>
          </tr>
          <tr v-else-if="!dataUsuarios && usuarioSeleccionado">
            <td colspan="300">
              <div class="loader">
                <hr>
              </div>
            </td>
          </tr>
          <template v-else-if="hayvisitastiendas && usuarioSeleccionado">
            <tr v-for="visita in pagination">
              <td>
                {{visita.v_nombre_tienda}}
              </td>
              <td>{{visita.v_nombre}}</td>
              <td>{{visita.v_email}}</td>
              <td>
                {{visita.created_at}}
              </td>
              <td v-if="visita.usuario!= null">
                {{visita.usuario.v_primer_nombre}} {{visita.usuario.v_primer_apellido}}
              </td>
              <td v-if="visita.usuario== null">
                Registro en la Web
                </td>
              <td>
                <!-- <v-btn color="info" type="button" v-on:click="btnVerUsuario(usuario)"
                        :id="'buttonShow'+usuario.id" v-show="permisoShow"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;"><i
                  class="fa fa-search"></i></v-btn>
                <v-btn color="primary" type="button" v-show="permisoUpdate"
                        :id="'buttonUpdate'+usuario.id" v-on:click="btnEditarUsuario(usuario)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-pencil"></i>
                </v-btn>-->
                <v-btn color="error" type="button" 
                        :id="'buttonDestroy'+visita.id_m_vendedores" v-on:click="btnBorrarVisita(visita)"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt;">
                  <i class="fa fa-trash"></i>
                </v-btn> 
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2">No hay visitas de tiendas registradas para el Asesor {{rol.text}}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="col-xs-12">
        <ul class="pagination pagination-sm no-margin pull-right" v-show="usuarioSeleccionado">
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(1,rol.value)">
              <i class="fa fa-angle-double-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page > 1">
            <a href="" aria-label="Anterior"
               @click.prevent="cambiarPagina(pagination.current_page - 1,rol.value)">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <li v-for="pagina in pagesNumber" :class="[ pagina == isActived ? 'active' : '']">
            <a href="#"
               @click.prevent="cambiarPagina(pagina,rol.value)">{{ pagina }}</a>
          </li>
          <li v-if="pagination.current_page < pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.current_page + 1,rol.value)">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li v-if="pagination.current_page != pagination.last_page">
            <a href="#" aria-label="Siguiente"
               @click.prevent="cambiarPagina(pagination.last_page ,rol.value)">
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
            <store v-if="mostrarModal=='registro'" v-on:registro="cambiarPagina(1,rol.value)"
                   v-on:cerrar_modal="limpiarModal" :rol="rol"></store>
            <show v-else-if="mostrarModal=='ver'" :usuario="usuarioShow" v-on:cerrar_modal="limpiarModal"></show>
            <update v-else-if="mostrarModal=='editar'" :updateUsuario="usuarioUpdate"
                    v-on:cerrar_modal="limpiarModal" v-on:actualizar="cambiarPagina(1,rol.value)"></update>
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
            <h4 class="modal-title text-center">¿Seguro que deseas eliminar la tienda?</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12" align="center">
                <v-btn color="error" type="button" id="btnEliminar" v-on:click="eliminarUsuario"
                        data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Eliminando">
                  <i class="fa fa-trash pull-left"></i>
                  Eliminar Tienda
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div>
    <div>
      <!-- <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label> -->
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
      v-if="hayvisitastiendas && usuarioSeleccionado"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        :clickable="true"
        @click="toggleInfoWindow(m,index)">
      ></gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div>
          <div v-html="infoContent"></div>
        </div>
      </gmap-info-window>
    </gmap-map>
    
  </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {ModelSelect} from 'vue-search-select';
  import Store from './../users/parts/store.vue';
  import Show from './../users/parts/show.vue';
  import Update from './../users/parts/update.vue';
  import helpers from '../../helpers';

  export default {
    data() {
      return {
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        currentPlace: null,
        mostrarModal: null,
        dataUsuarios: false,
        hayvisitastiendas: false,
        usuarioSeleccionado: false,
        permisoStore: false,
        permisoShow: false,
        permisoUpdate: false,
        permisoDestroy: false,
        permisoIndexUsuarios: false,
        id_usuario: null,
        usuarios: [],
        filtrodias :[],
        rol: {
          value: '',
          text: ''
        },
        periodo: {
          value: '',
          text: ''
        },
        usuarioShow: null,
        usuarioUpdate: null,
        usuarioCreate: null,
        idVisitaEliminar: null,
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4
      }
    },
    methods: Object.assign({}, mapMutations([
      'setValorBusquedaIndex', 'setValorBusquedaShow', 'setValorBusquedaStore', 'setValorBusquedaUpdate',
      'setValorBusquedaDestroy'
    ]), {
      btnCrearUsuario() {
        // let yo = this;
        this.mostrarModal = 'registro';
        //console.log('rol afuera',rol);
        //yo.usuarioCreate = rol;
        $('#modal').modal('show');
        $('#modalTitle').html("Registro de usuario");
      },
      seleccionarUsuario() {
        
        this.usuarioSeleccionado = true;
        this.obtenerData(1, this.rol.value)
      },
      seleccionarperiodo() {
        if (this.usuarioSeleccionado ==true){
          this.usuarioSeleccionado = true;
          this.dataUsuarios = false;
         let yo = this;
        let token = this.getUsuario.token;
        this.$http.get("api/ecommerce/vendedores?tipo=all&where=[['id_m_usuario_asesor_fk','=','"+usuario+"'],['created_at','>=','"+this.periodo.value+"']]", {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          this.pagination = response.body;
          this.dataUsuarios = true;
          if (this.pagination.length > 0){
            this.hayvisitastiendas = true;
            this.addMarker();
          }
          else{
            this.hayvisitastiendas = false;
          }
            
        }, errors => {
          yo.$router.push({name: 'panel'});
          yo.$toastr('error', 'Ocurrió un error cargando las visitas de tienda', 'Cargando Usuarios');
        });
        }
        
      },
      obtenerData(pagina, usuario) {
        this.dataUsuarios = false;
        let yo = this;
        let token = this.getUsuario.token;
        if (usuario != null && usuario != undefined && usuario != ''){
          this.$http.get("api/ecommerce/vendedores?tipo=all&where=[['id_m_usuario_asesor_fk','=','"+usuario+"'],['created_at','>=','"+this.periodo.value+"']]&width=['usuario']", {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          this.pagination = response.body;
          this.dataUsuarios = true;
          if (this.pagination.length > 0){
            this.hayvisitastiendas = true;
            this.addMarker();
          }
          else{
            this.hayvisitastiendas = false;
          }
            
        }, errors => {
          yo.$router.push({name: 'panel'});
          yo.$toastr('error', 'Ocurrió un error cargando las visitas de tienda', 'Cargando Usuarios');
        });
        }
        else{
          this.$http.get("api/ecommerce/vendedores?tipo=all&where=[['created_at','>=','"+this.periodo.value+"']]&width=['usuario']", {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          this.pagination = response.body;
          this.dataUsuarios = true;
          if (this.pagination.length > 0){
            this.hayvisitastiendas = true;
            this.addMarker();
          }
          else{
            this.hayvisitastiendas = false;
          }
            
        }, errors => {
          yo.$router.push({name: 'panel'});
          yo.$toastr('error', 'Ocurrió un error cargando las visitas de tienda', 'Cargando Usuarios');
        });
        }
        
      },
      btnVerUsuario(usuario) {
        let boton_loading = $('#buttonShow' + usuario.id);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.$http.get('api/avanzamas/usuarios/' + usuario.id + "?width=['direcciones','telefonos','tipoDocumentos']", {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          yo.usuarioShow = response.body;
          this.mostrarModal = 'ver';
          $('#modal').modal('show');
          $('#modalTitle').html("Datos del usuario");
          boton_loading.button('reset');
        }, errors => {
          $('#modal').modal('hide');
          this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
        });
      },
      btnEditarUsuario(usuario) {
        let boton_loading = $('#buttonUpdate' + usuario.id);
        boton_loading.button('loading');
        let token = this.getUsuario.token;
        let yo = this;
        this.$http.get('api/avanzamas/usuarios/' + usuario.id + "?width=['direcciones','telefonos','tipoDocumentos','rols']", {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          yo.usuarioUpdate = response.body;
          this.mostrarModal = 'editar';
          $('#modal').modal('show');
          $('#modalTitle').html(response.body.v_nombre_rol);
          boton_loading.button('reset');
        }, errors => {
          $('#modal').modal('hide');
          this.$toastr('error', "Ocurrió un error intentando cargar tus datos del servidor.", "Error");
        });
      },
      btnBorrarVisita(visita) {
        $('#modalDestroy').modal('show');
        this.idVisitaEliminar = visita.id_m_vendedores;
        this.id_usuario = this.rol.value;
      },
      eliminarUsuario() {
        let yo = this;
        let token = this.getUsuario.token;
        let boton_eliminar = $('#btnEliminar');
        boton_eliminar.button('loading');
        this.$http.delete('api/ecommerce/vendedores/' + this.idVisitaEliminar, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then(response => {
          $('#modalDestroy').modal('hide');
          yo.$toastr('success', response.body.mensaje, "Acción exitosa");
          boton_eliminar.button('reset');
          yo.cambiarPagina(1, this.id_usuario);
        }, errors => {
          yo.$toastr('error', errors.body.mensaje, "Error desconocido");
          boton_eliminar.button('reset');
        });
      },
      cambiarPagina(pagina, rol) {
        this.pagination.current_page = pagina;
        this.obtenerData(pagina, rol);
      },
      limpiarModal() {
        this.mostrarModal = 'ninguno';
      },
      toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = this.getInfoWindowContent(marker);
        console.log(marker);
        console.log(idx);

        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },
      getInfoWindowContent: function (marker) {
        return (`<div class="card">
        <div class="card-image">
          <figure class="text-center">
            <img src="${marker.data.v_imagen}" style="width:100px;" >
          </figure>
        </div>
        <br>
        <div class="text-center">
          <div style="padding:4px;"></div>
          <div >
            <label>Tienda: ${marker.data.v_nombre_tienda}</label>
            <div style="padding:4px;"></div>
            <label>Vendedor: ${marker.data.v_nombre}</label>
            <div style="padding:4px;"></div>
            <label>Telefono: ${marker.data.v_telefono}</label>
            <div style="padding:4px;"></div>
            <label>Direccion: ${marker.data.v_direccion}</label>
            <div style="padding:4px;"></div>
            <label>Asesor: ${marker.data.usuario.v_primer_nombre} ${marker.data.usuario.v_primer_apellido}</label>
            <div style="padding:4px;"></div>
            <label>Fecha de visita: ${marker.data.created_at}</label>
            <div style="padding:4px;"></div>

          </div>
        </div>
      </div>`);
      },
        setPlace(place) {
          this.currentPlace = place;
        },
        addMarker() {
          this.markers=[];
          this.places=[];
          this.pagination.forEach((visita)=>{
            console.log("vista",visita);
            let markerIcon = {
              url: "../../dist/img/marker.png",
              // size: {
              //   width: 50,
              //   height: 50
              // }
            };
            let marker = {
              lat:parseFloat(visita.n_latitud), 
              lng:parseFloat(visita.n_longitud),
            };
            this.markers.push(
              { 
                position: marker,
                icon:markerIcon,
                data:visita
             }
             );
             this.places.push(visita.v_direccion);
             console.log(this.markers);
          })
            
          
        },
        geolocate: function() {
          // navigator.geolocation.getCurrentPosition(position => {
          //   console.log(position);
            this.center = {
              lat: 4.6430187,
              lng: -74.1298569
          //   };
          // });
            }
        }
    }),
    components: {ModelSelect, Store, Show, Update},
    computed: Object.assign({}, mapGetters([
      'getUsuario.token', 'getIndex', 'obtenerPermisoIndex', 'obtenerPermisoStore', 'obtenerPermisoShow',
      'obtenerPermisoUpdate', 'obtenerPermisoDestroy', 'getUsuario'
    ]), {
      isActived: function () {
        return this.pagination.current_page;
      },
      pagesNumber: function () {
        if (!this.pagination.to) {
          return [];
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1) {
          from = 1;
        }
        let to = from + (this.offset * 2);
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
    }),
    created() {
      
      this.geolocate();
      let hoy= new Date().setHours(0,0,0,0);
      let fecha_hoy = ""+new Date(hoy).getFullYear()+"-"+ (new Date(hoy).getMonth()+1)+"-"+new Date(hoy).getDate()+" "+new Date(hoy).getHours()+":"+new Date(hoy).getMinutes()+":"+new Date(hoy).getSeconds();
      let ayer= new Date().setDate(new Date().getDate()-1);
      let fecha_ayer = ""+new Date(ayer).getFullYear()+"-"+ (new Date(ayer).getMonth()+1)+"-"+new Date(ayer).getDate()+" 00:00:00";
      let semana= new Date().setDate(new Date().getDate()-7);
      let fecha_semana = ""+new Date(semana).getFullYear()+"-"+ (new Date(semana).getMonth()+1)+"-"+new Date(semana).getDate()+" 00:00:00";
      let mes= new Date().setDate(new Date().getDate()-30);
      let fecha_mes = ""+new Date(mes).getFullYear()+"-"+ (new Date(mes).getMonth()+1)+"-"+new Date(mes).getDate()+" 00:00:00";
       let tres_mes= new Date().setDate(new Date().getDate()-91);
      let fecha_tres_mes = ""+new Date(tres_mes).getFullYear()+"-"+ (new Date(tres_mes).getMonth()+1)+"-"+new Date(tres_mes).getDate()+" 00:00:00";
      let seis_mes= new Date().setDate(new Date().getDate()-183);
      let fecha_seis_mes = ""+new Date(seis_mes).getFullYear()+"-"+ (new Date(seis_mes).getMonth()+1)+"-"+new Date(seis_mes).getDate()+" 00:00:00";
      this.periodo={
        text: "Hoy",
        value: fecha_hoy
      };
      this.filtrodias =([{
        text: "Hoy",
        value: fecha_hoy
      },
      {
        text: "Ayer",
        value: fecha_ayer
      },
      {
        text: "Ultima semana",
        value: fecha_semana
      },
      {
        text: "Ultimo mes",
        value: fecha_mes
      },
      {
        text: "Ultimos 3 meses",
        value: fecha_tres_mes
      },
      {
        text: "Ultimos 6 meses",
        value: fecha_seis_mes
      }
      ]);
      console.log(this.filtrodias);
      let yo = this;
      this.sizeContainer = this.$route.meta.sizeContainer;
      this.$emit("load_data", {
        show: false
      });
      let permiso = 'index.vendedores.' + this.getUsuario.rol;
      this.setValorBusquedaIndex(permiso);
       if (this.obtenerPermisoIndex) {
         let token = this.getUsuario.token;
          this.$http.get("api/avanzamas/usuarios?order=['v_primer_nombre','asc']&rol=rol_asesor&page=1", {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then(response => {
            yo.usuarios = response.body.data;
            yo.usuarios.forEach((usuario)=>{
              usuario.text = usuario.v_primer_nombre +" "+ usuario.v_primer_apellido
              usuario.value = usuario.id
            })
          }, errors => {
            // yo.$router.push({name: 'panel'});
            yo.$toastr('error', 'Ocurrió un error cargando las usuarios', 'Cargando Rols');
          });
       } else {
        yo.$router.push({name: 'panel'});
        yo.$toastr('error', 'No posee permisos para acceder a esta acción', 'Acceso denegado');
       }
     
      
    },
  }
</script>
