defmodule Sling.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :sling,
    module: Sling.Guardian,
    error_handler: Sling.AuthErrorHandler

  plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
  plug(Guardian.Plug.EnsureAuthenticated)
  plug(Guardian.Plug.LoadResource)
end
