require 'json'

class MemoryInfosController < ApplicationController

  def memories
    if session[:user_id]
      @user = User.find(session[:user_id])
      @memories = MemoryInfo.all(:select => "id, lng, lat, address, mdate, content", :conditions => {:user_id => session[:user_id]}, :order => 'mdate')
      @json = @memories.collect {|mem| JSON(mem.to_json)['memory_info']}.to_json
    else
      @json = [].to_json
    end
  end

  def mcreate
    if request.post?
      memory = JSON params[:memory]
      @memory = MemoryInfo.new(memory)
      @memory.user_id = session[:user_id]
      if @memory.save
        render :json => JSON(@memory.to_json)['memory_info'].to_json, :status => 200
      else
        render :json => JSON(@memory.to_json)['memory_info'].to_json, :status => 500
      end
    end
  end

  def memories_to_json
    if session[:user_id]
      @user = User.find(session[:user_id])
      @memories = MemoryInfo.all(:select => "id, lng, lat, address, mdate, content", :conditions => {:user_id => session[:user_id]}, :order => 'mdate')
      @json = @memories.collect {|mem| JSON(mem.to_json)['memory_info']}.to_json
    else
      @json = [].to_json
    end
    render :status => 200, :json => @json
  end
end
