class SetlistItem < ApplicationRecord
  belongs_to :setlist

  validates :song_title, presence: true
  validates :position, presence: true, numericality: { only_integer: true }
end
