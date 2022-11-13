import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from 'react-bootstrap';
import axios from "axios";

const Book = () => {
  const [backendData, setBackendData] = useState([{}]);
  const [RowData, SetRowData] = useState([])
  const [ViewShow, SetViewShow] = useState(false)
  const handleViewShow = () => { SetViewShow(true) }
  const hanldeViewClose = () => { SetViewShow(false) }

  // Add models
  const [ViewPost, SetPostShow] = useState(false)
  const handlePostShow = () => { SetPostShow(true) }
  const hanldePostClose = () => { SetPostShow(false) }

  // Edit models
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }

  // Delete models
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }

    const [titre, setTitre] = useState("")
    const [auteur, setAuteur] = useState("")
    const [prix, setPrix] = useState("")
    const [nombre_de_pages, setNombreDePages] = useState("")
    const [categorie, setCategorie] = useState("")
    const [stocked, setStock] = useState("")
    const [annee, setAnnee] = useState("")

    const [Delete,setDelete] = useState(false)

    const [ISBN,setISBN] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/books/getallbooks")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    const url = 'http://localhost:5000/api/books/createbook'
    const book = { titre, auteur, prix, nombre_de_pages, categorie, stocked, annee }
    axios.post(url, book)
        .then(response => {
            const result = response.data;
            const { status, message } = result;
            if (status !== 'SUCCESS') {
                alert(message, status)
                window.location.reload()
            }
            else {
                alert(message)
                window.location.reload()
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const handleEdit = () =>{
  const url = `http://localhost:5000/api/books/updateBook/${ISBN}`
  const book = { titre, auteur, prix, nombre_de_pages, categorie, stocked, annee }
  axios.put(url, book)
      .then(response => {
          const result = response.data;
          const { status, message } = result;
          if (status !== 'SUCCESS') {
              alert(message, status)
          }
          else {
              alert(message)
              window.location.reload()
          }
      })
      .catch(err => {
          console.log(err)
      })
}

const handleDelete = () =>{
  const url = `http://localhost:5000/api/books/deleteBook/${ISBN}`
  axios.delete(url)
      .then(response => {
          const result = response.data;
          const { status, message } = result;
          if (status !== 'SUCCESS') {
              alert(message, status)
          }
          else {
              alert(message)
              window.location.reload()
          }
      })
      .catch(err => {
          console.log(err)
      })
}

console.log(ViewShow, RowData)

  return (
    <div>
      <div className="row">
        <div className="mt-5 mb-4">
          <Button variant="primary" onClick={() => { handlePostShow() }}>
            <i className="fa fa-plu"></i>
            Add New Book
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Prix</th>
                <th>Nombres de pages</th>
                <th>Categorie</th>
                <th>Année</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {backendData.map((item) => (
                <tr key={item._id}>
                  <td>{item.ISBN}</td>
                  <td>{item.titre}</td>
                  <td>{item.auteur}</td>
                  <td>{item.prix}</td>
                  <td>{item.nombre_de_pages}</td>
                  <td>{item.categorie}</td>
                  <td>{item.annee}</td>
                  <td>{item.stocked}</td>
                  <td style={{ minWidth: 190 }}>
                  <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>View</Button>|
                  <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setISBN(item.ISBN))}}>Edit</Button>|
                  <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setISBN(item.ISBN), setDelete(true))}}>Delete</Button>|
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Book Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Titre</label>
                                <input type="text" className='form-control' value={RowData.titre} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Auteur</label>
                                <input type="email" className='form-control' value={RowData.auteur} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                            <label>Prix</label>
                                <input type="text" className='form-control' value={RowData.prix} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Nombre de pages</label>
                                <input type="text" className='form-control' value={RowData.nombre_de_pages} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Categorie</label>
                                <input type="text" className='form-control' value={RowData.categorie} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Stock</label> 
                                <input type="text" className='form-control' value={RowData.stocked} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Annee</label>
                                <input type="text" className='form-control' value={RowData.annee} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Book</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setTitre(e.target.value)} placeholder="Please enter title" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setAuteur(e.target.value)} placeholder="Please enter author" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setPrix(e.target.value)} placeholder="Please enter price" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setNombreDePages(e.target.value)} placeholder="Please enter nbp" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setCategorie(e.target.value)} placeholder="Please enter categorie" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setStock(e.target.value)} placeholder="Please enter stock" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setAnnee(e.target.value)} placeholder="Please enter year" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmit}>Add Book</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                </div>

            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Titre</label>
                                <input type="text" className='form-control' onChange={(e) => setTitre(e.target.value)} placeholder="Please enter title" defaultValue={RowData.titre}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Auteur</label>
                                <input type="email" className='form-control' onChange={(e) => setAuteur(e.target.value)} placeholder="Please enter author" defaultValue={RowData.auteur} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Prix</label>
                                <input type="text" className='form-control' onChange={(e) => setPrix(e.target.value)} placeholder="Please enter price" defaultValue={RowData.prix}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Nombre de pages</label>
                                <input type="text" className='form-control' onChange={(e) => setNombreDePages(e.target.value)} placeholder="Please enter nombre de pages" defaultValue={RowData.nombre_de_pages}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Categorie</label>
                                <input type="text" className='form-control' onChange={(e) => setCategorie(e.target.value)} placeholder="Please enter category" defaultValue={RowData.categorie}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Stock</label>
                                <input type="text" className='form-control' onChange={(e) => setStock(e.target.value)} placeholder="Please enter stock" defaultValue={RowData.stocked}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Annee</label>
                                <input type="text" className='form-control' onChange={(e) => setAnnee(e.target.value)} placeholder="Please enter annee" defaultValue={RowData.annee}/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Book</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    </div>
  );
};

export default Book;
