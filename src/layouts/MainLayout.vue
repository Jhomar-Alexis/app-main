<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal v-show="$route.path != '/'">
      <q-toolbar style="background-color: #6BB2A0;">
        <q-btn v-if="!$q.platform.is.desktop" flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
      </q-toolbar>
    </q-header>
    <q-drawer side="left" v-model="leftDrawerOpen" :width="!$q.platform.is.desktop ? $q.screen.width : 250"
      class="q-mx-none bar-height bar-radius lista">
      <q-scroll-area style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #2C6975;
        ">
        <q-list padding>
          <q-item v-ripple to="/dni" clickable class=" text-bold link-item" active-class="bg-orange"
            :class="$route.path === '/dni' ? 'active-link' : ''">
            <q-item-section avatar>
              <q-icon class="text-white" name="mdi-clipboard-text-search" />
            </q-item-section>

            <q-item-section class="text-white"> CONSULTAR POR DNI </q-item-section>
          </q-item>
          <q-item v-ripple to="/ruc" clickable active-class="bg-orange" class=" text-bold link-item"
            :class="$route.path === '/ruc' ? 'active-link' : ''">
            <q-item-section avatar>
              <q-icon class="text-white" name="mdi-cloud-search" />
            </q-item-section>

            <q-item-section class="text-white"> CONSULTAR POR RUC </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom lista">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold text-h6">USUARIO ANONIMO</div>
          <div>user@gmail.com</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
const leftDrawerOpen = ref($q.platform.is.desktop);
</script>
<style scss>
.lista {
  background-color: #2C6975;
}
</style>
