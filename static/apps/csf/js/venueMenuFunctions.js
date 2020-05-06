    // COEN 161
	// Stefan Zecevic & Scott Sarsfield
	// CampusSmartFoods project
	
	forDelivery = false;  // (initialization)

	// updateItem() - updates the item's div in the orderPane
	function updateItem(code, add){
		// add is true (+1) or false (0)
		
		// update the value...
		if (add)
			venue[code].quantity++;
		else
			venue[code].quantity--;
		
		// ...determine if the div is visible
		if (venue[code].quantity == 0)
			$('#'+code+'_ordered').hide();
		else{
			$('#'+code+'_ordered').show();
			$('#'+code+'_ordered-name').text(venue[code].name);
		}
		
		// if there are multiple, add something to indicate quantity.
		if (venue[code].quantity > 1)
			$('#'+code+'_ordered-name').append(' (x'+venue[code].quantity+')');
			
		// display the cost of the item too (reflecting quantity)
		var itemCost = (venue[code].price) * venue[code].quantity;
	
		itemCost = itemCost.toFixed(2);
		
		$('#'+code+'_cost').text('$'+itemCost);
			
	}

	// updateSubTotal() - updates the subtotal (& discount if appicable)
	function updateSubTotal(discount){
		var subtotal = 0;
		// for each item, add the costs of the items selected
		for(x in venue)
			if(venue[x].quantity !=0)
				subtotal += venue[x].price * venue[x].quantity;
				
		// display the subtotal (to the cent)
		subtotal = subtotal.toFixed(2);
		$('#orderSubTotal').text('$'+subtotal);
		
		// Also, calculate and display the discount.
		if (discount){
			amtSaved = subtotal * .1;
			amtSaved = amtSaved.toFixed(2);
			$('#orderDiscount').text('- $'+amtSaved);
			subtotal -= amtSaved;
			subtotal.toFixed(2);
		}
		
		return subtotal;
	}
	
	// updateTax() - updates the tax (pretty straight-foreward)
	function updateTax(subtotal,taxRate){
		var tax = subtotal * taxRate;
		tax = tax.toFixed(2);
		$('#orderTax').text('$'+tax);
		
		return tax;
	}
	
	// updateFoodTotal - updates the food total (just sums subtotal and 
	//					and tax and displays it.)
	function updateFoodTotal(subtotal, tax){
		var foodTotal = parseFloat(subtotal) + parseFloat(tax);
		foodTotal = foodTotal.toFixed(2);
		$('#orderFoodTotal').text('$'+foodTotal);
		$('#orderFoodTotalCopy').text('$'+foodTotal);
		
		return foodTotal;
	}

	// updateTotal - updates the grand total & displays values
	function updateTotal(food_total,delivery_fee){
		total = parseFloat(food_total) + parseFloat(delivery_fee);
		total = total.toFixed(2);
		
		$('#orderTotal').text('$'+total);
		$('#totalPrice').val(total);
	}
		
	// updateMenu - updates the entire orderPane (other than the items)
	function updateMenu(discount){
		// update subtotal
		subtotal = updateSubTotal(discount);
		// update tax
		tax = updateTax(subtotal,.0825);
		// update food total
		food_total = updateFoodTotal(subtotal, tax);

		// update grand total (with delivery fee if applicable)
		if (forDelivery == true)
			updateTotal(food_total,5.00);
		else
			updateTotal(food_total,0.00);
		
		// calculate and update total calories.
		sumCalories();

	}
	
	// sumCalories() - calculates and updates total calories
	function sumCalories(){
		var totalCal = 0;
		// add all calories from the ordered items.
		for(x in venue)
			if(venue[x].quantity !=0)
				totalCal += parseInt(venue[x].cal) * parseInt(venue[x].quantity);
		
		// update the hidden input.
		$('#totalCal').val(totalCal);
		return totalCal;
	}
	