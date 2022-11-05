module hello_world::main {

  struct Counter has key {
    count: u64,
  }

  public fun get_counter(
    _addr: address,
  ): u64 {
    0
  }
}
