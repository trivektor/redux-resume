class Api::SectionsController < ApplicationController
  def index
    resume = Resume.find params[:resume_id]

    render json: resume.sections
  end

  def create
    resume = Resume.find params[:resume_id]
    resume.sections.destroy_all # HACKY
    params[:sections].to_a.each do |s|
      resume.sections.create(name: s[:name], body: s[:body])
    end
    render json: {status: 'ok'}
  end
end
