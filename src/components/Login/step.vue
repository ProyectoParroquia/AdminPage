<template>
    <div>
     
      <v-stepper v-model="e1">
        <v-stepper-header>
          <template v-for="n in steps">
            <v-stepper-step
            color="purple lighten-2"
              :key="`${n}-step`"
              :complete="e1 > n"
              :step="n"
              editable
            >
              Step {{ n }}
            </v-stepper-step>
  
            <v-divider
              v-if="n !== steps"
              :key="n"
            ></v-divider>
          </template>
        </v-stepper-header>
  
        <v-stepper-items>
          <v-stepper-content
            :key="`${n}-content`"
            :step="1"
          >
            <v-card
              class="mb-12"
              height="200px"
            >
              <v-row >
                  <v-col cols="12" md="6">
                     <validation-provider
                      v-slot="{ errors }"
                      name="Nombre"
                      rules="required|max:25|alpha_spaces|min:3"
                    >
                          <v-text-field
                          color="#ae5f9e"
                            v-model="form.nombreUsuario"
                            :counter="25"
                            :error-messages="errors"
                            label="Nombre"
                            required
                          ></v-text-field>
                    </validation-provider>
                  </v-col>

                  <v-col>
                    <validation-provider
                        v-slot="{ errors }"
                        name="Apellido"
                        rules="required|max:25|alpha_spaces|min:4"
                      >
                        <v-text-field
                        color="#ae5f9e"
                          v-model="form.apellidoUsuario"
                          :counter="25"
                          :error-messages="errors"
                          label="Apellido"
                          required
                        ></v-text-field>
                    </validation-provider>
                  </v-col>
         
              </v-row>
              <v-row>
                  <v-col >
                     <validation-provider
                        v-slot="{ errors }"
                        name="Correo"
                        rules="required|email"
                        >
                        <v-text-field
                        color="#ae5f9e"
                          v-model="form.correoUsuario"
                          :error-messages="errors"
                          label="correo"
                          required
                        ></v-text-field>
                      </validation-provider>
                  </v-col>
              </v-row>
            </v-card>
  
            <v-btn
              color="purple lighten-2"
              @click="e1++"
            >
              Continue
            </v-btn>
  
            
          </v-stepper-content>
          
          <v-stepper-content
            :key="`2-content`"
            :step="2"
          >
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            >
                  <v-row >
                        <v-col cols="12" md="6">
                          <validation-provider
                            v-slot="{ errors }"
                            name="select"
                            rules="required"
                          >
                            <v-autocomplete
                              color="#ae5f9e"
                              clearable
                              v-model="form.idTipoDoc"
                              :items="form.items"
                              :error-messages="errors"
                              label="Tipo Documento"
                              data-vv-name="form.idTipoDoc"
                              required
                            >
                            <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-title>
                                No se encontraron
                                <strong>datos</strong>
                              </v-list-item-title>
                            </v-list-item>
                          </template>

                            </v-autocomplete>
                          </validation-provider>
                        </v-col>

                        <v-col>
                           <validation-provider
                              v-slot="{ errors }"
                              name="NumeroDocumento"
                              rules="required|max:10|numeric|min:5"
                            >
                                  <v-text-field
                                    color="#ae5f9e"
                                    v-model="form.numeroDocumentoUsuario"
                                    :counter="10"
                                    :error-messages="errors"
                                    label="Numero Documento"
                                    required
                                  ></v-text-field>
                            </validation-provider>

                        </v-col>
                  
                  </v-row>
                  <v-row>
                      <v-col >
                        <validation-provider
                          v-slot="{ errors }"
                          name="FechaNacimiento"
                          rules="required|max:10|min:10"
                        >
                          <v-text-field
                            type="date"
                            v-model="form.fechaNacimientoUsuario"
                            :counter="10"
                            :error-messages="errors"
                            label="Fecha Nacimiento"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                  </v-row> 
            </v-card>
  
            <v-btn
              color="purple lighten-2"
              @click="e1++"
            >
              Continue
            </v-btn>
  
            <v-btn @click="e1--">
              Atras
            </v-btn>
          </v-stepper-content>

          <v-stepper-content
            :key="`3-content`"
            :step="3"
          >
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            >
            <v-row>
                  <v-col >
                     <validation-provider
                        v-slot="{ errors }"
                        name="usuario"
                        rules="required|max:10|alpha_dash|min:4"
                        >
                          <v-text-field
                            v-model="form.username"
                            :counter="10"
                            :error-messages="errors"
                            label="Nombre Usuario"
                            required
                          ></v-text-field>
                      </validation-provider>
                  </v-col>
              </v-row>
              <v-row >
                  <v-col cols="12" md="6">
                    <validation-provider
                        vid="confirmation"
                        v-slot="{ errors }"
                        name="contraseña"
                        rules="required|min:8|alpha_dash"
                      >
                          <v-text-field
                            v-model="form.password"
                            :counter="20"
                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                            :type="show1 ? 'text' : 'password'"
                            :error-messages="errors"
                            label="Contraseña"
                            required
                            @click:append="show1 = !show1"
                          ></v-text-field>
                    </validation-provider>
                  </v-col>

                  <v-col>
                     <validation-provider
                        v-slot="{ errors }"
                        name="contraseña"
                        rules="required|confirmed:confirmation"
                      >
                        <v-text-field
                          v-model="form.passwordV"
                          :counter="20"
                          :append-icon="show1 ? 'visibility' : 'visibility_off'"
                          :type="show1 ? 'text' : 'password'"
                          :error-messages="errors"
                          label="Contraseña Validacion"
                          required
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      
                        
                      </validation-provider>

                  </v-col>
         
              </v-row>
              
            </v-card>
            <v-btn
              color="purple lighten-2"
              class="mr-4"
              type="submit"
              :disabled="invalid"
              @click="guardar"
            >
              Guardar
            </v-btn>
            
  
            <v-btn @click="e1--">
              Atras
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      
</div>

</template>

<script>

    export default {
          data () {
            return {
            e1: 1,
            steps: 3,
            }
        },

        watch: {
            steps (val) {
            if (this.e1 > val) {
                this.e1 = val
            }
            },
        }

    }

</script>
