<template>
  <div class="m-4 flex flex-wrap">
    <Books :type="type" />
  </div>
  <!-- <router-link
      to="/libros"
      class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
    >Libros</router-link>
    <router-link
      to="/cuentos"
      class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
    >Cuentos</router-link> -->
</template>

<script>
import { ref, reactive } from 'vue'
import { useHead } from '@vueuse/head'
import Books from '@/components/Books.vue'

export default {
  name: 'Home',

  setup () {
    const type = ref('books')

    const siteData = reactive({
      title: `${import.meta.env.VITE_APP_TITLE} - Libros`,
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

    return { type, siteData }
  },
  components: { Books }

}
</script>