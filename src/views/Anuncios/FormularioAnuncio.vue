<template>
  <v-form>
    <v-text-field
      v-model="firstname"
      label="Anuncio"
      type="Area"
      outlined
      dense
      placeholder="Escriba su Anuncio"
    ></v-text-field>

    <v-text-field
      v-model="email"
      label=""
      type="Date"
      outlined
      dense
      placeholder="Fecha de Inicio"
    ></v-text-field>

    <v-text-field
      v-model="email"
      label=""
      type="Date"
      outlined
      dense
      placeholder="Fecha Final"
    ></v-text-field>

        <v-btn
          color="primary"
          class="me-3 mt-5"
          @click="$refs.refInputEl.click()"
        >
          <span class="d-none d-sm-block">Upload new photo</span>
        </v-btn>

        <input
          ref="refInputEl"
          type="file"
          accept=".jpeg,.png,.jpg,GIF"
          :hidden="true"
        />

    <v-checkbox
      v-model="checkbox"
      label="Remember me"
      class="mt-0"
    ></v-checkbox>

    <v-btn color="primary">
      Crear
    </v-btn>

    <v-btn
      type="reset"
      outlined
      class="mx-2"
    >
      Reset
    </v-btn>
  </v-form>
</template>
