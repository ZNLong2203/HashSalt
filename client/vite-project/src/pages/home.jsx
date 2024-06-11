import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Container, Grid, Typography, CardActions } from '@mui/material';
import { AiFillEye } from 'react-icons/ai';
import { RiAddCircleLine } from 'react-icons/ri';
import AddToCartDialog from '../components/addToCartDialog' // Import the dialog component

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isFetching = false;
    const fetchProducts = async () => {
      if (isFetching) return;
      isFetching = true;
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data);
      } catch (err) {
        if (err.response.status === 401) {
          console.error('Unauthorized');
        } else {
          console.error(err);
        }
      } finally {
        isFetching = false;
      }
    };
    fetchProducts();
  }, []);

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setQuantity(1);
  };

  const handleAddToCart = async (quantity) => {
    try {
      await axios.post('http://localhost:3000/api/carts/add', 
        { cart_product: selectedProduct._id, cart_quantity: quantity }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        },
      });
      handleClosePopup();
      // navigate('/cart');
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  return (
    <Container maxWidth="lg" className="mt-20">
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardMedia
                component="img"
                height="200"
                image={"https://applecenter.com.vn/uploads/cms/16632365177447.jpg"}
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
                  Price: ${product.product_price}
                </Typography>
              </CardContent>
              <CardActions className="justify-center p-4 space-x-5">
                <button
                  className="flex items-center justify-center bg-orange-500 text-white rounded-md px-4 py-2"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <AiFillEye className="me-2" />
                  View
                </button>
                <button
                  className="flex items-center justify-center bg-green-500 text-white rounded-md px-4 py-2"
                  onClick={() => handleOpenPopup(product)}
                >
                  <RiAddCircleLine className="me-2" />
                  Add to Cart
                </button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedProduct && (
        <AddToCartDialog
          isPopupOpen={isPopupOpen}
          handleClosePopup={handleClosePopup}
          handleSubmit={handleAddToCart}
          quantity={quantity}
          setQuantity={setQuantity}
          product={selectedProduct}
        />
      )}
    </Container>
  );
};

export default Home;
