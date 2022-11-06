module fungible_token::tfx_token {

  struct TfxToken {}

  fun init_module(sender: &signer) {
    aptos_framework::managed_coin::initialize<TfxToken>(
      sender,
      b"T-Force Token",
      b"TFX",
      6,
      false,
    );
  }
}
