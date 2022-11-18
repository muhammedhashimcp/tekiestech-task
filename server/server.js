const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
const axios = require('axios');
app.get('/',async (req, res) => {
	let { search } = req?.query;
	const response =await  axios.get(
		`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=2&srsearch=${search}`
	);
	res.send(response?.data?.query?.search);
});
app.listen(port, console.log(`server started at port ${port}`));
