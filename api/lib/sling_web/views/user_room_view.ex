defmodule SlingWeb.UserRoomView do
  use SlingWeb, :view
  alias SlingWeb.UserRoomView

  def render("index.json", %{user_rooms: user_rooms}) do
    %{data: render_many(user_rooms, UserRoomView, "user_room.json")}
  end

  def render("show.json", %{user_room: user_room}) do
    %{data: render_one(user_room, UserRoomView, "user_room.json")}
  end

  def render("user_room.json", %{user_room: user_room}) do
    %{id: user_room.id}
  end
end
