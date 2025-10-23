enum PostgreStatusCode {
  INTERNAL_SERVER_ERROR = 500,
  FORBIDDEN_ERROR = 403,
  BAD_REQUEST_ERROR = 400,
  NOT_FOUND_ERROR = 404,
  SUCCESS_CODE = 200,
  AUTHORIZATION_ERROR = 401,
}

enum RoleEnums {
  ADMIN = 'ADMIN',
}

enum ItemColorEnums {
  COLOR = 'COLOR',
  HEX_CODE = 'HEX_CODE',
}

enum DiscountTypeEnums {
  VALUE = 'VALUE',
  PERCENTAGE = 'PERCENTAGE',
}

enum DiscountLevelEnums {
  ITEM = 'ITEM',
  CATEGORY = 'CATEGORY',
  BRANCH = 'BRANCH',
}

enum OrderStatusEnums {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DISPATCHED = 'DISPATCHED',
  INKITCHEN = 'INKITCHEN',
  DELIVERED = 'DELIVERED',
  PICKED = 'PICKED',
}

export {
  PostgreStatusCode,
  RoleEnums,
  ItemColorEnums,
  DiscountTypeEnums,
  DiscountLevelEnums,
  OrderStatusEnums,
};
