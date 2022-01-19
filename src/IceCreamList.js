function IceCreamList() {

    const iceCream = ["Vanilla", "Chocolate", "Strawberry", "Mint", "Lime", "Mango", "Green Tea", "Cookie & Cream"]

    const optionList = iceCream.map(e => {
        return (<option>{e}</option>)
    })

    return (
         <select>{optionList}</select>
    )
}

export default IceCreamList;