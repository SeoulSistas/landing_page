class QuestionsController < ApplicationController

  def new
    @newest_questions = Question.order('created_at desc').limit(10).reverse
    @question = Question.new
    @hash = Gmaps4rails.build_markers(@users) do |user, marker|
      marker.lat user.latitude
      marker.lng user.longitude
    end
  end

  def create
    @question = Question.new(question_params)
    
    # Get current location information using request's IP address
    @question.ip_address = env['HTTP_X_REAL_IP'] ||= env['REMOTE_ADDR']
    loc = Geokit::Geocoders::IpGeocoder.geocode(@question.ip_address)
    if loc.success
      @question.curr_lat = loc.lat
      @question.curr_lng = loc.lng
      if @question.distance_to([loc.lat, loc.lng]) <= @question.radius
        @question.is_asking_about_curr_loc = true
      else
        @question.is_asking_about_curr_loc = false
      end
    end
    
    # Reserve geocode to get location of given lat,lng input
    res = Geokit::Geocoders::GoogleGeocoder.reverse_geocode @question.latitude.to_s + "," + @question.longitude.to_s
    @question.location = res.full_address
        
    if @question.save
	  redirect_to new_email_path
    else
	  render 'new'
    end
  end

  def show
	@question = Question.find(params[:id])
  end

  private
    def question_params
	  params.require(:question).permit(:question, :radius, :longitude, :latitude);
    end
end
