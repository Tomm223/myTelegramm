import express from "express"
import path from 'path'
const PORT = 3000

const app = express()

app.use(express.static('dist'))
app.get('*', (req, res) => res.sendFile(path.resolve('dist/index.html')))
//app.use('/*', express.static('dist' + '/*.html'));
/*
app.get('/', (req, res) => {
   console.log('start', req.path);
   res.sendFile(path.resolve('dist', 'index.html'))
})
app.get('/profile/*', (req, res) => {

   res.sendFile(path.resolve('dist', 'index.html'))
})
app.get('/messanger/*', (req, res) => {

   res.sendFile(path.resolve('dist', 'index.html'))
})
app.get('/singin/*', (req, res) => {

   res.sendFile(path.resolve('dist', 'index.html'))
})
app.get('/sindup/*', (req, res) => {

   res.sendFile(path.resolve('dist', 'index.html'))
})
app.get('/500/*', (req, res) => {

   res.sendFile(path.resolve('dist', 'index.html'))
})
app.get('/400/*', (req, res) => {

   res.sendFile(path.resolve('dist', 'index.html'))
})*/


app.listen(PORT, () => {
   console.log('go');

})
