class AddRadiusToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :radius, :float
  end
end
