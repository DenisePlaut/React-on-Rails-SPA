class AddRoleToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :role, :string, null: false, default: 'user'
    add_column :users, :last_login, :datetime
    change_column :users, :email, :string, null: false, index: true, unique: true
  end
end
