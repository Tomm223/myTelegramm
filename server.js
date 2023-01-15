import express from "express"
import path from 'path'
const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.static('dist'))
app.get('*', (req, res) => res.sendFile(path.resolve('dist/index.html')))


app.listen(PORT, () => {
   console.log('go');

})


