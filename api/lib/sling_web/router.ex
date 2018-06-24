defmodule SlingWeb.Router do
  use SlingWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource)
  end

  scope "/api", SlingWeb do
    pipe_through(:api)

    resources("/users", UserController, only: [:create])

    post("/sessions", SessionController, :create)
    delete("/sessions", SessionController, :delete)
    post("/sessions/refresh", SessionController, :refresh)
  end
end
