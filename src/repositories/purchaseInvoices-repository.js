const purchaseInvoicesModel = require('../models/purchaseInvoices-model');
const procuctCategoryClientsModel = require('../models/productCategoryClients-model')

class PurchaseInvoicesRepository {


    async updateCategorization(customerId) {
      let clientCategories = await procuctCategoryClientsModel.find({customerId})
      let bulkPromises = []
      for(let cat of clientCategories) {
        var bulk = purchaseInvoicesModel.collection.initializeOrderedBulkOp();
        bulk.find({codigo_cliente: customerId, produto_nfe: cat.product_nfe}).update({'$set': {categoria: cat.category, subcategoria: cat.subcategory}});

        bulkPromises.push(bulk.execute())
      }
      
      let result = await Promise.all(bulkPromises)
    }

  //Tela inicial
    async groupbyPurchaseDay(customerId,data){
      return await purchaseInvoicesModel.aggregate(
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": {"$dayOfMonth":"$dataemissao"},
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto"                    
                  }
          },      
          {$match:
            {
              "data": {
                  "$gte":data
               },
               "client":customerId
            }                 
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values': {'$sum': '$values'}
                }              
            },                                                        
             {$sort: 
                 {
                  '_id': 1
                 }
              }
           ]
      )
    }     
    async groupbyPurchaseWeek(customerId,data){
      return await purchaseInvoicesModel.aggregate(
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": {"$week":"$dataemissao"},
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto"                    
                  }
          },      
          {$match:
            {
              "data": {
                  "$gte":data
               },
               "client":customerId
            }                 
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values': {'$sum': '$values'}
                }              
            },                                                        
             {$sort: 
                 {
                  '_id': 1
                 }
              }
           ]
      )
    }    
    async groupbyPurchaseMonth(customerId,data){
        return await purchaseInvoicesModel.aggregate(
          [                         
            {$project:
                    {
                    "totalAmount":1,
                    "label": {"$month":"$dataemissao"},
                    "client": "$codigo_cliente",
                    "data": "$dataemissao",
                    "values": "$valor_bruto"                    
                    }
            },      
            {$match:
              {
                "data": {
                    "$gte":data
                 },
                 "client":customerId
              }                 
             },             
              {$group: 
                  {
                    '_id': "$label",
                    'values': {'$sum': '$values'}
                  }              
              },                                                        
               {$sort: 
                   {
                    '_id': 1
                   }
                }
             ]
        )
    }    
    async groupbyCategoryTop(customerId,data){
      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$categoria",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto"                    
                  }
          },      
          {$match:
                {
                  "data": {
                      "$gte":data
                    },
                    "client":customerId
                }                   
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values': {'$sum': '$values'}
                }              
            },                                                        
             {$sort: 
                 {
                  'values': -1
                 },
              },
                {$limit: 5}              
           ]
      )
    }    
    async groupbySupplierTop(customerId,data){
        return await purchaseInvoicesModel.aggregate(            
          [                         
            {$project:
                    {
                    "totalAmount":1,
                    "label": "$nome_fornecedor",
                    "client": "$codigo_cliente",
                    "data": "$dataemissao",
                    "values": "$valor_bruto"                    
                    }
            },      
            {$match:
              {
                "data": {
                    "$gte":data
                 },
                 "client":customerId
              }                   
             },             
              {$group: 
                  {
                    '_id': "$label",
                    'values': {'$sum': '$values'}
                  }              
              },                                                        
               {$sort: 
                   {
                    'values': -1
                   }
                },
                {$limit:5}                                                         
             ]
          )
    }
    async groupbyItemTop(customerId,data){            
        return await purchaseInvoicesModel.aggregate(
          [                         
            {$project:
                    {
                    "totalAmount":1,
                    "label": "$produto_nfe",
                    "client": "$codigo_cliente",
                    "data": "$dataemissao",
                    "values": "$valor_bruto"                    
                    }
            },      
            {$match:
              {
                "data": {
                    "$gte":data
                 },
                 "client":customerId
            }                   
             },             
              {$group:
                  {
                    '_id': "$label",
                    'values': {'$sum': '$values'}
                  }              
              },                                                        
               {$sort: 
                   {
                    'values': -1
                   }
                },
                {$limit:5}                                                       
             ]
    )
    }
    async totalPurchase(customerId,data){       
  
      return await purchaseInvoicesModel.aggregate(
          [                         
            {'$project':
                    {
                    "totalAmount":1,
                    "data": "$dataemissao",
                    "client": "$codigo_cliente",
                    "values": "$valor_bruto"                    
                    }
            },      
            {'$match':
                {
                    "data": {
                        "$gte":data
                     },
                     "client":customerId
                }                    
             },             
              {'$group': 
                  {
                    '_id': {},
                    'values': {'$sum': '$values'}
                  }              
              },                                                        
               {'$sort': 
                   {
                    '_id': 1
                   }
                }                                                         
             ]
        )
    }    
    async countItem(customerId,data){
      return await purchaseInvoicesModel.distinct("produto_nfe",{"dataemissao": {"$gte":data},"codigo_cliente":customerId})
    }
    async countNFe(customerId,data){
      return await purchaseInvoicesModel.distinct("chave_nfe",{"dataemissao": {"$gte":data},"codigo_cliente":customerId})
    }
    async countSupplier(customerId,data){
      return await purchaseInvoicesModel.distinct("nome_fornecedor",{"dataemissao": {"$gte":data},"codigo_cliente":customerId})
    }  
  //Telas Categoria/Sub
    async groupbySupplier(customerId,data,filter){
      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$nome_fornecedor",
                  "produto": "$produto_nfe",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto",
                  "qtd": "$quantidade"
                  }
          },      
          {$match:
            {
              "produto": filter,
              "data": {
                  "$gte":data
               },
               "client":customerId
            }                   
           },             
            {$group: 
                {
                  '_id': '$data',
                  'fornecedor': {'$last':'$label'}  ,                  
                  'qtd': {'$sum': '$qtd'},
                  'values': {'$sum': '$values'},                  
                  
                }              
            },                                                        
             {$sort: 
                 {
                  '_id': -1
                 }
              }                                                                      
           ]
        )
    }    
    async groupbyCategory(customerId,data){
      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$categoria",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto",
                  "qtd": "$quantidade"                  
                  }
          },      
          {$match:
                {                  
                  "data": {
                      "$gte":data
                    },
                    "client":customerId
                }                   
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values_qtd': {'$sum': '$qtd'},
                  'values': {'$sum': '$values'},
                  'data': {'$max':'$data'}
                }              
            },                                                        
             {$sort: 
                 {
                  'values': -1
                 }
             }                                                                                       
           ]
      )
    }        
    async groupbyCategorySub(customerId,data,category){      
      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$categoria",
                  "subcategory": "$subcategoria",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto",
                  "qtd": "$quantidade"
                  }
          },      
          {$match:
                {
                  "label":category,
                  "data": {
                      "$gte":data
                    },
                    "client":customerId
                }                   
           },             
            {$group: 
                {
                  '_id': "$subcategory"
                }              
            },                                                        
             {$sort: 
                 {
                  'subcategory':1
                 }
             }                                                                                       
           ]
      )
    }        
    async groupbyItem(customerId,data){            
      return await purchaseInvoicesModel.aggregate(
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$produto_nfe",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto"                    
                  }
          },      
          {$match:
            {
              "data": {
                  "$gte":data
               },
               "client":customerId
          }                   
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values': {'$sum': '$values'}
                }              
            },                                                        
             {$sort: 
                 {
                  'values': -1
                 }
              }                                                                     
           ]
  )
    }    
    async groupbyItemCategory(customerId,data,category){            
      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$produto_nfe",
                  "category": "$categoria",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto",
                  "qtd": "$quantidade"
                  }
          },      
          {$match:
                {
                  "category": {"$regex":`.*${category};*`},
                  "data": {
                      "$gte":data
                    },
                    "client":customerId
                }                   
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values_qtd': {'$sum': '$qtd'},
                  'values': {'$sum': '$values'},
                  'data': {'$max':'$data'}

                }              
            },                                                        
             {$sort: 
                 {
                  'label':1
                 }
             }                                                                                       
           ]
      )
    }           
    async groupbyItemCategory(customerId,data,category){            
      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$produto_nfe",
                  "category": "$subcategoria",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto",
                  "qtd": "$quantidade"
                  }
          },      
          {$match:
                {
                  "category": {"$regex":`.*${category};*`},
                  "data": {
                      "$gte":data
                    },
                    "client":customerId
                }                   
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values_qtd': {'$sum': '$qtd'},
                  'values': {'$sum': '$values'},
                  'data': {'$max':'$data'}

                }              
            },                                                        
             {$sort: 
                 {
                  'label':1
                 }
             }                                                                                       
           ]
      )
    }               
