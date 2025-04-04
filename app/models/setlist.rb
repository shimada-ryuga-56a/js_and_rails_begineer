class Setlist < ApplicationRecord
  has_many :setlist_items, dependent: :destroy, autosave: :true
  accepts_nested_attributes_for :setlist_items, allow_destroy: true, reject_if: :all_blank

  validates :setlist_items, presence: true
  before_validation :filter_no_title_items
  before_validation :set_position_to_items

  private

  def filter_no_title_items
    setlist_items.each do |item|
      item.remove_empty_song_title
    end
  end

  def set_position_to_items
    index = 1
    setlist_items.each do |item|
      # itemがmark_for_destructionされている場合はpositionを設定しない
      next if item.marked_for_destruction?
      item.position = index
      index += 1
    end
  end
end
