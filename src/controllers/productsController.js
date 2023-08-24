const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		return res.render('products',{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.id //requiero el id que viene por url
		const product = products.find(product => product.id === +id)/* recorro products y me devuelve el producto que tenga el mismo id que la constante id */
		return res.render('detail',{
			...product,//destructuracion de product
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const productsModify = products.filter(product => product.id !== +req.params.id )

		fs.writeFileSync(productsFilePath, JSON.stringify(productsModify,null,3),)

		return res.redirect('/products')
	}
};

module.exports = controller;