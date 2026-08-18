# E-COMMERCE STORE - DOCUMENTATION

<img width="1900" height="913" alt="image" src="https://github.com/user-attachments/assets/a9a5a30e-ee19-4ce8-b785-9783519365f7" />


## TABLE OF CONTENTS

1. Project Overview
2. Technology Stack
3. Features List (FULL)
4. Folder Structure Explanation
5. System Architecture
6. DFD (Data Flow Diagram) Explanation
7. ERD (Entity Relationship Diagram) Explanation
8. Security Architecture
9. JWT Auth Flow (Diagram Explanation)
10. Application Flow (Stepwise)
11. Backend Internal Flow
12. Frontend Internal Flow
13. Auto API Documentation
14. Dependencies Installation
15. Environment Variables
16. How To Run Project
17. Runtime Flow (After Startup)
18. Common Errors & Fixes
19. Developer Notes

---

# ============================================================================
# 1. PROJECT OVERVIEW


## Project Name
E-Commerce Store

## Purpose
A full-featured e-commerce platform enabling users to browse products by category, add items to cart, apply discount coupons, and complete purchases via Stripe payment integration. The platform includes an admin dashboard for product management and sales analytics.

## High-Level System Summary
This is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application with:
- User authentication (signup/login/logout) with JWT tokens
- Product browsing by category
- Shopping cart functionality
- Coupon/discount system
- Stripe payment integration
- Admin dashboard for product management
- Sales analytics

## Business Problem Solved
- Provides online shopping capability with secure payment processing
- Enables admin users to manage products and track sales performance
- Offers personalized shopping experience with featured products and recommendations

---

# 2. TECHNOLOGY STACK
# ============================================================================

## Frontend

| Category | Technology |
|----------|------------|
| Framework | React 18+ with Vite |
| Language | JavaScript (ES6+) |
| State Management | Zustand |
| Routing | React Router DOM v6 |
| UI Framework | Tailwind CSS |
| Animations | Framer Motion |
| Notifications | React Hot Toast |
| HTTP Client | Axios |
| Icons | Lucide React |

### Frontend Dependencies
```
json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "zustand": "^4.x",
  "tailwindcss": "^3.x",
  "framer-motion": "^11.x",
  "react-hot-toast": "^2.x",
  "axios": "^1.x",
  "lucide-react": "^0.x"
}
```

## Backend

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (Access + Refresh Tokens) |
| Caching | Redis (Upstash) |
| Image Storage | Cloudinary |
| Payment Processing | Stripe |
| Security | Helmet, Cookie Parser |
| Password Hashing | Bcryptjs |

### Backend Dependencies
```
json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "jsonwebtoken": "^9.x",
  "bcryptjs": "^2.x",
  "cookie-parser": "^1.x",
  "helmet": "^7.x",
  "dotenv": "^16.x",
  "cloudinary": "^2.x",
  "@upstash/redis": "^1.x",
  "stripe": "^14.x",
  "cors": "^2.x"
}
```

---

# 3. FEATURES LIST (FULL)
# ============================================================================

## Authentication Features
- [x] User registration (signup) with name, email, password
- [x] User login with email/password
- [x] JWT-based authentication with access and refresh tokens
- [x] Token refresh mechanism
- [x] Protected routes for authenticated users
- [x] Role-based access control (customer/admin)
- [x] Logout functionality

## Product Features
- [x] View all products (admin only)
- [x] View featured products
- [x] Browse products by category
- [x] Get recommended products (randomized)
- [x] Create new product (admin only)
- [x] Delete product (admin only)
- [x] Toggle featured status (admin only)
- [x] Product image upload to Cloudinary

## Shopping Cart Features
- [x] Add product to cart
- [x] Remove product from cart
- [x] Update product quantity
- [x] Clear entire cart
- [x] View cart items with quantities

## Coupon Features
- [x] Get user's available coupon
- [x] Validate coupon code
- [x] Auto-generate coupon for purchases over $200
- [x] Apply discount to order total

## Payment Features
- [x] Create Stripe checkout session
- [x] Process payment via Stripe
- [x] Handle payment success
- [x] Handle payment cancellation
- [x] Create order after successful payment

## Admin Features
- [x] Admin dashboard with tabs
- [x] Create product form
- [x] Products list with management options
- [x] Analytics dashboard with sales data
- [x] View total users, products, sales, revenue
- [x] View daily sales data (last 7 days)

---

# 4. FOLDER STRUCTURE EXPLANATION
# ============================================================================

## Backend Structure

```
backend/
├── server.js                 # Main Express server entry point
├── db/
│   └── db.js                 # MongoDB connection configuration
├── lib/
│   ├── cloudinary.js         # Cloudinary image upload configuration
│   ├── redis.js              # Redis client configuration (Upstash)
│   └── stripe.js             # Stripe payment configuration
├── middleware/
│   └── auth.middleware.js    # JWT authentication middleware
├── models/
│   ├── user.model.js         # User Mongoose schema
│   ├── product.model.js      # Product Mongoose schema
│   ├── order.model.js        # Order Mongoose schema
│   └── coupon.model.js       # Coupon Mongoose schema
├── controllers/
│   ├── auth.controllers.js   # Authentication logic
│   ├── product.controller.js # Product CRUD operations
│   ├── cart.controller.js   # Cart management logic
│   ├── coupon.controller.js # Coupon validation logic
│   ├── payment.controller.js # Stripe payment logic
│   └── analytics.controller.js # Sales analytics logic
└── routes/
    ├── auth.route.js        # Auth router configuration
    ├── product.route.js     # Product router configuration
    ├── cart.route.js        # Cart router configuration
    ├── coupon.route.js      # Coupon router configuration
    ├── payment.route.js     # Payment router configuration
    └── analytics.route.js   # Analytics router configuration
```

