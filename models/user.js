const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    name:String,
    email:String,
    passwordMatch:String,
    verified:{
        type:Boolean,
        default:false
    }

})

userSchema.set('toJSON',{

    //document hace refencia a esquema,returnObject es lo que estoy solicitando
    transformStream:(document, returnObject)=>{
        returnObject.id = returnObject._id.toString();

        delete returnObject._id;
        delete returnObject.__v;
        //se puede comentar para encriptar//
        delete returnObject.passwordHash;
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;