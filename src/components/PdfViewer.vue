<template>
  <iframe
    :src="`https://drive.google.com/viewerng/viewer?embedded=true&amp;url=${url}&amp;scrollbar=0`"
    frameBorder="0"
    scrolling="auto"
    class="w-full h-screen"
  ></iframe>
  <router-link
    to="/"
    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
  >Volver al inicio</router-link>
</template>

<script>

export default {
  name: "PDFViewer",
  props: {
    type: {
      type: String,
      require: true
    },
    bookFile: {
      type: String,
      require: true
    }
  },
  setup (props) {
    let url = `${import.meta.env.VITE_URL}/api/downloadBook/${props.type}/${props.bookFile}`

    return { url }
  }
}

</script>