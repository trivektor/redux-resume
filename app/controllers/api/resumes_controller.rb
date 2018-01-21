class Api::ResumesController < ApplicationController
  def index
    @resumes = Resume.all
  end

  def show
    @resume = Resume.find params[:id]
  end

  def create
    @resume = Resume.create(resume_params)
  end

  private

  def resume_params
    params.require(:resume).permit(:title, :description)
  end
end
