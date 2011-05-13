class CreateMemoryInfos < ActiveRecord::Migration
  def self.up
    create_table :memory_infos do |t|
      t.integer :user_id
      t.string :address
      t.string :content
      t.date :mdate

      t.timestamps
    end
  end

  def self.down
    drop_table :memory_infos
  end
end