## Frontend Structure

```
frontend/
├── src/
│   ├── main.jsx             # React app entry point
│   ├── App.jsx              # Main App component with routing
│   ├── index.css            # Global CSS styles
│   ├── App.css              # App-specific styles
│   ├── lib/
│   │   └── axios.js         # Axios instance with base configuration
│   ├── stores/
│   │   ├── useUserStore.js    # User state management (Zustand)
│   │   ├── useProductStore.js # Product state management
│   │   └── useCartStore.js    # Cart state management
│   ├── components/
│   │   ├── navbar/              # Navigation bar component
│   │   ├── productCard/         # Product display card
│   │   ├── categoryItem/       # Category display item
│   │   ├── featuredProductsSlider/ # Featured products carousel
│   │   ├── loadingSpinner/     # Loading indicator
│   │   ├── cart/               # Cart-related components
│   │   │   ├── cartItem/       # Individual cart item
│   │   │   ├── emptyCartUI/    # Empty cart display
│   │   │   ├── giftCouponCard/ # Coupon input card
│   │   │   ├── orderSummary/   # Order total summary
│   │   │   └── peopleAlsoBought/ # Recommended products
│   │   ├── admin-side/         # Admin dashboard components
│   │   │   ├── analyticsTab/   # Analytics dashboard
│   │   │   ├── createProductForm/ # Product creation form
│   │   │   └── productsList/   # Product listing
│   │   └── ui/                 # Reusable UI components
│   └── pages/
│       ├── home/               # Home page
│       ├── auth/               # Authentication pages
│       │   ├── login/          # Login page
│       │   └── signup/         # Signup page
│       ├── cartPage/           # Shopping cart page
│       ├── categoryPage/       # Category products page
│       ├── admin/              # Admin dashboard page
│       ├── purchaseSuccess/    # Payment success page
│       └── purchaseCancel/     # Payment cancel page
├── public/                     # Static assets (images)
├── index.html                  # HTML entry point
├── package.json                # Frontend dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

---

# 5. SYSTEM ARCHITECTURE
# ============================================================================

## Client-Server Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (FRONTEND)                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  React Application (Vite)                                       │   │
│  │  ├── Zustand Stores (State Management)                         │   │
│  │  ├── React Router (Navigation)                                 │   │
│  │  ├── Components & Pages                                        │   │
│  │  └── Axios (HTTP Client)                                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │ HTTPS (JSON)
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           SERVER (BACKEND)                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Express.js Server                                             │   │
│  │  ├── Routes (API Endpoints)                                    │   │
│  │  ├── Middleware (Auth, Security)                               │   │
│  │  └── Controllers (Business Logic)                             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   MongoDB       │   │   Redis         │   │   Cloudinary    │
│   (Database)    │   │   (Caching)     │   │   (Images)      │
└─────────────────┘   └─────────────────┘   └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │   Stripe        │
                                    │   (Payments)    │
                                    └─────────────────┘
```

## Request Lifecycle

1. **User Action**: User interacts with frontend (clicks button, submits form)
2. **State Update**: Frontend updates local state via Zustand
3. **API Call**: Axios sends HTTP request to backend API
4. **Middleware**: Backend middleware validates JWT token
5. **Controller**: Controller processes request and business logic
6. **Model**: Mongoose model interacts with MongoDB
7. **Response**: Server returns JSON response
8. **UI Update**: Frontend updates UI based on response

---

# 6. DFD (DATA FLOW DIAGRAM) EXPLANATION
# ============================================================================

## Level 0 - Context Diagram

```
                    ┌─────────────────┐
                    │                 │
    ┌───────────────┤   USER         ├───────────────┐
    │               │                 │               │
    │               └─────────────────┘               │
    │                       │                         │
    │                       │                         │
    │                       ▼                         │
    │               ┌─────────────────┐              │
    │               │                 │              │
    │   ┌──────────►│  E-COMMERCE    │◄──────────┐   │
    │   │           │    SYSTEM      │           │   │
    │   │           │                 │           │   │
    │   │           └─────────────────┘           │   │
    │   │                   │                     │   │
    │   │                   │                     │   │
    │   │                   ▼                     │   │
    │   │           ┌─────────────────┐           │   │
    │   │           │                 │           │   │
    │   └───────────│   DATABASE     │◄──────────┘   │
    │               │   (MongoDB)    │               │
    │               └─────────────────┘               │
    │                       │                         │
    │                       │                         │
    └───────────────────────┴─────────────────────────┘
                    │       │
                    │       │
            ┌───────┘       └───────┐
            │                       │
            ▼                       ▼
    ┌───────────┐           ┌───────────┐
    │  STRIPE   │           │CLOUDINARY │
    │ (Payment) │           │  (Images) │
    └───────────┘           └───────────┘
```

### Actors
1. **Customer** - Regular user who browses products, adds to cart, makes purchases
2. **Admin** - Administrative user who manages products and views analytics

### High-Level Data Exchange
- User credentials → Authentication
- Product requests → Product data
- Cart operations → Cart data
- Payment requests → Payment processing
- Admin operations → Product/Analytics data

---

## Level 1 - Authentication Process

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│  USER   │────►│   LOGIN API  │────►│  VALIDATE   │────►│  GENERATE│
│         │     │   /login     │     │ CREDENTIALS │     │   JWT    │
└─────────┘     └──────────────┘     └─────────────┘     └──────────┘
    │                                                    │
    │                                                    ▼
    │                                            ┌──────────────┐
    │                                            │   SET COOKIE │
    │                                            │  (HTTPONLY)  │
    │                                            └──────────────┘
    │                                                    │
    ◄────────────────────────────────────────────────────┘
