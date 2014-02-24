class Question < ActiveRecord::Base
	validates :question, presence:true
    
    reverse_geocoded_by :latitude, :longitude,
      :address => :location
    after_validation :reverse_geocode 
end
