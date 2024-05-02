// import { Score } from "./github/score/score.js"
// import { check_repo_state } from "./github/checkers/check-repo-state-clutser.js";
// import { weights } from "./github/score/wieghts.js"
// // let a=new Score("zakarialaoui10","mouadziani");
// // a.init().then(e=>console.log(e))

// //check_repo_state("mouadziani","zakarialaoui10","ziko.js").then(e=>console.log(e))
// weights("zakaeialaoui10").then(e=>console.log(e))

import { get_sponsoring } from "./github/getters/user/sponsoring.js";
get_sponsoring("sindresorhus").then(e=>console.log(e))