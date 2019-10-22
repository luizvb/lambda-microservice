const mongoose = require("../infrastructure/mongodb/client");
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    
    "cnpj": { 
        type: String,
        required:true    
    },
    "name": {
        type: String,
        required:true    
    },
    "certificate": { 
        type: String,
        required:true    
    },
    "password": {
        type: String,
        required:true    
    },
    "uf": {
        type: String,
        default:'35'   
    },
    "isMovedToSecureBucket": {
        type: Boolean,
        required:true    
    }
})

const userSchema = new Schema({
    
    "userId": { // cnpj
        type: String,
        required:true    
    },
    "profileId": {
        type: String,
        required:true    
    }
})


const customerSchema = new Schema({
    
    "cnpj": { // cnpj
        type: String,
        required:true    
    },
    "companyName": { //razaoSocial
        type: String,
        required:true  
    },
    "email": { //email
        type: String,
        required:true  
    },
    "stateRegistration": { // inscrição estadual
        type: String,
        required:true    
    },
    "tradingName": { // nome fantasia
        type: String,
        required:true    
    },
    "imageUrl": {
        type: String,    
    },
    "address": {
        type: String, 
        required:true    
    },
    "addressDetail": {
        type: String,    
    },
    "district": {
        type: String,
        required:true     
    },
    "city": {
        type: String, 
        required:true    
    },
    "state": {
        type: String, 
        required:true    
    },
    "country": {
        type: String,
        required:true    
    },
    "zipCode": {
        type: String,
        required:true   
    },
    "phone": {
       type: [String],
       required: true
    },    
    "mobile": [String],
    "contactName": {
        type: String,
        required:true    
    },
    "listOfCnaeCode": [
        String
    ],    
    "listOfCertificates": [
        certificateSchema
    ],
    "lifOfUsers" :[
        userSchema
    ],
    "pageStatus" :{
        type: Array,
        default: [
            {
                firstStep: true,
                secondStep:false,
                thirdStep: false,
                fourthStep:false,
                fifthStep:false,
                sixStep:false
            }
        ]
    },    
    "cnpjWs": {
        type: Object,
        required:true    
    },
    "paymentData": {
        type: Object,
        required:true    
    }
});


module.exports = mongoose.models.Customers || mongoose.model("Customers", customerSchema);