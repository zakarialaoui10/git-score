import axios from "axios"
async function get_repo_contributors(owner,repo) {
    try {
        let contributors = [];
        let page = 1;
        let hasNextPage = true;
        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
                headers: {
                    Authorization: `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`
                },
                params: {
                    per_page: 100,
                    page: page
                }
            });
            const usersToAdd = response.data.map(user => ({
                login: user.login,
                contributions: user.contributions
            }));
            contributors = contributors.concat(usersToAdd);
            if (response.headers.link) {
                const linkHeader = response.headers.link;
                hasNextPage = linkHeader.includes('rel="next"');
            } else {
                hasNextPage = false;
            }
            page++;
        }

        return contributors;
    } catch (error) {
        throw error;
    }
}


// // TEST 1
// const login = 'zakarialaoui10';
// get_repo_contributors(login)
//     .then(user => {
//         console.log(user);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });

export{
  get_repo_contributors,
}
