class Section
  include Cequel::Record

  belongs_to :resume

  key :id, :uuid, auto: true
  column :name, :text
  column :body, :text
  timestamps
end
