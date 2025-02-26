import User from "../Models/UserModel.js";

const userExists = async (email) =>{
    try {
        const user = await User.findOne({ email });
        if(user){
            console.log("User already exists")
        }
       return user !== null;
    } catch (error) {
        console.log("Error checking user existence:", error);
    }
}

export { userExists }; 

