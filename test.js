import { 
    check_follow,
    all_repos,
    get_starred_repos,
    check_starred,  
 } from "./github/user/index.js";

// check_follow("zakarialaoui10","mouadziani").then(e=>console.log(e))
// all_repos("zakarialaoui10",{includeForks:false},"stars").then(e=>console.log(e))
get_starred_repos("zakarialaoui10").then(e=>console.log(e))