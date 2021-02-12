<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <VueTable />
  </div>
</template>

<script>
import VueTable from '@/components/VueTable.vue'

export default {
  name: 'Home',
  components: {
    VueTable
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding: 48px 0;
}
</style>
