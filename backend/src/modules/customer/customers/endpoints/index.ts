const CustomerEndpoints = {
  createCustomer: '/',
  updateCustomer: '/:id',
  getAllCustomers: '/',
  getCustomer: '/:id',
  deleteCustomer: '/:id',
  login: '/login',
  googleMapSearch: '/google-map-search/:text',
};

const CustomerAddressEndpoints = {
  createAddress: '/address',
  updateAddress: '/address/:id',
  getAllAddresss: '/address',
  getAddress: '/address/:id',
  deleteAddress: '/address/:id',
};

export { CustomerEndpoints, CustomerAddressEndpoints };
