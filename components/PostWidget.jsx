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
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4"> 
            {/* Check if slug exists 
                Yes: See Related Posts
                No: See Recent Posts
            */}
            {slug ? 'Related Posts' : 'Recent Posts'}
        </h3>
        {/* Map over all of our posts */}
        {/* Get specific post */}
        {relatedPosts.map((post) => ( 
            // Show div for each post 
            <div key={post.title} className="flex items-center w-full mb-4">
                <div className="w-16 flex-none"> 
                    <img 
                        alt={post.title}
                        height="60px"
                        width="60px"
                        className="align-middle rounded-full"
                        src={post.featuredImage.url}
                    />
                </div>
            </div>
        ))}
    </div>
  )
}

export default PostWidget