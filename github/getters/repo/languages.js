import axios from "axios";
/**
 * Fetches the languages of a GitHub repository.
 * 
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The name of the repository.
 * @returns {Promise<{name: string, size: number , rate : number , isNotLang : boolean}[]>}The languages used in the repository.
 * @throws {Error} If an error occurs during the HTTP request.
 */
const NOT_LANGUAGES = [
    "Vue",
    "Svelte",
    "Graphql"
]
async function get_repo_languages(owner,repo) {
    try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, {
                headers: {
                    Authorization: `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`
                },
            });
            const { data } = response;
            const [ keys , values ] = [Object.keys(data),Object.values(data)];
            const total = values.reduce((a,b)=>a+b,0);           
            const languages = keys.map((n,i)=>Object.assign({},{
                name : n,
                size : values[i],
                rate : values[i]/total,
                isLang : !NOT_LANGUAGES.includes(n)
            }))
        return languages;
    } catch (error) {
        throw error;
    }
}
export{
  get_repo_languages,
}
