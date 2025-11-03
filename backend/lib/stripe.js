import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

// Mock Stripe for development if env var is missing
let stripe;
try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  } else {
    // Mock Stripe object for development
    stripe = {
      checkout: {
        sessions: {
          create: () => Promise.resolve({ id: 'mock_session_id' }),
        },
      },
      paymentIntents: {
        create: () => Promise.resolve({ id: 'mock_payment_intent', client_secret: 'mock_secret' }),
      },
      webhooks: {
        constructEvent: () => ({ type: 'mock_event' }),
      },
      coupons: {
        create: () => Promise.resolve({ id: 'mock_coupon_id' }),
      },
    };
  }
} catch (error) {
  console.warn('Stripe not available, using mock:', error.message);
  stripe = {
    checkout: {
      sessions: {
        create: () => Promise.resolve({ id: 'mock_session_id' }),
      },
    },
    paymentIntents: {
      create: () => Promise.resolve({ id: 'mock_payment_intent', client_secret: 'mock_secret' }),
    },
    webhooks: {
      constructEvent: () => ({ type: 'mock_event' }),
    },
    coupons: {
      create: () => Promise.resolve({ id: 'mock_coupon_id' }),
    },
  };
}

export { stripe };
