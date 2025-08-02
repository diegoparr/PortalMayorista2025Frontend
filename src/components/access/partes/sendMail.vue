<template>
  <div>
    <a href="#" v-on:click="abrirModal" class="links-hipertienda">¿Olvidaste tus credenciales?</a>
    <div class="modal fade" id="modal-passw" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h2 class="modal-title text-center" id="modalTitle">Recuperar Contraseña</h2>
          </div>
          <div class="modal-body">
            <template>
              <div class="row">
                <div class="col-xs-3"></div>
                <div class="col-md-6">
                  <form v-on:submit.prevent="checkForm">
                    <div :class="(!errors.first('email'))?'form-group':'form-group has-error'">
                      <input placeholder="Correo electrónico" name="email" type="email" class="form-control"
                              data-placement="left" v-validate="'required|email|min:5|max:255'"
                             data-vv-as="correo electrónico" v-model="user.email" required
                             title="Ingresa tu correo electrónico, por ejemplo example@example.com">
                      <span v-show="errors.has('email')"
                            class="help-block text-center">{{ errors.first('email')}}</span>
                    </div>
                    <div class="row">
                      <div class="col-xs-12">
                        <button type="submit" class="btn btn-hipertienda btn-block btn-flat text-xs-center"
                                :disabled="disabledButtonSubmit"
                                data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Verificando">
                          Enviar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppServices from '../../AppServices';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: 'sendMail',
    data() {
      return {
        user: {
          email: null,
        },
      }
    },
    props: ['modal', 'cambiar'],
    methods: Object.assign({}, mapMutations([
      'setUsuario', 'setUsuarioTokenStore', 'setUsuarioIdStore', 'setUsuarioExpiracionTokenStore',
      'setUsuarioAutenticadoFull', 'setIndex', 'setStore', 'setShow', 'setUpdate', 'setDestroy',
      'setMenu', 'setIndexReiniciar', 'setStoreReiniciar', 'setShowReiniciar',
      'setUpdateReiniciar', 'setDestroyReiniciar', 'setMenuReiniciar', 'setCarrito'
    ]), {
      getAppServices() {
        return AppServices;
      },
      enrutar(ruta) {
        if (this.modal) {
          console.log('cambie');
          this.$emit("cambiar");
        }
        else {
          this.$router.push({name: ruta});
        }

      },
      abrirModal() {
        $('#modal-passw').modal('show');
      },
      checkForm() {
        this.$validator.validateAll().then(() => {
          let boton_loading = $('#submitButton');
          boton_loading.button('loading');
          let yo = this;
          this.postMethodWithoutBearer(this.urlsApi().endpointMailPassword, this.user)
            .then(response => {
              console.log('respuesta', response);
              this.$toastr('info', '', response.body.success);
              $('#modal-passw').modal('hide');
            }, errors => {
              $('#modal-passw').modal('hide');
              yo.mapErrorsResponses(yo, errors)});
        });

      },

      cancelarProceso() {
        this.formularioMostrar = 'acceso';
        this.$emit('cleanModal');
      }
    }),
    computed: Object.assign({}, mapGetters(['getUsuario']), {
      disabledButtonSubmit: function () {
        return !(!this.errors.has('email') && !this.errors.has('password')
        );
      }
    }),
    components: {},
  }
</script>
