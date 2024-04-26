import axios from "axios"
async function getStarredRepositories(userLogin) {
    try {
        let repositories = [];
        let page = 1;
        let hasNextPage = true;
        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/users/${userLogin}/starred`, {
                params: {
                    per_page: 100,
                    page: page
                }
            });
            const reposToAdd = response.data.map(repo => ({
                name: repo.name,
                owner: repo.owner.login
            }));
            repositories = repositories.concat(reposToAdd);
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
// const userLogin = 'zakarialaoui10';

// getStarredRepositories(userLogin)
//     .then(repositories => {
//         console.log(repositories);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });
