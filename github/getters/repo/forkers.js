import axios from "axios";
/**
 * Retrieves the forkers of a GitHub repository.
 * 
 * @param {string} owner - The owner of the GitHub repository.
 * @param {string} repo - The name of the GitHub repository.
 * @returns {Promise<string[]>} A Promise that resolves to an array of usernames representing the forkers.
 * @throws {Error} Throws an error if the request to GitHub's API fails.
 */
async function get_repo_forkers(owner,repo) {
    try {
        let forkers = [];
        let page = 1;
        let hasNextPage = true;
        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/forks`, {
                headers: {
                    Authorization: `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`
                },
                params: {
                    per_page: 100,
                    page: page
                }
            });
            const usersToAdd = response.data.map(fork => fork.owner.login);
            forkers = forkers.concat(usersToAdd);
            if (response.headers.link) {
                const linkHeader = response.headers.link;
                hasNextPage = linkHeader.includes('rel="next"');
            } else {
                hasNextPage = false;
            }
            page++;
        }

        return forkers;
    } catch (error) {
        throw error;
    }
}
export{
  get_repo_forkers,
}
