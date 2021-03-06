defmodule SlingWeb.SessionView do
  use SlingWeb, :view

  def render("show.json", %{user: user, jwt: jwt}) do
    render_one(user, SlingWeb.UserView, "user.json", %{user: user, jwt: jwt})
  end

  def render("forbidden.json", %{error: error}) do
    %{error: error}
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
