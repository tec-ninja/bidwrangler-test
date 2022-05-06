This project is a test for Bid wrangler

1. Environments:
- Ruby 2.7.6
- Node.js 16.13.0

2. Stacks
- Rails
- React
- Material-UI
- Websocket

3. Install
- git clone https://github.com/tec-ninja/bidwrangler-test.git
- cd bidwrangler-test
- bundle install
- npm install

4. Run
- rails s
- dev server url: https://localhost:3000

5. How to test result
- Open browser and go to localhost:3000, log in as auctioneer and create auction
- Open another tab and go to localhost:3000, log in as bidder and see the auction or bid your own price
  You can create as many bidders you like and see how bidding status updates real time 

6. Note to remember
For the simplicity, the followings are assumed:
- there's only one active auction at the moment
- bidder can only bid with the price 100$ greater than the current one
- every bidder has unique name to identify by
