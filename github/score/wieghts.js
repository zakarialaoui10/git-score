import { get_repos } from "../getters/user/repos.js";
const weights = async (login,{ includeForks = false, includeSources = true }={}) => {
    const repos = await get_repos(login , { includeForks, includeSources });
    const weights = [];
    for (let i = 0; i < repos.length; i++) {
        weights[i]={
            name : repos[i],
            weights:{
                star:1,
                fork:1,
                contribute:1
            }
        }
    }
    return {
        follow:1,
        sponsor:1,
        repos:weights
    };
} 
export {
    weights
}