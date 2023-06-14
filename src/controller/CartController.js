const { ObjectId } = require("mongodb");
const express = require("express");
const Cart = require("../model/cart_model");
const Product = require("../model/product_model");
const Order = require("../model/order_model");
const middleware = require("../middleware/auth_middleware");

class CartController{
  // GET: add a product to the shopping cart when "Add to cart" button is pressed
  async getOne(req, res){
    const productId = ObjectId(req.params.id);
    try {
      // get the correct cart, either from the db, session, or an empty cart.
      let user_cart;
      if (req.user) {
        user_cart = await Cart.findOne({ user: req.user._id });
      }
      let cart;
      if (
        (req.user && !user_cart && req.session.cart) ||
        (!req.user && req.session.cart)
      ) {
        cart = await new Cart(req.session.cart);
      } else if (!req.user || !user_cart) {
        cart = new Cart({});
      } else {
        cart = user_cart;
      }
  
      // add the product to the cart
      const product = await Product.findById(productId);
      const itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        // if product exists in the cart, update the quantity
        cart.items[itemIndex].qty++;
        cart.items[itemIndex].price = cart.items[itemIndex].qty * product.price;
        cart.totalQty++;
        cart.totalCost += product.price;
      } else {
        // if product does not exists in cart, find it in the db to retrieve its price and add new item
        cart.items.push({
          productId: productId,
          qty: 1,
          price: product.price,
          title: product.title,
          productCode: product.productCode,
        });
        cart.totalQty++;
        cart.totalCost += product.price;
      }
  
      // if the user is logged in, store the user's id and save cart to the db
      if (req.user) {
        cart.user = req.user._id;
        await cart.save();
      }
      req.session.cart = cart;
      req.flash("success", "Item added to the shopping cart");
      res.redirect(req.headers.referer);
    } catch (err) {
      console.log(err.message);
      res.redirect("/");
    }
    
  };

  async reduce(req, res, next){
    // if a user is logged in, reduce from the user's cart and save
    // else reduce from the session's cart
    const productId = ObjectId(req.params.id);
    let cart;
    try {
      if (req.user) {
        cart = await Cart.findOne({ user: req.user._id });
      } else if (req.session.cart) {
        cart = await new Cart(req.session.cart);
      }

      // find the item with productId
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        // find the product to find its price
        const product = await Product.findById(productId);
        // if product is found, reduce its qty
        cart.items[itemIndex].qty--;
        cart.items[itemIndex].price -= product.price;
        cart.totalQty--;
        cart.totalCost -= product.price;
        // if the item's qty reaches 0, remove it from the cart
        if (cart.items[itemIndex].qty <= 0) {
          await cart.items.remove({ _id: cart.items[itemIndex]._id });
        }
        req.session.cart = cart;
        //save the cart it only if user is logged in
        if (req.user) {
          await cart.save();
        }
        //delete cart if qty is 0
        if (cart.totalQty <= 0) {
          req.session.cart = null;
          await Cart.findByIdAndRemove(cart._id);
        }
      }
      res.redirect(req.headers.referer);
    } catch (err) {
      console.log(err.message);
      res.redirect("/");
    }
  }

  // GET: remove all instances of a single product from the cart
  async remove(req, res, next){
    const productId = ObjectId(req.params.id);
    let cart;
    try {
      if (req.user) {
        cart = await Cart.findOne({ user: req.user._id });
      } else if (req.session.cart) {
        cart = await new Cart(req.session.cart);
      }
      //fnd the item with productId
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        //find the product to find its price
        cart.totalQty -= cart.items[itemIndex].qty;
        cart.totalCost -= cart.items[itemIndex].price;
        await cart.items.remove({ _id: cart.items[itemIndex]._id });
      }
      req.session.cart = cart;
      //save the cart it only if user is logged in
      if (req.user) {
        await cart.save();
      }
      //delete cart if qty is 0
      if (cart.totalQty <= 0) {
        req.session.cart = null;
        await Cart.findByIdAndRemove(cart._id);
      }
      res.redirect(req.headers.referer);
    } catch (err) {
      console.log(err.message);
      res.redirect("/");
    }
  }
  // create products array to store the info of each product in the cart
  async productsFromCart(cart){
    let products = []; // array of objects
    for (const item of cart.items) {
      let foundProduct = (
        await Product.findById(item.productId).populate("category")
      ).toObject();
      foundProduct["qty"] = item.qty;
      foundProduct["totalPrice"] = item.price;
      products.push(foundProduct);
    }
    return products;
  }
}
  
module.exports = new CartController;














// try {
    //   const _id = ObjectId(req.params.id);
    //   if (_id) {
    //     const cart = await cart_model.findOne({ _id });
    //     if (cart) {
    //       res.status(200).json({
    //         success: true,
    //         message: "Successfully found cart products",
    //         data: cart,
    //       });
    //     } else {
    //       res.status(404).json({
    //         success: false,
    //         message: "Couldn't found cart products",
    //         data: [],
    //       });
    //     }
  
    //   } else {
    //     res.status(400).json({
    //       success: false,
    //       message: "Pass currect data !",
    //       data: [],
    //     });
    //   }
    // } catch (error) {
    //   res.status(404).json({ success: false, message: "Something went worng !", data: error });
    // }

    // async addOne(req, res){
  //   try {
  //     const _id = ObjectId(req.params.id);
  //     if (_id) {
  //       const cart = await cart_model.findOne({ _id });
  //       const data = {
  //         productId: req.body.productId,
  //         productQuantity: req.body.productQuantity,
  //         _id: req.body.productId,
  //       };
  //       if (cart) {
  //         cart.products.push(data);
  //         cart.save();
  //       } else {
  //         await cart_model.create({
  //           products: data,
  //           _id: _id,
  //         });
  //       }
  //       res.status(201).send({
  //         success: true,
  //         message: `${req.body}\n product is successfully added`,
  //         data: [],
  //       });
  //     } else {
  //       res.status(400).json({
  //         success: false,
  //         message: "Pass currect data !",
  //         data: [],
  //       });
  //     }
  //   } catch (error) {
  //     res.status(404).json({ success: false, message: "Something went worng !", data: error });
  //   }
  // }
  // async deleteOne(req, res){
  //   try {
  //     await Cart.findByIdAndRemove(req.params.id)
  //     res.status(200).send({status: 'ok'})
  //   } catch (e) {
  //     console.log(err)
  //     sendResponseError(500, `Error ${err}`, res)
  //   }
  // }