defmodule SlingWeb.UserView do
  use SlingWeb, :view

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email
    }
  end

  def render("show.json", %{user: user, jwt: jwt}) do
    %{
      data: render_one(user, __MODULE__, "user.json"),
      meta: %{token: jwt}
    }
  end

  def render("error.json", _) do
    %{error: "Invalid email or password"}
  end
end
