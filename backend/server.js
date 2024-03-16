const express = require('express');
const dotenv = require('dotenv');
const dbConnect=require('./config/dbcon.js')
const productRoute = require('./routes/productRoute.js');
const cors=require('cors')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use(express.urlencoded({ extended: true }));




// app.use(cookieParser());


app.use("/product", productRoute);

dbConnect()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('App is listening on port ' + process.env.PORT);
    });

})
.catch((error) => {
    console.error('Error connecting to the database:', error.message);
});
