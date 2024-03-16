import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Button, Form} from 'react-bootstrap'
import Style from './addProduct.module.css'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useProductContext } from '../../context/productContext';
import { set } from 'mongoose'
function AddProduct() {
    const { product }                       = useProductContext();
    const [productId, setProductId]         = useState('');
    const [productName, setProductName]     = useState('');
    const [merchantEmail, setMerchantEmail] = useState('');
    const [store, setStore]                 = useState('Beirut'); 
    const [editMode,setEditMode]            = useState(false);

    useEffect(() => {
        if (product && Object.keys(product).length !== 0) {
            setProductId(product.id || '');
            setProductName(product.name || '');
            setMerchantEmail(product.mEmail || '');
            setStore(product.store || 'Beirut');
            setEditMode(true);
        }
    }, [product]);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:4000/product/create', {
            name: productName,
            mEmail: merchantEmail,
            store: store
          });
      
          console.log(response.data);
         
          Swal.fire(
            'Success!',
            'The product has been added successfully.',
            'success'
          ).then(() => {
           
            window.location.reload();
          });
      
          setProductName('');
          setMerchantEmail('');
          setStore('Beirut');
        } catch (error) {
          console.error('Error adding product:', error);
        
          Swal.fire(
            'Error!',
            'Failed to add the product.',
            'error'
          );
        }
      };

      const handleEdit = async (event) => {
        event.preventDefault();
        try {
          const updatedProduct = { name: productName, mEmail: merchantEmail, store: store };
          const response = await axios.put(`http://localhost:4000/product/update/${productId}`, updatedProduct);
          console.log('Product updated:', response.data);
        
          Swal.fire(
            'Success!',
            'The product has been updated successfully.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error('Error updating product:', error);
          Swal.fire(
            'Error!',
            'Failed to update the product.',
            'error'
          );
        }
      };

    return (
        <div className='addProduct'>
            <h2 className='p-3'>{editMode ? 'Edit Product' : 'Add Product'}</h2>
            <Form onSubmit={editMode ? handleEdit : handleSubmit}  className='p-3'>
            <Form.Group className="mb-3" style={{display:'none'}} controlId="formProductId">
                    <Form.Label>Name of Product</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name of product"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label>Name of Product</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name of product"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMerchantEmail">
                    <Form.Label>Merchant Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={merchantEmail}
                        onChange={(e) => setMerchantEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStore">
                    <Form.Label>Store</Form.Label>
                    <Form.Control
                        as="select"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                    >
                        <option value="Beirut">Beirut</option>
                        <option value="Batroun">Batroun</option>
                        <option value="Jbeil">Jbeil</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {editMode ? 'edit' : 'submit'} 
                </Button>
            </Form>
        </div>
    );
}

export default AddProduct;