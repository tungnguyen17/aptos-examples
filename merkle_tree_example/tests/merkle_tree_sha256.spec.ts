import { AptosAccount,
  AptosClient,
  FaucetClient } from 'aptos';
import { Hasher } from '../../common/ts/hasher';
import { MerkleTreeSha256 } from '../../common/ts/merkle_tree';
import { MerkleTreeService } from '../client/merkle_tree.service';

describe('merkle_tree_module_test', function() {

  const CONTRACT_ADDRESS = '0x66094c702d5f730c463aa359d8934c6d49f71f7bf89d5788240c235129133adf';
  const client = new AptosClient('http://localhost:8080');
  const faucetClient = new FaucetClient('http://localhost:8080', 'http://localhost:8081');
  let defaultAccount: AptosAccount;

  before(async function() {
    defaultAccount = new AptosAccount(Uint8Array.from([137, 206, 72, 75, 226, 122, 39, 49, 67, 110, 36, 246, 102, 108, 115, 237, 24, 99, 195, 4, 211, 249, 143, 123, 220, 13, 202, 94, 219, 38, 210, 58]));
    await faucetClient.fundAccount(defaultAccount.address(), 100000000);
  });

  it('sha256_test', async function() {
    const hashes: Buffer[] = [
      Hasher.keckka256(Buffer.from('1acb')),
      Hasher.keckka256(Buffer.from('2acb')),
      Hasher.keckka256(Buffer.from('3acb')),
    ];
    const tree = new MerkleTreeSha256(hashes);
    const leaf = Hasher.keckka256(Buffer.from('1acb'));
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
