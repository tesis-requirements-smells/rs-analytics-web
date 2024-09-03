<template>
  <q-item
    clickable
    tag="a"
    :href="props.link"
    :class="['essential-link', { 'essential-link--active': props.isActive }]"
    @click="handleClick"
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';

defineOptions({
  name: 'EssentialLink'
});

export interface EssentialLinkProps {
  title: string;
  link: string;
  icon: string;
  isActive?: boolean;
}

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  title: '',
  link: '#',
  icon: '',
  isActive: false,
});

const emits = defineEmits(['click']);

const handleClick = () => {
  emits('click', props.title);
};
</script>

<style scoped>
.essential-link {
  background-color: #1F59B5;
  color: white;
}

.essential-link--active {
  background-color: #256AD8;
  color: #FDCB6E;
  border-left: 3px solid #FDCB6E;
}
</style>
