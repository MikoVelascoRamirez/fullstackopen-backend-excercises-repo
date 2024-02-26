const express = require('express');
const app = express();

const PORT = 3001;

app.listen(PORT, () => console.log(`server running at PORT ${PORT}`))