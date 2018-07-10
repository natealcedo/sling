defmodule SlingWeb.RoomController do
  use SlingWeb, :controller

  alias Sling.Chat
  alias Sling.Chat.Room
  alias Sling.Guardian

  action_fallback(SlingWeb.FallbackController)

  def index(conn, _params) do
    rooms = Chat.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)

    with {:ok, room} <- Chat.create_room(params),
         {:ok, _} <- Chat.create_user_room(%{user_id: current_user.id, room_id: room.id}) do
      conn
      |> put_status(201)
      |> render("show.json", room: room)
    else
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(SlingWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def join(conn, %{"id" => room_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    room = Chat.get_room!(room_id)

    case Chat.create_user_room(%{user_id: current_user.id, room_id: room.id}) do
      {:ok, _} ->
        conn
        |> put_status(201)
        |> render("show.json", %{room: room})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(SlingWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "room" => room_params}) do
    room = Chat.get_room!(id)

    with {:ok, %Room{} = room} <- Chat.update_room(room, room_params) do
      render(conn, "show.json", room: room)
    end
  end

  def rooms(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)
    rooms = Chat.list_user_rooms(current_user)
    render(conn, "index.json", %{rooms: rooms})
  end
end
