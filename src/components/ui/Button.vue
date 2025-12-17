<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'filled',
    validator: (value: string) => ['filled', 'tonal', 'outlined', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value: string) => ['sm', 'default', 'lg', 'icon'].includes(value)
  },
  block: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
});

const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden relative';

const variants = {
  // Material 3 Specs
  filled: 'bg-rdc-blue text-white shadow-sm hover:shadow-md hover:bg-blue-700 active:bg-blue-800',
  tonal: 'bg-blue-100 text-blue-900 border border-transparent hover:bg-blue-200 active:bg-blue-300',
  outlined: 'border border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50 active:bg-slate-100',
  text: 'bg-transparent text-rdc-blue hover:bg-blue-50 active:bg-blue-100',
};

const sizes = {
  sm: 'text-xs h-8 px-4 gap-1.5',
  default: 'text-sm h-10 px-6 gap-2',
  lg: 'text-base h-12 px-8 gap-2.5',
  icon: 'h-10 w-10 p-2 rounded-full',
};

const classes = computed(() => {
  return [
    baseClasses,
    variants[props.variant as keyof typeof variants],
    sizes[props.size as keyof typeof sizes],
    props.block ? 'w-full flex' : ''
  ].join(' ');
});
</script>

<template>
  <button :class="classes">
    <!-- State Layer (Ripple effect placeholder) -->
    <div class="absolute inset-0 bg-current opacity-0 hover:opacity-10 transition-opacity"></div>
    
    <span v-if="icon" class="material-icons-round text-lg leading-none z-10">{{ icon }}</span>
    <span class="z-10"><slot /></span>
  </button>
</template>