```

## Level 1 - CRUD Operations

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│  USER   │────►│  PRODUCT API │────►│ CONTROLLER  │────►│  MODEL   │
│         │     │   /products  │     │             │     │          │
└─────────┘     └──────────────┘     └─────────────┘     └──────────┘
                                                            │
                                                            ▼
                                                    ┌──────────────┐
                                                    │   MongoDB    │
                                                    │  Database    │
                                                    └──────────────┘
                                                            │
                                                            ▼
                                                    ┌──────────────┐
                                                    │   RESPONSE   │
                                                    │   (JSON)     │
                                                    └──────────────┘
                                                            │
                                                            ▼
                                                     ┌──────────────┐
                                                     │    UPDATE    │
                                                     │      UI      │
                                                     └──────────────┘
```

---

# 7. ERD (ENTITY RELATIONSHIP DIAGRAM) EXPLANATION
# ============================================================================

## Entities

### 1. User Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier |
| name | String | User's full name |
| email | String | User's email (unique) |
| password | String | Hashed password |
| cartItems | Array | Array of {product, quantity} |
| role | Enum | "customer" or "admin" |
| createdAt | Date | Account creation timestamp |
| updatedAt | Date | Last update timestamp |

### 2. Product Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier |
| name | String | Product name |
| description | String | Product description |
| price | Number | Product price |
| image | String | Cloudinary image URL |
| category | String | Product category |
| isFeatured | Boolean | Featured product flag |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last update timestamp |

### 3. Order Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier |
| user | ObjectId | Reference to User |
| products | Array | Array of {product, quantity, price} |
| totalAmount | Number | Total order amount |
| stripeSessionId | String | Stripe session ID (unique) |
| createdAt | Date | Order creation timestamp |
| updatedAt | Date | Last update timestamp |

### 4. Coupon Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier |
| code | String | Coupon code (unique) |
| discountPercentage | Number | Discount percentage (0-100) |
| expirationDate | Date | Coupon expiry date |
| isActive | Boolean | Active status |
| userId | ObjectId | Reference to User (unique) |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last update timestamp |

---

## Relationships

### User ↔ Product (Many-to-Many via Cart)
- User has many Products in cartItems array
- Each cartItem contains product reference and quantity

### User ↔ Order (One-to-Many)
- One User can have many Orders
- Order references User by userId

### User ↔ Coupon (One-to-One)
- One User can have one active Coupon
- Coupon references User by userId

### Product ↔ Order (Many-to-Many)
- One Product can appear in many Orders
- Each Order contains multiple Products
- Order stores product reference, quantity, and price at time of purchase

---

# 8. SECURITY ARCHITECTURE
# ============================================================================

## Authentication Mechanism

The application uses **JWT (JSON Web Token)** based authentication with a dual-token system:

### Access Token
- Short-lived token (15 minutes)
- Used for API authentication
- Stored in HTTP-only cookie
- Verified on every protected request

### Refresh Token
- Long-lived token (7 days)
- Stored in Redis cache
- Used to obtain new access tokens
- Provides seamless token renewal

## Authorization

### Protected Routes
- Middleware checks for valid JWT token
- Token verified using ACCESS_TOKEN_SECRET
- Expired tokens trigger refresh mechanism
- Invalid tokens return 401 Unauthorized

### Role-Based Access Control (RBAC)
- Two roles: "customer" and "admin"
- Admin routes protected with `adminRoute` middleware
- Only users with role="admin" can access admin features

## Protected Routes Implementation

```
javascript
// Middleware checks token from cookie
export const protectRoute = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    
    req.user = user;
    next();
};

// Admin-only middleware
export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied - admins only" });
    }
};
```

## Password Encryption

- Uses **bcryptjs** for password hashing
- Salt rounds: 10
- Pre-save hook hashes password before saving to database
- `comparePassword` method verifies login credentials

## Cookie Security

```javascript
res.cookie("accessToken", accessToken, {
    httpOnly: true,      // Prevents XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",     // Prevents CSRF attacks
    maxAge: 15 * 60 * 1000  // 15 minutes
});
```

## Additional Security Measures

1. **Helmet.js** - Sets security HTTP headers
2. **Content Security Policy** - Restricts resource loading
3. **Input Validation** - Server-side validation on all inputs
4. **Error Handling** - Generic error messages to prevent information disclosure

---

# 9. JWT AUTH FLOW (DIAGRAM EXPLANATION)
# ============================================================================

## Step-by-Step Authentication Flow

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│  USER   │     │  LOGIN API   │     │  VALIDATE   │     │  GENERATE│
│         │     │  POST /login │     │ CREDENTIALS │     │   JWT    │
│ email   │────►│              │────►│             │────►│          │
│ password│     │              │     │             │     │ access   │
└─────────┘     └──────────────┘     └─────────────┘     │ token    │
                                                            │ refresh  │
                                                            │ token   │
                                                            └──────────┘
                                                                 │
                                                                 ▼
                                                        ┌──────────────┐
                                                        │  REDIS       │
                                                        │  Store       │
                                                        │  refresh     │
                                                        │  token       │
                                                        └──────────────┘
                                                                 │
                                                                 ▼
                                                        ┌──────────────┐
                                                        │  SET COOKIES │
                                                        │  (HTTPONLY)  │
                                                        └──────────────┘
                                                                 │
                                                                 ▼
                                                        ┌──────────────┐
                                                        │   RESPONSE  │
                                                        │   200 OK    │
                                                        └──────────────┘
