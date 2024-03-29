const Product = require('../models/Product.js');
const Diet = require('../models/Diet.js');

const { ObjectId } = require('mongodb');
const { response } = require('express');

const save = async (req, res = response) => {
  if (req.user.role === 'Dueño' || req.user.role === 'Encargado del ganado') {
    const { name, kilograms, liters, price } = req.body;

    if (!liters && !kilograms) {
      return res.status(400).json({
        status: false,
        msg: 'Por favor digitar la cantidad'
      });
    }

    try {
      let product = new Product();

      product.name = name.toUpperCase();
      product.active_num = Math.floor(Math.random() * (999999 - 100000) + 100000);
      product.kilograms = kilograms;
      product.liters = liters;
      product.price = price;

      await product.save();

      return res.status(200).json({
        status: true,
        msg: 'producto registrado con éxito',
        product
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: 'Por favor contacté con un ING en Sistemas para más información'
      });
    }
  } else {
    return res.status(400).send({
      status: false,
      msg: 'No posees los privilegios necesarios en la plataforma.'
    });
  }
};

const update = async (req, res = response) => {
  if (req.user.role === 'Dueño' || req.user.role === 'Encargado del ganado') {
    const productID = req.params.id;
    const { name_product, kilograms, liters, price_product } = req.body;

    try {
      let dateTime = new Date();

      const findproductByName = await Product.findOne({ name_product });

      if (findproductByName && findproductByName._id != productID) {
        return res.status(400).json({
          status: 'Error',
          msg: 'Este nombre ya se encuentra en uso.'
        });
      }

      Product.findByIdAndUpdate(
        { _id: productID },
        {
          name_product,
          kilograms,
          liters,
          price_product,
          updatedAt: moment(dateTime).format('YYYY-MM-DD')
        },
        { new: true },
        (err, product) => {
          if (err) {
            return res.status(400).json({
              status: false,
              msg: 'Por favor contacté con un ING en Sistemas para más información.'
            });
          } else {
            return res.status(200).send({
              status: true,
              msg: 'Datos del producto actualizado.',
              product: product
            });
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        status: false,
        msg: 'Por favor contacté con un ING en Sistemas para más información.'
      });
    }
  } else {
    return res.status(400).send({
      status: false,
      msg: 'No posees los privilegios necesarios en la plataforma.'
    });
  }
};

const getProducts = async (req, res = response) => {
  Product.find((err, products) => {
    if (err) {
      return res.status(500).send({
        status: false,
        msg: 'Error al hacer la consulta.'
      });
    }

    return res.status(200).json({
      status: true,
      products: products
    });
  });
};

const getProduct = async (req, res = response) => {
  let active_num = req.params.active_num;

  await Product.findOne({ active_num: active_num }).exec((err, product) => {
    if (err || !product) {
      return res.status(404).send({
        status: false,
        msg: 'El producto no existe.'
      });
    }

    return res.status(200).send({
      status: true,
      msg: 'Producto encontrado',
      product: product
    });
  });
};

const remove = async (req, res = response) => {
  if (req.user.role === 'Dueño' || req.user.role === 'Encargado del ganado') {
    const productID = req.params.id;

    const searchDiet = await Diet.findOne({ product: ObjectId(productID) });

    if (searchDiet) {
      return res.status(400).send({
        status: false,
        msg: 'No se puede eliminar, este producto esta siendo utilizado.'
      });
    }
    Product.findOneAndDelete({ _id: productID }, (err, product) => {
      if (err || !product) {
        return res.status(400).send({
          status: false,
          msg: 'Error, no se pudo eliminar el producto.'
        });
      }
      return res.status(200).send({
        status: true,
        msg: 'Producto eliminado con éxito.'
      });
    });
  } else {
    return res.status(400).send({
      status: false,
      msg: 'No posees los privilegios necesarios en la plataforma.'
    });
  }
};

module.exports = {
  save,
  update,
  getProducts,
  getProduct,
  remove
};
