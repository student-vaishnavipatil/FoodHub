import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Cards from '../Components/Cards';
import Footer from '../Components/Footer';
import Carousal from '../Components/Carousal';
import { CartProvider } from '../Components/ContextReducer';

const Home = () => {
    const [search, setsearch] = useState("")
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/displaydata", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setFoodCat(data[1]);
            setFoodItem(data[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />



            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{ setsearch(e.target.value) }} />
            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" style={{filter:"brightness(30%" , objectFit:"fill " , height:800}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg"  style={{filter:"brightness(30%"}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPpgLRrL9bKqzsKtMkWR_ggjPlVdWXh0kXQ&s"  style={{filter:"brightness(30%"}} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


            <div className="container ">
                {foodCat.length > 0 ? (
                    foodCat.map((category) => (
                        
                        <div key={category._id} className=' m-3 row mb-3'>
                            <h3>{category.CategoryName}</h3>
                            <hr />
                            {foodItem.length > 0 ? (
                                foodItem
                                    .filter((item) => item.CategoryName === category.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase())) )
                                    .map((filteredItem) => (
                                        <div key={filteredItem._id} className="col-12  col-md-6 col-lg-3">
                                          <CartProvider> <Cards
                                            foodItem={filteredItem}
                                           options={filteredItem.options[0]}
                                        
                                           
                                           ></Cards></CartProvider> 
                                        </div>
                                    ))
                            ) : (
                                <div>No items found</div>
                            )}
                        </div>
                  
                    ))
                ) : (
                    <div>Loading categories...</div>
                )}
            </div>
         
            <Footer />
        </div>
    );
};

export default Home
