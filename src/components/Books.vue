<template>
  <!-- Book start -->
  <div
    v-for="(book, index) in booksData"
    :key="book.name"
    class="flex justify-center | m-2 | w-48 | max-h-96 | p-0"
  >
    <div class="bg-gray-100 | p-3 | shadow-md rounded-lg">
      <img
        class="bg-white mx-auto mb-6 | shadow | w-40 h-44 | rounded"
        :src="`/api/getBookCover/${book.name}`"
        alt="content"
      >
      <div class="h-32 w-full whitespace-normal overflow-hidden">
        <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">Libro</h3>
        <h2 class="mb-4 | w-11/12 | break-all text-base text-gray-900 font-medium title-font">{{ formatName(book.name) }}</h2>
      </div>
      <!-- <p class="leading-relaxed text-base">{{ book.size }}</p> -->

      <!-- <div class="flex flex-col object-bottom"> -->
      <div class="text-center">
        <router-link
          :to="{ name: 'read', params: { type: type, bookFile: book.name }}"
          class="btn btn-read"
          title="Leer"
        >
          <BookOpenIcon class="h-5 w-5 text-white" />
        </router-link>
        <a
          :href="`/api/downloadBook/${type}/${book.name}`"
          class="btn btn-download"
          title="Descargar"
        >
          <DownloadIcon class="h-5 w-5 text-white" />
        </a>
      </div>

    </div>
  </div>
  <!-- end Book -->

</template>

<script>
import { ref } from 'vue'
import BooksService from '@/services/BooksService'
import { BookOpenIcon, DownloadIcon } from '@heroicons/vue/solid'

export default {
  name: "Books",
  props: {
    type: {
      type: String,
      require: true,
    },
  },
  async setup (props) {
    let booksData = ref([]);
    booksData = await BooksService.getAllBooks(props.type)

    const formatName = (name) => {
      let replaceAndTruncate = name.replace(/[\-\.\_]|(pdf)+/g, ' ').replace(/(.{80})..+/, "$1...")
      return replaceAndTruncate.charAt(0).toUpperCase() + replaceAndTruncate.slice(1)

    }

    // expose to template
    return {
      booksData,
      formatName
    }
  },
  components: { BookOpenIcon, DownloadIcon }
}
</script>

<style>
.btn {
  @apply m-1 inline-flex items-center justify-center px-5 py-1 text-base font-medium leading-6 transition duration-150 ease-in-out border border-transparent rounded-md focus:outline-none cursor-pointer text-white;
}

.btn-read {
  @apply bg-blue-500;
}

.btn-download {
  @apply bg-green-500;
}
</style>
