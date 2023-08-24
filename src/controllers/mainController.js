const { json } = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		//creo una constante que va a guardar la direccion de la base de productos del json y otra que lea es json
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))/* codificado en utf-8 */

		//retorno de forma renderizada a products
		return res.render('index',{
			visited : products.filter(products => products.category === 'visited'), //filtro productos con la categoria visitado 
			sale :  products.filter(products => products.category === 'in-sale'), // filtro productos con la categoria ofertas
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
		const keywords = req.query.keywords;
		const results = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()))
		res.render('results',{
			results,
			toThousand,
			keywords
		})
	},
};

module.exports = controller;
