class SetlistsController < ApplicationController
  def index
    @setlists = Setlist.all.includes(:setlist_items)
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end
end
