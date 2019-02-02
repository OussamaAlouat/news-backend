import mongoose from 'mongoose';
import {Schema} from 'mongoose';


const DocumentSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    archiveDate: {
        type:Date,
        default:null
    }
});
export default mongoose.model('Document', DocumentSchema);