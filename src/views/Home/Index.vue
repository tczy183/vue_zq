<script setup lang="ts">
import { ElInput } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { ref } from 'vue'

defineOptions({
  name: 'Home'
})

const { t } = useI18n()

const text = ref('111')
</script>

<template>
  <ContentWrap>
    <div>
      <h2>{{ t('home.welcome') }}</h2>
    </div>
  </ContentWrap>
</template>
