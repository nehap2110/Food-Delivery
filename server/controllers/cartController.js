import foodModel from "../models/foodModel.js";
import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    const product = await foodModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    let cartData = await Cart.findOne({ userId });

    if (!cartData) {
      cartData = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      const itemIndex = cartData.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex >= 0) {
        cartData.items[itemIndex].quantity += 1;
      } else {
        cartData.items.push({ productId, quantity: 1 });
      }
    }

    await cartData.save();
    const populatedCart = await cartData.populate("items.productId");
    return res.json({ success: true, cartData: populatedCart });
  } catch (error) {
    console.log("error in addTocart ", error);
  }
};

// to decrease the quantity
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    const product = await foodModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    const cartData = await Cart.findOne({ userId });
    if (!cartData) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cartData.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    if (cartData.items[itemIndex].quantity > 1) {
      cartData.items[itemIndex].quantity -= 1;
    } else {
      cartData.items.splice(itemIndex, 1);
    }

    await cartData.save();
    const populatedCart = await cartData.populate("items.productId");

    return res.json({ success: true, cartData: populatedCart });
  } catch (error) {
    console.log("error in removefromcart ", error);
  }
};

// to remove all quantity
export const removeItem = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    if (!productId) {
      return res.status(404).json({ success: false });
    }
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: productId } } },
      { new: true }
    ).populate("items.productId");

    if (!updatedCart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cartData: updatedCart,
    });
  } catch (error) {
    console.log("error in remove cart ", error);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userId = req.user;
    const cartData = await Cart.findOne({ userId });

    if (!cartData) {
      return res
        .status(404)
        .json({ success: false, message: "Cart does't exist" });
    }
    cartData.items = [];
    await cartData.save();
    return res
      .status(200)
      .json({ success: true, message: "Item removed from cart", cartData });
  } catch (error) {
    console.log("error in remove cart ", error);
    res.json({ success: false, message: "server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ success: true, cartData: { items: [] } });
    }

    res.json({ success: true, cartData: cart });
  } catch (error) {
    console.log("error in getcart ", error);
    res.json({ success: false, message: error.message });
  }
};
