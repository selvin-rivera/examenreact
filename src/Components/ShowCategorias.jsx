import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { alertaSuccess, alertaError, alertaWarning } from '../funciones.js'
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content' 

const Categorias = () => {
    const [categories, setCategories] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operation, setOperation] = useState(1)

    const url = 'https://api.escuelajs.co/api/v1/categories'

    /**
     * Obtiene listado de productos desde la API
     */
    const getCategories = async () => {
        const response = await axios.get(url);
        setCategories(response.data)
    }

    useEffect(() => { 
        getCategories()
    })

    /**
     * Abre el modal con los atributos de la categoria, si se va a editar, se cargan los datos
     * @param {Number} operation - 1. Agregar, 2. Editar 
     * @param {Number} id - Identificador de la categoria
     * @param {String} name - nombre de la categoria
     *  @param {img} imagen - foto de la categoria
     */
    const openModal = (operation, id, name, image) => {
        setId('')
        setName('')
        setImage('')

        if (operation === 1) {
            setTitleModal('Registrar Categoria')
            setOperation(1)
        } else if(operation === 2) {
            setTitleModal('Editar Editar')
            setOperation(2)
            setId(id)
            setName(name)
            setImage(image)
        }
    }
    /**
     * Permite el uso de la API dependiendo el tipo de operación
     * 
     * @param {string} url - URL de la API a consumir
     * @param {string} metodo - Tipo de método a utilizar: POST, PUT, PATCH o DELETE
     * @param {JSON} parametros - Objeto JSON que se enviará a la API
     */
    const enviarSolicitud = async (url, metodo, parametros = {}) => {
        let obj = {
            method: metodo,
            url: url,
            data: parametros,
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        }

        await axios(obj).then(() => {
            let mensaje

            if (metodo === "POST") {
                mensaje = 'Se guardó la categoría'
            } else if (metodo === "PUT") {
                mensaje = 'Se editó la categoría'
            } else if (metodo === "DELETE") {
                mensaje = 'Se eliminó la categoría'
            }
            alertaSuccess(mensaje)
            document.getElementById('btnCerrarModal').click()
            getCategories()
        }).catch((error) => {
            alertaError(error.response.data.message)
        })
    }

    /**
     * Valida que cada uno de los campos del formulario no vayan vacíos
     */
    const validar = () => {
        let payload
        let metodo
        let urlAxios

        if (name === '') {
            alertaWarning('Nombre de la categoria en blanco', 'Nombre')
        } else {
            payload = {
                name: name,
                image:'https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg'
            }

            if (operation === 1) {
                metodo = 'POST'
                urlAxios = 'https://api.escuelajs.co/api/v1/categories/'
            } else {
                metodo = 'PUT'
                urlAxios = `https://api.escuelajs.co/api/v1/categories/${id}`
            }

            enviarSolicitud(urlAxios, metodo, payload)
        }
    }

    /**
     * Proceso para eliminar una categoria
     * 
     * @param {Number} id - Identificador de la categoria a eliminar 
     */
    const deleteCategories = (id) => {
        let urlDelete = `https://api.escuelajs.co/api/v1/categories/${id}`

        const MySwal = withReactContent(Swal)

        MySwal.fire({
            title: '¿Está seguro de eliminar la categoria?',
            icon: 'question',
            text: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                enviarSolicitud(urlDelete, 'DELETE')
            }
        }).catch((error) => {
            alertaError(error)
        })
    }

    return(
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalCategories">
                                <i className="fa-solid fa-circle-plus" /> Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col*-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Foto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    categories.map((categories, i) => (
                                        <tr key={categories.id}>
                                            <td>{i + 1}</td>
                                            <td>{categories.name}</td>
                                            <td><img src= {categories.image} alt='imagen'/></td>
                                            <td>
                                                <button onClick={() => openModal(2, categories.id, categories.name) } className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalCategories' >
                                                    <i className='fa-solid fa-edit' />
                                                </button>
                                                <button onClick={() => deleteCategories(categories.id)} className='btn btn-danger' >
                                                    <i className='fa-solid fa-trash' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id='modalCategories' className='modal fade' area-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{titleModal}</label>
                            <button className='btn-close' data-bs-dismiss='modal' aria-label='close' />
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id' />
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-user' /></span>
                                <input type='text' id='Nombre' className='form-control' placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-image' /></span>
                                <input type='text' id='Foto' className='form-control' placeholder='url' value={image} onChange={(e) => setImage(e.target.value)} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={() => validar()} className='btn btn-success'>
                                <i className='fa solid fa-floppy-disk' /> Guardar
                            </button>
                            <button id='cerrarModal' className='btn btn-danger' data-bs-dismiss='modal' > Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categorias;