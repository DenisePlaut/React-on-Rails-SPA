require 'rails_helper'

RSpec.describe User, type: :model do
    it "should have secure password" do
      user = User.create(
        name: 'Bob',
        email: 'bob@example.com',
        password: 'secretpassword',
        password_confirmation: 'secretpassword'
      )
      expect(user.save).to be true
      expect(user.authenticate('not-secret')).to be false
  end

  it "should fail on bad password confirmation" do
    user = User.create(
      name: 'Jill',
      email: 'jill@example.com',
      password: 'secretpassword',
      password_confirmation: 'wrongpassword'
    )
    expect(user.save).to be false
  end

  it "should succeed on good password confirmation" do
    user = User.create(
      name: 'Jill',
      email: 'jill@example.com',
      password: 'secretpassword',
      password_confirmation: 'secretpassword'
    )
    expect(user.save).to be true
  end
end
