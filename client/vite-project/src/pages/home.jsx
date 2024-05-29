import axios from 'axios'
import React from 'react';
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // replace with your own data

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="mt-20">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <StyledCard>
              <StyledCardMedia
                image="https://source.unsplash.com/random" // replace with your own images
                title="Image title"
              />
              <StyledCardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Product {card} // replace with your own product name
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the content. // replace with your own product description
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