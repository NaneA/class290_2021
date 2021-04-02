const User = require('../users/user.entity');
const { Unauthorized, Locked } = require('http-errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Max_number_of_failed_login} = require('../commons/util');
// locking user if fails to successfully login after 3 times
class AuthService {
    async validate(username, password) {
        const user = await User.findOne({ username });
        if(user.failed_num >= Max_number_of_failed_login){
            await user.updateOne({ islocked: true } );
            throw new Locked('The user is locked!');
        }
        
        if (!user || !bcrypt.compareSync(password, user.password)) {
            await user.updateOne({ failed_num: user.failed_num+1 } );
            throw new Unauthorized();
        }
       
        await user.updateOne({ failed_num: 0 } );
        return user;
    }

    async login(username, password) {
        
        const user = await this.validate(username, password);
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
       
        return token;
         
    }

    validateToken(token) {
        const obj = jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: false
        })

        return { userId: obj.userId, username: obj.username };
    }
}

module.exports = new AuthService();