import React from 'react';
import axios from 'axios';
import ROUTES from '../routes/routes';
import { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, Container, Grid, Typography, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { RiAddCircleLine } from 'react-icons/ri';

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
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg" className="mt-20">
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
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  onClick={() => navigate(ROUTES.DETAILS_PRODUCT.replace(':product_id', product._id))}
                >
                  View
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="inherit"
                  startIcon={<RiAddCircleLine />}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
