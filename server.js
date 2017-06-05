"use strict";

const express = require('express');
const app = express();

const photos = require('./routes/photos');

app.use('/api/photos',photos);

app.listen('3000', () => { console.log("Listening on port 3000"); });
