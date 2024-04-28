import { parentPort } from 'worker_threads';
import { check_contribution } from '../check-contribution.js';
parentPort.on('message', async ({login,owner,repoName}) => {
    try {
        const result = await check_contribution(login,owner,repoName);
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
});
