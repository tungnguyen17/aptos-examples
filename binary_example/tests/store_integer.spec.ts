import {
  AptosAccount,
  AptosClient,
  FaucetClient
} from 'aptos';
import { TestAccounts } from '../../common/ts';
import { BinaryService } from '../client/binary.service';

describe('merkle_tree_module_test', function() {

  const CONTRACT_ADDRESS = '0xb2b2c3069734e5c7efa8507028d07d618b2e4640601a752fe82febe22f2fec58';
  const client = new AptosClient('http://localhost:8080');
  const faucetClient = new FaucetClient('http://localhost:8080', 'http://localhost:8081');
  let defaultAccount: AptosAccount;

  before(async function() {
    defaultAccount = TestAccounts.getAccount(0);
    await faucetClient.fundAccount(defaultAccount.address(), 100000000);
  });

  it('store_address', async function() {
    const account2 = TestAccounts.getAccount(2);
    await BinaryService.storeAddress(
      client,
      defaultAccount,
      account2.address().hex(),
      CONTRACT_ADDRESS,
    );
  });

  it('store_bool', async function() {
    const value = new Date().getTime() % 2;
    await BinaryService.storeBool(
      client,
      defaultAccount,
      value > 0,
      CONTRACT_ADDRESS,
    );
  });

  it('store_u8', async function() {
    const value = new Date().getTime() % 256;
    await BinaryService.storeUint8(
      client,
      defaultAccount,
      value,
      CONTRACT_ADDRESS,
    );
  });

  it('store_u64', async function() {
    const value = new Date().getTime();
    await BinaryService.storeUint64(
      client,
      defaultAccount,
      value,
      CONTRACT_ADDRESS,
    );
  });

  it('store_u128', async function() {
    const value = new Date().getTime();
    await BinaryService.storeUint128(
      client,
      defaultAccount,
      value,
      CONTRACT_ADDRESS,
    );
  });
});
