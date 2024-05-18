import axios from 'axios'

export const  addNewUser = (email, password, login) => {

    try{

        axios.post('192.168.0.1/add_new_user', [email, password, login])

    }catch {
        
    }
}