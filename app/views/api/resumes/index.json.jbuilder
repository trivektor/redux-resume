json.resumes @resumes do |resume|
  json.id resume.id.to_s
  json.title resume.title
  json.description resume.description
end
