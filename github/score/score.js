import { 
    check_follow,
    is_sponsored_by
} from "../checkers/index.js";
import { Worker } from 'worker_threads';
import { repos_score } from "./repo-score.js";
class Score {
    constructor(me,userX){
        this.me=me,
        this.userX=userX;
        this.score = {
            follow : null,
            sponsor : null,
            repos : null
        }
        //this.init();
    }
    async init(){
        const follow = + (await check_follow(this.me,this.userX));
        const sponsor = + (await is_sponsored_by(this.me,this.userX));
        const repos = await repos_score(this.me,this.userX);
        Object.assign(this.score,{
            follow ,
            sponsor , 
            repos 
        })
        return this;
    }
    async WorkerInit() {
        try {
            const followWorker = new Worker('./github/score/worker/follow.js', { type: 'module' });
            const sponsorWorker = new Worker('./github/score/worker/sponsor.js', { type: 'module' }); 
            const reposScoreWorker = new Worker('./github/score/worker/repos-score.js', { type: 'module' });    
            const followPromise = new Promise((resolve, reject) => {
                followWorker.on('message', message => {
                    if (message.error) {
                        reject(new Error(message.error));
                    } else {
                        resolve(message);
                    }
                });
                followWorker.on('error', error => reject(error));
            });
            followWorker.postMessage({ me: this.me, userX: this.userX });
            const sponsorPromise = new Promise((resolve, reject) => {
                sponsorWorker.on('message', message => {
                    if (message.error) {
                        reject(new Error(message.error));
                    } else {
                        resolve(message);
                    }
                });
                sponsorWorker.on('error', error => reject(error));
            }); 
            sponsorWorker.postMessage({ me: this.me, userX: this.userX });
            const reposScorePromise = new Promise((resolve, reject) => {
                reposScoreWorker.on('message', message => {
                    if (message.error) {
                        reject(new Error(message.error));
                    } else {
                        resolve(message);
                    }
                });
                reposScoreWorker.on('error', error => reject(error));
            });     
            reposScoreWorker.postMessage({ me: this.me, userX: this.userX });
    
            const [followResult, sponsorResult,reposScoreResult] = await Promise.all([followPromise, sponsorPromise, reposScorePromise]);
    
            this.score = {
                follow: +followResult,
                sponsor: +sponsorResult,
                repos: reposScorePromise
            };
    
            followWorker.terminate();
            sponsorWorker.terminate();
    
            return this;
        } catch (error) {
            // Handle errors appropriately
            console.error('Error occurred:', error);
            return null;
        }
    }
    
}
export { Score }