import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_HYPGRAPH_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        category {
                            name
                            slug
                        }
                    }
                }
            }
        }      
    `;
    
    try {
        // Fetch the results from Hygraph
        const result = await request(graphqlAPI, query);

        console.log(result);  // Log the full response to inspect the structure

        // Safely return posts with optional chaining
        return result.postsConnection.edges;

    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];  // Return an empty array on error
    }
};

export const getRecentPosts = async () => {
    const query = gql  `
        query GetPostDetails {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    
    const result = await request(graphqlAPI, query);
    
    return result.posts;
};

// GET SIMILAR POSTS
export const getSimilarPosts = async (categories, slug) => {

    // Don't display current article, but display other articles
    // that include categories we want to get and return last 3 articles 

    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    try {
        const result = await request(graphqlAPI, query, { categories, slug });
        return result.posts;
      } catch (error) {
        console.error("Error fetching posts:", error.response || error);
      }
      
}


export const getCategories = async () => {
    const query = gql`
     query GetCategories {
        categories {
            name
            slug
        }
     }
    `
    const result = await request(graphqlAPI, query);
    
    return result.categories;
}


// GET POST DETAILS 
export const getPostDetails = async (slug) => {
    const query = gql`
      query GetPostDetails($slug : String!) {
        post(where: {slug: $slug}) {
          title
          excerpt
          featuredImage {
            url
          }
          author{
            name
            bio
            photo {
              url
            }
          }
          createdAt
          slug
          content {
            raw
          }
          category {
            name
            slug
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.post;
  };
// export const getPostDetails = async (slug) => {
//     const query = gql`
//         query GetPostDetails($slug: String!) { # accepting a slug that's going to be a string 
//             post(where: {slug: $slug}) { # Only get data from specific post 
//                 author {
//                     bio
//                     name
//                     id
//                     photo {
//                         url
//                     }
//                 }
//                 createdAt
//                 slug
//                 title
//                 excerpt
//                 featuredImage {
//                     url
//                 }
//                 categories {
//                     name
//                     slug
//                 }
//                 content { # gives access to the post content 
//                     raw
//                 }
//             }
//         }      
//     `;
    
//     try {
//         // Fetch the results from Hygraph
//         const result = await request(graphqlAPI, query, { slug });

//         console.log("GetPostDetails" + result);  // Log the full response to inspect the structure

//         // Safely return posts with optional chaining
//         return result.post;
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         return [];
//     }
// };


export const getRecentPosts = async () => {
    const query = gql `
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
}

export const getSimilarPosts = async () => {
    const query = gql `
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createAt
                slug
            }  
        }
    `

    try {
        // Fetch the results from Hygraph
        const result = await request(graphqlAPI, query);

        console.log(result);  // Log the full response to inspect the structure

        // Safely return posts with optional chaining
        return result.postsConnection.edges;
        
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];  // Return an empty array on error
    }
    
};