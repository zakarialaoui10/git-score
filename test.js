import { Score } from "./github/score/score.js";
const s=new Score("zakarialaoui10","ABDELLK-ai")
console.time()
s.init().then(e=>{
    console.log(e.score)
    console.timeEnd()
})
