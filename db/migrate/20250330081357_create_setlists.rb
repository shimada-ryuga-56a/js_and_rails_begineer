class CreateSetlists < ActiveRecord::Migration[7.1]
  def change
    create_table :setlists do |t|

      t.timestamps
    end
  end
end
