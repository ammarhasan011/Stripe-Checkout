import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./Cards.css";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface MultiActionAreaCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function MultiActionAreaCard({
  product,
  addToCart,
}: MultiActionAreaCardProps) {
  return (
    <div className="paren">
      <div className="CardDiv">
        <Card sx={{ maxWidth: 345 }} className="Card">
          <CardActionArea>
            <CardMedia
              className="CardMedia"
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="text.primary">
                Pris: {product.price} kr
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => addToCart(product)}
            >
              Lägg till i varukorgen
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
