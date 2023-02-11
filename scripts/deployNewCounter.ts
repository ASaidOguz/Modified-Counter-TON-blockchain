import { toNano } from 'ton-core';
import { NewCounter } from '../wrappers/NewCounter';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
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
