const path = require('path');
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const app = express()
const port = 8080
const cors = require('cors')

const route = require('./routes');
const db = require("./config/db")

// Connect to DB
db.connect();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors({origin: true}))
app.use(express.json());
// chỉnh sửa method PUT, DELETE
app.use(methodOverride('_method'));
//Routers init
route(app);

app.listen(port, () => {
    console.log(`App listening at  http://localhost:${port}`);
})