<template>
  <div>
    <div v-if="config">
      <div @click.stop="modal=true">
        <div style="color: #ec6920">Actualiza tu Contraseña:</div>
        ********** <v-btn color="primary"  slot="activator" fab small><v-icon>fa fa-edit</v-icon></v-btn>
      </div>

    </div>
    <div v-else>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>lock</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title @click.stop="modal = true">
            <a href="#" slot="activator" class="link-negro-naranja">
              <span>Cambiar Contraseña</span>
            </a>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </div>
    <v-layout row justify-center>
      <v-dialog v-model="modal" persistent max-width="500px">
        <form v-on:submit.prevent="cambiarPassword">
          <v-card>
            <v-card-title>
              <span class="headline">Cambiar Contraseña</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <small>Campo requerido (*)</small>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field type="password" v-model="data.oldPassword" label="Contraseña Actual (*)" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field type="password" v-model="data.newPassword" label="Contraseña Nueva (*)" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field type="password" v-model="data.newPassword_confirmation" label="Repita la nueva contraseña (*)"required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.native="modal = false">Cancelar</v-btn>
              <v-btn color="success" :onclick="cambiarPassword" type="submit">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
  import AppServices from '../../AppServices';
  import {mapGetters, mapMutations} from 'vuex';
  import helpers from '../../../helpers';

  export default {
      data() {
      return {
        modal: false,
        data: {
          oldPassword: '',
          newPassword: '',
          newPassword_confirmation: ''
        },
      }
    },
    props: ['config'],
    name: "cambiarPassword",
    methods: {
      getAppServices() {
        return AppServices;
      },
      cambiarPassword() {
        let yo = this;
        let token = this.getUsuario.token;
        this.getAppServices().postMethodWithBearer('api/avanzamas/cambiarPassword', this.data, token)
          .then(response => {
            //boton_registrar.button('reset');
            yo.$toastr('success', "Contraseña Cambiada", "Acción exitosa");
            $('#modalPass').modal('hide');
            // this.config=false;
            this.modal=false;
            let opciones = $('#opciones-usuario');
            opciones.attr('class', 'opciones-del-usuario ocultar-opciones-usuario');
            this.mostrarOpcionesUsuario = false;
            yo.data.oldPassword = '';
            yo.data.newPassword = '';
            yo.data.newPassword_confirmation = '';

          }, errors => {
            if (errors.status === 422) {
              for (let err in errors.body.errors) {
                errors.body.errors[err].forEach(function (value) {
                  yo.$toastr('error', value, err.charAt(0).toUpperCase() + err.slice(1));
                });
              }
            } else
              yo.$toastr('error', errors.body.mensaje, "Contraseña anterior errada");
            //boton_registrar.button('reset');
          });
      }
    },
    computed: Object.assign({}, mapGetters(['getUsuario']), {})
  }
</script>
