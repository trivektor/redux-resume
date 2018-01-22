json.resume do
  json.id @resume.id.to_s
  json.title @resume.title
  json.description @resume.description
  json.sections @resume.sections
end
