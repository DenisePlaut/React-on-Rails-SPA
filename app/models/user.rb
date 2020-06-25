class User < ApplicationRecord
  acts_as_paranoid
  has_secure_password
  has_many :posts, dependent: :destroy

  before_validation {
    (self.email = self.email.to_s.downcase)
  }

  validates_presence_of :name, :email
  validates :email, email: true
  validates_uniqueness_of :email, conditions: -> { with_deleted }
  validates_length_of :name, maximum: 50
  validates_length_of :password, maximum: 72, minimum: 8, allow_nil: true, allow_blank: false
  validates_confirmation_of :password, allow_nil: true, allow_blank: false

  def can_modify_user?(user_id)
    role == 'admin' || id.to_s == user_id.to_s
  end

  def is_admin?
    role == 'admin'
  end
end
