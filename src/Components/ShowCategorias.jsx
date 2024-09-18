import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { alertaSuccess, alertaError, alertaWarning } from '../funciones'
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content' 



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
                                                <button onClick={() => deleteUsers(categories.id)} className='btn btn-danger' >
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
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign' /></span>
                                <input type='text' id='Nombre' className='form-control' placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign' /></span>
                                <input type='text' id='Foto' className='form-control' placeholder='Foto' value={image} onChange={(e) => setImage(e.target.value)} />
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


export default Categorias;