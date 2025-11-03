import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async() => {
    const totalUsers = await User.countDocuments();
    const totalProduct = await Product.countDocuments();

    const salesData = await Order.aggregate([
        {
            $group: {
                _id:null, // it groups all documents together
                totalSales: { $sum: 1},
                totalRevenue: { $sum: "$totalAmount" }
            }
        }
    ])

    const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue:0};

    return { 
        users: totalUsers,
        products: totalProduct,
        totalSales,
        totalRevenue
    };

};

export const getDailySalesData = async(startDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: 1},
                    revenue: { $sum: "$totalAmount" },
                },
            },
            { $sort: { _id:1}},
        ]);
    
        //examples of dailysalesData
        // [
        //     [
        //         {
        //             _id: "2022-01-01",
        //             sales: 10,
        //             revenue: 10000,
        //         },
        //     ]
        // ]
    
        const dateArray = getDateInRange(startDate, endDate);
        //if we write console.log(dateArray); => it will print the date eg- ['2025-2-2','2025-2-3',...]
    
        return dateArray.map(date => {
            const foundDate = dailySalesData.find(item => item._id === date);
    
            return {
                date,
                sales: foundDate?.sales || 0,
                revenue: foundDate?.revenue || 0,
            };
        });
    } catch (error) {
        throw error;
    }
};

function getDateInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString(). split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}