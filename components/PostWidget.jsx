import React, { useState, useEffect } from 'react';
import moment from "moment";
import Link from "next/link";

import { getRecentPosts, getSimilarPosts } from "@/services";

// Want to know if we are seeing the post widget in home page
// or an article page by passing in and checking the slug (post path).
const PostWidget = ({ categories, slug }) => {
    
    const [relatedPosts, setRelatedPosts] = useState([]);
    
    useEffect(() => {
        // If a slug exists, then we have a post
        if(slug) {
            // Get similar posts by knowing the category 
            // and passing the slug and set them in result.
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        }
        // Else we are on the homepage, so we get recent posts.
        // No parameters needed since we are not on a post
        else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    }, [slug])

    console.log(relatedPosts);

    return (
    <div>
        
    </div>
  )
}

export default PostWidget