import React, { useState, useEffect } from 'react'
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts } from "@/services";


const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if(slug) {
            // Get similar posts by knowing the category and passing
            // in the slug.
            getSimilarPosts(category, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            // Otherwise, we aren't looking at a specific article 
            // so return recent posts.
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    }, [input])
    return (
        <div>
            
        </div>
    )
}

export default PostWidget