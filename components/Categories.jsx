import React, { useState, useEffect } from 'react';
import Link from "next/link";

import { getCategories } from "@/services";

const Categories = () => {
    const [Categories, setCategories] = useState([]);
    // fetch data using graphql and hygraph
    useEffect(() => {
      getCategories()
        .then((newCategories) => setCategories(newCategories))
    }, []); // Leave dependency array empty so we only call it at the start to fill in categories
    
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4"> 
                {/* Check if slug exists 
                    Yes: See Related Posts
                    No: See Recent Posts
                */}
                Categories
            </h3>
        </div>
    )
}

export default Categories