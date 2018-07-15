defmodule SlingWeb.UserSocket do
  use Phoenix.Socket
  alias Sling.Guardian

  channel("rooms:*", Sling.RoomChannel)

  transport(:websocket, Phoenix.Transports.WebSocket)

  def connect(%{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      {:ok, _claims} ->
        case Sling.Guardian.resource_from_token(token) do
          {:ok, user, _claims} ->
            {:ok, assign(socket, :current_user, user)}

          {:error, _reason} ->
            :error
        end

      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socket), do: :error

  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}"
end
