import mongoose from 'mongoose';
const { Schema } = mongoose;
const KafkaSchema = new Schema({
    time: {
        type: Date,
        default: Date.now(),
    },
    metric: {
        type: String,
    },
    value: {
        type: Number,
    },
    category: {
        type: String,
        default: '',
    },
});
// module.exports = mongoose.model('kafkametrics', KafkaSchema); // invalid format for TS files
const KafkaModel = mongoose.model('KafkaModel', KafkaSchema);
// Export the model
export default KafkaModel;
//# sourceMappingURL=KafkaModel.js.map