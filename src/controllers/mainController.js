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
		return res.render('products',{
			products,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
