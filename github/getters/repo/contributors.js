import axios from "axios";
/**
 * Retrieves the contributors of a GitHub repository.
 * 
 * @param {string} owner - The owner of the GitHub repository.
 * @param {string} repo - The name of the GitHub repository.
 * @returns {Promise<Array<{login: string, contributions: number}>>} A Promise that resolves to an array of objects representing the contributors.
 * Each object has the properties 'login' for the contributor's username and 'contributions' for the number of contributions.
 * @throws {Error} Throws an error if the request to GitHub's API fails.
 */
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
export{
  get_repo_contributors,
}
