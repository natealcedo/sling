defmodule SlingWeb.Router do
  use SlingWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :jwt_authenticated do
    plug(Sling.Guardian.AuthPipeline)
  end

  scope "/api", SlingWeb do
    pipe_through(:api)

    resources("/users", UserController, only: [:create])
    post("/sessions", SessionController, :create)
  end

  scope "/api", SlingWeb do
    # pipe_through([:api, :jwt_authenticated])

    pipe_through(:api)
    delete("/sessions", SessionController, :delete)
    post("/sessions/refresh", SessionController, :refresh)
    resources("/rooms", RoomController, except: [:new, :edit])
  end
end
