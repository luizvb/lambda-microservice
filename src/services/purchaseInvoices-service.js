const purchaseInvoicesRepository = require('../repositories/purchaseInvoices-repository')
const moment = require('moment');

class PurchaseInvoicesService {

    constructor() {        
    }
    
    async groupbyPurchase(customerId,data,days,tela,filter){
        let result = [];
        let result2 = await purchaseInvoicesRepository.groupbyPurchaseMonthItemPrice(customerId,data,filter)
        switch(tela){
            case "dash":
                    if (days > 31) {
                        result = await purchaseInvoicesRepository.groupbyPurchaseMonth(customerId,data)
                        result.forEach(item => {                
                            item._id = moment().month(item._id-1).locale('pt-br').format("MMMM");
                        });
                        }
            
                    if (days < 31) {
                        result = await purchaseInvoicesRepository.groupbyPurchaseWeek(customerId,data)
                        result.forEach(item => {                
                            item._id = `Semana ${item._id}`
                        });
                    }
            
                    if (days < 8) {
                        result = await purchaseInvoicesRepository.groupbyPurchaseDay(customerId,data)
                        result.forEach(item => {                
                            item._id = `Dia ${item._id}`
                        });
                    }
            break;

            case "itemFullDash":
                    if (days > 31) {
                        result = await purchaseInvoicesRepository.groupbyPurchaseMonthItem(customerId,data,filter)                                                
                        result.forEach(item => {                
                            item._id = moment().month(item._id).locale('pt-br').format("MMMM");                
                        });
                    }                      
                    if (days < 31) {
                        result = await purchaseInvoicesRepository.groupbyPurchaseWeekItem(customerId,data,filter)
                        result.forEach(item => {                
                            item._id = `Semana ${item._id}`
                        });
                    }        
                    if (days < 8) {
                        result = await purchaseInvoicesRepository.groupbyPurchaseDayItem(customerId,data,filter)
                        result.forEach(item => {                
                            item._id = `Dia ${item._id}`
                        });
                    }
            break;    
            
            case "meta":
                    result = await purchaseInvoicesRepository.groupbyPurchaseMonth(customerId,data)
                    result.forEach(item => {                
                        item._id = moment().month(item._id).locale('pt-br').format("MMMM");                
                    });
            break;
        }                
        return {result,result2}
    }
    
    async groupbyCategory(customerId,data,tela,category){
       let result = [];        
       switch(tela) {
            case 'dash':                
                result = await purchaseInvoicesRepository.groupbyCategoryTop(customerId,data)
            break;
            
            case 'category':
                result = await purchaseInvoicesRepository.groupbyCategory(customerId,data)
            break;
            
            case 'subCategory':
                result = await purchaseInvoicesRepository.groupbyCategorySub(customerId,data,category)
            break;

            case 'categorization':            
                result = await purchaseInvoicesRepository.groupbyCategoryFilter(customerId,data,category)            
            break;
       }
        return result
    }

    async groupbySupplier(customerId,data,tela,filter){
        let result = [];
        switch(tela){
            case "dash":
            result = await purchaseInvoicesRepository.groupbySupplierTop(customerId,data)
            break;

            case "itemFullDash":
            result = await purchaseInvoicesRepository.groupbySupplier(customerId,data,filter)
            break;

        }
        return result
    }

    async groupbyItem(customerId,data,tela,category,days){
        let result = [];        
        switch(tela){
            case 'dash':
                result = await purchaseInvoicesRepository.groupbyItemTop(customerId,data)
            break;
            case 'itemCategory':                
                result = await purchaseInvoicesRepository.groupbyItemCategory(customerId,data,category)
            break;                
            case 'itemSubCategory':                
                result = await purchaseInvoicesRepository.groupbyItemCategory(customerId,data,category)
            break;                                                     
            case 'categorization':                
                result = await purchaseInvoicesRepository.groupbyItemCategorization(customerId,data,category)
            break;                                                                
        }                   
1
        return result
    }

    async groupbyUnit(customerId,data,tela,filter,days){        
        let result = await purchaseInvoicesRepository.groupbyItemUnit(customerId,data,filter)        
        let result2 = await purchaseInvoicesRepository.TotalItemUnit(customerId,data,filter)
        return {result,result2}
    }    

    async totalPurchase(customerId,data,tela){                
        let result = [];

        switch(tela){
            case 'dash':                
                 result = await purchaseInvoicesRepository.totalPurchase(customerId,data)
            break;
            case 'meta':                
                result = await purchaseInvoicesRepository.groupbyPurchaseMonthMeta(customerId)
            break;
        }
        return result        
    }   
    
    async countItem(customerId,data){
        let result = await purchaseInvoicesRepository.countItem(customerId,data)
        return result
    }  

    async countNFe(customerId,data,tela,filter){        
        let result = [];
        switch(tela){
            case "dash":
                result = await purchaseInvoicesRepository.countNFe(customerId,data)
            break;
            case "itemFullDash":
                result = await purchaseInvoicesRepository.countNFeItem(customerId,data,filter)            
            break;
        }        
        return result
    } 

    async countSupplier(customerId,data,tela,filter){        
        let result = [];
        switch(tela){
            case "dash":
                result = await purchaseInvoicesRepository.countSupplier(customerId,data)
            break;
            case "itemFullDash":
                result = await purchaseInvoicesRepository.countSupplierItem(customerId,data,filter)
            break;
        }
        
        return result
    } 
    
    async informationCliente(customerId,data,tela,filter){
        
    }

}

module.exports = new PurchaseInvoicesService();