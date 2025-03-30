class Setlist < ApplicationRecord
  has_many :setlist_items, dependent: :destroy
end
