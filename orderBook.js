const reconcileOrder = (existingBook, incomingOrder) => {
  if(existingBook.length === 0) {
    existingBook.push(incomingOrder)

    return existingBook
  }

  // look for matching orders loop through and putting things on at the end
  // create an updated book variable
  let updatedBook = []
  // we want to loop through the array to the end UNLESS incoming order has been fulfilled
  // while while there is still stuff in book and still a quantity on incoming order keep looping otherwise stop.
  while(existingBook.length && incomingOrder.quantity > 0) {
    const currentOrder = existingBook.shift()

    // if they match 
    if(currentOrder.type !== incomingOrder.type && currentOrder.price === incomingOrder.price) {
    // fulfill
      if(incomingOrder.quantity === currentOrder.quantity) {
        incomingOrder.quantity = 0
      } else if (incomingOrder.quantity > currentOrder.quantity) {

        incomingOrder.quantity = incomingOrder.quantity - currentOrder.quantity
      } else {
        incomingOrder = {
          type: currentOrder.type,
          price: currentOrder.price,
          quantity: currentOrder.quantity - incomingOrder.quantity  }
      }
    } else {
    // else
      updatedBook.push(currentOrder)
    // add to updated book
    // if we look at it and its not a match just push it
    }
  }

  if(existingBook.length) {
    updatedBook = updatedBook.concat(existingBook)
  }

  if(incomingOrder.quantity > 0) {
    updatedBook.push(incomingOrder)
  
  }
  return updatedBook
}

module.exports = reconcileOrder
