class SetlistsController < ApplicationController
  def index
    @setlists = Setlist.all.includes(:setlist_items)
  end

  def new
    @setlist = Setlist.new
    20.times do
      @setlist.setlist_items.build
    end
    @setlist.setlist_items.each_with_index do |item, index|
      item.position = index + 1
    end
  end

  def create
  end

  def edit
  end

  def update
  end
end
