const core = require('@actions/core');
const github = require('@actions/github');
const giphy=require('@giphy/js-fetch-api');
global.fetch = require("node-fetch");
const {Octokit}=require('@octokit/core');
const { url } = require('inspector');



const gf = new giphy.GiphyFetch('rtRTm960F16bWsnMzUnAbn34EnOHgLM3')
 
// fetch 20 gifs

const getGifs=async ()=>{
  const limit=50;
  const gifs=await gf.search("dogs", {limit: limit })
  const randomIndex=Math.floor(Math.floor(Math.random() * limit) + 1 );
  return gifs.data[randomIndex].images.original.url;
}


const makeComment=async (github_token,url,number,body)=>{
  const octokit=new Octokit({auth:github_token})
  const new_comment = await octokit.request('POST '+url, {    
    issue_number: number,
    body: body
  })
  console.log(new_comment);
}

const run=async ()=>{
  try {  
    const payload = github.context.payload
    const github_token = core.getInput('GITHUB_TOKEN');  
    const context = github.context;
    const senderLogin=payload.sender.login;
    const url=context.payload.pull_request.comments_url.substr(22);
    // const senderLogin="hari";    
    const pull_request_number = context.payload.pull_request.number;
    // const pull_request_number="1";

    const gifURL=await getGifs();
    const attributionURL="https://i.ibb.co/09kYQsj/Poweredby-100px-White-Vert-Logo.png";
    const message= '![image]('+gifURL+') ![image]('+attributionURL+') \n  Hello @'+senderLogin+' , '+
    'That\'s a great improvement to the code. Have a pinch of paitence while the reviewer gets impressed by the changes you made. '+
    'Here are some doggos for company while you are waiting for the merge and marching ahead with your Contributions, '+
    'Stay safe 🚀  .' ;
      

      makeComment(github_token,url,pull_request_number,message);    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
