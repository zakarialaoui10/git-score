import axios from "axios";
import {load} from "cheerio"
const get_sponsoring= async (login)=>{
   try {
    const { data : html } = await axios.get(`https://github.com/${login}?tab=sponsoring`);
    const $ = load(html);
    const element = $("#user-profile-frame > div > div > div")
     const arr = [];
     element.children().each((index, child) => {
         if (index === 0) return;
         const sponsoring = $(child).children().eq(1).children().eq(0).children().eq(1).text().trim();
         arr.push(sponsoring);
     });
     return arr;
   }
   catch(error) {
      console.error('Error fetching page:', error);
      return [];
   }
}
// const is_sponsored_by=async (userX,userY)=>{

// }
const is_sponsored_by=(sponsored,sponsor)=>{
   return new Promise(async (resolve, reject) => {
       try {
           const sponsoring = await get_sponsoring(sponsor);
           const sponsorFound = sponsoring.find(user => user = sponsored);
           if (sponsorFound) {
               resolve(true);
           } else {
               resolve(false);
           }
       } catch (error) {
           reject(error);
       }
   });
}
//get_sponsoring("sindresorhus").then(e=>console.log(e))
is_sponsored_by("simonbs","sindresorhus").then(e=>console.log(e))