import axios from "axios"
async function get_starred_repos(login) {
    try {
        let repositories = [];
        let page = 1;
        let hasNextPage = true;
        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/users/${login}/starred`, {
                headers: {
                    Authorization: `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`
                },
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
export{
    get_starred_repos
}