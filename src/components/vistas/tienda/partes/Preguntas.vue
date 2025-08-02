<template>
  <div >
    <div class="ctd-cmto-inf-tienda">
      <div class="ctd-cmto-intn-inf-tienda">
        <div class="ctd-ipt-cmto-inf-tienda">
          <input type="text" class="ipt-cmto-inf-tienda"
                 :placeholder="(deshabilitarBoton)?'Inicia sesión primero para realizar una pregunta':'Escribe una pregunta'"
                 v-model="post.v_mensaje">
        </div>
        <div class="ctd-btn-cmto-inf-tienda">
          <v-btn color="primary" id="submitButton" data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Preguntando"
                  class="btn btn-hipertienda btn-flat" :disabled="deshabilitarBoton" v-on:click="preguntar">Preguntar
          </v-btn>
        </div>
      </div>
      <div class="txt-cmto-tmp-rsp-cmto-inf-tienda">
        <span>Tiempo de respuesta <strong>{{tienda.n_tiempo_respuesta_promedio}} min Aprox.</strong></span>
      </div>
    </div>
    <hr>
    <template v-if="cargandoData">
      <loader></loader>
    </template>
    <template v-else-if="!cargandoData && pagination.data.length>0">
      <div v-if="pagination.last_page>1" class="cj-pgnd-pgta-inf-tienda">
        <div class="pgnd-pgta-inf-tienda">
          <img src="/dist/img/atras.png" class="img-pgnd-pgta-inf-producto cursor-click"
               v-if="pagination.current_page>1"
               v-on:click="obtenerPosts(pagination.current_page - 1)">
          <span>{{pagination.current_page}} - {{pagination.last_page}}</span>
          <img src="/dist/img/adelante.png" class="img-pgnd-pgta-inf-producto cursor-click"
               v-on:click="obtenerPosts(pagination.current_page + 1)"
               v-if="pagination.last_page!==pagination.current_page">
        </div>
      </div>
      <div class="cj-pgta-inf-tienda" v-for="post in pagination.data" v-if="post.usuario !=null">
        <div class="ctd-dts-usr-pgta-inf-tienda">
          <div class="ctd-img-usr-pgta-inf-tienda">
            <img :src="getImageUrl(post.usuario.v_avatar)" class="img-usr-pgta-inf-tienda">
          </div>
          <div class="dts-usr-pgta-info-tienda">
            <div class="txt-usr-pgta-inf-tienda">
              <strong>
                <span>{{post.usuario.v_primer_nombre}} {{post.usuario.v_primer_apellido}}</span>
              </strong>
            </div>
            <div class="ctd-cid-usr-pgta-inf-tienda">
              <!-- <div class="icn-cid-usr-pgta-inf-tienda">
                <i class="fa fa-globe" aria-hidden="true"></i>
              </div> -->
              <!-- <div class="txt-cid-usr-pgta-inf-tienda">
                <span>{{post.usuario.v_nombre_ciudad}}</span>
              </div> -->
            </div>
          </div>
        </div>
        <div class="ctd-pgta-txt-inf-tienda">
          <div class="txt-pgta-usr-inf-tienda" style="font-style: italic !important;">
            <span>{{post.v_mensaje}}</span>
          </div>
          <!-- <div class="txt-pgta-usr-inf-tienda">
            <span>Respuesta: {{post.v_respuesta}}</span>
          </div> -->
          <div class="ctd-opc-cmto-inf-tienda" style="font-size:14px !important;text-align:left !important;padding-left:5px !important;" v-if="post.v_respuesta != null">
            <div class="ctd-opc-spam-cmt-inf-tienda" style="text-align:left !important;    color: #ff6633 !important;    font-style: italic !important;">
              <span>{{post.v_respuesta}}</span>
            </div>
            <div class="ctd-fch-cmt-inf-tienda">
              <!-- <span>{{formatearFecha(post.created_at,'D/MM/YYYY, h:mm:ss a')}}</span> -->
            </div>
          </div>
          <div class="ctd-opc-cmto-inf-tienda" style="font-size:14px !important;text-align:left !important;padding-left:5px !important;" v-if="post.v_respuesta == null || post.v_respuesta == ''">
            <div class="ctd-opc-spam-cmt-inf-tienda" style="text-align:left !important;    font-style: italic !important;">
              <!-- <span> Aun no ha sido respondida</span> -->
            </div>
            <div class="ctd-fch-cmt-inf-tienda">
              <!-- <span>{{formatearFecha(post.created_at,'D/MM/YYYY, h:mm:ss a')}}</span> -->
            </div>
          </div>
          <!-- <template v-if="post.b_respuesta">
            <hr>
            <div class="ctd-rsp-cmto-inf-tienda">
              <div class="txt-rsp-cmto-inf-tienda">
                <span>{{post.v_respuesta}}</span>
              </div>
              <div class="txt-rsp-cmto-fch-inf-tienda">
                <span>{{formatearFecha(post.d_fecha_respuesta,'D/MM/YYYY, h:mm:ss a')}}}</span>
              </div>
            </div>
          </template> -->
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import Loader from '../../../parts/loader';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        cargandoData: false,
        pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1,
          data: []
        },
        offset: 4,
        post: {
          v_tipo: 'pregunta',
          v_mensaje: null,
          id_m_tiendas_fk: this.tienda.id_m_tiendas,
          id_usuario_fk: null
        }
      }
    },
    components: {Loader},
    name: "preguntas",
    props: ['tienda'],
    methods: {
      preguntar() {
        let yo = this;
        let boton_registrar = $('#submitButton');
        boton_registrar.button('loading');
        this.post.id_usuario_fk = this.getUsuario.id;
        this.postMethodWithBearer(this.urlsApi().endpointsPost.crear, this.post, this.getUsuario.token)
          .then(response => {
            boton_registrar.button('reset');
            yo.$toastr('success', '¡Tu pregunta ha sido realizada con éxito!', "Preguntando");
            yo.post = {
              v_tipo: 'pregunta',
              v_mensaje: null,
              id_m_tiendas_fk: this.tienda.id_m_tiendas,
              id_usuario_fk: null
            };
            yo.obtenerPosts(1);
          }, errors => this.mapErrorsResponses(yo, errors));
      },
      obtenerPosts(pagina) {
        this.cargandoData = true;
        this.getMethodWithoutBearer(this.urlsApi().endpointsPublicos.post.index, 'paginate', pagina, "'usuario'", "['id_m_tiendas_fk','=','" + this.tienda.id_m_tiendas + "'],['v_tipo','=','pregunta']")
          .then(response => {
            this.cargandoData = false;
            this.pagination = response.body;
          }, errors => this.mapErrorsResponses(this, errors))
      }
    },
    created() {
      this.obtenerPosts(this.pagination.current_page);
    },
    computed: Object.assign({}, mapGetters([
      'getAutenticadoFull',
      'getUsuario',
    ]), {
      deshabilitarBoton() {
        if (this.post.v_mensaje == null)
        return false;
        else
        return !this.getAutenticadoFull;
      },
      nombreUsuario() {
        if (this.getUsuario.v_proveedor_acceso == 'LaHipertienda')
          return this.getUsuario.v_primer_nombre + ' ' + this.getUsuario.v_primer_apellido;
        else
          return this.getUsuario.v_nombre_mostrar;
      }
    }),
  }
</script>
