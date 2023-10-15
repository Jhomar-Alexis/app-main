<template>
    <q-page padding style="background-color: #6BB2A0; " class="flex flex-center">
        <div class=" q-gutter-sm">
            <div class="row q-gutter-sm items-center">
                <q-input v-model="ruc" outlined dense rounded debounce="100" placeholder="Ingresar RUC" clearable dark
                    maxlength="11" bg-color="black" label-color="white" :rules="[
                        (val) =>
                            (val && val.length == 11) ||
                            'Ingrese RUC válido',
                    ]">
                    <template v-slot:append>
                        <q-icon name="search" color="white" @click="Buscar" style="cursor: pointer;" />
                    </template>
                </q-input>
            </div>
            <q-table title="CONSULTA POR RUC" :rows="rows" :columns="columns" row-key="id" dense :loading="loading" dark
                separator="vertical" class="card-rounded-borders" style="padding: 30px; width: 1500px;"></q-table>
        </div>
        <div class="q-pa-md q-gutter-sm">
            <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
                <q-card class="text-white" style="width: 300px; background-color: #2C6975;">
                    <q-card-section>
                        <div class="text-h6 text-bold">RUC INCORRECTO</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none text-bold">
                        POR FAVOR INGRESA UN RUC VALIDO
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
import { api2 } from "src/boot/axios";

const rows = ref([])
const ruc = ref("")
const loading = ref(false)
const dialog = ref(false)

const columns = ref([
    {
        name: "ruc",
        label: "RUC",
        field: "ruc",
        align: "center",
    },
    {
        name: "razonSocial",
        label: "Razon Social",
        field: "razonSocial",
        align: "center",
    },
    {
        name: "estado",
        label: "Estado",
        field: "estado",
        align: "center",
    },
    {
        name: "condicion",
        label: "Condicion",
        field: "condicion",
        align: "center",
    },
    {
        name: "direccion",
        label: "Direccion",
        field: "direccion",
        align: "center",
    },
    {
        name: "ubigeo",
        label: "Ubigeo",
        field: "ubigeo",
        align: "center",
    },

]);

const Buscar = async () => {
    if (ruc.value.length === 11) {
        try {
            loading.value = true
            const response = await api2.get(`/ruc/${ruc.value}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNoZXJvc29zYWpob21hcjg2QGdtYWlsLmNvbSJ9.jN0enXKo5f4ocf2zr2wBpopvoVrCWj0P0uwV-E_HIXs`);
            loading.value = false
            if (response.data) {
                rows.value = [response.data];
            }
        } catch (error) {
            console.error("Error en la consulta:", error);
        }
    } else {
        if (ruc.value.length > 0 || ruc.value.length > 12) { dialog.value = true }
    }
}

onMounted(Buscar)
</script>
  