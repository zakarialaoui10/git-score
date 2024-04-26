import axios from "axios"
async function get_starred_repos(userLogin) {
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
const check_starred=(login,owner,repoName)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const repositories = await get_starred_repos(login);
            const repoFound = repositories.find(repo => repo.name === repoName && repo.owner === owner);
            if (repoFound) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}
// // TEST 1
// const userLogin = 'zakarialaoui10';
// get_starred_repos(userLogin)
//     .then(repositories => {
//         console.log(repositories);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });
// // TEST 2
// check_starred("zakarialaoui10","zakarialaoui10","ziko.js").then(
//   e=>console.log(e)
// )

export{
  get_starred_repos,
  check_starred
}
