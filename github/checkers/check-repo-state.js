import { Worker } from 'worker_threads';
const check_repo_state=async (login,owner,repoName)=>{
    try {
        const StarWorker = new Worker('./github/checkers/worker/star.js', { type: 'module' });
        const ForkWorker = new Worker('./github/checkers/worker/fork.js', { type: 'module' });
        const ContributionWorker = new Worker('./github/checkers/worker/contribution.js', { type: 'module' });
        const StarPromise = new Promise((resolve, reject) => {
            StarWorker.on('message', message => {
                if (message.error) {
                    reject(new Error(message.error));
                } else {
                    resolve(message);
                }
            });
            StarWorker.on('error', error => reject(error));
        });
        const ForkPromise = new Promise((resolve, reject) => {
            ForkWorker.on('message', message => {
                if (message.error) {
                    reject(new Error(message.error));
                } else {
                    resolve(message);
                }
            });
            ForkWorker.on('error', error => reject(error));
        });
        const ContributionPromise = new Promise((resolve, reject) => {
            ContributionWorker.on('message', message => {
                if (message.error) {
                    reject(new Error(message.error));
                } else {
                    resolve(message);
                }
            });
            ContributionWorker.on('error', error => reject(error));
        });
        StarWorker.postMessage({ login , owner , repoName});
        ForkWorker.postMessage({ login , owner , repoName});
        ContributionWorker.postMessage({ login , owner , repoName});
    
        const [
            star, 
            fork,
            contribution
        ] = await Promise.all([
            StarPromise,
            ForkPromise,
            ContributionPromise
        ]);
        return{
            star,
            fork,
            contribution
        }
    }
    catch(err){
        console.error(err)
    }
}
export{
    check_repo_state
}