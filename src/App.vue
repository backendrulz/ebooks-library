<template>

  <!-- <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view> -->

  <div>
    <header
      class="bg-white shadow"
      v-if="siteData.title"
    >
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">{{ siteData.title }}</h1>
      </div>
    </header>
    <main class="m-5">
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </router-view>
    </main>
  </div>

</template>
<script>
import { reactive } from 'vue'
import { useHead } from '@vueuse/head'

export default {
  name: 'Home',

  setup () {

    const siteData = reactive({
      title: `${import.meta.env.VITE_APP_TITLE}`,
      description: `${import.meta.env.VITE_APP_DESCRIPTION}`,
    });

    useHead({
      title: siteData.title,
      meta: [
        {
          name: `description`,
          content: siteData.description,
        },
      ],
    })

    return { siteData }
  }

}
</script>