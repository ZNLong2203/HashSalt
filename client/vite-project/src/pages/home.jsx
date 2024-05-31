import axios from 'axios'
import React from 'react';
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
            <StyledCard>
              <StyledCardMedia
                image="https://applecenter.com.vn/uploads/cms/16632365177447.jpg" 
                // title={product.product_name}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Product {product.product_name} 
                </Typography>
                <Typography>
                  {product.product_description}
                </Typography>
                <Typography>
                  Price: {product.product_price} 
                </Typography>
                <Typography>
                  Quantity: {product.product_quantity}
                </Typography>
              </StyledCardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
                <Button size="small" color="primary">
                  Add to cart
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;