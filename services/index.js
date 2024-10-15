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
