class AddLatitudeToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :latitude, :float
  end
end
