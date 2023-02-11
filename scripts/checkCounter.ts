import { Address} from 'ton-core';
import { NewCounter } from '../wrappers/NewCounter';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    
    //change "deployedAddress" with your own deployed contract address
    const deployedAddress=Address.parse("EQDi7OtGsf12hbU_4dd4kbDAV6yq5Q__YT_1ZikYQpzW_yPu")
    //create NewCounter class object from static function "createFromAddress"
    const newcounter=NewCounter.createFromAddress(deployedAddress) 
    //use provider.open to open created newcounter contract to interact with---
    const openedContract = provider.open(newcounter);
    
    //use wrapper function getID() to interact with get method get_id()--> check contract
    console.log('ID', await openedContract.getID());

    //use wrapper function getCounter() to interact with get method get_counter()--> check contract
    console.log("After increament -> New Value of Counter:",await openedContract.getCounter())
}