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

  def update
    resume = Resume.find params[:id]
    resume.update_attributes(resume_params)

    render json: { status: 'updated' }
  end

  def destroy
    resume = Resume.find params[:id]
    resume.destroy

    render json: { status: 'deleted' }
  end

  private

  def resume_params
    params.require(:resume).permit(:title, :description)
  end
end
