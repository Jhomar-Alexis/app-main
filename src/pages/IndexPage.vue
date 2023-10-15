<template>
  <q-page padding style="background-color: #6BB2A0; ">
    <div class="q-pa-md">
      <q-card class="my-card" style="background-color: #6BB2A0; ">
        <q-card-section>
          <div class="row q-gutter-sm items-center">
            <q-input v-model="dni" outlined dense rounded debounce="100" placeholder="Ingresar DNI" clearable dark
              maxlength="8 " bg-color="black" label-color="white" :rules="[
                (val) =>
                  (val && val.length == 8) ||
                  'Ingrese DNI válido',
              ]">
              <template v-slot:append>
                <q-icon name="search" color="white" @click="Buscar" style="cursor: pointer;" />
              </template>
            </q-input></div>
        </q-card-section><q-table title="CONSULTA POR DNI" :rows="rows" :columns="columns" row-key="id" dense
          :loading="loading" dark separator="vertical" class="dni card-rounded-borders" style="padding: 30px;"
          hide-pagination></q-table></q-card>
    </div>
    
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
        <q-card class="text-white" style="width: 300px; background-color: #2C6975;">
          <q-card-section>
            <div class="text-h6 text-bold">DNI INCORRECTO</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-bold">
            POR FAVOR INGRESA UN DNI VALIDO
          </q-card-section>

          <q-card-actions align="right" class="bg-white" style="color:#2C6975;">
            <q-btn flat label="OK" class="text-bold" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";

const rows = ref([])
const dni = ref("")
const loading = ref(false)
const dialog = ref(false)

const columns = ref([
  {
    name: "dni",
    label: "DNI",
    field: "dni",
    align: "center",
  },
  {
    name: "nombres",
    label: "Nombre",
    field: "nombres",
    align: "center",
  },
  {
    name: "apellidoPaterno",
    label: "Apellido Paterno",
    field: "apellidoPaterno",
    align: "center",
  },
  {
    name: "apellidoMaterno",
    label: "Apellido Materno",
    field: "apellidoMaterno",
    align: "center",
  },
]);
const Buscar = async () => {
  if (dni.value.length === 8) {
    try {
      loading.value = true
      const response = await api.get(`/dni/${dni.value}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNoZXJvc29zYWpob21hcjg2QGdtYWlsLmNvbSJ9.jN0enXKo5f4ocf2zr2wBpopvoVrCWj0P0uwV-E_HIXs`);
      loading.value = false
      if (response.data) {
        rows.value = [response.data];
      }
    } catch (error) {
      console.error("Error en la consulta:", error);
    }
  } else {
    if (dni.value.length > 0 || dni.value.length > 9) { dialog.value = true }
  }
}

onMounted(Buscar)
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px

  
</style>