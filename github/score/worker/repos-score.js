import { parentPort } from 'worker_threads';
import { repos_score } from '../repo-score.js';
// Receive data from the main thread
parentPort.on('message', async ({me,userX}) => {
    try {
        const ReposScoreResult = await repos_score(me, userX);
        parentPort.postMessage(ReposScoreResult);
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
});
