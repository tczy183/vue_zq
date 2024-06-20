<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

defineOptions({
  name: 'AlarmLog'
})
</script>

<template>
  <ContentWrap :title="t('alarmLog.title')"> alarmLog </ContentWrap>
</template>
