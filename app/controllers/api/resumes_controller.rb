class Api::ResumesController < ApplicationController
  def index
    render json: {resumes: Resume.all}
  end
end
