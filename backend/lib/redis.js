import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

// Mock Redis for development if env vars are missing
let redis;
try {
  if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    });
  } else {
    // In-memory mock for development
    const store = new Map();
    redis = {
      set: (key, value, options) => {
        store.set(key, value);
        if (options?.ex) {
          setTimeout(() => store.delete(key), options.ex * 1000);
        }
        return Promise.resolve('OK');
      },
      get: (key) => Promise.resolve(store.get(key) || null),
      del: (key) => {
        store.delete(key);
        return Promise.resolve(1);
      },
    };
  }
} catch (error) {
  console.warn('Redis not available, using in-memory store:', error.message);
  // In-memory mock
  const store = new Map();
  redis = {
    set: (key, value, options) => {
      store.set(key, value);
      if (options?.ex) {
        setTimeout(() => store.delete(key), options.ex * 1000);
      }
      return Promise.resolve('OK');
    },
    get: (key) => Promise.resolve(store.get(key) || null),
    del: (key) => {
      store.delete(key);
      return Promise.resolve(1);
    },
  };
}

export { redis };
