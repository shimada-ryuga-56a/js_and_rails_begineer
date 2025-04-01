class SetlistItem < ApplicationRecord
  belongs_to :setlist

  validates :song_title, presence: true, length: { minimum: 2 }
  validates :position, presence: true, numericality: { only_integer: true }

  def remove_empty_song_title
    if song_title.blank?
      self.mark_for_destruction
      Rails.logger.info "削除しました"
    end
  end
end
