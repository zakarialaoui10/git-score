import { parentPort } from 'worker_threads';
import { check_fork } from '../check-fork.js';
parentPort.on('message', async ({login,owner,repoName}) => {
    try {
        const result = await check_fork(login,owner,repoName);
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
});
