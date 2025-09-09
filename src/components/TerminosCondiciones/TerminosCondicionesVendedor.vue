<template>
  <div class="modal fade" id="terminosCondiciones" data-backdrop="static" data-keyboard="false" tabindex="-1"
       role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span>
          </button>-->
          <h4 class="modal-title" id="myModalLabel">Términos y Condiciones</h4>
          <v-btn type="button" color="error" data-dismiss="modal"
                 v-on:click="terminosCondiciones(false)">
            No Acepto
          </v-btn>
          <v-btn type="button" color="success" v-on:click="terminosCondiciones(true)">Acepto</v-btn>
        </div>

        <!-- <p class="text-justify">
           Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
           laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
           ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
           in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at
           vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis
           dolore te feugait nulla facilisi.

           Expetenda tincidunt in sed, ex partem placerat sea, porro commodo ex eam. His putant aeterno interesset
           at. Usu ea mundi tincidunt, omnium virtute aliquando ius ex. Ea aperiri sententiae duo. Usu nullam
           dolorum quaestio ei, sit vidit facilisis ea. Per ne impedit iracundia neglegentur. Consetetur
           neglegentur eum ut, vis animal legimus inimicus id.

           His audiam deserunt in, eum ubique voluptatibus te. In reque dicta usu. Ne rebum dissentiet eam, vim
           omnis deseruisse id. Ullum deleniti vituperata at quo, insolens complectitur te eos, ea pri dico munere
           propriae. Vel ferri facilis ut, qui paulo ridens praesent ad. Possim alterum qui cu. Accusamus consulatu
           ius te, cu decore soleat appareat usu.

           Est ei erat mucius quaeque. Ei his quas phaedrum, efficiantur mediocritatem ne sed, hinc oratio blandit
           ei sed. Blandit gloriatur eam et. Brute noluisse per et, verear disputando neglegentur at quo. Sea quem
           legere ei, unum soluta ne duo. Ludus complectitur quo te, ut vide autem homero pro.

           Vis id minim dicant sensibus. Pri aliquip conclusionemque ad, ad malis evertitur torquatos his. Has ei
           solum harum reprimique, id illum saperet tractatos his. Ei omnis soleat antiopam quo. Ad augue inani
           postulant mel, mel ea qualisque forensibus.

           Lorem salutandi eu mea, eam in soleat iriure assentior. Tamquam lobortis id qui. Ea sanctus democritum
           mei, per eu alterum electram adversarium. Ea vix probo dicta iuvaret, posse epicurei suavitate eam an,
           nam et vidit menandri. Ut his accusata petentium.

           Meis vocent signiferumque pri et. Facilis corpora recusabo ne quo, eum ne eruditi blandit suscipiantur.
           Mazim sapientem sed id, sea debet commune iracundia in. Eius falli propriae te usu. In usu nonummy
           volumus expetenda, sint quando facilisis ei per, delectus constituto sea te.

           Wisi forensibus mnesarchum in cum. Per id impetus abhorreant, his no magna definiebas, inani rationibus
           in quo. Ut vidisse dolores est, ut quis nominavi mel. Ad pri quod apeirian concludaturque, id timeam
           iudicabit rationibus pri. Erant putant luptatum ex sit, error euismod ad qui, meliore voluptatum
           complectitur an vix. Clita persius sed et, vix vidit consulatu complectitur ex. Per nonummy postulant
           assentior an, mea audiam fabellas deserunt id.

           Cu nam labores lobortis definiebas, ei aliquyam salutatus persequeris quo, cum eu nemore fierent
           dissentiunt. Per vero dolor id, vide democritum scribentur eu vim, pri erroribus temporibus ex. Euismod
           molestie offendit has no. Quo te semper invidunt quaestio, per vituperatoribus sadipscing ei, partem
           aliquyam sensibus in cum.

           Mei eu mollis albucius, ex nisl contentiones vix. Duo persius volutpat at, cu iuvaret epicuri mei. Duo
           posse pertinacia no, ex dolor contentiones mea. Nec omnium utamur dignissim ne. Mundi lucilius salutandi
           an sea, ne sea aeque iudico comprehensam. Populo delicatissimi ad pri. Ex vitae accusam vivendum pro.
         </p>-->
        <div class="modal-body">
          <div v-if="loading" class="text-center">
            <i class="fa fa-spinner fa-spin fa-2x"></i>
            <p>Cargando términos y condiciones...</p>
          </div>
          
          <div v-else-if="error" class="alert alert-warning">
            <i class="fa fa-exclamation-triangle"></i>
            No se pudo cargar el documento. Por favor, contacta al administrador.
          </div>
          
          <div v-else class="terminos-content">
            <h4>Términos y Condiciones de Uso</h4>
            
            <h5>1. Aceptación de los Términos</h5>
            <p>Al acceder y utilizar esta plataforma, usted acepta estar sujeto a estos términos y condiciones de uso.</p>
            
            <h5>2. Uso de la Plataforma</h5>
            <p>La plataforma está destinada para la compra y venta de productos. Los usuarios deben utilizar la plataforma de manera responsable y conforme a la ley.</p>
            
            <h5>3. Cuentas de Usuario</h5>
            <p>Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta.</p>
            
            <h5>4. Productos y Servicios</h5>
            <p>Los vendedores son responsables de la veracidad de la información de sus productos y del cumplimiento de las leyes aplicables.</p>
            
            <h5>5. Pagos y Transacciones</h5>
            <p>Las transacciones se procesan de manera segura. La plataforma no se hace responsable por disputas entre compradores y vendedores.</p>
            
            <h5>6. Privacidad</h5>
            <p>Respetamos su privacidad y protegemos sus datos personales de acuerdo con nuestra política de privacidad.</p>
            
            <h5>7. Modificaciones</h5>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a los usuarios.</p>
            
            <h5>8. Contacto</h5>
            <p>Para preguntas sobre estos términos, contacte a: soporte@lahipertienda.com</p>
          </div>
        </div>

        <div class="modal-footer">
          <v-btn type="button" color="error" data-dismiss="modal"
                 v-on:click="terminosCondiciones(false)">
            No Acepto
          </v-btn>
          <v-btn type="button" color="success" v-on:click="terminosCondiciones(true)">Acepto</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex';
  import AppServices from '../AppServices';
  import pdf from 'vue-pdf';

  export default {
    data() {
      return {
        src: null,
        numPages: 0,
        loading: false,
        error: false,
        showHtmlContent: false
      }
    },
    components: {
      pdf
    },
    name: "terminos-condiciones",
    mounted() {
      // Usar un PDF de ejemplo válido o mostrar contenido HTML
      this.loading = false;
      this.error = false;
      this.src = null;
      this.numPages = 0;
      
      // Mostrar términos y condiciones en HTML en lugar de PDF
      this.showHtmlContent = true;
    },
    methods: Object.assign({}, mapMutations([
      'setUsuarioDestroy'
    ]), {
      getAppServices() {
        return AppServices;
      },
      terminosCondiciones(resultado) {
        if (resultado) {
          const formData = new FormData();
          this.getAppServices().postMethodWithoutBearer('api/aceptarTerminos', formData)
            .then(response => {
              this.$toastr('success', response.body.mensaje, "Terminos Aceptados");
              $('#terminosCondiciones').modal('hide');
            }, errors => {
              this.getAppServices().mapErrorsResponses(this, errors);
            });
        }
        else {
          this.logOut();
        }
      },
      logOut() {
        this.setUsuarioDestroy();
        this.$router.push({name: 'index'});
      },
    })
  }
</script>

<style scoped>
.terminos-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 10px 0;
}

.terminos-content h4 {
  color: #ff6633;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #ff6633;
  padding-bottom: 10px;
}

.terminos-content h5 {
  color: #333;
  font-weight: 600;
  margin: 20px 0 10px 0;
  font-size: 1.1rem;
}

.terminos-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  text-align: justify;
}

.alert {
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid transparent;
}

.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeaa7;
}

.text-center {
  text-align: center;
  padding: 40px 20px;
}

.fa-spinner {
  color: #ff6633;
  margin-bottom: 15px;
}
</style>
