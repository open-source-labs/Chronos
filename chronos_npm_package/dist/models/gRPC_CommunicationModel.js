import mongoose from 'mongoose';
const { Schema } = mongoose;
const gRPC_CommunicationsSchema = new Schema({
    microservice: {
        type: String,
        required: true,
    },
    endpoint: {
        type: String,
        required: true,
    },
    request: {
        type: String,
        required: true,
    },
    responsestatus: {
        type: Number,
    },
    responsemessage: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    correlatingid: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('grpc_communications', gRPC_CommunicationsSchema);
//# sourceMappingURL=gRPC_CommunicationModel.js.map