//Tela DashBoard Item          
    async groupbyPurchaseDayItem(customerId,data,item){
      return await purchaseInvoicesModel.aggregate(
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "produto": "$produto_nfe",
                  "label": {"$dayOfMonth":"$dataemissao"},
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_unitario"                    
                  }
          },      
          {$match:
            { 
              "produto":item,
              "data": {
                  "$gte":data
               },
               "client":customerId
            }                 
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values': {'$avg': '$values'}
                }              
            },                                                        
             {$sort: 
                 {
                  '_id': 1
                 }
              }
           ]
      )
    }     
    async groupbyPurchaseWeekItem(customerId,data,item){
      return await purchaseInvoicesModel.aggregate(
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": {"$week":"$dataemissao"},
                  "produto": "$produto_nfe",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_unitario"                    
                  }
          },      
          {$match:
            { "produto":item,
              "data": {
                  "$gte":data
               },
               "client":customerId
            }                 
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values': {'$avg': '$values'}
                }              
            },                                                        
             {$sort: 
                 {
                  '_id': 1
                 }
              }
           ]
      )
    }   
    async groupbyPurchaseMonthItem(customerId,data,item){
      return await purchaseInvoicesModel.aggregate(
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": {"$month":"$dataemissao"},
                  "produto": "$produto_nfe",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_unitario"                    
                  }
          },      
          {$match:
            { "produto":item,
              "data": {
                  "$gte":data
               },
               "client":customerId
            }                 
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values': {'$avg': '$values'}
                }              
            },                                                        
             {$sort: 
                 {
                  '_id': 1
                 }
              }
           ]
      )
    }    
    async groupbyPurchaseMonthItemPrice(customerId,data,item){
      console.log(data)
      return await purchaseInvoicesModel.aggregate(
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": {"$month":"$dataemissao"},
                  "produto": "$produto_nfe",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_unitario"                    
                  }
          },      
          {$match:
            { "produto":item,
              "data": {
                  "$gte":data
               },
               "client":customerId
            }                 
           },           
            {$group: 
                {
                  '_id': "$produto",
                  'pmedio': {'$avg': '$values'},
                  'pmin': {'$min': '$values'},
                  'pmax': {'$max': '$values'},
                }              
            },                                                        
             {$sort: 
                 {
                  '_id': 1
                 }
              }
           ]
      )
    } 
        
    async groupbyItemUnit(customerId,data,filter){                  
      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$produto_nfe",
                  "unidades": "$unidade",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto",
                  "qtd": "$quantidade"
                  }
          },      
          {$match:
                {
                  "label":filter,
                  "data": {
                      "$gte":data
                    },
                    "client":customerId
                }                   
           },             
            {$group: 
                {
                  '_id': "$unidades",
                  'values_qtd': {'$sum': '$qtd'},
                  'values': {'$sum': '$values'}                  
                }              
            }                                                                                     
           ]
      )
    }        
    async TotalItemUnit(customerId,data,filter){                   
      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,
                  "label": "$produto_nfe",
                  "unidades": "$unidade",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto",
                  "qtd": "$quantidade"
                  }
          },      
          {$match:
                {
                  "label":filter,
                  "data": {
                      "$gte":data
                    },
                    "client":customerId
                }                   
           },             
            {$group: 
                {
                  '_id': "$label",
                  'values_qtd': {'$sum': '$qtd'},
                  'values': {'$sum': '$values'}                  
                }              
            }                                                                                     
           ]
      )
    }
    async countNFeItem(customerId,data,item){
      return await purchaseInvoicesModel.distinct("chave_nfe",{"dataemissao": {"$gte":data},"codigo_cliente":customerId,"produto_nfe":item})
    }
    async countSupplierItem(customerId,data,item){      
      return await purchaseInvoicesModel.distinct("nome_fornecedor",{"dataemissao": {"$gte":data},"codigo_cliente":customerId,"produto_nfe":item})
    }
