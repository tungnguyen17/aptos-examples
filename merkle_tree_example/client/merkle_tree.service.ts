import {
  AptosAccount,
  AptosClient
} from 'aptos';
import {
  signAndSendTransaction
} from '../../common/ts/client';

export class MerkleTreeService {

  static async sha256(
    client: AptosClient,
    senderAccount: AptosAccount,
    leaf: Buffer,
    proofs: Buffer[],
    root: Buffer,
    contractAddress: string,
  ): Promise<void> {
    const transaction = await client.generateTransaction(senderAccount.address(), {
      function: `${contractAddress}::merkle_tree::sha256`,
      type_arguments: [],
      arguments: [
        leaf,
        proofs,
        root,
      ],
    });

    await signAndSendTransaction(
      client,
      transaction,
      senderAccount,
    );
  }
}
