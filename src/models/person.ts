import mongoose from "mongoose";
// import UniqueValidator from "mongoose-unique-validator";
import { person } from "../types/person";

const { Schema } = mongoose;



const schema = new Schema({
    id: { 
        type: Schema.Types.UUID, 
        required: true, 
        unique: true,
        min: 5, 
    },
    name: {
        type: String,
        required: true,
        unique: true,
        min: 5,
    },
    phone: {
        type: String,
        required: false,
        unique: false,
        min: 6,  
    },
    street: {
        type: String,
        required: true,
        unique: false,
        min: 5,  
    },
    city: {
        type: String,
        required: true,
        unique: false,
        min: 5,  
    }
    
    
})

// schema.plugin(UniqueValidator); // this is to make sure that the id and name are unique
export default mongoose.model<person>("PersonSchema", schema); 