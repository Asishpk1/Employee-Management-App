import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editEmployeeAPI } from '../Service/allAPI';
import { data } from 'react-router-dom';

const Edit = ({ employee,setEditResponse }) => {
    console.log(employee);



    const [employeeDetails, setEmployeeDeatils] = useState({ name: employee.name, email: employee.email, position: employee.position, department: employee.department, salary: employee.salary })
    console.log(employeeDetails);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setEmployeeDeatils({name: employee.name, email: employee.email, position: employee.position, department: employee.department, salary: employee.salary })
        setShow(true);
    }

    const updateEmployee = async () =>{
        const{name,email,position,department,salary} = employeeDetails
        if(name && email && position && department && salary){
            try{
                const result = await editEmployeeAPI(employee._id,employeeDetails)
                console.log(result);
                if(result.status == 200){
                    handleClose()
                    setEditResponse(result,data)

                }
                
            }
            catch(err){
                console.log(err);
                
            }
        }
    }
    return (
        <>
            <button onClick={handleShow} className='btn btn-sm'><i className='fa-solid fa-pencil'></i></button> &nbsp;
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input value={employeeDetails.name} onChange={(e) => { setEmployeeDeatils({ ...employeeDetails, name: e.target.value }) }} type="text" placeholder='Name' className='form-control mb-3' />
                    <input value={employeeDetails.email} onChange={(e) => { setEmployeeDeatils({ ...employeeDetails, email: e.target.value }) }} type="email" placeholder='Email' className='form-control mb-3' />
                    <input value={employeeDetails.position} onChange={(e) => { setEmployeeDeatils({ ...employeeDetails, position: e.target.value }) }} type="text" placeholder='Position' className='form-control mb-3' />
                    <input value={employeeDetails.department} onChange={(e) => { setEmployeeDeatils({ ...employeeDetails, department: e.target.value }) }} type="text" placeholder='Department' className='form-control mb-3' />
                    <input value={employeeDetails.salary} onChange={(e) => { setEmployeeDeatils({ ...employeeDetails, salary: e.target.value }) }} type="text" placeholder='Salary' className='form-control' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={updateEmployee} variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit