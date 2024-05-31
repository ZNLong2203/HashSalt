import axios from 'axios'
import React from 'react';
import ROUTES from '../routes/routes'
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Button, Card, CardContent, CardMedia, Container, Grid, Typography, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data);
      } catch(err) {
        console.log(err)
      }
    };
    fetchProducts();
  }, []);
  return (
    <Container maxWidth="md" className="mt-20">
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={5}>
            <StyledCard className="shadow-lg hover:shadow-xl transition-shadow duration-200">
              <StyledCardMedia
                className="h-64 object-cover"
                image="https://applecenter.com.vn/uploads/cms/16632365177447.jpg" 
                // title={product.product_name}
              />
              <StyledCardContent className="p-4">
                <Typography className="text-2xl font-bold mb-2">
                  Product {product.product_name} 
                </Typography>
                <Typography className="text-gray-700 mb-2">
                  {product.product_description}
                </Typography>
                <Typography className="text-lg font-semibold mb-2">
                  Price: {product.product_price} 
                </Typography>
                <Typography className="text-gray-500 mb-2">
                  Quantity: {product.product_quantity}
                </Typography>
              </StyledCardContent>
              <CardActions className="justify-center p-4">
                <Button size="small" color="primary" className="mr-2 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200"
                  onClick={() => navigate(ROUTES.DETAILS_PRODUCT.replace(':product_id', product._id))}
                > View
                </Button>
                <Button size="small" color="primary" className="bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200">
                  Add to cart
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;