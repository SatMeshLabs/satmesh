import React, { useState } from "react";
import { Send } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction, Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { anchorProgram } from "../../solana/program";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@coral-xyz/anchor";
import { v4 as uuidV4 } from "uuid";
import CryptoJS from "crypto-js";
// import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@project-serum/anchor";

const TelecastPage: React.FC = () => {
    const [inputData, setInputData] = useState("");
    const [encryptedData, setEncryptedData] = useState("");
    const [telecastStatus, setTelecastStatus] = useState("");
    const [packetId, setPacketId] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const decryptionId = "satmesh";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    };

    const encryptData = (data: string): string => {
        const encrypted = CryptoJS.AES.encrypt(data, decryptionId).toString();
        setEncryptedData(encrypted);
        console.log("encrypted data: ", encrypted);
        return data;
    };

    const telecastData = async (data: string) => {
        setTelecastStatus("Sending Transaction to Solana");
        try {
            await sendMessage(data);
            setTelecastStatus("Transaction sent to Solana");
        } catch (error) {
            console.error("Error sending transaction:", error);
            setTelecastStatus(
                `Error: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }
    };

    const handleTelecast = () => {
        const encrypted = encryptData(inputData);
        setTelecastStatus("Data encrypted and ready for telecast");
        telecastData(encrypted);
    };

    const wallet = useAnchorWallet();
    const { publicKey } = useWallet();
    const program = anchorProgram(wallet as Wallet);

    async function sendMessage(data: string) {
        const packet_id = uuidV4();
        console.log("packet_id", packet_id);
        setPacketId(packet_id);


        const connection = new Connection("https://api.devnet.solana.com");
        const transaction = new Transaction();

        const [dataPDA] = anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from("sat_mesh"), publicKey!.toBuffer()],
            program.programId
        );
        console.log("messagePDA", dataPDA.toBase58());
        console.log("public key", publicKey);
        console.log("system program", anchor.web3.SystemProgram.programId);

        const ix = await program.methods
            .initializeData(packet_id.toString(), data)
            .accounts({
                dataAccount: dataPDA,
                user: publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            } as never)
            .instruction();

        console.log("instruction", ix);
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey!;
        transaction.add(ix);

        const signTx = await wallet?.signTransaction(transaction);
        const serialized_transaction = signTx?.serialize();
        console.log("Here's the transaction", serialized_transaction);

        const sig = await connection.sendRawTransaction(
            serialized_transaction!
        );
        console.log("signature is : ", sig);
        console.log("public key detected", publicKey);
        console.log("encrypted message broadcasted");
    }

    return (
        <div className="container mx-auto py-20 px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Telecast Data
                </h1>
                <WalletMultiButton />
            </div>
            <div className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="userData" className="block text-sm font-medium text-gray-300 mb-2">
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
                        <h2 className="text-lg font-semibold mb-2 text-blue-400">Encrypted Data:</h2>
                        <p className="bg-dark-300 p-3 rounded-md break-all text-gray-300">
                            {encryptedData}
                        </p>
                    </div>
                )}

                {telecastStatus && (
                    <p className="mt-4 text-purple-400 font-semibold">{telecastStatus}</p>
                )}

                {(packetId || transactionId) && (
                    <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                        <h3 className="text-white text-xl font-bold mb-4">Transaction Details</h3>
                        {packetId && (
                            <div className="mb-2">
                                <span className="text-gray-300 font-medium">Packet ID:</span>
                                <p className="text-white bg-gray-800 p-2 rounded-md break-all">
                                    {packetId}
                                </p>
                            </div>
                        )}
                        {transactionId && (
                            <div>
                                <span className="text-gray-300 font-medium">Transaction ID:</span>
                                <p className="text-white bg-gray-800 p-2 rounded-md break-all">
                                    {transactionId}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TelecastPage;
