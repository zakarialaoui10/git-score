import axios from "axios";

/**
 * Retrieves the repositories starred by a given user.
 * @param {string} login - The username of the GitHub user whose starred repositories are to be retrieved.
 * @returns {Promise<{ name : string , owner : string}[]>} A Promise that resolves to an array of objects representing the starred repositories.
 * Each object has the properties 'name' for the repository name and 'owner' for the repository owner's username.
 * @throws {Error} Throws an error if the request to GitHub's API fails.
 */
async function get_starred_repos(login) {
    try {
        const repositories = [];
        let page = 1;
        let hasNextPage = true;
        // Fetch starred repositories in parallel
        while (hasNextPage) {
            const responses = await Promise.all([
                axios.get(`https://api.github.com/users/${login}/starred`, {
                    headers: {
                        Authorization: `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`
                    },
                    params: {
                        per_page: 100,
                        page: page
                    }
                }),
                axios.get(`https://api.github.com/users/${login}/starred`, {
                    headers: {
                        Authorization: `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`
                    },
                    params: {
                        per_page: 100,
                        page: page + 1
                    }
                })
            ]);

            // Merge results from both requests
            const reposToAdd = responses.flatMap(response => response.data.map(repo => ({
                name: repo.name,
                owner: repo.owner.login
            })));
            repositories.push(...reposToAdd);
            hasNextPage = responses.some(response => {
                const linkHeader = response.headers.link;
                return linkHeader && linkHeader.includes('rel="next"');
            });

            page += 2;
        }

        return repositories;
    } catch (error) {
        throw error;
    }
}

export {
    get_starred_repos
};
