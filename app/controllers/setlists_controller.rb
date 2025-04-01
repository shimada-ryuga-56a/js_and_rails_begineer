class SetlistsController < ApplicationController
  def index
    @setlists = Setlist.all.includes(:setlist_items).order(id: :desc)
  end

  def new
    @setlist = Setlist.new
    @setlist.setlist_items.build
  end

  def create
    @setlist = Setlist.new(setlist_params)
    @setlist.filter_no_title_items
    @setlist.set_position_to_items
    if @setlist.save
      flash[:success] = "セットリストを登録しました。"
      redirect_to setlists_path
    else
      @setlist.setlist_items.build if @setlist.setlist_items.empty?
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
