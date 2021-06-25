<template>
  <h1 class="my-5">你目前在前台列表</h1>
  <fontnavbar/>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import fontnavbar from '@/components/FontNavbar.vue';

export default {
  name: 'Font',
  components: { fontnavbar },
};
</script>
