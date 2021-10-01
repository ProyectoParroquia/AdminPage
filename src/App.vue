<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'

export default {
  components: {
    LayoutBlank,
    LayoutContent,
  },
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'


    })

    return {
      resolveLayout,
    }
  },
}
</script>

<style >
body::-webkit-scrollbar{
  width: 10px;
  background:#f4f5fa;
}
 body::-webkit-scrollbar-thumb{
   background: rgba(174, 95, 158, .7);
   border-radius: 5px;

 }
</style>
