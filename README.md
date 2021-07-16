# ebooks-library
You can list, read and download your ebooks library with:
- Auto generated book cover images.
- Auto title parse and cleanup.
- PDF viewer.
- Web server.
- API.

## Prerequisites
- Have node and yarn installed.
- Have port 3000 available as we'll run the dev version on this port.

## Installation
To run this project, install it locally using yarn:
```bash
git clone https://github.com/backendrulz/ebooks-library.git
cd ebooks-library
yarn # install required packages
mv .env.example .env
# edit VITE_APP_TITLE, VITE_APP_DESCRIPTION and BOOKS_PATH in .env file
```
## Usage
### Dev
```bash
yarn dev # runs on http://localhost:3000
```
### API
Routes:
```
GET /api/[type]/getAllBooks
GET /api/getBookCover/[fileName].pdf
GET /api/downloadBook/[type]/[fileName]
```

### Production
```bash
yarn generate # build and compile
yarn run # runs on http://:3000
```

## Technologies
Created using:

- [VueJS](https://github.com/vuejs/vue)
- [Express](https://github.com/expressjs/express)
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss)
- Build with [Vite](https://github.com/vitejs/vite) using <abbr title="Simple Server-Side Rendering">SSR</abbr>

## License
[MIT](https://choosealicense.com/licenses/mit/)