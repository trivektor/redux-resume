class Resume
  include Cequel::Record

  key :id, :uuid, auto: true
  column :title, :text
  column :description, :text
  timestamps
end