```

## Token Verification Flow

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│  USER   │     │  PROTECTED   │     │   VERIFY    │     │  CHECK   │
│         │     │  API REQUEST │     │     JWT     │     │   USER   │
│ Request │────►│              │────►│   TOKEN     │────►│  EXISTS  │
│ + Cookie│     │              │     │             │     │          │
└─────────┘     └──────────────┘     └─────────────┘     └──────────┘
                                                            │
                                          ┌───────────────┴───────────────┐
                                          ▼                               ▼
                                  ┌──────────────┐               ┌──────────────┐
                                  │   USER      │               │   INVALID   │
                                  │   FOUND    │               │   TOKEN     │
                                  │             │               │             │
                                  └──────────────┘               └──────────────┘
                                          │                               │
                                          ▼                               ▼
                                  ┌──────────────┐               ┌──────────────┐
                                  │   ALLOW     │               │   401       │
                                  │   REQUEST   │               │   UNAUTHORIZED│
                                  │   proceed   │               └──────────────┘
                                  └──────────────┘
```

## Token Expiration & Security

| Token Type | Expiration | Storage | Purpose |
|------------|------------|---------|---------|
| Access Token | 15 minutes | HTTP-only Cookie | API authentication |
| Refresh Token | 7 days | Redis | Token renewal |

### Security Risks Handled

1. **XSS (Cross-Site Scripting)** - HTTP-only cookies prevent token theft
2. **CSRF (Cross-Site Request Forgery)** - SameSite cookie attribute
3. **Token Theft** - Short-lived access tokens limit exposure
4. **Replay Attacks** - Unique tokens per session

### Why Middleware is Needed

- Centralizes authentication logic
- Ensures consistent verification across all protected routes
- Prevents code duplication
- Provides modular security implementation

---

# 10. APPLICATION FLOW (STEPWISE)
# ============================================================================

## Full Lifecycle from App Start to Database Update

### 1. Backend Startup
```
backend/server.js
    ↓
Load environment variables (dotenv)
    ↓
Create Express app
    ↓
Apply middleware (helmet, express.json, cookie-parser)
    ↓
Register routes (/api/auth, /api/products, etc.)
    ↓
Start HTTP server on PORT 5000
    ↓
Connect to MongoDB (connectDB)
```

### 2. Frontend Startup
```
frontend/main.jsx
    ↓
Create React root
    ↓
Wrap with BrowserRouter
    ↓
Render App component
    ↓
App.jsx: checkAuth() on mount
    ↓
Call /api/auth/profile endpoint
    ↓
Store user in Zustand state
```

### 3. Route Loading (Frontend)
```
App.jsx Routes
    ↓
<Routes>
    ↓
Match URL to Route
    ↓
Render Page Component
    ↓
Fetch data from API
    ↓
Update Zustand store
    ↓
Re-render component with data
```

### 4. Authentication Check Flow
```
User visits protected route
    ↓
App.jsx checks user state from useUserStore
    ↓
If no user, redirect to /login
    ↓
User submits credentials
    ↓
API validates and returns tokens
    ↓
Tokens stored in HTTP-only cookies
    ↓
User state updated in Zustand
    ↓
Redirect to original destination
```

### 5. API Request Cycle
```
Component calls API function
    ↓
Axios sends request with cookies
    ↓
Backend middleware verifies JWT
    ↓
Controller processes request
    ↓
Model interacts with MongoDB
    ↓
Response sent back
    ↓
Frontend updates state
    ↓
UI re-renders
```

### 6. State Update Flow
```
User action (click, submit)
    ↓
Zustand store method called
    ↓
Axios API call made
    ↓
Backend processes request
    ↓
Response received
    ↓
Store state updated
    ↓
React re-renders affected components
```

### 7. Database Update Flow
```
User creates product (Admin)
    ↓
Form submits to /api/products POST
    ↓
Middleware validates admin role
    ↓
Controller receives product data
    ↓
Cloudinary uploads image
    ↓
Product model creates document
    ↓
MongoDB stores product
    ↓
Response with product data sent
    ↓
Frontend updates product list
```

---

# 11. BACKEND INTERNAL FLOW
# ============================================================================

## Request Processing Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        INCOMING HTTP REQUEST                            │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. ROUTE MATCHING                                                        │
│    Express router matches URL to route handler                          │
│    Example: POST /api/products → product.route.js                        │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 2. MIDDLEWARE CHAIN                                                     │
│    ├── helmet() - Security headers                                      │
│    ├── express.json() - Parse JSON body                                  │
│    ├── cookie-parser() - Parse cookies                                  │
│    ├── protectRoute() - Verify JWT token                                │
│    └── adminRoute() - Check admin role (if needed)                     │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 3. CONTROLLER                                                           │
│    Business logic processing                                            │
│    Example: createProduct() in product.controller.js                   │
│    ├── Validates input data                                             │
│    ├── Calls external services (Cloudinary)                            │
│    └── Coordinates model operations                                      │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 4. MODEL / SERVICE                                                      │
│    Database interaction                                                │
│    Example: Product.create() in product.model.js                        │
│    └── Mongoose translates to MongoDB operations                        │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 5. DATABASE (MongoDB)                                                   │
│    ├── Create (insertOne)                                               │
│    ├── Read (find, findOne)                                             │
│    ├── Update (updateOne, findByIdAndUpdate)                           │
│    └── Delete (deleteOne, findByIdAndDelete)                           │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 6. RESPONSE                                                             │
│    HTTP response sent back to client                                    │
│    ├── 200 OK - Success                                                 │
│    ├── 201 Created - Resource created                                   │
│    ├── 400 Bad Request - Invalid input                                  │
│    ├── 401 Unauthorized - Invalid/missing token                         │
│    ├── 403 Forbidden - Insufficient permissions                        │
│    └── 500 Internal Server Error - Server error                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Example: Create Product Flow

```
POST /api/products
    │
    ▼
product.route.js
    │
    ▼ (middleware checks)
protectRoute() → Verifies JWT
    │
    ▼ (middleware checks)
adminRoute() → Verifies admin role
    │
    ▼
createProduct controller
    │
    ├─► Extract: { name, description, price, image, category }
    │
    ├─► Cloudinary upload: image → cloudinary.uploader.upload()
    │
    ├─► Create product: Product.create({...})
    │
    └─► MongoDB: insert product document
    │
    ▼
Response: { product: {...} }
```

---

# 12. FRONTEND INTERNAL FLOW
# ============================================================================

## Application Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND ENTRY                                 │
│                    frontend/src/main.jsx                                │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    React DOM Rendering                                  │
│         createRoot().render(<App />)                                    │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       App Component                                     │
│              frontend/src/App.jsx                                       │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  1. checkAuth() on mount (useEffect)                             │  │
│  │     └── Calls /api/auth/profile                                  │  │
│  │     └── Updates user state in useUserStore                       │  │
│  │                                                                  │  │
│  │  2. Render Routes (React Router)                                │  │
│  │     └── <Routes> with path matching                             │  │
│  │                                                                  │  │
│  │  3. Conditional Rendering based on auth state                  │  │
│  │     └── Show protected pages only for authenticated users      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                                    │
│                      (Zustand Stores)                                   │
│                                                                          │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐           │
│  │ useUserStore   │  │useProductStore │  │ useCartStore   │           │
│  │                │  │                │  │                │           │
│  │ - user         │  │ - products     │  │ - cart         │           │
│  │ - loading      │  │ - loading      │  │ - coupon       │           │
│  │ - signup()     │  │ - fetchAll()   │  │ - addToCart()  │           │
│  │ - login()      │  │ - createProd() │  │ - calculate()  │           │
│  │ - logout()     │  │ - deleteProd() │  │ - applyCoupon()│           │
│  │ - checkAuth()  │  │                │  │                │           │
│  └────────────────┘  └────────────────┘  └────────────────┘           │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    API INTEGRATION                                       │
│                    (Axios Instance)                                      │
│                                                                          │
│  axios.js                                                               │
│  ├── baseURL: /api (production) or http://localhost:5000/api          │
│  ├── withCredentials: true                                             │
│  └── Interceptors for token refresh                                    │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      COMPONENT HIERARCHY                                │
│                                                                          │
│  App                                                                    │
│  ├── Navbar                                                              │
│  │   ├── Logo                                                            │
│  │   ├── Navigation Links                                                │
│  │   └── User Menu                                                       │
│  │       ├── Login/Register (guest)                                     │
│  │       └── Cart/Logout (authenticated)                                │
│  │       └── Admin Dashboard (admin)                                    │
│  │                                                                         │
│  ├── Routes                                                              │
│  │   ├── HomePage                                                        │
│  │   │   ├── CategoryItem x N                                           │
│  │   │   └── FeaturedProducts                                           │
│  │   │                                                                     │
│  │   ├── LoginPage                                                       │
│  │   │   └── Login Form                                                  │
│  │   │                                                                     │
│  │   ├── SignUpPage                                                      │
│  │   │   └── Signup Form                                                 │
│  │   │                                                                     │
│  │   ├── CartPage                                                        │
│  │   │   ├── CartItem x N                                               │
│  │   │   ├── OrderSummary                                               │
│  │   │   └── GiftCouponCard                                             │
│  │   │                                                                     │
│  │   ├── CategoryPage                                                    │
│  │   │   └── ProductCard x N                                            │
│  │   │                                                                     │
│  │   ├── AdminPage                                                       │
│  │   │   ├── CreateProductForm                                          │
│  │   │   ├── ProductsList                                                │
│  │   │   └── AnalyticsTab                                                │
│  │   │                                                                     │
│  │   ├── PurchaseSuccessPage                                             │
│  │   └── PurchaseCancelPage                                              │
│  │                                                                         │
│  └── Toaster (notifications)                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Data Flow

```
User Action
    │
    ▼
Component Handler
    │
    ▼
Zustand Store Method
    │
    ▼
Axios API Call
    │
    ▼
Backend Processing
    │
    ▼
Response
    │
    ▼
Zustand State Update
    │
    ▼
React Re-render
    │
    ▼
UI Update
```

---

# 13. AUTO API DOCUMENTATION
# ============================================================================

## API Endpoints Overview

| Method | Endpoint | Description | Auth Required | Middleware |
|--------|----------|-------------|---------------|------------|
| POST | /api/auth/signup | Register new user | No | - |
| POST | /api/auth/login | User login | No | - |
| POST | /api/auth/logout | User logout | Yes | protectRoute |
| POST | /api/auth/refresh-token | Refresh access token | No | - |
| GET | /api/auth/profile | Get user profile | Yes | protectRoute |
| GET | /api/products | Get all products | Yes | protectRoute, adminRoute |
| GET | /api/products/featured | Get featured products | No | - |
| GET | /api/products/category/:category | Get products by category | No | - |
| GET | /api/products/recommendations | Get recommended products | No | - |
| POST | /api/products | Create product | Yes | protectRoute, adminRoute |
| PATCH | /api/products/:id | Toggle featured | Yes | protectRoute, adminRoute |
| DELETE | /api/products/:id | Delete product | Yes | protectRoute, adminRoute |
| GET | /api/cart | Get cart items | Yes | protectRoute |
| POST | /api/cart | Add item to cart | Yes | protectRoute |
| PUT | /api/cart/:id | Update item quantity | Yes | protectRoute |
| DELETE | /api/cart | Remove item from cart | Yes | protectRoute |
| GET | /api/coupons | Get user's coupon | Yes | protectRoute |
| POST | /api/coupons/validate | Validate coupon | Yes | protectRoute |
| POST | /api/payments/create-checkout-session | Create Stripe session | Yes | protectRoute |
| POST | /api/payments/checkout-success | Handle payment success | Yes | protectRoute |
| GET | /api/analytics | Get analytics data | Yes | protectRoute, adminRoute |

---

### API Endpoint Details

#### Authentication Endpoints

##### POST /api/auth/signup
- **Purpose**: Register a new user
- **HTTP Method**: POST
- **Route Path**: /api/auth/signup
- **Authentication Required**: No
- **Middleware Used**: None

**Request**:
```
json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (201 Created):
```
json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer"
}
```

**Flow**: User → Controller → Model → Database → Response

---

##### POST /api/auth/login
- **Purpose**: Authenticate user and get tokens
- **HTTP Method**: POST
- **Route Path**: /api/auth/login
- **Authentication Required**: No
- **Middleware Used**: None

**Request**:
```
json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```
json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer"
}
```

**Error Response** (400 Bad Request):
```
json
{
  "message": "Invalid email or password"
}
```

**Flow**: User → Controller → Validate Credentials → Generate JWT → Set Cookies → Response

---

##### GET /api/auth/profile
- **Purpose**: Get current user's profile
- **HTTP Method**: GET
- **Route Path**: /api/auth/profile
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Response** (200 OK):
```
json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer",
  "cartItems": []
}
```

**Flow**: User → Middleware (verify JWT) → Controller → Model → Response

---

##### POST /api/auth/refresh-token
- **Purpose**: Refresh expired access token
- **HTTP Method**: POST
- **Route Path**: /api/auth/refresh-token
- **Authentication Required**: No
- **Middleware Used**: None

**Request**: Cookies (refreshToken)

**Response** (200 OK):
```
json
{
  "message": "Token refreshed successfully"
}
```

**Flow**: User → Verify refresh token → Generate new access token → Set cookie → Response

---

##### POST /api/auth/logout
- **Purpose**: Logout user and clear tokens
- **HTTP Method**: POST
- **Route Path**: /api/auth/logout
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Response** (200 OK):
```
json
{
  "message": "logged out successfully"
}
```

**Flow**: User → Middleware → Delete refresh token from Redis → Clear cookies → Response

---

#### Product Endpoints

##### GET /api/products
- **Purpose**: Get all products (admin only)
- **HTTP Method**: GET
- **Route Path**: /api/products
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute, adminRoute

**Response** (200 OK):
```
json
{
  "products": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "image": "https://...",
      "category": "jeans",
      "isFeatured": true
    }
  ]
}
```

---

##### GET /api/products/featured
- **Purpose**: Get featured products (public)
- **HTTP Method**: GET
- **Route Path**: /api/products/featured
- **Authentication Required**: No
- **Middleware Used**: None

**Response** (200 OK):
```
json
[
  {
    "_id": "product_id",
    "name": "Featured Product",
    "price": 99.99,
    "image": "https://..."
  }
]
```

**Flow**: Request → Check Redis cache → If not cached, query MongoDB → Cache result → Response

---

##### GET /api/products/category/:category
- **Purpose**: Get products by category
- **HTTP Method**: GET
- **Route Path**: /api/products/category/:category
- **Authentication Required**: No
- **Middleware Used**: None

**Response** (200 OK):
```
json
{
  "products": [...]
}
```

---

##### POST /api/products
- **Purpose**: Create new product (admin only)
- **HTTP Method**: POST
- **Route Path**: /api/products
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute, adminRoute

**Request**:
```
json
{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "image": "base64_image_or_url",
  "category": "t-shirts"
}
```

**Response** (201 Created):
```
json
{
  "_id": "product_id",
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "image": "cloudinary_url",
  "category": "t-shirts",
  "isFeatured": false
}
```

**Flow**: Request → Middleware → Controller → Upload image to Cloudinary → Create product in MongoDB → Response

---

##### DELETE /api/products/:id
- **Purpose**: Delete product (admin only)
- **HTTP Method**: DELETE
- **Route Path**: /api/products/:id
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute, adminRoute

**Response** (200 OK):
```
json
{
  "message": "Product deleted successfully"
}
```

---

#### Cart Endpoints

##### GET /api/cart
- **Purpose**: Get user's cart items
- **HTTP Method**: GET
- **Route Path**: /api/cart
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Response** (200 OK):
```
json
[
  {
    "_id": "product_id",
    "name": "Product Name",
    "price": 29.99,
    "image": "https://...",
    "quantity": 2
  }
]
```

---

##### POST /api/cart
- **Purpose**: Add product to cart
- **HTTP Method**: POST
- **Route Path**: /api/cart
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Request**:
```
json
{
  "productId": "product_id"
}
```

**Response** (200 OK):
```
json
[
  {
    "productId": "product_id",
    "quantity": 1
  }
]
```

---

##### PUT /api/cart/:id
- **Purpose**: Update cart item quantity
- **HTTP Method**: PUT
- **Route Path**: /api/cart/:id
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Request**:
```
json
{
  "quantity": 3
}
```

**Response** (200 OK):
```
json
[
  ...
]
```

---

##### DELETE /api/cart
- **Purpose**: Remove item from cart or clear cart
- **HTTP Method**: DELETE
- **Route Path**: /api/cart
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Request** (remove specific item):
```
json
{
  "productId": "product_id"
}
```

**Request** (clear cart):
```
json
{}
```

**Response** (200 OK):
```
json
[]
```

---

#### Coupon Endpoints

##### GET /api/coupons
- **Purpose**: Get user's available coupon
- **HTTP Method**: GET
- **Route Path**: /api/coupons
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Response** (200 OK):
```
json
{
  "_id": "coupon_id",
  "code": "GIFTABC12",
  "discountPercentage": 10,
  "expirationDate": "2025-12-31",
  "isActive": true
}
```

---

##### POST /api/coupons/validate
- **Purpose**: Validate coupon code
- **HTTP Method**: POST
- **Route Path**: /api/coupons/validate
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Request**:
```
json
{
  "code": "GIFTABC12"
}
```

**Response** (200 OK):
```
json
{
  "message": "Coupon is valid",
  "code": "GIFTABC12",
  "discountPercentage": 10
}
```

**Error Response** (404 Not Found):
```
json
{
  "message": "No coupon found"
}
```

---

#### Payment Endpoints

##### POST /api/payments/create-checkout-session
- **Purpose**: Create Stripe checkout session
- **HTTP Method**: POST
- **Route Path**: /api/payments/create-checkout-session
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Request**:
```
json
{
  "products": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 29.99,
      "image": "https://...",
      "quantity": 2
    }
  ],
  "couponCode": "GIFTABC12"
}
```

**Response** (200 OK):
```
json
{
  "id": "cs_test_session_id",
  "totalAmount": 59.98
}
```

**Flow**: Request → Validate products → Calculate total → Apply coupon → Create Stripe session → Auto-generate coupon if total >= $200 → Response

---

##### POST /api/payments/checkout-success
- **Purpose**: Handle successful payment
- **HTTP Method**: POST
- **Route Path**: /api/payments/checkout-success
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute

**Request**:
```
json
{
  "sessionId": "cs_test_session_id"
}
```

**Response** (200 OK):
```
json
{
  "success": true,
  "message": "Payment successful! Order created and coupon deactivated (if used).",
  "orderId": "order_id"
}
```

---

#### Analytics Endpoints

##### GET /api/analytics
- **Purpose**: Get analytics data (admin only)
- **HTTP Method**: GET
- **Route Path**: /api/analytics
- **Authentication Required**: Yes
- **Middleware Used**: protectRoute, adminRoute

**Response** (200 OK):
```
json
{
  "analyticsData": {
    "users": 150,
    "products": 50,
    "totalSales": 200,
    "totalRevenue": 15000
  },
  "dailySalesData": [
    {
      "date": "2025-01-01",
      "sales": 10,
      "revenue": 500
    }
  ]
}
```

---

# 14. DEPENDENCIES INSTALLATION
# ============================================================================

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation Steps

```
bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables (see section 15)

# Start development server
npm run dev
```

### Important Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.x | Web framework |
| mongoose | ^8.x | MongoDB ODM |
| jsonwebtoken | ^9.x | JWT authentication |
| bcryptjs | ^2.x | Password hashing |
| cookie-parser | ^1.x | Cookie parsing |
| helmet | ^7.x | Security headers |
| dotenv | ^16.x | Environment variables |
| cloudinary | ^2.x | Image storage |
| @upstash/redis | ^1.x | Redis caching |
| stripe | ^14.x | Payment processing |
| cors | ^2.x | Cross-origin requests |

---

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

```
bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Important Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.x | UI framework |
| react-dom | ^18.x | React DOM |
| react-router-dom | ^6.x | Routing |
| zustand | ^4.x | State management |
| tailwindcss | ^3.x | Styling |
| framer-motion | ^11.x | Animations |
| react-hot-toast | ^2.x | Notifications |
| axios | ^1.x | HTTP client |
| lucide-react | ^0.x | Icons |

---

# 15. ENVIRONMENT VARIABLES
# ============================================================================

## Required Environment Variables

### Backend (.env)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| MONGO_URI | MongoDB connection string | Yes | mongodb://localhost:27017/ecommerce |
| PORT | Server port number | No | 5000 |
| ACCESS_TOKEN_SECRET | JWT access token secret | Yes | your_access_secret_key |
| REFRESH_TOKEN_SECRET | JWT refresh token secret | Yes | your_refresh_secret_key |
| NODE_ENV | Environment mode | No | development/production |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes | your_cloud_name |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes | your_api_key |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes | your_api_secret |
| UPSTASH_REDIS_URL | Upstash Redis URL | No | https://xxx.upstash.io |
| UPSTASH_REDIS_TOKEN | Upstash Redis token | No | your_redis_token |
| STRIPE_SECRET_KEY | Stripe secret key | Yes | sk_test_xxx |
| CLIENT_URL | Frontend URL | No | http://localhost:5173 |

### Frontend

The frontend uses the following configuration in `axios.js`:
```
javascript
baseURL: import.meta.mode === "development" 
  ? "http://localhost:5000/api" 
  : "/api"
```

---

# 16. HOW TO RUN PROJECT
# ============================================================================

## Step-by-Step Beginner Guide

### Step 1: Clone and Navigate
```
bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd E-Commerce-Store
```

### Step 2: Backend Setup

```
bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Required: MONGO_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET
# Optional: Cloudinary, Redis, Stripe keys

# Start backend server
npm run dev
```

The backend server should start on `http://localhost:5000`

### Step 3: Frontend Setup

```
bash
# Open a new terminal
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend should start on `http://localhost:5173`

### Step 4: Verify Installation

1. Open browser to `http://localhost:5173`
2. You should see the home page with categories
3. Try registering a new account
4. Try browsing products by category
5. Test cart functionality (requires login)

### Step 5: Create Admin User

By default, new users are created with role="customer". To create an admin:

1. Register a new account via the UI
2. Manually update the user's role in MongoDB:
```
javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or create directly in MongoDB Compass/Shell with role: "admin".

---

# 17. RUNTIME FLOW (AFTER STARTUP)
# ============================================================================

## What Happens When Servers Start

### Backend Runtime Flow

1. **Server Initialization**
   
```
   Express app created
   ↓
   Middleware registered (helmet, express.json, cookie-parser)
   ↓
   Routes registered (/api/auth, /api/products, etc.)
   ↓
   HTTP server listening on PORT 5000
   ↓
   MongoDB connection established
   
