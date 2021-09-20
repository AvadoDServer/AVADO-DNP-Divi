import React from "react";
import Modal from "react-modal";
import monitor from "../../../util/monitor";

const Comp = ({ rpcClient }) => {
    const [selectedTier, setSelectedTier] = React.useState(undefined);
    const [collateralHash, setCollateralHash] = React.useState();
    const [isCollatarelHashConfirmed, SetIsCollatarelHashConfirmed] = React.useState(false);

    const setupMasternode = async () => {
        const tx = await rpcClient.request({ method: 'gettransaction', params: ['3eef24c39872839c6c6d5f9dc086f9863b7f45da2c0ed981dfd98f005bafb3e4'] });
        console.log(tx);
        return;
        const response = await rpcClient.request({ method: 'allocatefunds', params: ["masternode", "avado", selectedTier] });
        await monitor.setEnv({
            COLLATERAL_HASH: response.txhash,
        });
        const transaction = await rpcClient.request({ method: 'gettransaction', params: [response.txhash] });
        console.log(transaction);
        // @TODO wait for 15 confirmations
    }

    React.useEffect(() => {
        const timer = setInterval(() => {
            setClockTick(c => c + 1);
        }, 1000 * 10);
        return (() => {
            console.log("Clean up timer");
            clearInterval(timer);
        });
    }, [collateralHash]);

    const checkIfAllocateFundsTransactionConfirmed = async () => {

    }

    const masternodeTypes = [
        {
            name: "copper",
            diviRequired: 100000,
            blockWinAdvantagePercent: null,
        },
        {
            name: "silver",
            diviRequired: 300000,
            blockWinAdvantagePercent: 5,
        },
        {
            name: "gold",
            diviRequired: 1000000,
            blockWinAdvantagePercent: 10,
        },
        {
            name: "platinum",
            diviRequired: 3000000,
            blockWinAdvantagePercent: 15,
        },
        {
            name: "diamond",
            diviRequired: 10000000,
            blockWinAdvantagePercent: 20,
        },
    ];

    return (
        <>
            <Modal isOpen={true} >
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content has-text-centered">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Select Your Tier</p>
                            <button className="delete" aria-label="close"></button>
                        </header>
                        {selectedTier}
                        <section className="modal-card-body">
                            <table align="center">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Type</th>
                                        <th>Divi Required</th>
                                        <th>Block Win</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {masternodeTypes.map(type => {
                                        return <>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="radio"
                                                        name="chosed_tier"
                                                        onClick={() => setSelectedTier(type.name)}
                                                    />
                                                </td>
                                                <td>
                                                    {type.name.toUpperCase()}
                                                </td>
                                                <td>
                                                    {type.diviRequired}
                                                </td>
                                                <td>
                                                    {type.blockWinAdvantagePercent ? `+${type.blockWinAdvantagePercent}% better` : ""}
                                                </td>
                                            </tr>
                                        </>
                                    })}
                                </tbody>
                            </table>
                            <button onClick={setupMasternode}>Allocate Funds</button>
                        </section>
                    </div>
                </div>
            </Modal>
        </>
    );

}

export default Comp;