const User = require('../users/user.entity');
const { Forbidden } = require('http-errors')

class AdminService{
   async unlock(id,user){
      
       if(user.role.toString() != 'admin' ){
           throw new Forbidden('Not authorized!');
       }
       let person = await User.findById(id).exec();
     
      
        return  await person.update({ islocked: false, failed_num:0 });
        
   }

   async lock(id,user){
       
        if(user.role.toString() != 'admin' ){
            throw new Forbidden('Not authorized!');
        }
        let person = await User.findById(id).exec();
        
    
    
        return  await person.updateOne({ islocked: true });
        
}
}
module.exports = new AdminService();