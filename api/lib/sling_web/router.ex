defmodule SlingWeb.Router do
  use SlingWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource, allow_blank: true)
  end

  scope "/api", SlingWeb do
    pipe_through(:api)

    resources("/users", UserController, only: [:create])
  end
end
