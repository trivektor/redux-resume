class Resume
  include Cequel::Record
  key :id, :timeuuid, auto: true
  column :title, :text
  column :description, :text
end
