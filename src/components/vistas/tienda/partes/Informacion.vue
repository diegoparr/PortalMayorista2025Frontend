<template>
  <div class="ctd-inf-tienda">
    <div class="ctd-dscp-inf-tienda">
      <div class="ctd-icn-dscp-inf-tienda">
        <div class="ctd-icn-inf-tienda">
          <div class="icn-inf-tienda">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </div>
          <div class="txt-inf-tienda">
            <span>Aplica Código de Canje</span>
          </div>
        </div>
        <div class="ctd-icn-inf-tienda">
          <div class="icn-inf-tienda">
            <i class="fa fa-tag" aria-hidden="true"></i>
          </div>
          <div class="txt-inf-tienda">
            <span>Promociones y Desc.</span>
          </div>
        </div>
        <div class="ctd-icn-inf-tienda">
          <div class="icn-inf-tienda">
            <i class="fa fa-truck" aria-hidden="true"></i>
          </div>
          <div class="txt-inf-tienda">
            <span>Envíos a todo el país</span>
          </div>
        </div>
      </div>
      <hr>
      <div class="ctd-txt-dscp-tienda">
        {{tienda.v_descripcion}}
      </div>
      <hr>
      <div class="ctd-ctc-tienda">
        <div class="tlt-ctd-ctc-tienda">
          <h3>Contacto</h3>
        </div>
        <div class="ctd-ctc-elms-tienda">
          <div class="ctd-elm-tienda">
            <div class="icn-elm-ctc-tienda">
              <i class="fa fa-globe" aria-hidden="true"></i>
            </div>
            <div class="txt-elm-ctc-tienda">
              <strong><span>Ubicación</span></strong>
              <span>{{tienda.v_nombre_ciudad}},{{tienda.v_nombre_pais}}</span>
            </div>
          </div>
          <div class="ctd-elm-tienda">
            <div class="icn-elm-ctc-tienda">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div class="txt-elm-ctc-tienda" v-if="tienda.direcciones.length > 0">
              <strong><span>Dirección</span></strong>
              <span v-if="tienda.direcciones.length > 0">{{tienda.direcciones[0].v_direccion}}</span>
            </div>
          </div>
          <div class="ctd-elm-tienda">
            <div class="txt-elm-spn">
              <span>A 19.47 kilómetros de distancia, desde tu ubicación.</span>
            </div>
          </div>
          <div class="ctd-elm-tienda">
            <div class="icn-elm-ctc-tienda">
              <i class="fa fa-phone" aria-hidden="true"></i>
            </div>
            <div class="txt-elm-ctc-tienda" v-if="tienda.telefonos.length > 0">
              <strong><span>Teléfono</span></strong>
              <span>+({{tienda.telefonos[0].v_prefijo_telefonico}}) {{tienda.telefonos[0].v_telefono}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ctd-hri-inf-tienda">
      <div class="tlt-hri-inf-tienda">
        <span class="text-center">
          <i class="fa fa-clock-o" aria-hidden="true"></i> Horario de la Tienda
        </span>
      </div>
      <div class="cj-hri-inf-tienda">
        <div class="cbz-cj-hri-inf-tienda">
          <div class="ctd-da-hri-inf-tienda">
            <span>Día</span>
          </div>
          <div class="ctd-hra-hri-inf-tienda">
            <span>Horario</span>
          </div>
        </div>
        <div class="elm-cj-hri-inf-tienda-blanco">
          <div class="elm-da-hri-inf-tienda">
            <span>Lunes</span>
          </div>
          <div class="elm-hra-hri-inf-tienda">
            <strong>
              <span>{{tienda.b_horario_lunes_tienda_no_laborable?'No laborable':(retornarHora12(tienda.v_horario_lunes_tienda_desde)}} - {{retornarHora12(tienda.v_horario_lunes_tienda_hasta))}}</span>
            </strong>
          </div>
        </div>
        <div class="elm-cj-hri-inf-tienda">
          <div class="elm-da-hri-inf-tienda">
            <span>Martes</span>
          </div>
          <div class="elm-hra-hri-inf-tienda">
            <strong>
              <span>{{tienda.b_horario_martes_tienda_no_laborable?'No laborable':(retornarHora12(tienda.v_horario_martes_tienda_desde)}} - {{retornarHora12(tienda.v_horario_martes_tienda_hasta))}}</span>
            </strong>
          </div>
        </div>
        <div class="elm-cj-hri-inf-tienda-blanco">
          <div class="elm-da-hri-inf-tienda">
            <span>Miercoles</span>
          </div>
          <div class="elm-hra-hri-inf-tienda">
            <strong>
              <span>{{tienda.b_horario_miercoles_tienda_no_laborable?'No laborable':(retornarHora12(tienda.v_horario_miercoles_tienda_desde)}} - {{retornarHora12(tienda.v_horario_miercoles_tienda_hasta))}}</span>
            </strong>
          </div>
        </div>
        <div class="elm-cj-hri-inf-tienda">
          <div class="elm-da-hri-inf-tienda">
            <span>Jueves</span>
          </div>
          <div class="elm-hra-hri-inf-tienda">
            <strong>
              <span>{{tienda.b_horario_jueves_tienda_no_laborable?'No laborable':(retornarHora12(tienda.v_horario_jueves_tienda_desde)}} - {{retornarHora12(tienda.v_horario_jueves_tienda_hasta))}}</span>
            </strong>
          </div>
        </div>
        <div class="elm-cj-hri-inf-tienda-blanco">
          <div class="elm-da-hri-inf-tienda">
            <span>Viernes</span>
          </div>
          <div class="elm-hra-hri-inf-tienda">
            <strong>
              <span>{{tienda.b_horario_viernes_tienda_no_laborable?'No laborable':(retornarHora12(tienda.v_horario_viernes_tienda_desde)}} - {{retornarHora12(tienda.v_horario_viernes_tienda_hasta))}}</span>
            </strong>
          </div>
        </div>
        <div class="elm-cj-hri-inf-tienda">
          <div class="elm-da-hri-inf-tienda">
            <span>Sabado</span>
          </div>
          <div class="elm-hra-hri-inf-tienda">
            <strong>
              <span>{{tienda.b_horario_sabado_tienda_no_laborable?'No laborable':(retornarHora12(tienda.v_horario_sabado_tienda_desde)}} - {{retornarHora12(tienda.v_horario_sabado_tienda_hasta))}}</span>
            </strong>
          </div>
        </div>
        <div class="elm-cj-hri-inf-tienda-blanco">
          <div class="elm-da-hri-inf-tienda">
            <span>Domingo</span>
          </div>
          <div class="elm-hra-hri-inf-tienda">
            <strong>
              <span>{{tienda.b_horario_domingo_tienda_no_laborable?'No laborable':(retornarHora12(tienda.v_horario_domingo_tienda_desde)}} - {{retornarHora12(tienda.v_horario_domingo_tienda_hasta))}}</span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "informacion",
    props: ['tienda']
  }
</script>
