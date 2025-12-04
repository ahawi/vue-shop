<script lang="ts" setup>
import { mockProducts } from '@/shared/lib/mocks/mock-products'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Badge } from '@/shared/ui'

const modules = [FreeMode, Navigation, Thumbs]
const thumbsSwiper = ref(null)

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const route = useRoute()

const product = computed(() => {
  return mockProducts.find((product) => product.id === route.params.id)
})
</script>

<template>
  <div class="product__gallery">
    <Badge
      v-if="product?.hasSaleBadge"
      :title="product.badge"
      :is-visible="true"
      class="product__gallery-badge"
      position-top="10px"
      position-right="10px"
    />

    <swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="16"
      :slidesPerView="5"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide class="product__image--small"><img :src="product?.image" /></swiper-slide
      ><swiper-slide class="product__image--small"><img :src="product?.image" /></swiper-slide
      ><swiper-slide class="product__image--small"><img :src="product?.image" /></swiper-slide
      ><swiper-slide class="product__image--small"><img :src="product?.image" /></swiper-slide
      ><swiper-slide class="product__image--small"><img :src="product?.image" /></swiper-slide>
    </swiper>
    <swiper
      :modules="modules"
      :slidesPerView="1"
      :thumbs="{ swiper: thumbsSwiper }"
      class="mySwiper2"
    >
      <swiper-slide class="product__image"><img :src="product?.image" /></swiper-slide
      ><swiper-slide class="product__image"><img :src="product?.image" /></swiper-slide
      ><swiper-slide class="product__image"><img :src="product?.image" /></swiper-slide
      ><swiper-slide class="product__image"><img :src="product?.image" /></swiper-slide
      ><swiper-slide class="product__image"><img :src="product?.image" /></swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">
.product {
  &__gallery {
    display: flex;
    gap: 10px;
    max-width: 584px;
    position: relative;

    &-badge {
      z-index: 2;
      position: absolute;
    }
  }

  &__image {
    max-width: 504px;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &--small {
      width: 64px !important;
      height: 84px !important;
      background-color: #fff;
      display: flex;
      align-items: center;
      border-radius: 4px;
      box-shadow: var(--shadow-default-xs) !important;
      cursor: pointer;
    }
  }
}

.mySwiper {
  .swiper-wrapper {
    flex-direction: column !important;
    justify-content: space-between;
  }
}

.mySwiper2 {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: var(--shadow-default-xs) !important;
  background-color: #fff;
}
</style>
