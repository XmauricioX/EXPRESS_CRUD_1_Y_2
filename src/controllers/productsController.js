const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const writeJSON = (dataBase) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dataBase), "utf-8")
}

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products})
	},
	
	// Detail - Detail from one product
	detail: (req, res) => {
		let product_id = req.params.id 
		let pf = products.filter((e)=>{
			return e.id == product_id
		})
		// res.send(pf)
		res.render('detail', {pf})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		let last_id = 1

		products.forEach(product =>{
			if(product.id > last_id){
				last_id = product.id
			}
		})

		let nuevo_producto = {
			id: last_id + 1 ,
			name: req.body.name.trim(),
			price: req.body.price.trim(),
			discount: req.body.discount.trim(),
			category: req.body.category,
			description: req.body.description.trim(),
			image: req.file ? req.file.filename : "default-image.png"
		}

		products.push(nuevo_producto)

		writeJSON(products)

		res.redirect('/products')

	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find( e => e.id == +req.params.id )

		res.render('product-edit-form', {product})
	},
	// Update - Method to update
	update: (req, res) => {
		
		let {
			name ,
			price ,
			discount ,
			category ,
			description,
		} = req.body
 			

		
		products.forEach(product => {
			if(product.id === +req.params.id) {
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.category = category,
				product.description = description
				product.image = req.file ? req.file.filename : product.image 
			}
		})
		


		writeJSON(products)

		res.redirect('/products')
	
		
	
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let product_id = req.params.id 
		let pf = products.filter((e)=>{
			return e.id == product_id
		}) // pf significa Producto Filtrado

		products.pop(pf)

		writeJSON(products)

		res.redirect('/products')
	}
};

module.exports = controller;