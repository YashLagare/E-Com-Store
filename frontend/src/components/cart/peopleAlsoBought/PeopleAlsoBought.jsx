import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../../lib/axios.js";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner.jsx";
import ProductCard from "../../productCard/ProductCard";
const PeopleAlsoBought = () => {
   const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");
                setRecommendations(res.data);
            } catch (error) {
                toast.error("An error occurred while fetching recommendations")
            } finally{
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div className='mt-8'>
            <h3 className='text-2xl font-semibold text-emerald-400'>Make your cart even better😎</h3>
            <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3'>
                {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default PeopleAlsoBought