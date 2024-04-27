import { get_repo_forkers } from "../repository/forkers.js";
const check_forker=(login,owner,repoName)=>{
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
    check_forker
}
