<script setup lang="ts">
import { LogoMouthColor, LogoTextColor, LogoVariant } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Logo } from '@/shared/ui'
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__inner">
        <div class="logo">
          <Logo
            :variant="LogoVariant.TEXT"
            :mouth-color="LogoMouthColor.ORANGE"
            :color="LogoTextColor.BLACK"
          />
        </div>
        <Button
          :icon="{ type: 'menu', textColor: 'black', width: 24, height: 24, position: 'left' }"
          background-color="secondary"
          decoration="outline"
          size="m"
          :disabled="false"
          >Каталог</Button
        >
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  background: var(--main-surface);
  box-shadow: var(--shadow-default-s);
  position: sticky;
  top: 0;
  left: 0;
  height: 72px;
}

.header__container {
  max-width: 1280px;
  padding: 15px;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: start;
}

.logo {
  width: 152px;
  height: 32px;
}
</style>
