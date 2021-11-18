# Garden Server

Git Team Rules:

- git fetch early and often.
- Make sure you know who's code may be affected by your work.
- Communicate with the team when beginning a merge.
- Always fetch the latest Remote changes before working with your code.

## Git Branches

### Main branch (protected)

For deployed code only. Team Push.

### Dev Branch (2 person review)

Two people required for merge. Always have code reviewed and tested before merging.

#### Merging Locally

(fist draft)

```javascript

 // on local working branch:
 // Check your local branch is up to date with remote
 $(myLocalBranch)> git fetch

 // Merge or Rebase your local branch with your updated local Dev
 $(myLocalBranch)> git merge origin/dev or git rebase origin/main
 // Make sure there are no problems and fix merge issues here locally
 // Test code

 // If time has passed double check there have not been any changes.
 $(myLocalBranch)> git fetch // make sure there are no changes


// ACP and Push
$(myLocalBranch)> git commit -am 'very succinct but clear message'
$(myLocalBranch)> git push

 // Notify team member and create PR request.
```

### Common Git Command Shortcuts

```javascript
  git fetch // First thing always
  git log --oneline -20
  git log --graph --oneline --all --decorate

  git tag -ln   // shows a list of tags with descriptions

  git branch -d <branch to delete> // will not delete unmerged branch.  Safe

  git branch -D <branch to delete> // UNSAFE all changes lost

  git remote prune origin --dry-run

```

### readme-updates

readme-updates for pushing README edits as needed. Only for Readme file edits that do not change code.

## NPM Scripts

npm run start

> Starts nodemon server

npm run tree

> Displays directory tree from root. (must have [Tree](https://formulae.brew.sh/formula/tree) installed)

### REST CLIENT

Requires the Rest Client vsCode extension.

In the REST_client.http file make a new route by adding '###' to separate the HTTP requests.

```javascript

###
GET http://localhost:3001/test

```

### Data Schema Gsheet

[Data Schema Gsheet](https://docs.google.com/spreadsheets/d/1Ix7OOjQ5SlAX6yiYTgi-q5pZmCnJ6EE_KQenoerRTnQ/edit?usp=sharing)

Outline for mongoose data Schema.
