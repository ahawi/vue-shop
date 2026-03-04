<script lang="ts" setup>
import { Button } from '@/shared/ui/button'

import { useShareLink } from '../model'
const { isCopied, copyLink } = useShareLink()

const onCopyLink = () => copyLink(window.location.href)
</script>

<template>
  <Button
    size="s"
    :leftIcon="{ type: 'share', width: 24, height: 24, fill: 'none' }"
    class="product-meta__share"
    @click="onCopyLink"
    >{{ isCopied ? 'Скопировано!' : 'Поделиться' }}
  </Button>
</template>
