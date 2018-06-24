defmodule SlingWeb.UserView do
  use SlingWeb, :view

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email
    }
  end
end
