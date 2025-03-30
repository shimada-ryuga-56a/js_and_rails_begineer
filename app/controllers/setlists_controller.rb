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
    @setlist = Setlist.new(setlist_params)
    @setlist.filter_no_title_items
    p "=" * 50
    p @setlist.setlist_items
    p "=" * 50
    if @setlist.save
      flash[:success] = "セットリストを登録しました。"
      redirect_to setlists_path
    else
      flash.now[:error] = "セットリストの登録に失敗しました。"
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
  end

  private

  def setlist_params
    params.require(:setlist).permit(
      setlist_items_attributes: %i(song_title position)
    )
  end
end
