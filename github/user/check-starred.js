import { get_starred_repos } from "../repository/stargazers.js";
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

// // TEST 2
// check_starred("zakarialaoui10","zakarialaoui10","ziko.js").then(
//   e=>console.log(e)
// )


export{
  check_starred
}
