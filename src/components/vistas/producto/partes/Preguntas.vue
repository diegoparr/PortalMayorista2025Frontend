<template>
  <div class="ctd-pgta-inf-producto">
    <template v-if="cargandoData">
      <loader></loader>
    </template>
    <template v-else-if="!cargandoData">
      <div class="ctd-pgnd-pgta-inf-producto">
        <div class="ctd-pgta-tmp-rsp">
          <span>Tiempo de respuesta <strong>{{tienda.n_tiempo_respuesta_promedio}} min Aprox.</strong></span>
        </div>
        <div class="pgnd-pgta-inf-producto" v-if="pagination.last_page>1">
          <img src="/dist/img/atras.png" class="img-pgnd-pgta-inf-producto cursor-click"
               v-if="pagination.current_page>1"
               v-on:click="obtenerPosts(pagination.current_page - 1)">
          <span>{{pagination.current_page}} - {{pagination.last_page}}</span>
          <img src="/dist/img/adelante.png" class="img-pgnd-pgta-inf-producto cursor-click"
               v-on:click="obtenerPosts(pagination.current_page + 1)"
               v-if="pagination.last_page!==pagination.current_page">
        </div>
      </div>
      <div class="ctj-pgta-inf-producto" v-for="post in pagination.data">
        <div class="dll-usr-pgta-inf-producto">
          <div class="ctd-img-usr-pgta-inf-producto">
            <img :src="getImageUrl(post.usuario.v_avatar)" class="img-usr-pgta-inf-producto">
          </div>
          <div class="ctd-dts-usr-pgta-inf-producto">
            <div class="ctd-txt-usr-pgta-inf-producto">
              <strong>
                <span>{{nombreUsuario}}</span>
              </strong>
            </div>
            <div class="ctd-txt-usr-cid-inf-producto">
              <div class="ctd-icn-cid-inf-producto">
                <i class="fa fa-globe" aria-hidden="true"></i>
              </div>
              <div class="ctd-txt-cid-inf-producto">
                <span>{{post.usuario.v_nombre_ciudad}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dtt-txt-pgta-inf-producto">
          <div class="ctd-pgta-txt-inf-producto">
            <span>{{post.v_mensaje}}</span>
          </div>
          <template v-if="post.b_respuesta">
            <div class="ctd-rsp-pgta-txt-inf-producto">
              <span>{{post.v_respuesta}}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="ctd-ipt-pgta-inf-producto">
        <div class="ctd-int-ipt-pgta-inf-producto">
          <div class="ctd-int-int-inf-producto-int">
            <input type="text"
                   :placeholder="(deshabilitarBoton)?'Inicia sesión primero para realizar una pregunta':'Escribe una pregunta'"
                   v-model="post.v_mensaje" class="ipt-pgta-inf-producto">
          </div>
          <div class="ctd-btn-pgta-inf-producto">
            <button class="btn btn-hipertienda btn-flat" id="submitButton"
                    data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Preguntando"
                    :disabled="deshabilitarBoton" v-on:click="preguntar">Preguntar
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Loader from '../../../parts/loader';

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
          id_m_productos_fk: this.producto.id_m_productos,
          id_usuario_fk: null
        }
      }
    },
    name: "preguntas",
    props: ['producto', 'tienda'],
    components: {Loader},
    methods: {
      obtenerPosts(pagina) {
        this.cargandoData = true;
        this.getMethodWithoutBearer(this.urlsApi().endpointsPublicos.post.index, 'paginate', pagina, "'usuario'", "['id_m_productos_fk','=','" + this.producto.id_m_productos + "'],['v_tipo','=','pregunta']", null, 5)
          .then(response => {
            this.cargandoData = false;
            this.pagination = response.body;
          }, errors => this.mapErrorsResponses(this, errors))
      },
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
              id_m_productos_fk: this.producto.id_m_productos,
              id_usuario_fk: null
            };
            yo.obtenerPosts(1);
          }, errors => this.mapErrorsResponses(yo, errors));
      },
    },
    created() {
      this.obtenerPosts(this.pagination.current_page);
    },
    computed: Object.assign({}, mapGetters([
      'getAutenticadoFull',
      'getUsuario',
    ]), {
      deshabilitarBoton() {
        return !this.getAutenticadoFull;
      },
      nombreUsuario() {
        if (this.getUsuario.v_proveedor_acceso === 'LaHipertienda')
          return this.getUsuario.v_primer_nombre + ' ' + this.getUsuario.v_primer_apellido;
        else
          return this.getUsuario.v_nombre_mostrar;
      }
    }),
  }
</script>
