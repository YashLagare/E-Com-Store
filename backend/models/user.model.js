import bcrypt from "bcryptjs";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6,"Password must be at least 6 characters long"]
    },
    cartItems:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
        },
    ],
    role: {
        type:String,
        enum:["customer", "admin"],
        default: "customer"

    },
    //createdAt, updatedAt
},
{
    timestamps: true
}
);


//yash 123456 => hashing password(random values etc..)
//per-save hook to hash password before saving to database
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); // here we hash the password
        next()
    } catch (error) {
        next(error)
    }
});
//for example, if password is yash123456 but they entered  yash79461 that time it will show  invalid credentials
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);


export default User;