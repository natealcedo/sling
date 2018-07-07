defmodule SlingWeb.UserView do
  use SlingWeb, :view

  def render("user.json", %{user: user, jwt: jwt}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,
      meta: %{
        jwt: jwt
      }
    }
  end
end
