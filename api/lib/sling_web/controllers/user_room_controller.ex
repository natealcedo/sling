defmodule SlingWeb.UserRoomController do
  use SlingWeb, :controller

  alias Sling.Chat
  alias Sling.Chat.UserRoom

  action_fallback(SlingWeb.FallbackController)

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)
    user_rooms = Chat.list_user_rooms(current_user)
    render(conn, "index.json", user_rooms: user_rooms)
  end

  # def create(conn, %{"user_room" => user_room_params}) do
  #   with {:ok, %UserRoom{} = user_room} <- Chat.create_user_room(user_room_params) do
  #     conn
  #     |> put_status(:created)
  #     |> put_resp_header("location", user_room_path(conn, :show, user_room))
  #     |> render("show.json", user_room: user_room)
  #   end
  # end

  def show(conn, %{"id" => id}) do
    user_room = Chat.get_user_room!(id)
    render(conn, "show.json", user_room: user_room)
  end

  def update(conn, %{"id" => id, "user_room" => user_room_params}) do
    user_room = Chat.get_user_room!(id)

    with {:ok, %UserRoom{} = user_room} <- Chat.update_user_room(user_room, user_room_params) do
      render(conn, "show.json", user_room: user_room)
    end
  end

  def delete(conn, %{"id" => id}) do
    user_room = Chat.get_user_room!(id)

    with {:ok, %UserRoom{}} <- Chat.delete_user_room(user_room) do
      send_resp(conn, :no_content, "")
    end
  end
end
