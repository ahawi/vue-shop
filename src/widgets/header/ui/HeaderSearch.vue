<script lang="ts" setup>
import { mockCategory, mockProducts } from '@/shared/lib/mocks/mock-products'
import type { IconProps } from '@/shared/ui/Icon.vue'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Typography, Icon } from '@/shared/ui'

interface SearchProps {
  placeholder?: string
  size?: 'm' | 'l'
  disabled?: boolean
  rightIcon?: IconProps
}

export interface SearchOption {
  id: string
  title: string
  type: 'product' | 'category'
  path: string
}

const props = withDefaults(defineProps<SearchProps>(), {
  placeholder: 'Найти товар',
  size: 'm',
  disabled: false,
})

const router = useRouter()
const searchQuery = ref('')
const showDropdown = ref(false)
const selectedOption = ref<SearchOption | null>(null)

const searchOptions = computed<SearchOption[]>(() => {
  const options: SearchOption[] = []

  mockProducts.forEach((product) => {
    options.push({
      id: product.id,
      title: product.title,
      type: 'product',
      path: `/catalog/${product.categoryIds[0]}/${product.id}`,
    })
  })

  mockCategory.forEach((category) => {
    options.push({
      id: category.id,
      title: category.title,
      type: 'category',
      path: `/catalog/${category.id}`,
    })
  })

  return options
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return []

  const searchToLowerCase = searchQuery.value.toLocaleLowerCase()

  return searchOptions.value
    .filter((option) => option.title.toLowerCase().includes(searchToLowerCase))
    .slice(0, 10)
})

const selectOption = (option: SearchOption) => {
  selectedOption.value = option
  searchQuery.value = option.title
  showDropdown.value = false

  router.push(option.path)
}

const handleCloseSelect = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.header-search')) {
    showDropdown.value = false
  }
}

const highlightMatch = (text: string) => {
  if (!searchQuery.value) return text

  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<span class="header-search__highlight">$1</span>')
}

watch(showDropdown, (value) => {
  if (value) {
    document.addEventListener('click', handleCloseSelect)
  } else {
    document.removeEventListener('click', handleCloseSelect)
  }
})
</script>

<template>
  <div class="header-search">
    <div class="header-search__field">
      <Icon v-if="rightIcon" v-bind="rightIcon" class="header-search__right-icon" />
      <input
        class="header-search__input"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="searchQuery"
        @focus="showDropdown = true"
        autocomplete="off"
      />

      <Icon
        v-if="!rightIcon"
        type="search"
        :width="24"
        :height="24"
        class="header-search__search-icon"
      />
    </div>

    <transition name="dropdown-fade">
      <div v-if="showDropdown && filteredOptions.length > 0" class="header-search__dropdown">
        <div
          v-for="option in filteredOptions"
          :key="`${option.type}-${option.id}`"
          class="header-search__option"
          @click="selectOption(option)"
        >
          <div class="header-search__option-content">
            <div class="header-search__option-title">
              <span v-html="highlightMatch(option.title)"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="dropdown-fade">
      <div
        v-if="showDropdown && searchQuery && filteredOptions.length === 0"
        class="header-search__no-results"
      >
        <Typography tag="p" size="s">Ничего не найдено</Typography>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.header-search {
  position: relative;
  width: 100%;

  &__field {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input {
    width: 100%;
    height: 40px;
    padding: 8px 16px;
    border: 1px solid var(--main-secondary);
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: box-shadow 0.3s;
    background: var(--main-surface);

    &:focus {
      caret-color: var(--main-secondary);
      border-color: var(--main-secondary);
      box-shadow: var(--shadow-secondary-m);
      transition: box-shadow 0.3s;
    }

    &:disabled {
      background: var(--grayscale-lightest);
      color: var(--grayscale-light);
    }
  }

  &__right-icon {
    position: absolute;
    right: 12px;
    color: var(--grayscale-hard);
  }

  &__search-icon {
    position: absolute;
    right: 12px;
    color: var(--main-secondary);
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background: var(--main-surface);
    border: 1px solid var(--main-secondary);
    border-radius: 8px;
    box-shadow: var(--shadow-default-m);
    z-index: 1000;
    max-height: 400px;
    overflow-y: auto;
  }

  &__option {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-bottom: 1px solid var(--grayscale-lightest);

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: var(--main-surface-secondary);
    }
  }

  &__option-content {
    flex: 1;
    min-width: 0;
  }

  &__option-title {
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 4px;
    color: var(--main-on-surface);

    :deep(.header-search__highlight) {
      background-color: var(--main-primary-light);
      font-weight: 600;
      padding: 0 1px;
    }
  }

  &__no-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    padding: 16px;
    background: var(--main-surface);
    border: 1px solid var(--main-secondary);
    border-radius: 8px;
    text-align: center;
    color: var(--grayscale-hard);
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
