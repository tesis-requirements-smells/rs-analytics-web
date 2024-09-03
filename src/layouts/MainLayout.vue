<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-if="!isLoginPage"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <div class="row justify-center q-pt-sm q-pb-sm">
        <div class="col-8">
          <q-img src="~assets/images/white-logo.svg" />
        </div>
      </div>
      <q-separator color="white" />

      <div class="q-mt-sm q-pa-sm q-gutter-md text-center">
        <q-avatar class="q-mt-md" size="120px">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
        <p class="q-mt-md" style="font-size: 14pt">[Nombre del usuario]</p>
      </div>
      <q-separator color="white" />

      <q-list>
        <EssentialLink
          v-for="link in menuList"
          :key="link.title"
          v-bind="link"
          :isActive="link.title === selectedOption"
          @click="handleOptionClick"
        />

        <div class="support-menu">
          <EssentialLink
            v-for="link in supportList"
            :key="link.title"
            v-bind="link"
            :isActive="link.title === selectedOption"
            @click="handleOptionClick"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import EssentialLink, { EssentialLinkProps } from './EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
});

const route = useRoute();
const isLoginPage = computed(() => route.path === '/');

const selectedOption = ref<string | null>(null);

const menuList: EssentialLinkProps[] = [
  {
    title: 'Evaluaciones de calidad',
    icon: 'description',
    link: 'evaluaciones'
  },
  {
    title: 'Resultados',
    icon: 'insert_chart_outlined',
    link: 'resultados'
  },
];

const supportList: EssentialLinkProps[] = [
  {
    title: 'Ayuda',
    icon: 'help_outline',
    link: 'ayuda'
  },
  {
    title: 'Cerrar sesión',
    icon: 'logout',
    link: ''
  },
];

const handleOptionClick = (title: string) => {
  selectedOption.value = title;
};
</script>
