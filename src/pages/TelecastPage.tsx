import React, { useState } from "react";
import { Send } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import bs58 from 'bs58';

const TelecastPage: React.FC = () => {
    const [inputData, setInputData] = useState("");
    const [encryptedData, setEncryptedData] = useState("");
    const [telecastStatus, setTelecastStatus] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    };

    const encryptData = (data: string): string => {
        return data
            .split("")
            .map((char) => String.fromCharCode(char.charCodeAt(0) ^ 0x7a))
            .join("");
    };

    const encodeToBase58 = (data: string): string => {
      // Convert string to Uint8Array
      const uint8Array = new TextEncoder().encode(data);
      // Encode Uint8Array to base58
      return bs58.encode(uint8Array);
  };

    const telecastData = async (data: string) => {
        setTelecastStatus("Sending Transaction to Solana");
        try {
            await sendMessage(data);
            setTelecastStatus("Transaction sent to Solana");
        } catch (error) {
            console.error("Error sending transaction:", error);
            setTelecastStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const handleTelecast = () => {
        const encrypted = encryptData(inputData);
        setEncryptedData(encrypted);
        setTelecastStatus("Data encrypted and ready for telecast");
        telecastData(encrypted);
    };

    const { publicKey, signTransaction, connected } = useWallet();

    const sendMessage = async (message: string) => {
      message = encodeToBase58(message);
      
        const idl = {
            version: "0.1.0",
            name: "my_payable_contract",
            instructions: [
                {
                    name: "sendMessage",
                    accounts: [
                        { name: "user", isMut: true, isSigner: true },
                        {
                            name: "programAccount",
                            isMut: true,
                            isSigner: false,
                        },
                    ],
                    args: [{ name: "message", type: "string" }],
                },
            ],
            errors: [
                {
                    code: 6000,
                    name: "InsufficientFunds",
                    msg: "Insufficient funds sent for this transaction.",
                },
            ],
        };

        // Replace these with your actual program ID and account
        const PROGRAM_ID = "B53qbHQgjbcpyDkBJ48U3b91K6Aqt8xtPLHqDT4D3A6x";
        const PROGRAM_ACCOUNT = "Your_Actual_Program_Account_Public_Key_Here";

        if (!connected) throw new Error("Wallet not connected");
        if (!publicKey) throw new Error("No public key found");
        if (!signTransaction)
            throw new Error("Wallet does not support transaction signing");

        const connection = new Connection(
            "https://api.devnet.solana.com",
            "processed"
        );

        const provider = new AnchorProvider(
            connection,
            { publicKey, signTransaction },
            { preflightCommitment: "processed" }
        );

        try {
            const programId = new PublicKey(PROGRAM_ID);
            const programAccount = new PublicKey(PROGRAM_ACCOUNT);

            const program = new Program(idl, programId, provider);

            const tx = await program.methods
                .sendMessage(message)
                .accounts({
                    user: publicKey,
                    programAccount: programAccount,
                })
                .signers([])
                .rpc();

            console.log("Transaction successful!", tx);
        } catch (error) {
            console.error("Transaction failed:", error);
            throw error;
        }
    };

    return (
        <div className="container mx-auto py-20 px-4">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Telecast Data
                </h1>
                <WalletMultiButton />
            </div>
            <div className="max-w-md mx-auto">
                <div className="mb-4">
                    <label
                        htmlFor="userData"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Enter data to telecast:
                    </label>
                    <input
                        type="text"
                        id="userData"
                        className="w-full px-3 py-2 bg-dark-300 border border-dark-200 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={inputData}
                        onChange={handleInputChange}
                        placeholder="Enter your data here"
                    />
                </div>
                <button
                    onClick={handleTelecast}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center"
                >
                    <Send size={18} className="mr-2" />
                    Encrypt and Telecast
                </button>
                {encryptedData && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2 text-blue-400">
                            Encrypted Data:
                        </h2>
                        <p className="bg-dark-300 p-3 rounded-md break-all text-gray-300">
                            {encryptedData}
                        </p>
                    </div>
                )}
                {telecastStatus && (
                    <p className="mt-4 text-purple-400 font-semibold">
                        {telecastStatus}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TelecastPage;