import { toNano } from 'ton-core';
import { NewCounter } from '../wrappers/NewCounter';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    //creating newcounter class object and adding initial state of the query id and counter variable
    //we need to add initial state so we wont get TVM exit code 9--> https://ton.org/docs/learn/tvm-instructions/tvm-exit-codes
    const newCounter = NewCounter.createFromConfig(
        {
            id: Math.floor(Math.random() * 10000),
            counter: 0,
        },
        await compile('NewCounter')
    );

    await provider.deploy(newCounter, toNano('0.05'));

    const openedContract = provider.open(newCounter);

    console.log('ID', await openedContract.getID());
}
