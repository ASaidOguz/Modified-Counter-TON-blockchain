import { toNano,Address} from 'ton-core';
import { NewCounter } from '../wrappers/NewCounter';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const increaseBy=123;
    const deployedAddress=Address.parse("EQDi7OtGsf12hbU_4dd4kbDAV6yq5Q__YT_1ZikYQpzW_yPu")
    const newcounter=NewCounter.createFromAddress(deployedAddress) 
    const openedContract = provider.open(newcounter);
    //sending increase and I should find way to wait for it to complete the transaction
    //and then contunie to check the new value of the counter
    await openedContract.sendIncrease(provider.sender(),{
        increaseBy,
        value: toNano('0.05'),
    })
    
    
    console.log('ID', await openedContract.getID());
    console.log("Before the increament-> Counter:",await openedContract.getCounter())
}
