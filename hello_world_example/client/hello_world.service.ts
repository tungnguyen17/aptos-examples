import {
  AptosAccount,
  AptosClient
} from 'aptos';

export class HelloWorldService {

  static async hello(
    client: AptosClient,
    senderAccount: AptosAccount,
    message: string,
    contractAddress: string,
  ): Promise<void> {
    const transaction = await client.generateTransaction(senderAccount.address(), {
      function: `${contractAddress}::hello_world::hello`,
      type_arguments: [],
      arguments: [
        message,
      ],
    });

    await signAndSendTransaction(
      client,
      transaction,
      senderAccount,
    );
  }
}

async function signAndSendTransaction(
  client: AptosClient,
  transaction: any,
  signer: AptosAccount,
): Promise<void> {
  const bcsTxn = await client.signTransaction(signer, transaction);
  const pendingTxn = await client.submitTransaction(bcsTxn);
  await client.waitForTransactionWithResult(pendingTxn.hash, { checkSuccess: true });
}
