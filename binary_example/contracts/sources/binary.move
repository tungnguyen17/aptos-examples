module program::binary {

  use std::bcs;
  use std::signer;
  use std::vector;

  struct Serialization has key {
    address_value: address,
    address_bytes: vector<u8>,
    bool_value: bool,
    bool_bytes: vector<u8>,
    u8_value: u8,
    u8_bytes: vector<u8>,
    u64_value: u64,
    u64_bytes: vector<u8>,
    u128_value: u128,
    u128_bytes: vector<u8>,
  }

  public entry fun store_address(
    account: signer,
    value: address,
  ) acquires Serialization {
    let addr = signer::address_of(&account);

    if (exists<Serialization>(addr)) {
      let serialized = borrow_global_mut<Serialization>(addr);
      serialized.address_value = value;
      serialized.address_bytes = bcs::to_bytes(&value);
    } else {
      let serialized = new_serialization();
      serialized.address_value = value;
      serialized.address_bytes = bcs::to_bytes(&value);

      move_to(&account, serialized);
    }
  }

  public entry fun store_bool(
    account: signer,
    value: bool,
  ) acquires Serialization {
    let addr = signer::address_of(&account);

    if (exists<Serialization>(addr)) {
      let serialized = borrow_global_mut<Serialization>(addr);
      serialized.bool_value = value;
      serialized.bool_bytes = bcs::to_bytes(&value);
    } else {
      let serialized = new_serialization();
      serialized.bool_value = value;
      serialized.bool_bytes = bcs::to_bytes(&value);

      move_to(&account, serialized);
    }
  }

  public entry fun store_u8(
    account: signer,
    value: u8,
  ) acquires Serialization {
    let addr = signer::address_of(&account);

    if (exists<Serialization>(addr)) {
      let serialized = borrow_global_mut<Serialization>(addr);
      serialized.u8_value = value;
      serialized.u8_bytes = bcs::to_bytes(&value);
    } else {
      let serialized = new_serialization();
      serialized.u8_value = value;
      serialized.u8_bytes = bcs::to_bytes(&value);

      move_to(&account, serialized);
    }
  }

  public entry fun store_u64(
    account: signer,
    value: u64,
  ) acquires Serialization {
    let addr = signer::address_of(&account);

    if (exists<Serialization>(addr)) {
      let serialized = borrow_global_mut<Serialization>(addr);
      serialized.u64_value = value;
      serialized.u64_bytes = bcs::to_bytes(&value);
    } else {
      let serialized = new_serialization();
      serialized.u64_value = value;
      serialized.u64_bytes = bcs::to_bytes(&value);

      move_to(&account, serialized);
    }
  }

  public entry fun store_u128(
    account: signer,
    value: u128,
  ) acquires Serialization {
    let addr = signer::address_of(&account);

    if (exists<Serialization>(addr)) {
      let serialized = borrow_global_mut<Serialization>(addr);
      serialized.u128_value = value;
      serialized.u128_bytes = bcs::to_bytes(&value);
    } else {
      let serialized = new_serialization();
      serialized.u128_value = value;
      serialized.u128_bytes = bcs::to_bytes(&value);

      move_to(&account, serialized);
    }
  }

  fun new_serialization(): Serialization {
    Serialization {
      address_value: @0x0,
      address_bytes: x"0000000000000000000000000000000000000000000000000000000000000000",
      bool_value: false,
      bool_bytes: x"00",
      u8_value: 0,
      u8_bytes: vector::empty<u8>(),
      u64_value: 0,
      u64_bytes: vector::empty<u8>(),
      u128_value: 0,
      u128_bytes: vector::empty<u8>(),
    }
  }
}
