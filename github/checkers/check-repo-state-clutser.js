import { fork, isMaster, Worker } from 'cluster';
import { 
    check_starred,
    check_fork,
    check_contribution
 } from './index.js';
const check_repo_state = async (login, owner, repoName) => {
    let starred = await check_starred(login, owner, repoName);
    let fork = await check_fork(login, owner, repoName);
    let contribution = await check_contribution(login, owner, repoName);

    return {
        starred,
        fork,
        contribution
    }
};

export { check_repo_state };
