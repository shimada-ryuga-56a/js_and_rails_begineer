Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get "top" => "static_pages#top", as: :top

  # Defines the root path route ("/")
  root "static_pages#top"

  resources :setlists, only: %i[index new create edit update destroy]
  resources :examples, only: %i[new]
end
