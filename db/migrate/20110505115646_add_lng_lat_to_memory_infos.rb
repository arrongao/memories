class AddLngLatToMemoryInfos < ActiveRecord::Migration
  def self.up
    add_column :memory_infos, :lng, :float
    add_column :memory_infos, :lat, :float
  end

  def self.down
    remove_column :memory_infos, :lng
    remove_column :memory_infos, :lat
  end
end
