import dotenv from "dotenv";
dotenv.config();
const AUTH = process.env.AUTH
import { check_starred } from "./github/checkers/check-starred.js";
import { get_sponsoring } from "./github/getters/user/sponsoring.js";
import { get_repos } from "./github/getters/user/repos.js";
//get_sponsoring("sindresorhus").then(e=>console.log(e))
let cache={}
get_repos("zakarialaoui10",{includeForks:false}).then(
    repos=>repos.map(repo=>check_starred("mouadizani","zakarialaoui10",repo,AUTH).then
    (e=>{
        Object.assign(cache,{[repo]:+e});
        console.log(cache)
    }))
)