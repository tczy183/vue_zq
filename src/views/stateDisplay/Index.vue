<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()
</script>

<template>
  <ContentWrap :title="t('stateDisplay.title')"> stateDisplay </ContentWrap>
</template>
