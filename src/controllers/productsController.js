const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		return res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.id //requiero el id que viene por url
		const product = products.find(product => product.id === +id)/* recorro products y me devuelve el producto que tenga el mismo id que la constante id */
		return res.render('detail', {
			...product,//destructuracion de product
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')//renderizo la pagina de formulario

	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const { name, price, description, discount, category } = req.body;
		const product = {
			id: products[products.length - 1].id + 1,//siguente id
			name: name.trim(),
			price: +price,//precio parseado
			discount: +discount,//descuento parseado
			category,
			description: description.trim(),
			image: null
		}
		products.push(product)

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3),)

		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const product = products.find(product => product.id === +req.params.id)
		return res.render('product-edit-form', {
			...product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const { name, price, description, discount, category } = req.body;

		const productModify = products.map(product => {

			if (product.id === +req.params.id) {
				product.name = name.trim()
				product.price = +price
				product.discount = +discount
				product.category
				product.description = description.trim()
			}

			return product
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(productModify, null, 3),)

		return res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
		const productsModify = products.filter(product => product.id !== +req.params.id)

		fs.writeFileSync(productsFilePath, JSON.stringify(productsModify, null, 3),)

		return res.redirect('/products')
	}
};

module.exports = controller;