```

2. **Waiting for Requests**
   - Server listens for incoming HTTP requests
   - Each request goes through middleware chain
   - Protected routes verify JWT tokens
   - Controllers process business logic
   - Models interact with MongoDB

3. **API Communication**
   - Auth routes handle login/signup/logout
   - Product routes serve product data
   - Cart routes manage shopping cart
   - Payment routes process Stripe checkout
   - Analytics routes provide admin data

### Frontend Runtime Flow

1. **Application Bootstrap**
   
```
   React app mounts
   ↓
   BrowserRouter wraps app
   ↓
   App component renders
   ↓
   checkAuth() called on mount
   ↓
   /api/auth/profile endpoint called
   ↓
   User state populated if authenticated
   
```

2. **Authentication Check**
   - On every page load, checks if user is logged in
   - Protected routes redirect to /login if not authenticated
   - JWT tokens automatically sent with requests via cookies

3. **Data Rendering**
   - HomePage fetches featured products
   - CategoryPage fetches products by category
   - CartPage fetches user's cart items
   - AdminPage fetches all products and analytics

4. **User Interactions**
   - Login/Signup forms submit to auth endpoints
   - Product cards have "Add to Cart" buttons
   - Cart page allows quantity updates and coupon application
   - Checkout button initiates Stripe payment flow

---

# 18. COMMON ERRORS & FIXES
# ============================================================================

## Backend Errors

### Error: MongoDB Connection Failed
**Symptom**: Server doesn't start, shows MongoDB connection error

**Solution**:
1. Ensure MongoDB is running locally or check Atlas connection string
2. Verify MONGO_URI in .env file
3. Check firewall settings for MongoDB port

---

### Error: JWT Token Issues
**Symptom**: "Unauthorized - No Access Token provided"

**Solution**:
1. Ensure cookies are being sent with requests
2. Check that withCredentials: true is set in frontend axios
3. Verify ACCESS_TOKEN_SECRET matches between environments

---

### Error: Cloudinary Upload Failed
**Symptom**: Product creation fails with image error

**Solution**:
1. Verify CLOUDINARY_CLOUD_NAME, API_KEY, and API_SECRET are correct
2. Check Cloudinary account has sufficient credits
3. Ensure image format is supported (JPEG, PNG, etc.)

---

### Error: Stripe Payment Failed
**Symptom**: Checkout session creation fails

**Solution**:
1. Verify STRIPE_SECRET_KEY is correct (use test key for development)
2. Check Stripe account status
3. Ensure products have valid prices

---

## Frontend Errors

### Error: CORS Policy
**Symptom**: "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution**:
1. Install cors package in backend: `npm install cors`
2. Add to server.js:
```
javascript
import cors from "cors";
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
```

---

### Error: Build Failed
**Symptom**: Frontend build shows errors

**Solution**:
1. Delete node_modules and package-lock.json
2. Run npm install again
3. Check for syntax errors in code

---

### Error: State Not Updating
**Symptom**: UI doesn't reflect data changes

**Solution**:
1. Check Zustand store has correct state updates
2. Verify components are using correct store hooks
3. Ensure API calls are successful

---

### Error: Redirect Loop
**Symptom**: Page continuously redirects

**Solution**:
1. Check protected route logic in App.jsx
2. Verify user role matches route requirements
3. Clear browser cookies and try again

---

# 19. DEVELOPER NOTES
# ============================================================================

## Scalability Improvements

### Backend
1. **Database Indexing**
   - Add indexes on frequently queried fields (email, category, isFeatured)
   - Use compound indexes for complex queries

2. **Caching Strategy**
   - Implement Redis caching for all product queries
   - Cache user sessions for faster authentication
   - Implement cache invalidation on product updates

3. **API Rate Limiting**
   - Add express-rate-limit to prevent abuse
   - Implement different limits for authenticated vs anonymous users

4. **Horizontal Scaling**
   - Use load balancer for multiple server instances
   - Implement session storage in Redis instead of memory
   - Use CDN for static assets

### Frontend
1. **Code Splitting**
   - Implement lazy loading for routes
   - Separate vendor chunks

2. **Image Optimization**
   - Use responsive images
   - Implement lazy loading for below-fold images
   - Use WebP format where supported

3. **State Management**
   - Consider Redux Toolkit for complex state
   - Implement persistence for cart (localStorage)

---

## Performance Suggestions

1. **Backend**
   - Implement pagination for product listings
   - Use query projection to limit returned fields
   - Optimize MongoDB queries with lean()
   - Implement connection pooling

2. **Frontend**
   - Implement virtual scrolling for product lists
   - Debounce search inputs
   - Use React.memo for expensive components

---

## Security Improvements

1. **Authentication**
   - Implement email verification
   - Add two-factor authentication
   - Use secure password reset flow

2. **API Security**
   - Add input validation (Joi or Zod)
   - Implement CSRF protection
   - Add request size limits

3. **Data Security**
   - Encrypt sensitive data at rest
   - Use HTTPS in production
   - Implement data sanitization

---

## Future Enhancements

1. **User Features**
   - Order history and tracking
   - Wishlist functionality
   - Product reviews and ratings
   - User profile management

2. **Shopping Features**
   - Multiple payment methods
   - Order confirmation emails
   - Shopping notifications

3. **Admin Features**
   - Order management
   - User management
   - Inventory management
   - Sales reports export

---

# ============================================================================
# END OF DOCUMENTATION
# ============================================================================
by Yash Lagare
updated-date : 17-2-2026
