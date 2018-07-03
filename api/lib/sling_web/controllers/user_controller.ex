defmodule SlingWeb.UserController do
  use SlingWeb, :controller

  alias Sling.{Account, Guardian}

  action_fallback(SlingWeb.FallbackController)

  def create(conn, params) do
    case Account.create_user(params) do
      {:ok, user} ->
        {:ok, token, _} = Guardian.encode_and_sign(user)

        conn
        |> put_status(201)
        |> render("user.json", user: user, jwt: token)

      {:error, changeset} ->
        conn
        |> put_status(400)
        |> render(SlingWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
