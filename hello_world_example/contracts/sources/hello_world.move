module hello_world::hello_world {

  struct Counter has key {
    count: u64,
  }

  public fun get_counter(
    _addr: address,
  ): u64 {
    0
  }
}
