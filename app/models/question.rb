class Question < ActiveRecord::Base
    # Geokit mappable
    acts_as_mappable :lat_column_name => :latitude,
                     :lng_column_name => :longitude
        
    validates :question, presence:true
     
end
