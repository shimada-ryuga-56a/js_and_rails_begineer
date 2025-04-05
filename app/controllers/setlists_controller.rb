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
    @setlist = Setlist.includes(:setlist_items).find(params[:id])
  end

  def update
    @setlist = Setlist.find(params[:id])
    ids_for_update = get_ids_for_update
    @setlist.remove_not_included_items(ids_for_update)
    if @setlist.update(setlist_params)
      flash[:success] = "セットリストを更新しました。"
      redirect_to setlists_path
    else
      flash.now[:error] = "セットリストの更新に失敗しました。"
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @setlist = Setlist.find(params[:id])
    if @setlist.destroy
      flash[:success] = "セットリストを削除しました。"
      redirect_to setlists_path
    else
      flash[:error] = "セットリストの削除に失敗しました。"
      redirect_to setlists_path, status: :unprocessable_entity
    end
  end

  private

  def setlist_params
    params.require(:setlist).permit(
      setlist_items_attributes: %i(song_title position id _destroy)
    )
  end

  def get_ids_for_update
    ids_for_update = []
    params[:setlist][:setlist_items_attributes].each do |_, item|
      ids_for_update << item[:id] if item[:id].present?
    end
    ids_for_update
  end
end
