import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Home = () => {
    const [category, setCategory] = useState("All"); // Updated casing for consistency

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} /> {/* Ensure casing consistency */}
            <FoodDisplay category={category}/>
        </div>
    );
};

export default Home;
