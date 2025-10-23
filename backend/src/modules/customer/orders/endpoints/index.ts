enum OrderEndpoints {
  createOrder = '/create-order',
  getCustomerOrders = '/:customerId',
  paymentIntentVerification = '/payment-intent-verification',
}

enum AdminOrderEndpoints {
  orderDetails = '/details/:orderId',
  updateOrder = '/:orderId/:status',
}

export { OrderEndpoints, AdminOrderEndpoints };
