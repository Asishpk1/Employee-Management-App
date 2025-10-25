import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"


//API call for Adding Employees
export const addEmployeeAPI = async(reqBody)=>{
   return await commonAPI("POST",`${SERVER_URL}/add`,reqBody)
}

//API call for Getting all Employees
export const getAllEmployeesAPI = async()=>{
   return await commonAPI("GET",`${SERVER_URL}/get/employees`,{})
}

//API call for Updating Employees
export const editEmployeeAPI = async(id,reqBody)=>{
   return await commonAPI("PUT",`${SERVER_URL}/edit/employee/${id}`,reqBody)
}

//API call for Deleting Employees
export const deletEmployeeAPI = async(id)=>{
   return await commonAPI("DELETE",`${SERVER_URL}/delete/employee/${id}`,{})
}