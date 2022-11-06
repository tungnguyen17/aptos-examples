module hello_world::hello_world {

  use std::signer;
  use std::string;
  use aptos_framework::account;
  use aptos_framework::event;

  struct Counter has key {
    count: u64,
    last_message: string::String,
    hello_events: event::EventHandle<HelloEvent>,
  }

  struct HelloEvent has drop, store {
    ordinal: u64,
    message: string::String,
  }

  public entry fun hello(
    account: signer,
    message: string::String,
  ) acquires Counter {
    let addr = signer::address_of(&account);
    if (exists<Counter>(addr)) {
      let counter = borrow_global_mut<Counter>(addr);
      counter.count = counter.count + 1;
      counter.last_message = copy message;

      event::emit_event(&mut counter.hello_events, HelloEvent {
        ordinal: counter.count,
        message,
      });
    } else {
      let counter = Counter {
        count: 1,
        last_message: copy message,
        hello_events: account::new_event_handle<HelloEvent>(&account),
      };

      event::emit_event(&mut counter.hello_events, HelloEvent {
        ordinal: 1,
        message,
      });

      move_to(&account, counter);
    }
  }
}
