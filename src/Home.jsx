import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './App.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast} from 'react-toastify'
import { addEmployeeAPI, deletEmployeeAPI, getAllEmployeesAPI } from '../Service/allAPI';
import Edit from './Edit';

const Home = () => {

    const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const [searchKey,setSearchKey] = useState([])

      const [editResponse,setEditResponse] = useState({})
      
      const [employeeDetails,setEmployeeDeatils] = useState({name:"",email:"",position:"",department:"",salary:""})
    //   console.log(employeeDetails);

      const [allEmployees,setAllEmployees] = useState({})
      console.log(allEmployees);
      
    
      const addEmployee = async () =>{
        const{name,email,position,department,salary} = employeeDetails
        if(name && email && position && department && salary){
          try{
            const result = await addEmployeeAPI(employeeDetails)
            console.log(result);
            if(result.status == 200){
                setEmployeeDeatils({name:"",email:"",position:"",department:"",salary:""})
                toast.success(`${result.data.name} successfully added to Employee list`)
                handleClose()
                getAllEmployees()
            }
            if(result.status == 406){
                toast.warning(`${result.response.data}`)
            }
            if(result.status == 401){
                console.log(result.response.data);
                
            }
            
          }
          catch(err){
            console.log(err);
            
          }
        }
        else{
          toast.error("Enter all Fields")
        }
      }

      useEffect(() => {
        getAllEmployees()
      }, [editResponse,searchKey])
      

      const getAllEmployees = async () =>{
        try{
            const result = await getAllEmployeesAPI(searchKey)
            console.log(result);
            if(result.status == 200){
                setAllEmployees(result.data)
            }
            if(result.status == 401){
                console.log(result.response.data);
                
            }
            
        }
        catch(err){
            console.log(err);
            
        }
      }

      const deleteEmployee = async (id) =>{
        try{
            const result = await deletEmployeeAPI(id)
            console.log(result);
            if(result.status == 200){
                getAllEmployees()
                toast.success(`${result.data.name} deleted Succesfully`)
            }
            
        }
        catch(err){
            console.log(err);
            
        }
      }
  return (
    <>
     <div className='p-5'>
      <h1 className='fw-bolder text-center'>Employee Mangement System</h1>
      <div className='d-flex gap-3 align-items-center justify-content-between mt-5'>
        <div className='d-flex gap-3 align-items-center'>
          <h5 className='m-0'>Add New Employee</h5>
          <button onClick={handleShow} className='btn btn-sm'><i className='fa-solid fa-plus'></i></button>
          <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <input onChange={(e)=>{setEmployeeDeatils({...employeeDetails,name:e.target.value})}} type="text" placeholder='Name' className='form-control mb-3'/>
         <input onChange={(e)=>{setEmployeeDeatils({...employeeDetails,email:e.target.value})}} type="email" placeholder='Email' className='form-control mb-3'/>
         <input onChange={(e)=>{setEmployeeDeatils({...employeeDetails,position:e.target.value})}} type="text" placeholder='Position' className='form-control mb-3'/>
         <input onChange={(e)=>{setEmployeeDeatils({...employeeDetails,department:e.target.value})}} type="text" placeholder='Department' className='form-control mb-3'/>
         <input onChange={(e)=>{setEmployeeDeatils({...employeeDetails,salary:e.target.value})}} type="text" placeholder='Salary' className='form-control'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={addEmployee} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
        </div>
        <input onChange={(e)=>setSearchKey(e.target.value)} className='form-control' type="text" placeholder='Search by name,position,department'/>
      </div>

      <div className='mt-5'>
        {allEmployees.length>0?
        <Table responsive="sm">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allEmployees.map((employee,Index)=>(
            <tr key={Index}>
            <td>{Index+1}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.position}</td>
            <td>{employee.department}</td>
            <td>{employee.salary}</td>
            <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
            <td>
                <Edit employee={employee} setEditResponse={setEditResponse}/>
                <button onClick={()=>{deleteEmployee(employee._id)}} className='btn btn-sm'><i className='fa-solid fa-trash'></i></button>
            </td>
          </tr>
          ))}
          
        </tbody>
      </Table>
      : <h1>No Employees Found</h1> }
      </div>
    </div>
    </>
  )
}

export default Home