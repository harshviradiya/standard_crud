const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.NODE_ENV === 'PRODUCTION' ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
)
    .then(() => {
        console.log(`connection succesfull`);
    })
    .catch((e) => {
        console.log(`connection failed`);
    });
