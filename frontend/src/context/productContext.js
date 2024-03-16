import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState({});

  const addProduct = (product) => {
    setProduct({...product, product});
  };

  // You can define other functions to manipulate product data here

  return (
    <ProductContext.Provider value={{ product, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
