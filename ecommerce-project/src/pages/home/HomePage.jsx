import axios from 'axios';
import { useEffect,useState } from 'react';
import { useSearchParams } from 'react-router';
import './HomePage.css';
import { Header } from '../../components/Header';
import { ProductGrid } from './ProductGrid';

export function HomePage({cart,loadCart}) {
   
    const [products,setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(()=>{
    const getHomeData = async() => {
        if(search){
            const response =  await axios.get(`/api/products?search=${search}`)
            setProducts(response.data)
        }else{
            const response =  await axios.get('/api/products')
            setProducts(response.data)
        }
    };
    
    getHomeData();
    },[search]) 

   
    return (
        <>

            <title>Ecommerce-project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <Header  cart={cart}/>

            <div className="home-page">
                <ProductGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    );
}