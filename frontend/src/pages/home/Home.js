import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Style from './home.module.css'

import AddProduct from '../../components/addProduct/AddProduct';
import AllProduct from '../../components/allProduct/AllProduct';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/product/list');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7 bg-primary-subtle m-5 rounded">
           <AllProduct products={products} />
        </div>
        <div className="col-md-3 bg-primary-subtle m-5 rounded">
          <AddProduct/>
        </div>
      </div>
    </div>
  );
}
