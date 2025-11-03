import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); //stripe wants u to send in the format of cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    // Default to localhost for development if CLIENT_URL is not set
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${clientUrl}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    // because here 200*100 = 20000 right in $
    if (totalAmount >= 20000) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error);
    console.error("Error details:", error.message);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

// export const checkoutSuccess = async(req, res) => {
//     try {
//         const { sessionId } = req.body;
//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         if (session.payment_status === "paid") {

//             if (session.metadata.couponCode) {
//                 await Coupon.findOneAndUpdate({
//                     code: session.metadata.couponCode,
//                     userId: session.metadata.userId,
//                 }, {
//                     isActive: false,
//                 }
//             );
//         }
//             //create new order here cause we just get payment
//             const products = JSON.parse(session.metadata.products);
//             const newOrder = new Order({
//                 user: session.metadata.userId,
//                 products: products.map(product => ({
//                     product: product.id,
//                     quantity: product.quantity,
//                     price: product.price
//                 })),
//                 totalAmount: session.amount_total / 100, //convert from cents to dollars
//                 stripeSessionId: sessionId
//             });

//             await newOrder.save();

//             res.status(200).json({
//                 success: true,
//                 message: "Payment successful, order created , and coupon deactivated if used.",
//                 orderId: newOrder._id,
//             });
//         }
//     } catch (error) {
//         console.log("Error processing successful checkout:", error);
//         res.status(500).json({ message: "Server error processing payment", error: error.message });
//     }
// };

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(400).json({ message: "Invalid session ID." });
    }

    if (session.payment_status === "paid") {
      // 1️⃣ Deactivate coupon if used
      if (session.metadata?.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false }
        );
      }

      // 2️⃣ Safely parse product metadata
      let products = [];
      try {
        products = JSON.parse(session.metadata.products);
      } catch (err) {
        console.error("Failed to parse products from metadata:", err);
        return res
          .status(400)
          .json({ message: "Invalid products data in metadata." });
      }

      // 3️⃣ Check if order already exists to ensure idempotency
      const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
      if (existingOrder) {
        return res.status(200).json({
          success: true,
          message: "✅ Payment already processed. Order exists.",
          orderId: existingOrder._id,
        });
      }

      // 4️⃣ Create new order document
      const newOrder = new Order({
        user: session.metadata.userId,
        // console.log("Parsed products metadata:", products)
        products: products.map((product) => ({
          product: product.id || product._id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100, // convert from cents
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      return res.status(200).json({
        success: true,
        message:
          "✅ Payment successful! Order created and coupon deactivated (if used).",
        orderId: newOrder._id,
      });
    } else {
      // 4️⃣ Handle unpaid or failed sessions
      return res.status(400).json({
        message: "Payment not completed or pending.",
        status: session.payment_status,
      });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Server error processing payment",
      error: error.message,
    });
  }
};

async function createStripCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
}

async function createNewCoupon(userId) {
  //to delete the existing coupon
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
  });
  await newCoupon.save();

  return newCoupon;
}
