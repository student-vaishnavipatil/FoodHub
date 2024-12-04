import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

const Cards = (props) => {
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
let data=useCart();
  const [size, setSize] = useState(priceOptions.length > 0 ? priceOptions[0] : ""); // Default to first size
  const [Qty, setQty] = useState(1); // Initialize quantity to 1

  const handleAddtoCart = async () => {
    // Debugging

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: options[size], // Use price from options based on size
      Qty: Qty,
      size: size
    });
     await  console.log(data)
     
  };

  const handleQtyChange = (e) => {
    const value = Math.max(1, Number(e.target.value)); // Ensure Qty is at least 1
    setQty(value);
  };

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={props.foodItem.img} className="card-img-top img-thumbnail" style={{ width: 'auto', height: 200 }} alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text">{props.foodItem.description}</p>
        <div className="container w-100">
          {/* Size selection */}
          <select className="m-2 h-100 bg-success rounded" onChange={(e) => setSize(e.target.value)} value={size}>
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          
          {/* Quantity selection */}
          <select className="m-2 h-100 bg-success rounded" onChange={handleQtyChange} value={Qty}>
            {Array.from(Array(6), (e, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          
          {/* Display Total Price */}
          <div className="d-inline h-100">
            Total Price: {size && options[size] ? options[size] * Qty : "Select size"}
          </div>
          <hr />
          
          {/* Add to cart button */}
          <button type="submit" className="btn btn-success m-1 justify-content-center" onClick={handleAddtoCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
