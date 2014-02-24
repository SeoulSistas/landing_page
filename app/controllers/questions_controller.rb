class QuestionsController < ApplicationController

	def new
		@question = Question.new
		@hash = Gmaps4rails.build_markers(@users) do |user, marker|
  		marker.lat user.latitude
  		marker.lng user.longitude
end
	end

	def create
		@question = Question.new(question_params)
		if @question.save
			redirect_to new_email_path
		else
			render 'new'
		end
	end

	def show
		@question = Question.find(params[:id])
	end

	def index
		@questions = Question.all
	end

	private
		def question_params
			params.require(:question).permit(:question, :radius, :longitude, :latitude);
		end
end
