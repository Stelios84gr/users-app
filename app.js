const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());    // allows express to parse JSON files in incoming requests automatically
app.use(express.urlencoded({extended:false}));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const user = require('./routes/user.routes');
const userProduct = require('./routes/user.products.routes')
const auth = require('./routes/auth.routes');

// app.use(cors({
// origin: '*'
//   // origin: ['http://localhost:3000']
// }))

app.use('/api/auth', auth);
app.use('/api/users', user); // για οποιαδήποτε κλήση στο /api/users, καλούνται οι διαδικασίες στο user.routes
app.use('/api/user-product', userProduct);

app.use('/', express.static('files'));

app.use(
  '/api-docs', 
  swaggerUi.serve,  // σηκώνει server για τις σελίδες του swagger
  swaggerUi.setup(swaggerDocument.options)  // εμφανίζει ό,τι έχουμε βάλει στο swagger.js
);

module.exports = app