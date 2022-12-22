import {
  AptosAccount,
  AptosClient
} from 'aptos';
import {
  signAndSendTransaction
} from '../../common/ts/client';

export class BinaryService {

  static async storeAddress(
    client: AptosClient,
    senderAccount: AptosAccount,
    value: string,
    contractAddress: string,
  ): Promise<void> {
    const transaction = await client.generateTransaction(senderAccount.address(), {
      function: `${contractAddress}::binary::store_address`,
      type_arguments: [],
      arguments: [
        value,
      ],
    });

    await signAndSendTransaction(
      client,
      transaction,
      senderAccount,
    );
  }

  static async storeBool(
    client: AptosClient,
    senderAccount: AptosAccount,
    value: boolean,
    contractAddress: string,
  ): Promise<void> {
    const transaction = await client.generateTransaction(senderAccount.address(), {
      function: `${contractAddress}::binary::store_bool`,
      type_arguments: [],
      arguments: [
        value,
      ],
    });

    await signAndSendTransaction(
      client,
      transaction,
      senderAccount,
    );
  }

  static async storeUint8(
    client: AptosClient,
    senderAccount: AptosAccount,
    value: number,
    contractAddress: string,
  ): Promise<void> {
    const transaction = await client.generateTransaction(senderAccount.address(), {
      function: `${contractAddress}::binary::store_u8`,
      type_arguments: [],
      arguments: [
        value,
      ],
    });

    await signAndSendTransaction(
      client,
      transaction,
      senderAccount,
    );
  }

  static async storeUint64(
    client: AptosClient,
    senderAccount: AptosAccount,
    value: number,
    contractAddress: string,
  ): Promise<void> {
    const transaction = await client.generateTransaction(senderAccount.address(), {
      function: `${contractAddress}::binary::store_u64`,
      type_arguments: [],
      arguments: [
        value,
      ],
    });

    await signAndSendTransaction(
      client,
      transaction,
      senderAccount,
    );
  }

  static async storeUint128(
    client: AptosClient,
    senderAccount: AptosAccount,
    value: number,
    contractAddress: string,
  ): Promise<void> {
    const transaction = await client.generateTransaction(senderAccount.address(), {
      function: `${contractAddress}::binary::store_u128`,
      type_arguments: [],
      arguments: [
        value,
      ],
    });

    await signAndSendTransaction(
      client,
      transaction,
      senderAccount,
    );
  }
}
