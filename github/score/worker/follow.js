import { parentPort } from 'worker_threads';
import { check_follow } from '../../checkers/check-follow.js';
// Receive data from the main thread
parentPort.on('message', async ({me,userX}) => {
    try {
        const followResult = await check_follow(me, userX);
        parentPort.postMessage(followResult);
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
});
