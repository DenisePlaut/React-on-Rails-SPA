Rails.application.routes.draw do
  resources :users, defaults: {format: :json}
  get 'user_name/:id', to: 'users#show_name'
  post 'user_token', to: 'user_token#create'
  resources :posts, defaults: {format: :json}
  root 'pages#index'
  match '*path', to: 'pages#index', via: :all
end
