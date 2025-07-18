Rails.application.routes.draw do
  namespace :api do
    resources :exercises, only: [:index]
  end
end