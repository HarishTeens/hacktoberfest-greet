const core = require('@actions/core');
const github = require('@actions/github');
const giphy=require('@giphy/js-fetch-api');
global.fetch = require("node-fetch");
const {Octokit}=require('@octokit/core');
const { url } = require('inspector');



const gf = new giphy.GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')
 
// fetch 20 gifs

const getGifs=async ()=>{
  const limit=20;
  const gifs=await gf.search("dogs", {limit: limit })
  const randomIndex=Math.floor(Math.floor(Math.random() * 6) + 1 );
  return gifs[randomIndex].images.original.url;
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
    const message= '![image]('+gifURL+') \n  Hello '+senderLogin+' , '+
      'Thanks for your Commits, keep it rolling and be patient until a Reviewer merges it. '+ 
      'Until then hope this doggy keeps you company 🚀  . ';
      makeComment(github_token,url,pull_request_number,message);    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();