import { get_repo_contributors } from "../repository/contributors.js";
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