import { get_repo_languages } from "./github/getters/index.js";
// import { 
//     check_follow,
//     check_starred,  
//  } from "./github/user/index.js";
// import { weights } from "./github/score/wieghts.js";
// import { get_repo_contributors } from "./github/repository/contributors.js";
// import { check_forker } from "./github/user/check-fork.js";
// // check_follow("zakarialaoui10","mouadziani").then(e=>console.log(e))
// //get_repos("zakarialaoui10",{includeForks:false},"stars").then(e=>console.log(e))
// //get_starred_repos("zakarialaoui10").then(e=>console.log(e))

// //weights("zakarialaoui10").then(e=>console.log(e))

// //get_repo_contributors("zakarialaoui10","ziko.js").then(e=>console.log(e))

// check_forker("zakarialaouiETU","zakarialaoui10","ziko.js").then(e=>console.log(e))

get_repo_languages("zakarialaoui10","ziko.js").then(e=>console.log(e))