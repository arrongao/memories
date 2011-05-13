class AddPasswdToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :passwd, :string
  end

  def self.down
    remove_column :users, :passwd
  end
end
