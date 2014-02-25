class AddCurrLocToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :curr_lat, :float
    add_column :questions, :curr_lng, :float
    add_column :questions, :is_asking_about_curr_loc, :boolean
    add_column :questions, :ip_address, :string
  end
end
