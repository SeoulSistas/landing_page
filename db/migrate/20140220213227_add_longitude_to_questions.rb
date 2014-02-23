class AddLongitudeToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :longitude, :float
  end
end
