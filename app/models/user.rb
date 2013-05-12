# encoding: UTF-8

class User < ActiveRecord::Base

  validates_uniqueness_of :name, :message => "用户名已经被占用，换一下吧！"
  validates_presence_of(:name, :message => "用户名不能为空")
  validates_uniqueness_of :email, :message => "邮箱已经被占用，换一下吧！"
  validates_presence_of :email, :message => "邮箱不能为空" 
  validates_presence_of(:passwd, :message => "密码不能为空")
  validates_confirmation_of :passwd, :message => "两次密码输入不一致！"

  def before_save
    self.passwd = Digest::MD5.hexdigest(self.passwd)
  end

end
