const express = require('express');
const app = express();
const cors = require('cors');

const apiRoutes = require('./src/routes/api');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors()); // Allow all origins (not recommended for production)

//routes
app.use('/v1', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
