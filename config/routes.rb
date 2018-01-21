Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :resumes, only: [:index, :create, :show, :destroy]
  end
  root to: 'home#index'
  get '*path', to: 'home#index'
end
