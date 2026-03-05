<script lang="ts" setup>
import { MAIN_LINK } from '@/shared/config'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PromoBar } from '@/widgets/promo-bar'

const route = useRoute()

const isMainView = computed(() => route.path === MAIN_LINK.name)
</script>

<template>
  <div class="wrapper">
    <Header />
    <PromoBar v-if="isMainView" />
    <main class="main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.main {
  max-width: 1208px;
  width: 100%;
  margin: 24px auto 80px;
  flex: 1;
}
</style>
