const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token', { required: true });
const tag = core.getInput('tag', { required: true });
const body = core.getInput('body', { required: true });

//const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');

const octokit = github.getOctokit(token);

octokit.repos.createRelease({
    ...context.repo,
  // owner: repoOwner,
  // repo: repoName,
    tag_name: tag,
  name: tag,
  body: body,
    draft: true,
});
