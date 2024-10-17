import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from "@/services";



const Header = () => {
    const [categories, setCategories] = useState([]);

    // fetch data using graphql and hygraph
    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []); // Leave dependency array empty so we only call it at the start to fill in categories
    
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            Bloggie 2.0
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/categry/${category.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div> 
            </div>

        </div>
    )
}

export default Header