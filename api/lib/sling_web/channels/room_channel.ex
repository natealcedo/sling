defmodule SlingWeb.RoomChannel do
  use SlingWeb, :channel
  import Ecto, only: [build_assoc: 3]
  alias Sling.Repo
  alias Sling.Chat

  def join("rooms:" <> room_id, _params, socket) do
    room = Chat.get_room!(room_id)

    page = Chat.list_room_messages(room_id)

    response = %{
      room: Phoenix.View.render_one(room, SlingWeb.RoomView, "room.json"),
      messages: Phoenix.View.render_many(page.entries, SlingWeb.MessageView, "message.json"),
      pagination: SlingWeb.PaginationHelpers.pagination(page)
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def handle_in("new_message", params, socket) do
    changeset =
      socket.assigns.room
      |> build_assoc(:messages, user_id: socket.assigns.current_user.id)
      |> Chat.Message.changeset(params)

    case Repo.insert(changeset) do
      {:ok, message} ->
        broadcast_message(socket, message)
        {:reply, :ok, socket}

      {:error, changeset} ->
        {:reply,
         {:error, Phoenix.View.render(Sling.ChangesetView, "error.json", changeset: changeset)},
         socket}
    end
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end

  defp broadcast_message(socket, message) do
    message = Repo.preload(message, :user)
    rendered_message = Phoenix.View.render_one(message, Sling.MessageView, "message.json")
    broadcast!(socket, "message_created", rendered_message)
  end
end
