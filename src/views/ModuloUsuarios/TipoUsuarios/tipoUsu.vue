<template>

  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="TipoUsu"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        color = "tableHeader"
        flat
      >
        <v-toolbar-title>Tipo Usuarios</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
         <v-text-field
        v-model="search"
        :append-icon="icons.mdiMagnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Usuario
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nombres"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Edad"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Telefono"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Correo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Nombre Usu"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn

                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="text-h5">
              ¿Está seguro de eliminar a este usario?
            </v-card-title>
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
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        color="primary"
        class="mr-2"
        @click="editItem(item)"
      >
        {{icons.mdiPencil}}
      </v-icon>
      <v-icon
        color="delete"
        @click="deleteItem(item)"
      >
        {{icons.mdiMinusCircle}}
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>

</template>

<script>
import {
  mdiPencil,
  mdiMinusCircle,
  mdiMagnify,

} from '@mdi/js'
import axios from 'axios';
 export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'idTipoUsuario',
      },
      { text: 'Tipo Usuario', value: 'nombreTipoUsuario' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {

    },
    defaultItem: {
      name: '',
      calories: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
  },

  watch: {
    dialog(val)
    {
      val || this.close()
    },
    dialogDelete(val)
    {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      let direccion = "http://localhost:3000/api/tipoUsuario";
                axios.get(direccion).then( res =>{
                this.data = res.data;
                console.log(this.data)
                  });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
  setup() {
    return {
      icons: {
        mdiMinusCircle,
        mdiPencil,
        mdiMagnify,
      },
    }
  },
}
</script>
