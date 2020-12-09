const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token', { required: true });
const tag = core.getInput('tag', { required: true });
const body = core.getInput('body', { required: true }); // this can't tell the difference between not-passed and "". It's easy to generate a "" changelog, eg having no PRs in the applicable range. For now avoid this, TODO alter lerna to never emit ""

const repo = {
  owner: github.context.payload.repository.owner.login,
  name: github.context.payload.repository.name
}

const octokit = github.getOctokit(token);

octokit.repos.createRelease({
  ...repo,
  tag_name: tag,
  name: tag,
  body: body,
  draft: true,
});
