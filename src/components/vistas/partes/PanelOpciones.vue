<template>
  <div class="contenedor-panel-usuario-explorar">
    <div class="panel-usuario">
      <template v-if="getUsuario.estaAutenticadoFull">
        <div class="nombre-img-usuario">
          <div class="contenedor-img-usuario-panel">
            <img :src="getUsuario.v_avatar" class="img-usuario-panel">
          </div>
          <div class="contenedor-nombre-usuario-panel">
            <span>
              <strong>{{nombreUsuario}}</strong>
            </span>
          </div>
        </div>
        <div class="contenedor-opciones-panel">
          <div class="contenedor-opcion-panel">
            <div class="icono-opcion">
              <i class="icono-opcion-panel fa fa-shopping-basket" aria-hidden="true"></i>
            </div>
            <div class="texto-opcion">
              <span>Mis Compras</span>
            </div>
          </div>
          <div class="contenedor-opcion-panel">
            <div class="icono-opcion">
              <i class="icono-opcion-panel fa fa-refresh" aria-hidden="true"></i>
            </div>
            <div class="texto-opcion">
              <span>Mis Canjes</span>
            </div>
          </div>
          <div class="contenedor-opcion-panel">
            <div class="icono-opcion">
              <i class="icono-opcion-panel fa fa-star" aria-hidden="true"></i>
            </div>
            <div class="texto-opcion">
              <span>Siguiendo</span>
            </div>
          </div>
          <div class="contenedor-opcion-panel">
            <div class="icono-opcion">
              <i class="icono-opcion-panel fa fa-bars" aria-hidden="true"></i>
            </div>
            <div class="texto-opcion">
              <span>Categorias</span>
            </div>
          </div>
          <div class="contenedor-opcion-panel">
            <div class="icono-opcion">
              <i class="icono-opcion-panel fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div class="texto-opcion">
              <span>Tiendas Cerca</span>
            </div>
          </div>
          <div class="contenedor-opcion-panel">
            <div class="icono-opcion">
              <i class="icono-opcion-panel fa fa-question-circle" aria-hidden="true"></i>
            </div>
            <div class="texto-opcion">
              <span>Ayuda</span>
            </div>
          </div>
        </div>
        <hr>
      </template>
      <div class="contenedor-busqueda-avanzada-panel">
        <div class="titulo-busqueda-avanzada-panel">
          <span>Búsqueda Avanzada</span>
        </div>
        <div class="contenedor-boton-busqueda-avanzada">
          <button class="boton-busqueda-avanzada">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <hr>
     <!-- <div class="contenedor-publicidad-producto-panel">
        <div class="titulo-contenedor-publicidad-panel">
          <span>Tal vez te puede interesar</span>
        </div>
        <div class="contenedor-img-productos-recomendados">
          <carousel :perPage="1" :perPageCustom="[[300, 1],[480, 1], [768, 1]]" :paginationEnabled="false"
                    :navigationEnabled="false">
            <slide>
              <div class="contenedor-producto-recomendado-explorar">
                <img src="https://lorempixel.com/400/200/?72706" class="img-producto-recomendado-explorar">
                <div class="contendor-detalle-producto-recomendado-explorar">
                  <div class="contendor-nombre-producto-recomendado-explorar">
                    <span>Xbox One S</span>
                  </div>
                  <div class="contenedor-precio-producto-recomendado-explorar">
                    <span>${{formatInvoice('855000')}}</span>
                  </div>
                </div>
              </div>
            </slide>
            <slide>
              <img src="https://lorempixel.com/400/200/?72706" class="img-producto-recomendado-explorar">
              <div class="contendor-detalle-producto-recomendado-explorar">
                <div class="contendor-nombre-producto-recomendado-explorar">
                  <span>Xbox One S</span>
                </div>
                <div class="contenedor-precio-producto-recomendado-explorar">
                  <span>${{formatInvoice('855000')}}</span>
                </div>
              </div>
            </slide>
            <slide>
              <img src="https://lorempixel.com/400/200/?72706" class="img-producto-recomendado-explorar">
              <div class="contendor-detalle-producto-recomendado-explorar">
                <div class="contendor-nombre-producto-recomendado-explorar">
                  <span>Xbox One S</span>
                </div>
                <div class="contenedor-precio-producto-recomendado-explorar">
                  <span>${{formatInvoice('855000')}}</span>
                </div>
              </div>
            </slide>
            <slide>
              <img src="https://lorempixel.com/400/200/?72706" class="img-producto-recomendado-explorar">
              <div class="contendor-detalle-producto-recomendado-explorar">
                <div class="contendor-nombre-producto-recomendado-explorar">
                  <span>Xbox One S</span>
                </div>
                <div class="contenedor-precio-producto-recomendado-explorar">
                  <span>${{formatInvoice('855000')}}</span>
                </div>
              </div>
            </slide>
            <slide>
              <img src="https://lorempixel.com/400/200/?72706" class="img-producto-recomendado-explorar">
              <div class="contendor-detalle-producto-recomendado-explorar">
                <div class="contendor-nombre-producto-recomendado-explorar">
                  <span>Xbox One S</span>
                </div>
                <div class="contenedor-precio-producto-recomendado-explorar">
                  <span>${{formatInvoice('855000')}}</span>
                </div>
              </div>
            </slide>
            <slide>
              <img src="https://lorempixel.com/400/200/?72706" class="img-producto-recomendado-explorar">
              <div class="contendor-detalle-producto-recomendado-explorar">
                <div class="contendor-nombre-producto-recomendado-explorar">
                  <span>Xbox One S</span>
                </div>
                <div class="contenedor-precio-producto-recomendado-explorar">
                  <span>${{formatInvoice('855000')}}</span>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "panel-opciones",
    computed: Object.assign({}, mapGetters(['getUsuario']), {
      isActived: function () {
        return this.pagination.current_page;
      },
      pagesNumber: function () {
        if (!this.pagination.to) {
          return [];
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1)
          from = 1;
        let to = from + (this.offset * 2);
        if (to >= this.pagination.last_page)
          to = this.pagination.last_page;
        let pagesArray = [];
        while (from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;
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
