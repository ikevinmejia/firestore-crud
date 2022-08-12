import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../Firebase/firebaseConfig'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const Show = () => {
  // 1. Configuración de hooks
  const [products, setProducts] = useState([])

  // 2. DB de firestore
  const productsCollection = collection(db, 'products')

  // 3. Mostrar TODOS
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    // console.log(data.docs);
    setProducts(
      data.docs.map((doc)=> ({...doc.data(), id:doc.id}))
    )

    console.log(products);
  }
  // 4. Eliminar TODOS
  const deleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc)
    getProducts()
  }

  // 5. Confirmación sweet alert
  const confirmDelete = (id) => {
    MySwal.fire({
      title: 'Remove the product?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          // función eliminar
          deleteProduct(id)
          Swal.fire(
            'Deleted',
            'Your file has been deleted',
            'success'
          )
        }
      })
  }

  // 6. useEffect
  useEffect(() => {
    getProducts()
  }, [])
  // 7. Renderizar


  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='d-grid gap-2'>
            <Link to={'/create' } className='btn btn-secondary mt-2 mb-2' >Create</Link>
          </div>

          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pen"></i></Link>
                      <button onClick={() => { confirmDelete(product.id) } } className='btn btn-danger' ><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}