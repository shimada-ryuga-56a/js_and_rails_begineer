class Setlist < ApplicationRecord
  has_many :setlist_items, dependent: :destroy, autosave: :true
  accepts_nested_attributes_for :setlist_items, allow_destroy: true, reject_if: :all_blank

  validates :setlist_items, presence: true
  before_validation :filter_no_title_items
  before_validation :set_position_to_items

  # remove_not_included_itemsの定義
  def remove_not_included_items(ids_for_update)
    setlist_items.each_with_index do |item, index|
      # itemがmark_for_destructionされている場合は削除しない
      next if item.marked_for_destruction?
      # itemがparamsに含まれていない場合は削除する
      unless ids_for_update.include?(item.id.to_s)
        item.mark_for_destruction
        Rails.logger.info "削除しました"
      end
    end
  end

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
