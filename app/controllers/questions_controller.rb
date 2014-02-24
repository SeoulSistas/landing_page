class QuestionsController < ApplicationController

  def new
    @newest_questions = Question.find(:all, :order => "created_at desc", :limit => 10).reverse
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

  private
    def question_params
	  params.require(:question).permit(:question, :radius, :longitude, :latitude);
    end
end
