class PostsController < ApplicationController
  before_action :authenticate_user
  before_action :authorize_update, only: [:update, :destroy]

  def index
    posts = Post.all
    render json: posts, status: 200
  end

  def show
    post = Post.find params[:id]
    user = post.user :include => [:name]
    render json: post, status: 200
  end

  def create
    post = Post.new(post_params)
    if post.save
      payload = {
        post: post
      }
      render json: payload, status: 201
    else
      render json: {errors: post.errors}, status: 422
    end
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: post, status: 200
    end
  end

  def destroy
    post = Post.find(params[:id])
    if post.destroy
      post.deleted_at = Time.now
      render json: { msg: "Post has been deleted." }, status: 200
    end
  end

  private

  def post_params
    params.require(:post).permit(:user_id, :image_url, :comment)
  end

  def authorize_update
    post = Post.find(params[:id])
    render json: { msg: "Invalid user." }, status: 401 unless current_user && (current_user.is_admin? || current_user.id.to_s == post.user_id.to_s)
  end
end
