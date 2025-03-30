class Setlist < ApplicationRecord
  has_many :setlist_items, dependent: :destroy
  accepts_nested_attributes_for :setlist_items, allow_destroy: true, reject_if: :all_blank
end
