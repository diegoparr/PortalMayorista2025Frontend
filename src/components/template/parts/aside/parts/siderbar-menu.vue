<template>
  <ul class="sidebar-menu" v-if="!getAutenticadoFull">
    <router-link :to="{name:'register'}" tag="li">
      <a>
        <i class="fa fa-user-plus"></i>
        <span class="nav-label">Registrate</span>
      </a>
    </router-link>
    <router-link :to="{name:'access'}" tag="li">
      <a>
        <i class="fa fa-sign-in"></i>
        <span class="nav-label">Ingresar</span>
      </a>
    </router-link>
  </ul>
  <ul class="sidebar-menu" data-widget="tree" v-else-if="getAutenticadoFull">
    <router-link :to="{name:'dashboard'}" tag="li">
      <a>
        <i class="fa fa-dashboard"></i>
        <span class="nav-label">Panel</span>
      </a>
    </router-link>
    <router-link v-for="(menu,i) in this.getMenu" :key="i" :to="{name:menu.route_name}" tag="li">
      <a>
        <i :class="menu.icon"></i>
        <span class="nav-label">{{menu.title}}</span>
      </a>
    </router-link>
  </ul>
  <ul class="sidebar-menu" data-widget="tree" v-else>
    <router-link :to="{name:'dashboard'}" tag="li">
      <a>
        <i class="fa fa-home"></i>
        <span class="nav-label">Inicio</span>
      </a>
    </router-link>
    <router-link :to="{name:'explore'}" tag="li">
      <a>
        <i class="fa fa-search"></i>
        <span class="nav-label">Explorar</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {

    computed: mapGetters([
      'getMenu', 'getUsuario', 'getAutenticadoFull'
    ])
  }
</script>
