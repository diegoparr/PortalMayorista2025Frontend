<template>
  <div class="login-box">
    <template v-if="formularioMostrar==='acceso'">
      <div class="login-box-body">
        <div class="login-logo">
          <router-link class="links-hipertienda" :to="{name:'explore'}"><img src="/dist/img/img_logo.png" class="img-responsive img-responsive-center" alt="Logo"></router-link>
        </div>
        <h2 class="text-center">Ingresa tu nueva Contraseña</h2>
        <form v-on:submit.prevent="checkForm">
          <div :class="(!errors.first('email'))?'form-group':'form-group has-error'">
            <input placeholder="Correo electrónico" name="email" type="email" class="form-control"
                    data-placement="left" v-validate="'required|email|min:5|max:255'"
                   data-vv-as="correo electrónico" v-model="user.email" required
                   autofocus
                   title="Ingresa tu correo electrónico, por ejemplo example@example.com">
            <span v-show="errors.has('email')" class="help-block text-center">{{ errors.first('email')}}</span>
          </div>
          <div :class="(!errors.first('password'))?'form-group':'form-group has-error'">
            <input placeholder="Contraseña" name="password" type="password" class="form-control"
                    data-placement="left" required
                   title="Ingresa una contraseña que variando entre caracteres alfanuméricos y que este entre 8 y 25 caracteres"
                   data-vv-as="contraseña"
                   v-model="user.password"
                   v-validate="'required|min:8|max:25|alpha_num'">
            <span v-show="errors.has('password')" class="help-block text-center">{{ errors.first('password')}}</span>
          </div>
          <div :class="(!errors.first('password_confirmation'))?'form-group':'form-group has-error'">
            <input placeholder="Confirma tu Contraseña" name="password_confirmation" type="password" class="form-control"
                    data-placement="left" required
                   title="Ingresa una contraseña que variando entre caracteres alfanuméricos y que este entre 8 y 25 caracteres"
                   data-vv-as="Confirmar contraseña"
                   v-model="user.password_confirmation"
                   v-validate="'required|min:8|max:25|alpha_num|confirmed:password'">
            <span v-show="errors.has('password_confirmation')" class="help-block text-center">{{ errors.first('password_confirmation')}}</span>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <button type="submit" class="btn btn-hipertienda btn-block btn-flat" id="submitButton"
                      :disabled="disabledButtonSubmit"
                      data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Verificando">Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>
<script>
  import AppServices from '../AppServices';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: 'newPassword',
    data() {
      return {
        user: {
          email: null,
          password: null,
          password_confirmation: null,
          token: this.$route.params.id
        },
        formularioMostrar: 'acceso',
      }
    },
    props: ['modal', 'cambiar','id'],
    methods: Object.assign({}, mapMutations([
      'setUsuario', 'setUsuarioTokenStore', 'setUsuarioIdStore', 'setUsuarioExpiracionTokenStore',
      'setUsuarioAutenticadoFull', 'setIndex', 'setStore', 'setShow', 'setUpdate', 'setDestroy',
      'setMenu', 'setIndexReiniciar', 'setStoreReiniciar', 'setShowReiniciar',
      'setUpdateReiniciar', 'setDestroyReiniciar', 'setMenuReiniciar','setCarrito'
    ]), {
      getAppServices() {
        return AppServices;
      },
      registrarse(){
        if(this.modal)
        {
          console.log('cambie');
          this.$emit("cambiar");
        }
        else{
          this.$router.push({name: 'register'});
        }

      },
      checkForm() {
        console.log('id',this.id);
        this.$validator.validateAll().then(() => {
          let boton_loading = $('#submitButton');
          boton_loading.button('loading');
          let yo = this;
          this.postMethodWithoutBearer(this.urlsApi().endpointResetPassword, this.user)
            .then(response => {
              this.$toastr('success', '', response.body.success);
              yo.$router.push({name: 'access'});

            },  errors => {
              $('#modal-passw').modal('hide');
              yo.mapErrorsResponses(yo, errors)});
        });
        this.$emit('cleanModal');
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
