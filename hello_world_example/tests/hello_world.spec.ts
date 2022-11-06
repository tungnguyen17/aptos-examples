import { AptosAccount,
  AptosClient,
  FaucetClient } from 'aptos';
import { HelloWorldService } from '../client/hello_world.service';

describe('hello_world_module_test', function() {

  const CONTRACT_ADDRESS = '0x66094c702d5f730c463aa359d8934c6d49f71f7bf89d5788240c235129133adf';
  const client = new AptosClient('http://localhost:8080');
  const faucetClient = new FaucetClient('http://localhost:8080', 'http://localhost:8081');
  let defaultAccount: AptosAccount;

  before(async function() {
    defaultAccount = new AptosAccount(Uint8Array.from([137, 206, 72, 75, 226, 122, 39, 49, 67, 110, 36, 246, 102, 108, 115, 237, 24, 99, 195, 4, 211, 249, 143, 123, 220, 13, 202, 94, 219, 38, 210, 58]));
    await faucetClient.fundAccount(defaultAccount.address(), 10000000);
  });

  it('hello_test', async function() {
    await HelloWorldService.hello(
      client,
      defaultAccount,
      'Good morning',
      CONTRACT_ADDRESS,
    );
  });
});
