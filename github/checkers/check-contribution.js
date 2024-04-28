import { get_repo_contributors } from "../getters/repo/contributors.js";
/**
 * Checks if a specific user has contributed in a given repository.
 * 
 * @param {string} login - The username of the user to check for contribution.
 * @param {string} owner - The owner of the repository.
 * @param {string} repoName - The name of the repository.
 * @returns {Promise<boolean>} A promise that resolves to true if the user has contributed, false otherwise.
 * @throws {Error} If an error occurs during the process.
 */
const check_contribution=(login,owner,repoName)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const contributors = await get_repo_contributors(owner,repoName);
            const userFound = contributors.find(user => user.login === login);
            if (userFound) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}
export{
    check_contribution
}