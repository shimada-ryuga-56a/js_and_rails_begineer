class Setlist < ApplicationRecord
  has_many :setlist_items, dependent: :destroy, autosave: :true
  accepts_nested_attributes_for :setlist_items, allow_destroy: true, reject_if: :all_blank

  validates :setlist_items, presence: true

  def filter_no_title_items
    setlist_items.each do |item|
      item.remove_empty_song_title
    end
  end

  def set_position_to_items
    setlist_items.each_with_index do |item, index|
      item.position = index + 1
    end
  end
end
