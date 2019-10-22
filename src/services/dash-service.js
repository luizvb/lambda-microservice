const purchaseInvoicesService = require("./purchaseInvoices-service");

class DashService {
  constructor() {}

  async getHomeDash(customerId, data, days, tela) {
    let most_purchased_categories_graph = await purchaseInvoicesService.groupbyCategory(
      customerId,
      data,
      tela
    );
    let top_suppliers_graph = await purchaseInvoicesService.groupbySupplier(
      customerId,
      data,
      tela
    );
    let most_purchased_products_graph = await purchaseInvoicesService.groupbyItem(
      customerId,
      data,
      tela
    );
    let shopping_evolution_graph = await purchaseInvoicesService.groupbyPurchase(
      customerId,
      data,
      days,
      tela
    );
    let total_spend_amount = await purchaseInvoicesService.totalPurchase(
      customerId,
      data,
      tela
    );
    let total_item_amount = await purchaseInvoicesService.countItem(
      customerId,
      data,
      tela
    );
    let total_invoice_amount = await purchaseInvoicesService.countNFe(
      customerId,
      data,
      tela
    );
    let total_supplier_amount = await purchaseInvoicesService.countSupplier(
      customerId,
      data,
      tela
    );

    return {
      kpi: {
        total_spend_label: "Total de Compras",
        total_spend_amount: total_spend_amount[0]
          ? total_spend_amount[0].values
          : 0,
        total_item_label: "Total de Produtos Encontrados",
        total_item_amount: total_item_amount ? total_item_amount.length : 0,
        total_invoice_label: "Total de NFes encontradas",
        total_invoice_amount: total_invoice_amount
          ? total_invoice_amount.length
          : 0,
        total_supplier_label: "Fornecedores encontrados",
        total_supplier_amount: total_supplier_amount
          ? total_supplier_amount.length
          : 0
      },
      shopping_evolution_graph: shopping_evolution_graph.result,
      goal: {
        target: 100,
        used: 75
      },
      most_purchased_categories_graph,
      most_purchased_products_graph,
      top_suppliers_graph
    };
  }
  async getListCategory(customerId, data, tela) {
    let category = await purchaseInvoicesService.groupbyCategory(
      customerId,
      data,
      tela
    );
    return category;
  }
  async getCategorySub(customerId, data, tela, category) {
    let subcategory = await purchaseInvoicesService.groupbyCategory(
      customerId,
      data,
      tela,
      category
    );
    return subcategory;
  }
  async getListItems(customerId, data, tela, category) {
    let item = await purchaseInvoicesService.groupbyItem(
      customerId,
      data,
      tela,
      category
    );
    return item;
  }
  async getFullItem(customerId, data, days, tela, filter) {
    let evolution_month = await purchaseInvoicesService.groupbyPurchase(
      customerId,
      data,
      days,
      tela,
      filter
    );
    let groupbySupplier = await purchaseInvoicesService.groupbySupplier(
      customerId,
      data,
      tela,
      filter
    );
    let countNfe = await purchaseInvoicesService.countNFe(
      customerId,
      data,
      tela,
      filter
    );
    countNfe = countNfe.length;
    let countSupplier = await purchaseInvoicesService.countSupplier(
      customerId,
      data,
      tela,
      filter
    );
    countSupplier = countSupplier.length;
    let groupbyUnit = await purchaseInvoicesService.groupbyUnit(
      customerId,
      data,
      tela,
      filter
    );

    return {
      evolution_month,
      groupbySupplier,
      groupbyUnit,
      countNfe,
      countSupplier
    };
  }

  async getCategorization(customerId, data, tela, category) {
    let items = await purchaseInvoicesService.groupbyItem(
      customerId,
      data,
      tela,
      category
    );
    let label = await purchaseInvoicesService.groupbyCategory(
      customerId,
      data,
      tela
    );

    return { items, label };
  }

  async getMyPerfil(customerId, data, tela) {
    let info = purchaseInvoicesService.informationCliente(
      customerId,
      data,
      tela
    );
  }

  async getMyMeta(customerId, data, tela) {}
}
module.exports = new DashService();
