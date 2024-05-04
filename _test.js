import dotenv from "dotenv";
dotenv.config();
const AUTH = process.env.AUTH
import { 
    check_starred,
    check_fork,
    check_contribution
 } from "./github/checkers/index.js";
import { get_sponsoring } from "./github/getters/user/sponsoring.js";
import { 
    get_repos,
    get_repos_with_schema
} from "./github/getters/user/repos.js";
//get_sponsoring("sindresorhus").then(e=>console.log(e))
//get_repos("zakarialaoui10",{includeForks:false,sortBy:"stars",limit:4}).then(e=>console.log(e))
async function test(){
    let repos = await get_repos_with_schema("zakarialaoui10",{includeForks:false,sortBy:"stars",limit:3})
    for(let repo in repos){
        repos[repo].star = + await check_starred("mouadizani","zakarialaoui10",repo,AUTH);
        repos[repo].fork = + await check_fork("mouadizani","zakarialaoui10",repo);
        repos[repo].contribute = + await check_contribution("mouadizani","zakarialaoui10",repo);
    }
    return repos
} 
console.time()
test().then(e=>{
    console.log(e)
    console.timeEnd()
})