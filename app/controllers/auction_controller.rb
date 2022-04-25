class AuctionController < ApplicationController
    skip_before_action :verify_authenticity_token

    @@item = nil
    @@bid = nil
    def index
        render :json => {:item => @@item, :bid => @@bid}
    end
    def create
        if message_params['type'] == 'new auction'
            @@item = message_params['data']
        else 
            @@bid = message_params['data']
        end
        ActionCable.server.broadcast('auction_channel', message_params)
        head :ok
    end
    private
    def message_params
        params.require(:message).permit(:type, data: [:name, :price, :auctioneer])
    end
end
