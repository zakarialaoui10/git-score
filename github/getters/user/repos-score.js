import { 
    check_starred,
    check_fork,
    check_contribution
 } from "../../checkers/index.js";
import dotenv from "dotenv";
dotenv.config();
const AUTH = process.env.AUTH
import { get_repos_with_schema } from "../getters/user/repos.js";
const repos_score=async(owner="zakarialaoui10",userX="mouadziani")=>{
    let repos = await get_repos_with_schema(owner,{includeForks:false,sortBy:"stars",limit:3})
    for(let repo in repos){
        repos[repo].star = + await check_starred(userX,owner,repo,AUTH);
        repos[repo].fork = + await check_fork(userX,owner,repo);
        repos[repo].contribute = + await check_contribution(userX,owner,repo);
    }
    return repos
} 
export {
    repos_score
}