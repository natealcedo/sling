defmodule Sling.Guardian do
  use Guardian, otp_app: :sling

  alias Sling.Account

  def subject_for_token(user, _claims) do
    {:ok, to_string(user.id)}
  end

  def resource_from_claims(%{"sub" => id}) do
    resource = Account.get_user!(id)
    {:ok, resource}
  end
end
