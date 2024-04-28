import { get_starred_repos } from "../getters/stargazers.js";
/**
 * Checks if a user has starred a specific repository.
 * 
 * @param {string} login - The username of the user whose starred repositories are being checked.
 * @param {string} owner - The owner of the repository.
 * @param {string} repoName - The name of the repository.
 * @returns {Promise<boolean>} A promise that resolves to true if the user has starred the repository, false otherwise.
 * @throws {Error} If an error occurs during the process.
 */
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
export{
  check_starred
}
