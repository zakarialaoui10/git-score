import axios from 'axios';

async function getUserRepositories(username) {
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

            repositories = repositories.concat(response.data.map(repo => repo.name));

          if (response.headers.link) {
                const linkHeader = response.headers.link;
                hasNextPage = linkHeader.includes('rel="next"');
            } else {
                hasNextPage = false;
            }
            page++;
        }

        return repositories;
    } catch (error) {
        throw error;
    }
}

// // TEST
// const username = 'zakarialaoui10';

// getUserRepositories(username)
//     .then(repositories => {
//         console.log(repositories);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });
