defmodule SlingWeb.SessionController do
  use SlingWeb, :controller

  alias Sling.{Account, Guardian}

  def create(conn, params) do
    case authenticate_user(params) do
      {:ok, user} ->
        {:ok, token, _} = Guardian.encode_and_sign(user)

        conn
        |> put_status(200)
        |> render("show.json", user: user, jwt: token)

      :error ->
        conn
        |> put_status(401)
        |> render("forbidden.json", error: "Not authenticated")
    end
  end

  def delete(conn, _) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke(jwt)

    conn
    |> put_status(200)
    |> render("delete.json")
  end

  defp authenticate_user(%{"email" => email, "password" => password}) do
    user = Account.get_user_by_email(email)

    case check_password(user, password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> Comeonin.Bcrypt.dummy_checkpw()
      _ -> Comeonin.Bcrypt.checkpw(password, user.password_hash)
    end
  end
end
