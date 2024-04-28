import axios from "axios";
/**
 * Retrieves the repositories starred by a given user.
 * @param {string} login - The username of the GitHub user whose starred repositories are to be retrieved.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of objects representing the starred repositories.
 * Each object has the properties 'name' for the repository name and 'owner' for the repository owner's username.
 * @throws {Error} Throws an error if the request to GitHub's API fails.
 */
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