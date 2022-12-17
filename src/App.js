import React, { useState, useEffect } from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import ShoppingCart from "./components/ShoppingCart";

const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 230,
    image: require("./images/phone1.png"),
    button: "ADD",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 121,
    image: require("./images/phone1.png"),
    button: "ADD",
  },
  {
    id: 3,
    name: "Smartphone",
    price: 34,
    image: require("./images/phone1.png"),
    button: "ADD",
  },
  {
    id: 4,
    name: "Smartphone",
    price: 89,
    image: require("./images/phone1.png"),
    button: "ADD",
  },
  {
    id: 5,
    name: "Smartphone",
    price: 555,
    image: require("./images/phone1.png"),
    button: "ADD",
  },
  {
    id: 6,
    name: "Smartphone",
    price: 199,
    image: require("./images/phone1.png"),
    button: "ADD",
  },
  {
    id: 7,
    name: "Smartphone",
    price: 399,
    image: require("./images/phone1.png"),
    button: "ADD",
  },
  {
    id: 8,
    name: "Smartphone",
    price: 456,
    image: require("./images/phone1.png"),
    button: "ADD",
  },
];

function App() {
  const [cartsVisibilty, setCartVisible] = useState(false);
  const [productsInCart, setProducts] = useState(
    JSON.parse(localStorage.getItem("shopping-cart")) || []
  );
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
  }, [productsInCart]);
  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([...productsInCart, newProduct]);
  };

  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onProductRemove = (product) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  return (
    <div className="App">
      <ShoppingCart
        visibilty={cartsVisibilty}
        products={productsInCart}
        onClose={() => setCartVisible(false)}
        onQuantityChange={onQuantityChange}
        onProductRemove={onProductRemove}
      />
      <div className="navbar">
        <h3 className="logo">Logo</h3>
        <button
          className="btn shopping-cart-btn"
          onClick={() => setCartVisible(true)}
        >
          <GiShoppingBag size={24} />
          {productsInCart.length > 0 && (
            <span className="product-count">{productsInCart.length}</span>
          )}
        </button>
      </div>
      <main>
        <h2 className="title">Products</h2>
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img
                className="product-image"
                src={product.image}
                alt={product.image}
              />
              <h4 className="product-name">{product.name}</h4>
              <span className="product-price">{product.price}$</span>
              <div className="buttons">
                <button
                  className="btn"
                  onClick={() => addProductToCart(product)}
                >
                  {product.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
