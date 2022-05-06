class AuctionController < ApplicationController
    skip_before_action :verify_authenticity_token

    @@history = []
    def index
        render :json => {:history => @@history}
    end
    def create
        if message_params['type'] == 'new auction'
            @@history = [message_params['data']]
        else 
            @@history.push(message_params['data'])
        end
        ActionCable.server.broadcast('auction_channel', message_params)
        head :ok
    end
    private
    def message_params
        params.require(:message).permit(:type, data: [:name, :price, :auctioneer, :timestamp])
    end
end
