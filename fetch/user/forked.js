import axios from 'axios';

// Function to get forked repositories of a GitHub user
async function getForkedRepositories(username) {
    try {
        let repositories = [];
        let page = 1;
        let hasNextPage = true;

        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
                params: {
                    per_page: 100, // Maximum number of items per page
                    page: page
                }
            });

            // Filter repositories to find the forked ones
            const forkedRepos = response.data.filter(repo => repo.fork);

            // Add forked repositories from the current page to the array
            for (const repo of forkedRepos) {
                const parentResponse = await axios.get(repo.url); // Get full details of forked repo

                repositories.push({
                    name: repo.name,
                    owner: parentResponse.data.owner.login,
                    full_name: parentResponse.data.full_name
                });
            }

            // Check if there is another page
            if (response.headers.link) {
                const linkHeader = response.headers.link;
                hasNextPage = linkHeader.includes('rel="next"');
            } else {
                hasNextPage = false;
            }

            // Move to the next page
            page++;
        }

        return repositories;
    } catch (error) {
        throw error;
    }
}

// Replace 'username' with the GitHub username you want to get forked repositories for
const username = 'zakarialaoui10';

getForkedRepositories(username)
    .then(repositories => {
        console.log(repositories);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });

