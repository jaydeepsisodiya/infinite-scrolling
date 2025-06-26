import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [products,setProducts]=useState([]);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const fetchProducts=async()=>{
     setLoading(true);
     try{
    const response=await fetch(`http://dummyjson.com/products?limit=${page*10}`);
    const data=await response.json();
    setProducts(data);
  
    setPage(page+1);
     }catch(error){
  console.log("error fetching data :",error);
     }
     finally{
      setLoading(false)
     }
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  function mythrottle(fn, delay) {
    let lastTime = 0;
    return function (...args) {
        let now = Date.now();
        if (now - lastTime >= delay) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}
  const handleScroll=mythrottle(()=>{
    if(window.innerHeight+document.documentElement.scrollTop+500>document.documentElement.offsetHeight){
      fetchProducts()
    }
  },500)
  useEffect(()=>{
   window.addEventListener("scroll",handleScroll)
  },[handleScroll])
    console.log("ddd",products)
    const {products:allProducts}=products;
  return (
    <div className="App">
    <h1>Infinite Scrolling</h1>
    {
      allProducts?.length>0&&(
        <div className='products'>
          {
            allProducts?.map((prod)=>{
              return (
                <div className='products_single' key={prod.id}>
               <img src={prod.thumbnail} alt={prod.title}/>
               <span>{prod.title}</span>
                </div>
              )
            })
          }
        </div>
      )
    }
    {loading&&<p>Loading....</p>}
    </div>
  );
}

export default App;
