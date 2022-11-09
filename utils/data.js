import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: '',
      email: '',
      password: bcrypt.hashSync(''),
      isAdmin: true,
    },
    {
      name: '',
      email: '',
      password: bcrypt.hashSync(''),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: '',
      slug: '',
      category: '',
      image: '',
      price: 0,
      brand: '',
      rating: 0,
      numReviews: 0,
      countInStock: 0,
      description: '',
    },
    
  ],
};

export default data;
