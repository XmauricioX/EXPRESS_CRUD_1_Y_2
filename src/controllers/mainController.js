const { json } = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		
		let productos_ofer = products.filter( (e)=>{return e.discount > 1} );
		let productos_sin_ofer = products.filter( (e)=>{return e.discount < 1 });
		res.render('index',{ toThousand, productos_ofer, productos_sin_ofer });

	},
	search: (req, res) => {
		// 
	},
};

module.exports = controller;
