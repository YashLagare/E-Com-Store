import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // find all products
        res.json({ products });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_Products");
        if (featuredProducts) {
            try {
                return res.json(JSON.parse(featuredProducts));
            } catch (parseError) {
                console.log("Invalid JSON in cache, deleting key and fetching from DB");
                await redis.del("featured_Products");
            }
        }

        // if not in redis or invalid, fetch from mongodb
        featuredProducts = await Product.find({isFeatured: true}).lean(); // lean() returns a plain javascript object instead of a mongodb document which is good for performance

        if (!featuredProducts) {
            return res.status(404).json({ message: "No featured products found"});
        }

        //store featured in redis for quick access
        await redis.set("featured_Products", JSON.stringify(featuredProducts));

        res.json(featuredProducts);
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse =  await cloudinary.uploader.upload(image,{folder: "products"});
        }

        const product = await Product.create ({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,

        });

        res.status(201).json(product)

    } catch (error) {
        console.log("Error in createProduct controller",error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]; // this will get the id of the image
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("Image deleted from cloudinary");
            } catch (error) {
                console.log(" error Image deleted from cloudinary", error)
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully"});
    } catch (error) {
        console.log("error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {size:4}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    image: 1,
                }
            }
        ])

        res.json(products);
    } catch (error) {
        console.log("Error in getRecommendedProducts", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {

        const products = await Product.find({ category });
        res.json({products});

    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const toggleFeaturedProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();

            //update the cache(or redis we can say that right)
            await updatedFeaturedProductsCache();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

async function updatedFeaturedProductsCache() {
    try {
        // the Lean() method is used to return plain objects instead of full Mongoose documents. this can significantly improve performance
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_Products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in update cache function");
    }
}
