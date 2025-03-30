class CreateSetlistItems < ActiveRecord::Migration[7.1]
  def change
    create_table :setlist_items do |t|
      t.string :song_title, null: false
      t.integer :position, null: false
      t.integer :setlist_id, null: false

      t.timestamps
    end
  end
end
