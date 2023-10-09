"use client"
import Header from './components/Header'
import React, { useState, useEffect } from 'react';
export default function Home() {
  useEffect(() => {

    const fetchData = async()=>{

      const response = await fetch('/api/product');
      let rjson = await response.json();
      setLists(rjson.products)

    }
    fetchData();


  }, []);
  const [products, setProducts] = useState({});
  const [lists, setLists] = useState([]);
  const [alert, setAlert] = useState('');
  const [dropdown, setDropdown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingaction, setLoadingaction] = useState(false);
  const handleOnChange = (e)=>{
 // Add the new product to the list
    setProducts({...products, [e.target.name]: e.target.value});
   
  }
  const handleAddProduct = (e) => {
  e.preventDefault()
  const url = '/api/product'; // Replace with your API endpoint URL

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Set the appropriate content type
    // You may need to include additional headers, such as authorization tokens
  },
  body: JSON.stringify(products), // Convert the data to JSON format
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  })
  .then((responseData) => {
    // Handle the successful response here
    // console.log('Response data:', responseData);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
  
  setTimeout(() => {
    setAlert('')
  }, 1000);
  setAlert("Your Product Added Succefully")
  setProducts({})
  };
  const handleEdit = async(e)=>{
    if(!loading){
      setLoading(true);
    const response = await fetch('/api/search?query=' + e.target.value);
      let rjson = await response.json();
      setLoading(false)
      setDropdown(rjson.products)
      if(e.target.value === ''){
        setDropdown([])
      }
    }
  }
  const buttonAction = async(action, productname, initialQty)=>{
    //Change IN a Lists 
    let index = lists.findIndex((item)=> item.productname == productname)
    let newProducts = JSON.parse(JSON.stringify(lists));
    if(action == "plus"){
      newProducts[index].quantity = parseInt(initialQty) + 1;
    } 
    else{
      newProducts[index].quantity = parseInt(initialQty) - 1;
    }
    setLists(newProducts);
    //Change In a Dropdown
    let indexdrop = dropdown.findIndex((item)=> item.productname == productname)
    let newDropdown = JSON.parse(JSON.stringify(dropdown));
    if(action == "plus"){
      newDropdown[indexdrop].quantity = parseInt(initialQty) + 1;
      setAlert("Product Added Succesfully")
      setTimeout(() => {
        setAlert("")
      }, 1000);
    } 
    else{
      newDropdown[indexdrop].quantity = parseInt(initialQty) - 1;
      setAlert("product Deleted Succesfully")
      setTimeout(() => {
        setAlert("")
      }, 1000);
    }
    setDropdown(newDropdown)
    setLists(newProducts);
     setLoadingaction(true);  
     const url = '/api/update'; // Replace with your API endpoint URL
   
   let response = await fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json', // Set the appropriate content type
       // You may need to include additional headers, such as authorization tokens
     },
     body: JSON.stringify({action, productname, initialQty}), // Convert the data to JSON format
   })
   let r = await response.json();
   setLoadingaction(false)
   console.log(r);
  }
  return (
    <>
   <Header/>


    <div className="container mx-auto my-4">
      <div className='text-2xl text-green-800 text-center'>{alert}</div>
      {/* <!-- Search Container --> */}
        <div className="flex items-center space-x-4 mb-4 w-[70%] mx-auto">
            {/* <!-- Search Input --> */}
            <input onChange={handleEdit} type="text" id="search-input" className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Search..."/>
            
            {/* <!-- Filter Dropdown --> */}
            <select id="filter-select" className="px-4 py-2 border rounded focus:outline-none focus:border-blue-500">
                <option value="all">All</option>
                
            </select>
         </div>
         <div className="dropdown container w-[70%] mx-auto">
        {loading &&  <div className="max-w-sm mx-auto my-8">
        <svg className="loading-bar h-10 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 20">
            <rect x="0" y="0" width="0" height="15" rx="10" ry="10">
                <animate attributeName="width" from="0" to="200" dur="2s" repeatCount="indefinite" />
            </rect>
        </svg>
    </div>}
         {dropdown.map((item)=>{
          return <div key={item.productname} className="flex justify-between items-center p-2 border-b-2">
            <div><span className='font-bold'>{item.productname}</span> available Quantity {item.quantity} for (₹{item.price})</div>
            <div className="flex">
            <button disabled={loadingaction} onClick={()=>{buttonAction("plus", item.productname, item.quantity)}}  className="bg-blue-500 disabled:bg-blue-200 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-full">
                   +
                </button>
              <span className='mx-2'>{item.quantity}</span>
              <button disabled={loadingaction}  onClick={()=>{buttonAction("minus", item.productname, item.quantity)}} className="bg-blue-500 disabled:bg-blue-200  hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-full">
                   -
                </button>
            </div>
          </div>
         })}
         </div>
       
         <h1 className='my-2 text-2xl font-bold'>Add Product</h1>
      {/* Product Form */}
      <div>
        <label htmlFor="product-name" className="block">
          Product Name
        </label>
        <input
          type="text"
          name='productname'
          id="product-name"
          onChange={handleOnChange}
          value={products?.productname || ''}
          className="border input rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />

        <label htmlFor="product-price" className="block mt-2">
          Price
        </label>
        <input
          type="number"
          name='price'
          id="product-price"
          onChange={handleOnChange}
          value={products?.price || ''}
          className="border input rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />
        <label htmlFor="product-price" className="block mt-2">
          Quantity
        </label>
        <input
          type="number"
          name='quantity'
          id="product-price"
          onChange={handleOnChange}
          value={products?.quantity || ''}
          className="border input rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        />

        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {/* Product List (Table) */}
      <div>
        <h2 className="text-2xl font-semibold mt-8">Product List</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Product Name</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((product) => {return <tr key={product.productname}>
                <td className="border px-4 py-2">{product.productname}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">₹{product.price}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  
    </>
  )
}
