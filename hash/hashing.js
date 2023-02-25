const bcrypt=require("bcryptjs")
const hashPassword=async(plainPassword)=>{
    try {
        const saltRound=10;
        const salt=await bcrypt.genSalt(saltRound);
        const hash=await bcrypt.hash(plainPassword,salt);
        return hash;
    } catch (error) {
        return error
    }
}

const hashValidator=async(plainPassword,hashedPassword)=>{
            try {
                const result=await bcrypt.compare(plainPassword,hashedPassword);
                return result;
            } catch (error) {
                return false;  
            }
}
module.exports.hashPassword=hashPassword;
module.exports.hashValidator=hashValidator;
