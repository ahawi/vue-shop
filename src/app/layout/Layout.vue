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
  <Header />
  <PromoBar v-if="isMainView" />
  <main class="main">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped>
.main {
  max-width: 1208px;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 80px;
}
</style>
