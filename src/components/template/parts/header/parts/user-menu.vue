<template>
  <li class="dropdown user user-menu">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" v-if="getAutenticadoFull">
      <img :src="getImageUrl(getUsuario.v_avatar)" class="user-image"
           alt="User Image">
      <span class="hidden-xs">{{getUsuario.v_primer_nombre}} {{getUsuario.v_primer_apellido}}</span>
    </a>
    <button type="button" class="btn btn-hipertienda-oscuro btn-flat" style="margin: 7px;" v-else v-on:click="register">
      <i class="fa fa-user-plus" aria-hidden="true">
      </i>
      <span id="registrate"> Registrate</span>
    </button>
    <ul class="dropdown-menu">
      <!-- User image -->
      <li class="user-header">
        <img :src="getImageUrl(getUsuario.v_avatar)" class="img-circle"
             alt="User Image">
        <p>
          {{getUsuario.v_primer_nombre + ' ' + getUsuario.v_primer_apellido}}
        </p>
      </li>
      <li class="user-footer">
        <!--<div class="pull-left">
          <a href="#" class="btn btn-default btn-flat">Tu Perfil</a>
        </div>-->
        <div class="pull-right">
          <a class="btn btn-default btn-flat" v-on:click="logOut">Salir</a>
        </div>
      </li>
    </ul>
  </li>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import AppServices from '../../../../AppServices';

  export default {
    name: 'UserMenu',
    computed: mapGetters([
      'getAutenticadoFull',
      'getUsuario'
    ]),
    methods: Object.assign({}, mapMutations(['setUsuarioDestroy', 'setStoreReiniciar', 'setShowReiniciar',
      'setUpdateReiniciar', 'setDestroyReiniciar', 'setMenuReiniciar', 'setIndexReiniciar']), {
      logOut() {
        this.setUsuarioDestroy();
        this.getAppServices().setCleanPermissions(this);
        this.$router.push({name: 'index'});
      },
      register() {
        this.$router.push({name: 'register'});
      },
      getAppServices() {
        return AppServices;
      },
    })
  }
</script>
