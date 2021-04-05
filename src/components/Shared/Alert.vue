<template>
<v-alert dismissible error @input="onClose" :value="true">
  {{text}}
</v-alert>
</template>

<script>
export default {
  name: "Alert.vue",
  props: ['text'],
  methods: {
    onClose() {
      this.$emit('dismissed')
    },
  },
}
</script>

<style scoped>

</style>
