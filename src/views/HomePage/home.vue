<template>
  <v-app light>
    <v-app-bar
      height="60px"
    >

        <div class="vertical-nav-header d-flex items-center ps-5  ">

        <v-img
          :src="require('@/assets/logos/Sacris_logo.png')"
          class="d-none d-lg-flex d-md-flex "

          width="250px"

        ></v-img>
        <v-img
          :src="require('@/assets/logos/Sacris_logo.png')"
          class="d-flex d-lg-none d-md-none"
          width="250px"

        ></v-img>


    </div>

      <v-spacer></v-spacer>


      <v-btn icon  color="primary" class="d-flex d-lg-none d-md-none">
        <v-icon large>
          {{icons.mdiLogin  }}
        </v-icon>
      </v-btn>
      <v-btn color="primary" outlined class="d-none d-lg-flex d-md-flex ">

        <v-icon  class="mr-1">
           {{icons.mdiLogin  }}
        </v-icon>
        <b>Ingresar</b>
      </v-btn>

      <template v-slot:extension>
        <v-tabs fixed-tabs >
          <v-tab>Inicio</v-tab>
          <v-tab>Cursos</v-tab>
          <v-tab>Anuncios</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-content>
      <section>
        <v-parallax
        :src="iglesia2"
        height="540">

          <v-layout column align-center justify-center  class="white--text">
            <h1 class="white--text mb-2 text-center " style="font-size:45px; font-weight: 900; text-shadow: 3px 2px #000000">Sacris</h1>
            <div class="white--text mb-2  text-center" style=" font-size:25px; font-weight: 900; text-shadow: 3px 2px #000000">Gestor de servicios eucarísticos </div>
            <div class="subheading mb-3 text-center" style="font-weight: 500; text-shadow: 1px 1px #000000">Evita el papeleo y las filas largas, haz tus inscripciones y solicitudes aquí.</div>
            <v-btn color="primary" class=" mt-5" dark large to="">
              Iniciar Sesión
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex class="my-3 text-center">

              <h2 class="headline text-center ">La mejor oportunidad de cambiar la rutina y agilizar, facilitar y organizar sus tareas diarias</h2>
              <span class="subheading text-center">
                No más demora y espera para recibir solicitudes, no más desorden o perdida de documentos
              </span>

          </v-flex>
          <v-flex >
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex md4>
                  <v-hover
                    v-slot="{ hover }"
                      close-delay="2"
                      open-delay="1"
                      overlay = false
                    >
                  <v-card
                  :elevation="hover ? 10 : 5"
                  :color="hover ? 'hover' :''"
                    :class="{ 'on-hover': hover }"
                     class=" elevation transparent">
                    <v-card-text
                       class="text-center">
                      <v-icon x-large color="primary">
                        {{icons.mdiCheckDecagram}}
                      </v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Consultar cursos disponibles</div>
                    </v-card-title>
                    <v-card-text>
                     Aquí contaran con la funcionalidad de una interfaz que les permitirá consultar los cursos disponibles, para que se genere automáticamente la inscripción en el curso seleccionado, Así mismo los administradores podrán crear un nuevo curso o simplemente inactivarlo.
                    </v-card-text>

                  </v-card>
                  </v-hover>
                </v-flex>
                <v-flex xs12 md4>
                  <v-hover
                    v-slot="{ hover }"
                      close-delay="2"
                      open-delay="1"
                      overlay = false
                    >
                  <v-card
                  :elevation="hover ? 10 : 5"
                  :color="hover ? 'hover' :''"
                    :class="{ 'on-hover': hover }"
                     class=" elevation transparent">
                    <v-card-text
                       class="text-center">
                      <v-icon x-large color="primary">
                        {{icons.mdiCheckDecagram}}
                      </v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Públicar avisos parroquiales</div>
                    </v-card-title>
                    <v-card-text>
                      Aqui contará con la funcionalidad de un muro de publicaciones en cual permitirá la consulta de los avisos parroquiales más relevantes. Así mismo los administradores tendrán control de las publicaciones que permanecerán a la vista de sus feligreses como de aquellas que ya hayan culminado.
                    </v-card-text>

                  </v-card>
                  </v-hover>
                </v-flex>
                <v-flex xs12 md4>
                  <v-hover
                    v-slot="{ hover }"
                      close-delay="2"
                      open-delay="1"
                      overlay = false
                    >
                  <v-card
                  :elevation="hover ? 10 : 5"
                  :color="hover ? 'hover' :''"
                    :class="{ 'on-hover': hover }"
                     class=" elevation transparent">
                    <v-card-text
                       class="text-center">
                      <v-icon x-large color="primary">
                        {{icons.mdiCheckDecagram}}
                      </v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Generar reportes por mes</div>
                    </v-card-title>
                    <v-card-text>
                      Aquí contará con la funcionalidad de generar reportes de las inscripciones realizadas por los usuarios en los cursos disponibles y de las eucaristías que fueron fueron solicitadas para tener un control diario de estas o mensual ya dependiendo de la necesidad presente.
                    </v-card-text>

                  </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="iglesia2" height="390">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Sacris es un gestor diseñado para ayudar a mejorar tareas cotidianas en una iglesia, escuela, evento, etc...  </div>
            <em>con módulos diseñados para dar una mejor respuesta en organización y eficacia al cliente.</em>
            <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
              Ver Cursos
            </v-btn>
          </v-layout>
        </v-parallax>


      </section>

       <section>
        <v-container grid-list-md>


          <v-layout row wrap>
          <v-flex xs12 text-center class="mt-5">
           <div class="headline">Contamos con varias ventajas</div>
           <br>
          <div>entre ellas podremos obsevar:</div>
          </v-flex>
          <v-flex >
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex md3>

                  <v-card
                     class=" elevation-0 transparent">
                    <v-card-text
                       class="text-center">
                      <v-img :src="require('@/assets/images/icons/funfact/icono8.png')"></v-img>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center"> <span>1.</span> Mayor agilidad para los procesos</div>
                    </v-card-title>
                  </v-card>

                </v-flex>
                <v-flex md3>

                 <v-card
                     class=" elevation-0 transparent">
                    <v-card-text
                       class="text-center">
                      <v-img :src="require('@/assets/images/icons/funfact/icono6.png')"></v-img>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                     <div class="headline text-center"> <span>2. </span>Total Accesibilidad a la Información</div>
                    </v-card-title>
                  </v-card>

                </v-flex>
                <v-flex md3>

                 <v-card
                     class=" elevation-0 transparent">
                    <v-card-text
                       class="text-center">
                      <v-img :src="require('@/assets/images/icons/funfact/icono2.png')"></v-img>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center"> <span>3.</span> Evita la perdida de documentos</div>
                    </v-card-title>
                  </v-card>

                </v-flex>
                <v-flex md3>

                 <v-card
                     class=" elevation-0 transparent">
                    <v-card-text
                       class="text-center">
                      <v-img :src="require('@/assets/images/icons/funfact/icono4.png')"></v-img>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center"> <span>4.</span> Menor cantidad de aglomeraciones</div>
                    </v-card-title>
                  </v-card>

                </v-flex>
              </v-layout>
            </v-container>


                </v-flex>
            </v-layout>
          </v-container>
      </section>

       <section>
        <v-parallax :src="iglesia" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">We are dropping cool news and opportunities on socials</div>
          </v-layout>
          <v-layout justify-space-around justify-center>

              <v-icon x-large dark> {{icons.mdiLogin  }}</v-icon>

              <v-icon x-large dark> {{icons.mdiLogin  }}</v-icon>

              <v-icon x-large dark> {{icons.mdiLogin  }}</v-icon>

              <v-icon x-large dark> {{icons.mdiLogin  }}</v-icon>

              <v-icon x-large dark> {{icons.mdiLogin  }}</v-icon>
            </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Gestionar solicitudes</div>
                </v-card-title>
                <v-card-text>
                  En el módulo de gestión de solicitudes, SACRIS busca acoplarse lo mejor posible a las necesidades presentes en este ámbito por eso contará con interfaces que le permitan a los administradores una forma rápida, ordenada y segura de consultar las solicitudes realizadas por los usuarios.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Administrar inscripciones</div>
                </v-card-title>
                <v-card-text>
                  En el módulo de administrar inscripciones, SACRIS es inovadora por lo cual integra la parte de subir los archivos solicitados para la inscripción del curso, lo que evita la acumulación y manejo físicos de documentos sin contar toda la eficacia y rapidez que esto genera.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Administrar inscripciones</div>
                </v-card-title>
                <v-card-text>
                  En el módulo de administrar inscripciones, SACRIS es inovadora por lo cual integra la parte de subir los archivos solicitados para la inscripción del curso, lo que evita la acumulación y manejo físicos de documentos sin contar toda la eficacia y rapidez que esto genera.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Gestión de Anuncios</div>
                </v-card-title>
                <v-card-text>
                  SACRIS busca que el cliente pueda mantener informados a todos los suyos por medio de un muro de publicaciones.
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>






       <v-footer

    dark
    padless
  >
    <v-card
    color="primary"
      class="flex"
      flat
      tile
    >
      <v-card-title class="purple darken-2">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>SACRIS</strong>
      </v-card-text>
    </v-card>
  </v-footer>

    </v-content>
</v-app>
</template>

<script>
import iglesia from '@/assets/images/igle2.jpg'
import iglesia2 from '@/assets/images/IGLE.jpg'
import { mdiLogin,mdiCheckDecagram,mdiFacebook,mdiTwitter,mdiInstagram } from '@mdi/js'
export default {
  name: "App",
  data: function() {
    return {
      iglesia,
      iglesia2,
      imageLink: {
        main:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea",

        logo:
          "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fandroid-chrome-512x512.png?alt=media&token=8a0a66f6-4741-4ff6-8f28-eb9ec74374df",

      },
      email: "",
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      subscribed: false
    };
  },
  methods: {
    subscribe: function() {
      this.subscribed = !this.subscribed;
    }
  },

  computed: {
    imgHeight: function() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    }
  },

  mounted: function() {
    this.calculateHeight();
  },
  setup() {
    return {
      icons: {
        mdiLogin,
        mdiCheckDecagram,
        mdiFacebook,
        mdiTwitter,
        mdiInstagram

      },
    }
  },
};
</script>

<style scoped>
.imagenIglesia{
  background: url(../../assets/images/iglesia.jpg);
}
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
</style>
