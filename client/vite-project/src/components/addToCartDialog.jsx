import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, Grid, IconButton } from '@mui/material';
import { IoMdClose } from "react-icons/io";

const AddToCartDialog = ({ isPopupOpen, handleClosePopup, handleSubmit, quantity, setQuantity, product }) => {
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <Dialog open={isPopupOpen} onClose={handleClosePopup} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Add to Cart</Typography>
          <IconButton edge="end" color="inherit" onClick={handleClosePopup}>
            <IoMdClose />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img src={'https://applecenter.com.vn/uploads/cms/16632365177447.jpg'} alt={product.product_name} style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>{product.product_name}</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>{product.product_description}</Typography>
            <Typography variant="h6" color="primary" gutterBottom>${product.product_price}</Typography>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{ inputProps: { min: 1 } }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePopup} variant="outlined" color="secondary">Cancel</Button>
        <Button onClick={() => handleSubmit(quantity)} variant="contained" color="primary">Add to Cart</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToCartDialog;
