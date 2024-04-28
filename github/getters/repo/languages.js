import axios from "axios";
/**
 * Fetches the languages of a GitHub repository.
 * 
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The name of the repository.
 * @returns {Promise<object>} The languages used in the repository.
 * @throws {Error} If an error occurs during the HTTP request.
 */
async function get_repo_languages(owner,repo) {
    try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, {
                headers: {
                    Authorization: `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`
                },
            });
        let languages=response.data;
        return languages;
    } catch (error) {
        throw error;
    }
}
export{
  get_repo_languages,
}
