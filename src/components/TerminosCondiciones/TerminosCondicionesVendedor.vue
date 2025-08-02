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
        <template>
          <!--<pdf src="http://api-ecommerce.test/example.pdf"></pdf>-->
          <pdf
            v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            style="display: inline-block; width: 100%"
          ></pdf>
        </template>

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
        loading: true,
        error: false
      }
    },
    components: {
      pdf
    },
    name: "terminos-condiciones",
    mounted() {
      // Crear el loading task dentro del mounted para evitar problemas
      const loadingTask = pdf.createLoadingTask('https://cdn.mozilla.net/pdfjs/tracemonkey.pdf');
      
      loadingTask.promise.then(pdf => {
        this.numPages = pdf.numPages;
        this.src = loadingTask;
        this.loading = false;
      }).catch(error => {
        console.error('Error cargando PDF:', error);
        this.error = true;
        this.loading = false;
        // Usar una URL alternativa o mostrar un mensaje de error
        this.src = null;
      });
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
