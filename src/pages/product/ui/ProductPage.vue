<script lang="ts" setup>
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
</script>

<template>
  <Header />

  <main class="main"><Breadcrumbs /></main>
  <Footer />
</template>

<style lang="scss" scoped>
.main {
  max-width: 1208px;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 80px;
}
</style>
