// @ts-check
const fs = require('fs')
const path = require('path')
const express = require('express')
const dirTree = require('directory-tree')
// const cors = require('cors')
const { fromPath } = require('pdf2pic')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.SERVER_PORT
let booksPath = process.env.BOOKS_PATH

// CORS
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions))
// end CORS

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer (
    root = process.cwd(),
    isProd = process.env.NODE_ENV === 'production'
) {
    const resolve = (p) => path.resolve(__dirname, p)

    const indexProd = isProd
        ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
        : ''

    const manifest = isProd
        ? // @ts-ignore
        require('./dist/client/ssr-manifest.json')
        : {}

    const app = express()

    // Custom routes start
    app.get('/api/:type/getAllBooks', (req, res) => {
        const type = req.params.type

        if (type == 'tales') {
            booksPath = path.join(booksPath, 'Cuentos')
        }

        // const tree = dirTree(booksPath, { extensions: /\.pdf/, exclude: /covers|cuentos$/i })
        const tree = dirTree(booksPath, { extensions: /\.pdf/ })

        const filtered = tree.children.filter(file => file.type == 'file')
        res.send(filtered)
    })

    app.get('/api/downloadBook/:type/:pdfFile', (req, res) => {
        const type = req.params.type
        const fileName = req.params.pdfFile
        let directoryPath = booksPath

        if (type == 'tales') {
            directoryPath = path.join(directoryPath, 'Cuentos')
        }

        res.download(path.join(directoryPath, fileName), fileName, (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al descargar el archivo' + err,
                })
            }
        })
    })

    app.get('/api/getBookCover/*.pdf', async (req, res) => {
        const pdfName = req.params[0]
        const pdfPath = path.join(booksPath, pdfName + '.pdf')
        const coverDir = path.join(booksPath, 'covers')
        let coverPath = path.join(coverDir, pdfName + '.1.png')

        const fileExists = fs.existsSync(coverPath)

        if (!fileExists) {
            // res.status(404).send('No existe')
            const baseOptions = {
                width: 200,
                height: 250,
                quality: 80,
                savePath: coverDir,
                saveFilename: pdfName
            };

            const convert = fromPath(pdfPath, baseOptions);

            await convert(1);
        }

        res.sendFile(coverPath)

    })
    // custom routes end

    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite
    if (!isProd) {
        vite = await require('vite').createServer({
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: 'ssr',
                watch: {
                    // During tests we edit the files too fast and sometimes chokidar
                    // misses change events, so enforce polling for consistency
                    usePolling: true,
                    interval: 100
                }
            }
        })
        // use vite's connect instance as middleware
        app.use(vite.middlewares)
    } else {
        app.use(require('compression')())
        app.use(
            require('serve-static')(resolve('dist/client'), {
                index: false
            })
        )
    }

    app.use('*', async (req, res) => {
        try {
            const url = req.originalUrl

            let template, render
            if (!isProd) {
                // always read fresh template in dev
                template = fs.readFileSync(resolve('index.html'), 'utf-8')
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.js')).render
            } else {
                template = indexProd
                render = require('./dist/server/entry-server.js').render
            }

            const [appHtml, preloadLinks] = await render(url, manifest)

            const html = template
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--app-html-->`, appHtml)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            vite && vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(port, () => {
            console.log('http://localhost:' + port)
        })
    )
}

// for test use
exports.createServer = createServer