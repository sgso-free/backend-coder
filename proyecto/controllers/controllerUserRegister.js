const userAdmin = true;
import UserFactory from '../models/dao/users/User.factory.js' 
const users = UserFactory.getUserDao()
 
import sendMail from '../mail.js'
  
//recibe y agrega un usuario, 
//y devuelve su id asignado
const nuevoUsuario = async (req, res) => {
 
    const { username, password, name, age, address, phone } = req.body
     
    const data = {
        username:username,
        password:password,
        name: name,
        age: age,
        address:address,
        phone:phone
    }
    
    const usersFind = await users.getByUserName(username) 

    if (usersFind) { 
        res.render('error',{message: 'Usuario ya registrado.'})
    } else {
 
        try {
            if(!req.files) { 
                data.message = "Avatar not upload"
                res.render('register',data)
            } else {
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let avatar = req.files.avatar;
                
                //Use the mv() method to place the file in the upload directory (i.e. "uploads")
                avatar.mv('./public/uploads/' + username + ".jpg");
     
                await users.save(data) 
                const sm = new sendMail()
                sm.senMail("Nuevo Registro",JSON.stringify(data))
        
                res.render('login') 
            }
          } catch (error) { 
              data.message = error.message
              res.render('register',data)
          }

    }
    
}

const dashboardUsuario = async (req, res) => {  
    res.render('register') 
} 

export default {dashboardUsuario,nuevoUsuario}
