/* eslint-disable @typescript-eslint/no-unused-vars */
import * as anchor from '@coral-xyz/anchor';
import type { Satmesh } from './constants';
import { IDL } from './constants';

const RPC_URL = "https://api.devnet.solana.com";

export const connection = new anchor.web3.Connection(RPC_URL, 'confirmed');

export const getProvider = (wallet: anchor.Wallet) => {
    const opts = {
      preflightCommitment: 'processed' as anchor.web3.ConfirmOptions,
    };
  
    const provider = new anchor.AnchorProvider(
      connection,
      wallet,
      opts.preflightCommitment
    );
    return provider;
  };

  export const anchorProgram = (wallet: anchor.Wallet) => {
    const provider = getProvider(wallet);
    const idl = IDL as anchor.Idl;
    const program = new anchor.Program(
      idl,
      provider,
    ) as unknown as anchor.Program<Satmesh>;
  
    return program;
  };