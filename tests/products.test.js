const { mockModel } = require('./db.mock');
const { create, get, list, edit, destroy } = require('../products');

jest.mock('../db', () => ({
  model: jest.fn().mockReturnValue(mockModel),
}));

describe('Product Module', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should list products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

      const product = await get('product-id');
      expect(product.description).toBe('Product 1');
      expect(mockModel.findById).toHaveBeenCalledWith('product-id');
    });
  });

  describe('destroy', () => {
    it('should destroy a product by id', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const product = await destroy('product-id');
      expect(product.deletedCount).toBe(1);
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ '_id': 'product-id' });
    });
  });
})