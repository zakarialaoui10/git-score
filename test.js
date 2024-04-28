import { Score } from "./github/score/score.js"
import { check_repo_state } from "./github/checkers/check-repo-state-clutser.js";
// let a=new Score("zakarialaoui10","mouadziani");
// a.init().then(e=>console.log(e))

check_repo_state("mouadziani","zakarialaoui10","ziko.js").then(e=>console.log(e))