const sequelize = require('../config');  // Sequelize instance
const Product = require('../models/product');

const seedProducts = async () => {
  try {
    await sequelize.sync(); // Sync models with database
    console.log('Database synced.');

    await Product.bulkCreate([
      {
        name: 'Smartphone',
        price: 5499.99,
        description: 'A smartphone with a 6.5-inch display and 128GB storage',
        stock: 10,
        image: 'https://images.samsung.com/is/image/samsung/p6pim/za/2501/gallery/za-galaxy-s25-s931-sm-s931blboafa-thumb-544668616?$264_264_PNG$',
      },
      {
        name: 'Laptop',
        price: 12000.00,
        description: 'Laptop with i7 processor, 16GB RAM, and 512GB SSD',
        stock: 5,
        image: 'https://m.media-amazon.com/images/I/71TtcC0cscL._AC_SX300_SY300_.jpg',
      },
      {
        name: 'Tablet',
        price: 2599.99,
        description: 'A 10-inch tablet with 64GB storage and 8GB RAM',
        stock: 8,
        image: 'https://m.media-amazon.com/images/I/61qanksRYQL._AC_SY300_SX300_.jpg',
      },
      {
        name: 'Laptop Pro',
        price: 9299.99,
        description: 'A high-performance laptop with 16GB RAM and 512GB SSD',
        stock: 51,
        image: 'https://m.media-amazon.com/images/I/71TtcC0cscL._AC_SX300_SY300_.jpg',
      },
      {
        name: 'Dress',
        price: 389.99,
        description: 'A beautiful evening dress with a flowing design',
        stock: 4,
        image: 'https://cdn-images.farfetch-contents.com/27/35/40/08/27354008_57164729_1000.jpg',
      },
      {
        name: 'Shirt',
        price: 219.99,
        description: 'A casual button-up shirt made from soft cotton',
        stock: 4,
        image: 'https://thefoschini.vtexassets.com/arquivos/ids/172385682-1200-1600?v=638721154246070000&width=1200&height=1600&aspect=true',
      },
      {
        name: 'Pants',
        price: 149.99,
        description: 'Comfortable and stylish jeans in various sizes',
        stock: 40,
        image: 'https://specials-images.forbesimg.com/imageserve/661ebbc202b9fdf0e0c0b8df/Best-Dress-Pants-For-Women-2024/960x0.png?fit=scale',
      },
      {
        name: 'Jacket',
        price: 529.99,
        description: 'A warm winter jacket with a waterproof outer layer',
        stock: 41,
        image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSCi83J0Djs4C5YDWIqxXkFDlV2swfSpu9KbVFW6qMb6Rdoi2TAyCVwFG7Efzr2tA9dW4EXPigRwvFGL1EYJQqdFSGC365AZHEuOU1NrfAlmamytfxyM_Whag',
      },
      {
        name: 'Table',
        price: 399.99,
        description: 'Stylish dining table with a glass top',
        stock: 18,
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSQEG0zQGzBNpdgNdjkocHzq4V-yR_tIvrCQV7pDPAnmeWshnYoBcVBle7Hu6DXqDU2-SzTdPqXIR5tMV45pOtkbDp4kOv60iQ5F1fipcvmed1jeJxLxuOt8w',
      },
      {
        name: 'Printer',
        price: 499.99,
        description: 'All-in-one printer with scanning and fax capabilities',
        stock: 14,
        image: 'https://i1.adis.ws/i/canon/pixma-ts3640_range_856a60c996614a0d953993d96503322b?$1by1-prod-grid-jpg$',
      },
      {
        name: 'Fax Machine',
        price: 1199.99,
        description: 'Classic fax machine for office use',
        stock: 58,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf21eKRXJ_tsQjKZL0ecdXr-71y55L6VO07w&s',
      }
    ]);

    console.log('Products seeded.');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await sequelize.close();  // Close DB connection
  }
};



seedProducts();
