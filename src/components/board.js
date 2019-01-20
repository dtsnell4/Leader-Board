import React from 'react';
import {
  Table,
  Button,
  ModalFooter, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  FormGroup
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TableRows from './table'
import logo from '../images/pga_logo.png';

const BoardPresentational = (props) => {
  const {
    toggleModal,
    modalOpen,
    handleAdd,
    handleValidate,
    handleDelete,
    handleEdit,
    players,
    loadingPlayers,
    editing
  } = props;

  return (
    <div>
      <header className="py-4">
        <div className="container">
          <img src={logo} alt="PGA Logo" className="float-left mr-3" width="50" height="50" />
          <h3 className="text-white"> PGA Leader Board</h3>
        </div>
      </header>

      <div className="container" id="main-wrapper">
        <div id="board" className="mt-4">
          <div className="table-scroller">
            <Table striped className="table-fixed">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {(players.length > 0) &&
                  <TableRows players={players} handleDelete={handleDelete} handleEdit={handleEdit}/>
                }
                {!(players.length > 0) && loadingPlayers &&
                  <tr><td colSpan="3">Checking for saved players... <i className="fa fa-spinner fa-spin"></i></td></tr>
                }
                {!(players.length > 0) && !loadingPlayers &&
                  <tr><td colSpan="3">The are no players currently on the board.  Click "Add Players" below to begin.</td></tr>
                }
              </tbody>
            </Table>
          </div>

          <div className="text-center">
            <Button color="primary" onClick={toggleModal}>Add Players</Button>
            <Modal isOpen={modalOpen} toggle={toggleModal} className="add-player-modal">
              <Formik
                initialValues={{ 
                  firstName: editing ? editing.name.split(", ")[1] : '', 
                  lastName: editing ? editing.name.split(", ")[0] : '', 
                  score: editing ? editing.score : '' }}
                validate={values => {
                  return handleValidate(values);
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleAdd(values, setSubmitting, resetForm);
                }}
              >
                {({ isSubmitting }) => (
                <Form>
                  <ModalHeader toggle={toggleModal}>
                    {editing && "Update Score" || "Add Players"}
                  </ModalHeader>
                  <ModalBody >
                      <FormGroup>
                        <Field className="form-control" type="text" name="firstName" id="firstName" disabled ={editing} placeholder="First Name" />
                        <ErrorMessage name="firstName">{msg => <div className="invalid-input">{msg}</div>}</ErrorMessage>
                      </FormGroup>
                      <FormGroup>
                        <Field className="form-control" type="text" name="lastName" id="lastName" disabled ={editing} placeholder="Last Name" />
                        <ErrorMessage name="lastName">{msg => <div className="invalid-input">{msg}</div>}</ErrorMessage>
                      </FormGroup>
                      <FormGroup>
                        <Field className="form-control" type="number" name="score" id="score" placeholder="Score" />
                        <ErrorMessage name="score">{msg => <div className="invalid-input">{msg}</div>}</ErrorMessage>
                      </FormGroup>
                  </ModalBody>
                  <ModalFooter className="justify-content-center">
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>{' '}
                    <Button color="primary" type="submit" disabled={isSubmitting}>{editing && "Update" || "Add"}</Button>
                  </ModalFooter>
                 </Form>
                )}
              </Formik>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPresentational;
