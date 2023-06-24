import React, { useState } from 'react';
import { ReactDOM } from 'react';
function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Hàm xử lý thêm sản phẩm vào danh sách yêu thích
  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  // Hàm xử lý xoá sản phẩm khỏi danh sách yêu thích
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((product) => product.id !== productId));
  };

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map((product) => (
          <li key={product.id}>
            <span>{product.name} - {product.price}</span>
            <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Available Products</h2>
      <ul>
        {/* Danh sách sản phẩm có sẵn */}
        <li>
          <span>Product 1 - $10</span>
          <button onClick={() => addToWishlist({ id: 1, name: 'Product 1', price: '$10' })}>Add to Wishlist</button>
        </li>
        <li>
          <span>Product 2 - $20</span>
          <button onClick={() => addToWishlist({ id: 2, name: 'Product 2', price: '$20' })}>Add to Wishlist</button>
        </li>
        {/* Thêm sản phẩm khác tương tự */}
      </ul>
    </div>
  );
}

export default Wishlist;