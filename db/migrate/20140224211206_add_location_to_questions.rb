class AddLocationToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :location, :string
  end
end
