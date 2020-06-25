class UsersController < ApplicationController
  before_action :authenticate_user, only: [:index, :show, :show_name, :update, :destroy]
  before_action :authorize_as_admin, only: [:index, :destroy]
  before_action :authorize_update, only: [:show, :update]

  def index
    users = User.all
    render json: users, status: 200
  end

  def show
    user = User.find params[:id]
    render json: user, status: 200
  end

  def show_name
    user_name = {
      user_name: (User.find params[:id]).name
    }
    render json: user_name, status: 200
  end

  def create
    user = User.new(user_params)
    if user.save
      token = Knock::AuthToken.new(payload: { sub: user.id }).token
      payload = {
        user: user,
        jwt: token
      }
      render json: payload, status: 201
      user.update!(last_login: Time.now)
    else
      render json: {errors: user.errors}, status: 422
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user, status: 200
    end
  end

  def destroy
    user = User.find(params[:id])
    if user.destroy
      user.deleted_at = Time.now
      render json: { msg: "User has been deleted." }, status: 200
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role, :last_login)
  end

  def authorize_as_admin
    render json: { msg: "Invalid user." }, status: 401 unless current_user && current_user.is_admin?
  end

  def authorize_update
    render json: { msg: "Invalid user." }, status: 401 unless current_user && current_user.can_modify_user?(params[:id])
  end
end
