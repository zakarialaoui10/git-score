import { get_repo_forkers } from "../getters/forkers.js";
/**
 * Checks if a given repository has been forked by a specific user.
 * 
 * @param {string} login - The username of the user whose forks are being checked.
 * @param {string} owner - The owner of the repository.
 * @param {string} repoName - The name of the repository.
 * @returns {Promise<boolean>} A promise that resolves to true if the repository has been forked by the user, false otherwise.
 * @throws {Error} If an error occurs during the process.
 */
const check_fork=(login,owner,repoName)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const forkers = await get_repo_forkers(owner,repoName);
            const forkerFound = forkers.find(forker => forker === login);
            if (forkerFound) {
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
    check_fork
}
