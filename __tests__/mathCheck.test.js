import App, {_handleEvent,_convertToMathExpression} from '../src/App.js';
import NumberButtons from '../src/components/NumberButtons/NumberButtons.js';

let num = null;

describe('App Events',()=>{
    beforeEach(()=>{
        num = new App()
        console.log(num)
    });
    it('should not be null',()=>{
        expect(num).not.toBeNull()
    });
    it('state._output should equal 0',()=>{
        expect(num.state._output).toEqual('0')
    });
    it('props should be undefined',()=>{
        expect(num.props).toEqual(undefined)
    });
    // it('should set state with the new value',()=>{
    //     expect(num._initOutput(7).toEqual(7))
    // })
})