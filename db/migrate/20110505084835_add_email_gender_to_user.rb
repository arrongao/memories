class AddEmailGenderToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :email, :string
    add_column :users, :gender, :string
  end

  def self.down
    remove_column :users, :email
    remove_column :users, :gender
  end
end
