var productContainer = document.getElementById('storeItemList');
var shoppingCart = document.getElementById('cart');
var shoppingCartListing = document.getElementById('cartListings');

var subtotalDisplay = document.getElementById('subtotal');
document.getElementById('cartAdd').addEventListener('click', function()
{
	UpdateCart();
});

var products = JSON.parse(document.getElementById('data').innerHTML);
for (let i = 0; i < products.length; i++) //Adds all the products to the list
	{
		AddElement(products[i]);
	}
	function AddElement(elementInJson)
	{
		var itemContainer = document.createElement('div');
		
		itemContainer.classList.add('item');
		productContainer.appendChild(itemContainer);
		
		itemContainer.dataset["price"] = elementInJson.price; //dataset allows itemContainer values to be indexed with strings
		itemContainer.dataset["product"] = elementInJson.manufacturer + ' ' + elementInJson.productName;
		itemContainer.dataset["description"] = elementInJson.description;
		itemContainer.dataset["image"] = elementInJson.image;
		itemContainer.dataset["maxQuantity"] = elementInJson.quantity;
		itemContainer.dataset["minQuantity"] = 0;
		
		var name = document.createElement('h2');
		name.innerHTML = itemContainer.dataset["product"];
		
		var description = document.createElement('p');
		description.innerHTML = itemContainer.dataset["description"] + "<hr><b style='font-size: 150%; color: blue'>$" + itemContainer.dataset["price"] + "</b>";
		
		var image = document.createElement('img');
		image.src = itemContainer.dataset["image"];
		var qtyChooser = document.createElement('select');
		
		for (var i = 0; i <= itemContainer.dataset["maxQuantity"]; i++)
			{
				var qty = document.createElement("option");
				qty.text = i;
				qty.value = i;
				qtyChooser.appendChild(qty);
			}
		//qtyChooser.onkeydown = function() { window.alert('hi'); return false; };
		qtyChooser.classList.add("quantity");
		qtyChooser.setAttribute('type', 'number');
		qtyChooser.setAttribute('min', itemContainer.dataset["minQuantity"]);
		qtyChooser.setAttribute('max', Number.parseInt(itemContainer.dataset['maxQuantity'], 10)); //Parse in base 10
		
		var qtyDescriptor = document.createElement('label');
		qtyDescriptor.innerHTML = "Quantity: ";
		var priceBox = document.createElement('span');
		
		
		var priceDollar = document.createElement('p');
		priceDollar.style.verticalAlign = 'top';
		priceDollar.innerHTML = "$";
		priceDollar.style.display = "inline";
		
		
		itemContainer.appendChild(name);
		itemContainer.appendChild(image);
		itemContainer.appendChild(description);
		itemContainer.appendChild(priceBox);
		itemContainer.appendChild(document.createElement('div'));
		itemContainer.appendChild(qtyDescriptor);
		itemContainer.appendChild(qtyChooser);
	}
	function removeProductFromCart(productIndex) {
		var items = document.querySelectorAll("#storeItemList .item");
		var qty = items[productIndex].querySelector(".quantity");
		qty.value = 0;
		UpdateCart();
	}


function UpdateCart() {
	var availableItems = productContainer.getElementsByClassName('item');
	var subtotal = 0;
	
	shoppingCart.querySelector('ul').innerHTML = "";
	
	
	for (let i = 0; i < availableItems.length; i++) //Sets all values relating to the shopping cart
		{
			var itemPrice = Number.parseInt(availableItems[i].dataset["price"])
			var itemQty = Number.parseInt(availableItems[i].querySelector(".quantity").value); //Retrieves the current quantity from the input element
			if (itemQty >= 1)
				{
					var formattedItem = document.createElement('span');
					
					
					var removeItem = document.createElement('p');
				    var br = document.createElement('br');
					removeItem.style.cursor = 'pointer';
					removeItem.innerHTML = '❌';
					removeItem.style.display = "inline";
					removeItem.style.marginRight = "5px";
					//removeItem.dataset["productindex"] = i;
					shoppingCartListing.appendChild(removeItem);
					shoppingCartListing.appendChild(formattedItem);
					shoppingCartListing.appendChild(br);
					formattedItem.innerHTML = availableItems[i].dataset["product"] + ':  ' + itemQty;
					
					(function(productIndex) { //Closure: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
						removeItem.addEventListener('click', function() { //When any of the items's 'x' boxes are clicked, this method runs
							removeProductFromCart(productIndex);
						});
					})(i);

					var subtotal = subtotal + itemPrice * itemQty; //Takes the original subtotals from previous loops and adds them to the new subtotal for the item
				}
		}
	subtotalDisplay.innerHTML = subtotal;
}
