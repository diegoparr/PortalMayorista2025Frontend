<template>
  <form v-on:submit.prevent="actualizar" >
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <div :class="(!errors.first('v_nombre'))?'form-group':'form-group has-error'">
        <div class="form-group">
          <label for="v_nombre">Nombre Característica</label>
          <input name="v_nombre" type="text" class="form-control"
                  data-placement="left" required id="v_nombre"
                 title="Ingrese el nombre de la característica" v-validate="'required|alpha_spaces|min:2|max:100'"
                 data-vv-as="nombre de la caracteristica" v-model="caracteristica.v_nombre" >
          <span v-show="errors.has('v_nombre')" class="help-block">{{ errors.first('v_nombre')}}</span>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12">
      <div :class="(!errors.first('v_tipo'))?'form-group':'form-group has-error'">
        <div class="form-group">
          <label for="v_nombre">Tipo Caracteristica</label>
          <model-select :options="tipos" id="v_tipo" v-model="v_tipo" class="form-control"

                        data-placement="left" title="Selecciona el tipo"
                        required>
          </model-select>
          <span v-show="errors.has('v_tipo')" class="help-block">{{ errors.first('v_tipo')}}</span>
        </div>
      </div>
    </div>
    <div  v-if="mostrarMultiple">
      <div class="col-xs-6 col-md-6">
        <div :class="(!errors.first('valor_caracteristica'))?'form-group':'form-group has-error'">
          <label for="valor_caracteristica">Valor</label>
          <input placeholder="Valor" name="valor_caracteristica" type="text"
                 class="form-control" v-model="valor_caracteristica"
                  data-placement="left" id="valor_caracteristica"
                 title="Ingresa el valor de la caracteristica que deseas registrar" data-vv-as="valor"
                 v-validate="'required|min:1|max:255'">
          <span v-show="errors.has('valor_caracteristica')"
                class="help-block">{{ errors.first('valor_caracteristica') }}</span>
        </div>
      </div>
      <div class="col-xs-6 col-md-1 text-left">
        <v-btn type="button" color="primary" :disabled="!deshabilitarButtonPlus"
                v-on:click="crearValores">
          <i class="fa fa-plus pull-left" aria-hidden="true"></i>
          <span id="textButtonCaracteristica">Registrar Valor</span>
        </v-btn>
      </div>
      <div>
        <table class="table table-hover">
          <tbody>
          <tr>
            <th class="text-center">Valor</th>
            <th class="text-center">Opciones</th>
          </tr>
          <tr v-for="item in valores">
            <td class="text-center">{{item.valor}}</td>
            <td class="text-center">
              <v-btn color="error" type="button"
                      v-on:click="eliminarValor(item.valor)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" align="center">
        <div class="form-group">
          <v-btn color="primary" type="submit" id="submitButton" :disabled="deshabilitar"
                  data-loading-text="&lt;i class='fa fa-spinner fa-spin '&gt;&lt;/i&gt; Editando">
            <i class="fa fa-pencil pull-left"></i> Editar
          </v-btn>
        </div>
      </div>
    </div>
  </div>
  </form>
</template>
<script>
  import AppServices from '../../AppServices';
  import {ModelSelect} from "vue-search-select";
  import {mapGetters, mapMutations} from 'vuex';
  import helpers from '../../../helpers';
  export default {
      data() {
        return {
          caracteristica:[],
          valor_caracteristica: null,
          valores: [],
          tipos: [],
          v_tipo: {
            value: "",
            text: ""
          },
        }
      },
      computed: Object.assign({}, mapGetters([
        'getUsuario'
      ]), {
        deshabilitar() {
          return !(!this.errors.has('v_nombre')
          );
        },
        deshabilitarButtonPlus() {
          return this.valor_caracteristica !== null;
        },
        mostrarMultiple() {
          return this.v_tipo.value === 'multiple';
        },
      }),
      props: ['updateCaracteristica'],
      created() {
        this.caracteristica = this.updateCaracteristica;
        this.tipos = [{text: 'Unica', value: 'unica'}, {text: 'Multiple', value: 'multiple'}];
        this.v_tipo.value = this.caracteristica.v_tipo;
        this.updateCaracteristica.valores_caracteristicas.forEach( item =>{
          this.valores.push({
            valor: item.v_valor
          });
        });
        $(function () {
          $('[]').tooltip()
        });
      },
      components: {ModelSelect},
      methods: {
        getAppServices() {
          return AppServices;
        },
        crearValores() {
          this.valores.push({
            valor: this.valor_caracteristica
          });
          this.valor_caracteristica = null;
        },
        eliminarValor(valor) {
          this.valores = helpers.eliminarArrayObjetos(this.valores, 'valor', valor);
        },
        actualizar() {
          let yo = this;
          let token = this.getUsuario.token;
          this.caracteristica.valores = this.valores;
          this.$validator.validateAll().then(() => {

            let boton_editar = $('#submitButton');
            boton_editar.button('loading');

            yo.getAppServices().putMethodWithBearer("api/ecommerce/caracteristicas/" + this.caracteristica.id_m_caracteristicas,this.caracteristica, token)
            .then(response => {
              boton_editar.button('reset');
              yo.$toastr('success', response.body.mensaje, "Acción exitosa");
              $('#modal').modal('hide');
              yo.$emit('actualizar');
            }, errors => {
              console.log(errors);
              if (errors.status === 422) {
                for (let err in errors.body.errors) {
                  errors.body.errors[err].forEach(function (value) {
                    yo.$toastr('error', value, helpers.ufirst("validación"));
                  });
                }
              } else
                yo.$toastr('error', errors.body.mensaje, "Error desconocido");
              boton_editar.button('reset');
            });
          });
        }
      },
      mounted() {
        let yo = this;
        $('#modal').on('hidden.bs.modal', function (e) {
          yo.$emit('cerrar_modal');
        })
      }
    }
</script>
