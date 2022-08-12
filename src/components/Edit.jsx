import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../Firebase/firebaseConfig';

const Edit = () => {
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0);
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault();
        const product = doc(db, 'products', id)
        const data = {description: description, stock: stock}
        await updateDoc(product, data)
        navigate('/')
    }

    const getProductById = async (id) => {
        const product = await getDoc(doc(db, 'products', id))
        if (product.exists()) {

            setDescription(product.data().description)
            setStock(product.data().stock)
        } else {
            console.log('no existe');
        }
    }

    useEffect(() => {
        getProductById(id)
    }, [])



  return (
    <div className='container'>
    <div className='row'>
        <div className='col'>
            <h1>Edit Product</h1>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label htmlFor="" className='form-label'>Description</label>
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="" className='form-label'>Stock</label>
                    <input
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Update</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default Edit