<script lang="ts" setup>
import { Section } from '@/shared/ui'
import { ArticleCard } from '@/entities/article';
import { mockArticles } from '@/entities/article/mocks/mock-articles';
</script>

<template>
  <Section title="Статьи" link-title="Все статьи" display="flex">
    <div class="cards">
      <ArticleCard
        v-for="article in mockArticles"
        :key="article.id"
        :title="article.title"
        :description="article.description"
        :date="article.date"
        :image="article.image"
        :id="article.id"
      ></ArticleCard>
    </div>
  </Section>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  gap: 40px;
}
</style>
