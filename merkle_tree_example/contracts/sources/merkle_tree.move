module program::merkle_tree {

  use std::hash;
  use std::signer;
  use std::vector;
  use aptos_std::math64;
  use aptos_framework::account;
  use aptos_framework::event;

  struct Check has key {
    leaf: vector<u8>,
    proofs: vector<vector<u8>>,
    root: vector<u8>,
    algorithm: u64,
    is_valid: bool,
    check_events: event::EventHandle<CheckEvent>,
  }

  struct CheckEvent has drop, store {
    leaf: vector<u8>,
    proofs: vector<vector<u8>>,
    root: vector<u8>,
    algorithm: u64,
    is_valid: bool,
  }

  const COMPARE_EQUAL: u8 = 127u8;

  public entry fun sha256(
    account: signer,
    leaf: vector<u8>,
    proofs: vector<vector<u8>>,
    root: vector<u8>,
  ) acquires Check {
    let addr = signer::address_of(&account);

    let is_valid = verify_merkle(leaf, proofs, root);

    let algorithmCode = 742256;
    if (exists<Check>(addr)) {
      let check = borrow_global_mut<Check>(addr);
      check.leaf = leaf;
      check.proofs = proofs;
      check.root = root;
      check.algorithm = algorithmCode;
      check.is_valid = is_valid;

      event::emit_event(&mut check.check_events, CheckEvent {
        leaf,
        proofs,
        root,
        algorithm: algorithmCode,
        is_valid,
      });
    } else {
      let check = Check {
        leaf,
        proofs,
        root,
        algorithm: algorithmCode,
        is_valid,
        check_events: account::new_event_handle<CheckEvent>(&account),
      };

      event::emit_event(&mut check.check_events, CheckEvent {
        leaf,
        proofs,
        root,
        algorithm: algorithmCode,
        is_valid,
      });

      move_to(&account, check);
    }
  }

  fun verify_merkle(
    leaf: vector<u8>,
    proofs: vector<vector<u8>>,
    root: vector<u8>,
  ): bool {
    let computedHash = &leaf;

    let i = 0u64;
    let proofs_length = vector::length(&proofs);
    while (i < proofs_length) {
      let proofElement = vector::borrow(&proofs, i);

      if (comapre_vector(*computedHash, *proofElement) <= COMPARE_EQUAL) {
        // Hash(current computed hash + current element of the proof)
        let combined_hash = vector::empty<u8>();
        vector::append(&mut combined_hash, *computedHash);
        vector::append(&mut combined_hash, *proofElement);
        computedHash = &hash::sha2_256(combined_hash);
      } else {
        // Hash(current element of the proof + current computed hash)
        let combined_hash = vector::empty<u8>();
        vector::append(&mut combined_hash, *proofElement);
        vector::append(&mut combined_hash, *computedHash);
        computedHash = &hash::sha2_256(combined_hash);
      };
      i = i + 1;
    };

    // Check if the computed hash (root) is equal to the provided root
    comapre_vector(*computedHash, root) == COMPARE_EQUAL
  }

  fun comapre_vector(
    x: vector<u8>,
    y: vector<u8>,
  ): u8 {
    let x_length = vector::length(&x);
    let y_length = vector::length(&y);
    let min_length = math64::min(x_length, y_length);

    let i = 0;
    while (i < min_length) {
      let x_i = vector::borrow(&x, i);
      let y_i = vector::borrow(&y, i);
      let compare_result = compare_u8(*x_i, *y_i);
      if (compare_result != COMPARE_EQUAL) {
        return compare_result
      };
      i = i + 1;
    };

    compare_u64(x_length, y_length)
  }

  fun compare_u8(
    x: u8,
    y: u8,
  ): u8 {
    if (x > y) {
      return 255
    };
    if (x < y) {
      return 0
    };
    COMPARE_EQUAL
  }

  fun compare_u64(
    x: u64,
    y: u64,
  ): u8 {
    if (x > y) {
      return 255
    };
    if (x < y) {
      return 0
    };
    COMPARE_EQUAL
  }
}
