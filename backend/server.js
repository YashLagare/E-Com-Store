// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import express from "express";
// import helmet from "helmet";

// //Routes
// import analyticsRoutes from "./routes/analytics.route.js";
// import authRoutes from "./routes/auth.route.js";
// import cartRoutes from "./routes/cart.route.js";
// import couponRoutes from "./routes/coupon.route.js";
// import paymentRoutes from "./routes/payment.route.js";
// import productRoutes from "./routes/product.route.js";

// import path from "path";

// import { connectDB } from "./db/db.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;



// const __dirname = path.resolve();

// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com", "https://*.stripe.com"],
//             styleSrc: ["'self'", "'unsafe-inline'"],
//             imgSrc: ["'self'", "data:", "https:"],
//             fontSrc: ["'self'", "data:", "https://js.stripe.com", "https://*.stripe.com"],
//             connectSrc: ["'self'", "https://api.stripe.com", "https://*.stripe.com"],
//             frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com", "https://*.stripe.com"],
//         },
//     },
// }));

// app.use(express.json( {limit:"10mb"} )); // this allows you to parse the body of your request

// app.use(cookieParser()); // this allows you to parse the body of your request without requiring the server


// //authentication
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/coupons", couponRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/analytics", analyticsRoutes);


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//     });
// }





// app.listen(PORT, () => {
//     console.log("Server is running on http://localhost:"+ PORT);

//     connectDB();
//     //connectDB
// });





import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import path from "path";
import { connectDB } from "./db/db.js";

// Routes
import analyticsRoutes from "./routes/analytics.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://js.stripe.com",
          "https://*.stripe.com",
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: [
          "'self'",
          "data:",
          "https://js.stripe.com",
          "https://*.stripe.com",
        ],
        connectSrc: [
          "'self'",
          "https://api.stripe.com",
          "https://*.stripe.com",
        ],
        frameSrc: [
          "'self'",
          "https://js.stripe.com",
          "https://hooks.stripe.com",
          "https://*.stripe.com",
        ],
      },
    },
  })
);

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// ✅ Serve frontend (for Render)
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ✅ Start server + connect DB
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
});
