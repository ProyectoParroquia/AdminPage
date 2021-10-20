<template>
  <v-dialog
          v-model="dialogDelete"
          max-width="500px"
        >
          <v-card class="pt-4">
            <v-card-text class="text-h4 text-center font-weight-black"  >
              Cambiar estado

            </v-card-text>
            <v-card-text class="text-h5 text-center" >
                ¿Cambiar el estado de {{editedItem.nombreUsuario}} ?
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="closeDelete"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"

                @click="deleteItemConfirm"
              >
                Aceptar
              </v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>