// Tela Categorização
    async groupbyItemCategorization(customerId,data,category){           
      

      return await purchaseInvoicesModel.aggregate(            
        [                         
          {$project:
                  {
                  "totalAmount":1,                  
                  "label": "$produto_nfe",
                  "supplier": "$nome_fornecedor",
                  "category": "$categoria",
                  "subcategory": "$subcategoria",
                  "client": "$codigo_cliente",
                  "data": "$dataemissao",
                  "values": "$valor_bruto",
                  "qtd": "$quantidade"
                  }
          },      
          {$match:
                {                  
                  "data": {"$gte":data},
                  "client":customerId,
                  "category": {"$regex":`.*${category};*`}
                }                   
           },             
            {$group: 
                {
                  '_id': "$label",
                  'supplier':{'$last':'$supplier'},
                  'category':{'$last':'$category'},
                  'subcategory':{'$last':'$subcategory'},
                  'values_qtd': {'$sum': '$qtd'},
                  'values': {'$sum': '$values'}                  
                }              
            },                                                        
             {$sort: 
                 {
                  'label':1
                 }
             }                                                                                       
           ]
      )
    }  
    async groupbyCategoryFilter() {      
        return await purchaseInvoicesModel.aggregate(            
          [                         
            {$project:
                    {
                    "totalAmount":1,                  
                    "label": "$produto_nfe",
                    "supplier": "$nome_fornecedor",
                    "category": "$categoria",
                    "subcategory": "$subcategoria",
                    "client": "$codigo_cliente",
                    "data": "$dataemissao",
                    "values": "$valor_bruto",
                    "qtd": "$quantidade"
                    }
            },                            
              {$group: 
                {                  
                    '_id': '$category', 
                    'subcategory': {
                      '$addToSet': '$subcategory'
                    }                  
                }             
              },                                                        
               {$sort: 
                   {
                    'label':1
                   }
               }                                                                                       
             ]
        )         
    }
// Tela Meta
    async groupbyPurchaseMonthMeta(customerId){
      return await purchaseInvoicesModel.aggregate(
    [                         
      {$project:
              {              
              "label": {"$month":"$dataemissao"},
              "produto": "$produto_nfe",
              "client": "$codigo_cliente",
              "data": "$dataemissao",
              "values": "$valor_bruto"                    
              }
      },      
      {$match:
        {"client":customerId}                 
       },             
        {$group: 
            {
              '_id': "$label",
              'values': {'$sum':'$values'}
            }              
        },                                                        
         {$sort: 
             {
              '_id': 1
             }
          }
       ]
  )
    }          

//Exportação de Dados    
    async selectAllDataNfe(customerId,data){
      return await purchaseInvoicesModel.find()
     }

  }

// Ignorar Item na Categorização


  
module.exports = new PurchaseInvoicesRepository()