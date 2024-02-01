#!/usr/bin/env node
const { Command } = require('commander');


//all query and mution imports 
const {publishBlog} = require('./mutations/publishBlog')
const{firstQuestion} = require('./mutations/github')

const program = new Command();


program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name() 
});

//Publish a blog 
program
  .command('publish')
  .description('publish a blog')
  .action(publishBlog)
  
  
program
  .command('github')
  .description('Import blog from github repository')
  .action(firstQuestion)
  
  
program.parse(process.argv);
//hashnode 617f056b-17d1-441b-b311-4e5b61987172 https://kishar.hashnode.dev


