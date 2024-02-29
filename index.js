import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000
const apiKEY = '-YOUR API KEY-'



app.use(express.static("node_modules/bootstrap/dist/"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log(res)
    res.render('index.ejs')
})

app.post('/checkRates', async (req, res) => {
    const currency = req.body.code
    const conversionCurrency = req.body.conversion
    const amount = req.body.amount
    let convertedAmount
    try {
        const result = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKEY}/latest/${currency}`)
        const data = result.data.conversion_rates

        convertedAmount = (amount * (data[`${currency}`] * data[`${conversionCurrency}`])).toFixed(3)

        res.render('index.ejs', { data: data, currency: currency, conversionCurrency: conversionCurrency, amount: amount, convertedAmount: convertedAmount })
    } catch(error) {
        console.log(error.response);
        res.status(500);
    }
})


app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
