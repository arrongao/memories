class LoginController < ApplicationController

  skip_before_filter :login_check, :only => ["index", "registe", "validate_email", "validate_name"]

  def index
    @user = User.new({:gender => '男'})
    if request.post?
      if params[:user] && params[:user][:username] && params[:user][:passwd]
        if (@user = User.find_by_name(params[:user][:username])) && Digest::MD5.hexdigest(params[:user][:passwd]) == @user.passwd
          session[:user_id] = @user.id
          redirect_to memories_url
        else
          flash[:notice] = "用户名或密码错误"
        end
      else 
        flash[:notice] = "用户名或密码不能为空"
      end
    end
  end

  def registe
    @user = User.new
    if request.post?
      @user = User.new(params[:user])
      if @user.save
        session[:user_id] = @user.id
        redirect_to memories_url
      end
    end
  end

  def logout
    reset_session
    redirect_to login_url
  end

  def validate_email
    if params[:user] && params[:user][:email]
      if User.exists?(:email => params[:user][:email])
        render :layout => false, :text => "邮箱已经存在"
        return
      end
    end
    render :layout => false, :text => ''
  end

  def validate_name
    if params[:user] && params[:user][:name]
      if User.exists?(:name => params[:user][:name])
        render :layout => false, :text => "用户名已经存在"
        return
      end
    end
    render :layout => false, :text => ''
  end
end
