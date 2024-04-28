import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();
/**
 * Fetches all repositories of a GitHub user.
 * 
 * @param {string} login - The username of the GitHub user.
 * @param {object} options - Additional options for fetching repositories.
 * @param {boolean} [options.includeForks=true] - Whether to include forked repositories.
 * @param {boolean} [options.includeSources=true] - Whether to include non-forked repositories.
 * @param {string} [sortBy=null] - The field to sort repositories by ('stars' or 'last_updated').
 * @returns {Promise<string[]>} The names of the repositories.
 * @throws {Error} If an error occurs during the HTTP request.
 */
const get_repos=async(login,{includeForks=true,includeSources=true}={},sortBy = null)=>{
    try {
        let repositories = [];
        let page = 1;
        let hasNextPage = true;
        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/users/${login}/repos`, {
              headers: {
                  Authorization: process.env.AUTH
              },
                params: {
                    per_page: 100, 
                    page: page
                }
            });
          let reposToAdd = response.data;
          if(!includeForks) reposToAdd=reposToAdd.filter(repo => !repo.fork);
          if(!includeSources) reposToAdd=reposToAdd.filter(repo => repo.fork)
            repositories = repositories.concat(reposToAdd);
            if (response.headers.link) {
                const linkHeader = response.headers.link;
                hasNextPage = linkHeader.includes('rel="next"');
            } else {
                hasNextPage = false;
            }
            page++;
        }
        if (sortBy) {
            repositories.sort((a, b) => {
                if (sortBy === 'stars') {
                    return b.stargazers_count - a.stargazers_count;
                } else if (sortBy === 'last_updated') {
                    return new Date(b.updated_at) - new Date(a.updated_at);
                } else {
                    return 0;
                }
            });
        }
        return repositories.map(repo => repo.name);
    } catch (error) {
        throw error;
    }
}
export {
    get_repos
}
// // Test
// const login = 'zakarialaoui10';
// const includeForks = false; 
// const includeSources = true;
// const sortBy = 'stars'; 

// get_repos(login,{includeForks,includeSources}, sortBy)
//     .then(repositories => {
//         console.log(repositories);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });
