<script lang="ts" setup>
interface TextProps {
  tag: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  bold?: Boolean
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

const props = defineProps<TextProps>()
</script>

<template>
  <component
    :is="tag"
    :class="['typography', size ? `text-size--${size}` : 'm', bold ? 'bold' : '', `tag--${tag}`]"
    ><slot></slot
  ></component>
</template>

<style scoped lang="scss">
.typography {
  line-height: 150%;
  font-weight: 400;
}

.text-size {
  &--xs {
    font-size: 12px;
  }
  &--s {
    font-size: 16px;
  }
  &--m {
    font-size: 18px;
  }
  &--l {
    font-size: 24px;
  }
  &--xl {
    font-size: 36px;
  }

  @media screen and (max-width: 768px) {
    &--xs {
      font-size: 8px;
    }
    &--s {
      font-size: 12px;
    }
    &--m {
      font-size: 14px;
    }
    &--l {
      font-size: 20px;
    }
    &--xl {
      font-size: 32px;
    }
  }
}

.bold {
  font-weight: bold;
}

.tag--h1 {
  font-size: 64px;
}
.tag--h2 {
  font-size: 48px;
}
.tag--h3 {
  font-size: 36px;
}
.tag--h4 {
  font-size: 24px;
}
.tag--h5 {
  font-size: 18px;
}

@media screen and (max-width: 768px) {
  .tag--h1 {
    font-size: 48px;
  }
  .tag--h2 {
    font-size: 36px;
  }
  .tag--h3 {
    font-size: 24px;
  }
  .tag--h4 {
    font-size: 18px;
  }
  .tag--h5 {
    font-size: 16px;
  }
}
</style>
