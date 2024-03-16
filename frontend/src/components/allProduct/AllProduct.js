import React from 'react';
import axios from 'axios';
import { CiCircleRemove } from "react-icons/ci";
import Swal from 'sweetalert2'
import { useProductContext } from '../../context/productContext';

function AllProduct({ products }) {

  const { addProduct } = useProductContext();
  const handleEdit = (product) => {
    addProduct(product);
  };

  const deleteProduct = async (id) => {
    // Ask for confirmation using SweetAlert
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:4000/product/delete/${id}`);
        console.log(response.data);
      
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        ).then(() => {

          window.location.reload();
        });
      } catch (error) {
        console.error('Error deleting product:', error);

        Swal.fire(
          'Error!',
          'Failed to delete the product.',
          'error'
        );
      }
    }
  }
  
  return (
    <div>
      <h2 className='p-3'>Products</h2>
      <table className="table p-3">
  <thead>
    <tr>
    <th scope="col" style={{ display: 'none' }}>id</th>
      <th scope="col">Name of Product</th>
      <th scope="col">Merchant Email</th>
      <th scope="col">store</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    
    {products.map((product, index) => (
    <tr key={index}>
      <td style={{ display: 'none' }}>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.mEmail}</td>
      <td>{product.store}</td>
      <td><button type="button" className="btn btn-success" onClick={() => handleEdit({
        id: product._id,
      name: product.name,
      mEmail: product.mEmail,
      store: product.store
    })}>edit</button></td>
      <td><CiCircleRemove style={{ color: 'red' , cursor: 'pointer',fontSize: '30px' }} onClick={() => deleteProduct(product._id)}/></td>
    </tr>
  ))}
    
  </tbody>
</table>
    </div>
  );
}

export default AllProduct;

