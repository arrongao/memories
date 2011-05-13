class ChangeMdateToString < ActiveRecord::Migration
  def self.up
    change_column :memory_infos, :mdate, :string
  end

  def self.down
    change_column :memory_infos, :mdate, :string
  end
end
