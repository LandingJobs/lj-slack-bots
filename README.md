# landing.jobs slack 🤖🤖🤖

## our 🤖🤖🤖

### weekndBot

this 🤖 wants you to share your amazing weekend with _everyone_ :) sooo cute

### steveBot

this 🤖 wants you talk to random people, _even if you don't want to_. the 🤖 really really wants you to do it

## contributing

to build new bots, just:

1. add a file under `src/bots` that does whatever you want!
2. add the corresponding bot entry to `src/bots/index.ts` (when you see it it will be easy to understand i hope)
3. done! your bot is registered

## deploying

this repo is linked to [heroku](https://dashboard.heroku.com/apps/lj-slack-bots), and has auto deploys turned on. so simply commiting (and pushing) to `main` will deploy your bot to prod (⚠️⚠️⚠️)

## known issues

sometimes, for some reason, redis complains about to many clients (and breaks the bots).
in this case, go to [heroku](https://dashboard.heroku.com/apps/lj-slack-bots) and "reset all dynos" (i know...). this is a tempo solution, and this should be fixed some time in the future (something like killing connections when the job is done?)
