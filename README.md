# FE Challenge

We are building a SPA for a client who wants to see candidates for their Dungeons and Dragons campaign. They’ve got a lot of interest.

## Step 1: Prepare the data for the ClassInfoTable

In `CandidatesView` component we are currently mocking the props being sent to the `ClassInfoTable`. Please help us figure out how to transform and aggregate the candidates data into the format we want to pass to the `ClassInfoTable`. 

## Step 2: Add a feature to filter by class type

The client would like to be able to filter the list by the class name. Please implement a feature so that when the user clicks on the class name in the `ClassInfoTable`; the candidates in the `CandidatesList` are filtered to only show candidates of the chosen class.

## Step 3: Improve performance

The client informed us that they have to change the api to send all 50000 candidates at a time 🤦This is causing the page to be slow and sluggish. Please look at where you can improve performance on the page to handle this volume of data.

Go into `server/index.cjs` and update the `CANDIDATE_COUNT` variable to 50000; and then restart the node server.

## Running
- install dependencies `yarn`
- start the server: `node ./server/index.cjs`, server available at http://localhost:3003
- start the client: `yarn client`, client available at http://localhost:5173
- start tests: `yarn test`, can see test output in the terminal
