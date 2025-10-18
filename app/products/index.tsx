import {ScrollView, Text} from "react-native";
import {useEffect, useState} from "react";
import ProductCard from "@/components/products/card";

const Products: React.FC = () => {
    // init
    const BASE_URL = "https://valentinos-coffee.herokuapp.com"

    // states
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<any>(null)

    // effects
    useEffect(()=>{
        setLoading(true)
        fetch(`${BASE_URL}/products?limit=20`)
            .then(res=>res.json())
            .then(json=>{
                setData(json)
                setProducts(json.products)
            })
            .catch(err=>{
                console.error("Error fetching products:", err)
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [])
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    loading ? (
                        <Text>
                            Loading...
                        </Text>
                    ) : (
                        <>
                            {
                                products && products.length > 0 ? (
                                    products.map((product: any) => (
                                        <ProductCard key={product.id} item={product} />
                                    ))
                                ) : (
                                    <Text>
                                        No products available.
                                    </Text>
                                )
                            }
                        </>
                    )
                }
            </ScrollView>

        </>
    )
}

export default Products;
