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


export const getSimilarPosts = async () => {

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
        const result = await request(graphqlAPI, query);
        return result.posts;
      } catch (error) {
        console.error("Error fetching posts:", error.response || error);
      }
      
}