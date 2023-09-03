const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")
            if (!strongRegex.test(value)) {
                throw new Error("password must include upper")
            }
        }


    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is erorrrrrrrr")
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if (value <= 0) {
                throw new Error("age is erorrrrrrrr")
            }
        }

    },
    city: {
        type: String,
    },
    tokens : [
        {
            type:String,
            required: true
        }
    ],
    

})


// schema.virtual ('tasks' , {
//     ref: 'Task',
//     localField : "_id",
//     foreignField :"owner"
//  }) 

schema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"fatma500")
    user.tokens =user.tokens.concat(token)
    await user.save()
    return token
}


schema.methods.toJSON= function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
///////////////////////////////////////////////////////////////////////



schema.pre("save", async function () {
    const user = this
   
    if (user.isModified('password'))
        user.password = await bcryptjs.hash(user.password, 8)
})


schema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email:email })
    console.log(user)
    if (!user) {
        throw new Error(' unable to email')
    }
 
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
        throw new Error('unable to password')
    }
    // console.log(user)
    return user
}


const User = mongoose.model('User', schema)

module.exports = User