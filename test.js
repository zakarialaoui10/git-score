import { check_fork } from "./github/checkers/index.js"
import { check_starred } from "./github/checkers/index.js"
import { check_contribution } from "./github/checkers/index.js"

console.time()
//check_fork("zakarialaouiETU","zakarialaoui10","ziko.js").then(e=>console.log(e)).then(()=>console.timeEnd())
check_starred("zakarialaouiETU","zakarialaoui10","ziko.js").then(e=>console.log(e)).then(()=>console.timeEnd())
//check_contribution("zakarialaouiETU","zakarialaoui10","ziko.js").then(e=>console.log(e)).then(()=>console.timeEnd())


