import {
  AptosAccount,
  AptosClient,
  FaucetClient
} from 'aptos';
import {
  Hasher,
  MerkleTreeSha256,
  TestAccounts
} from '../../common/ts';
import { MerkleTreeService } from '../client/merkle_tree.service';

describe('merkle_tree_module_test', function() {

  const CONTRACT_ADDRESS = '0xb2b2c3069734e5c7efa8507028d07d618b2e4640601a752fe82febe22f2fec58';
  const client = new AptosClient('http://localhost:8080');
  const faucetClient = new FaucetClient('http://localhost:8080', 'http://localhost:8081');
  let defaultAccount: AptosAccount;

  before(async function() {
    defaultAccount = TestAccounts.getAccount(0);
    await faucetClient.fundAccount(defaultAccount.address(), 100000000);
  });

  it('sha256_test', async function() {
    const hashes: Buffer[] = [
      Hasher.keckka256(Buffer.from('100acb')),
      Hasher.keckka256(Buffer.from('212def')),
      Hasher.keckka256(Buffer.from('369xyz')),
    ];
    const tree = new MerkleTreeSha256(hashes);
    const leaf = hashes[0];
    const proofs = tree.proofs(0).map(node => node.hash);
    const root = tree.root().hash;

    await MerkleTreeService.sha256(
      client,
      defaultAccount,
      leaf,
      proofs,
      root,
      CONTRACT_ADDRESS,
    );
  });
});
