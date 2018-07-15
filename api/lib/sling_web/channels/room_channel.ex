defmodule SlingWeb.RoomChannel do
  use SlingWeb, :channel
  alias Sling.Chat

  def join("rooms:" <> room_id, _params, socket) do
    room = Chat.get_room!(room_id)

    response = %{
      room: Phoenix.View.render_one(room, SlingWeb.RoomView, "room.json")
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end
