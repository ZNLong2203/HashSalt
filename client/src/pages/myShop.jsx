import axios from 'axios';
import ROUTES from '../routes/routes';
import toast from 'react-hot-toast';
import useRefreshAccess from '../hooks/useRefreshAccess';
import { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, Container, Grid, Typography, CardActions } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { IoTrashBinOutline } from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products/shop', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        setProducts(res.data);
      } catch(err) {
        console.log(err)
        if(err.response.status === 401) {
          // await useRefreshAccess();
          // await fetchProducts();
        }
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (product_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${product_id}`, {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
      });
      const newProducts = products.filter((product) => product._id !== product_id);
      setProducts(newProducts);
      toast.success('Product deleted successfully');
    } catch(err) {
      toast.error('Failed to delete product');
      if(err.response.status === 401) {
        // await useRefreshAccess();
        // await handleDeleteProduct(product_id);
      }
    }
  }

  return (
    <Container maxWidth="lg" className="mt-20">
      <h1 className="text-4xl font-bold text-center mb-8">My Shop</h1>
      <div className="space-x-4 mb-5">
          <button
              onClick={() => navigate(ROUTES.CREATEPRODUCT)}
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
              Create Product
          </button>
          <button
              onClick={() => navigate(ROUTES.CREATEPRODUCT)}
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
              Delete All Product
          </button>
      </div>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardMedia
                component="img"
                height="200"
                image="https://applecenter.com.vn/uploads/cms/16632365177447.jpg"
                alt={product.product_name}
              />
              <CardContent className="p-4">
                <Typography variant="h4" className="font-black mb-2 text-stone-900">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" className="font-semibold mb-2">
                  {product.product_description}
                </Typography>
                <Typography variant="subtitle1" className="font-semibold mb-2 text-orange-600">
                  Price: {product.product_price}
                </Typography>
              </CardContent>
              <CardActions className="justify-center p-4 space-x-5">
                <button
                  className="flex items-center justify-center bg-orange-500 text-white rounded-md px-4 py-2"
                  onClick={() => navigate(`/myproduct/${product._id}`)}
                >
                  <AiFillEye className="me-2" />
                  View
                </button>
                <button
                  className="flex items-center justify-center bg-green-500 text-white rounded-md px-4 py-2"
                  onClick={handleDeleteProduct.bind(this, product._id)}
                >
                  <IoTrashBinOutline className="me-2" />
                  Delete Product
                </button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
