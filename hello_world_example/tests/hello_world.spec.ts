import {
  AptosAccount,
  AptosClient,
  FaucetClient
} from 'aptos';
import { TestAccounts } from '../../common/ts';
import { HelloWorldService } from '../client/hello_world.service';

describe('hello_world_module_test', function() {

  const CONTRACT_ADDRESS = '0xb2b2c3069734e5c7efa8507028d07d618b2e4640601a752fe82febe22f2fec58';
  const client = new AptosClient('http://localhost:8080');
  const faucetClient = new FaucetClient('http://localhost:8080', 'http://localhost:8081');
  let defaultAccount: AptosAccount;

  before(async function() {
    defaultAccount = TestAccounts.getAccount(0);
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
