import {
    createMemoryHistory,
    createRouter as _createRouter,
    createWebHistory
} from 'vue-router'

import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'
import Books from './components/Books.vue'
import PdfViewer from './components/PdfViewer.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/libros', component: Books, props: { type: 'books' } },
    { path: '/cuentos', component: Books, props: { type: 'tales' } },
    { path: '/leer/:type/:pdfName', name: 'read', component: PdfViewer },
    { path: '/:path(.*)', component: NotFound },
]

export function createRouter () {
    return _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes
    })
}