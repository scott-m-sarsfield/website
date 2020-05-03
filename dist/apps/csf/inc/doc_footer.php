<script type="text/javascript">
	
		// toggle_Menu() - toggles the appearance of a menu
		//         --> Used with the login module (used with .click())
		function toggle_Menu(sourceID,submenuClass){
			var submenuRef = sourceID +' '+ submenuClass;
			if( $(submenuRef).css('display') == 'none')
					$(submenuRef).slideDown();
			else
					$(submenuRef).slideUp();
		}
	
		// toggle() - toggles an attribute of an item
		//				between two states...(used with .click())
		function toggle(type,item,attribute,state1,state2){
			if(type == 'css'){
				if ( $(item).css(attribute) == state1)
						$(item).css(attribute,state2);
				else
						$(item).css(attribute,state1);
			}
			if(type == 'html'){
				if ( $(item).attr(attribute) == state1)
						$(item).attr(attribute,state2);
				else
						$(item).attr(attribute,state1);
			}
		}
	
		// toggleLogin() - toggles login module menu
		function toggleLogin(){
			toggle_Menu('#log-in','.login_sub');
			toggle('html','#log-in img','src',
					'img/arrow_up.png','img/arrow_down.png');
		}
		
		// getPageName() - determines what page you're on, so you don't load all the actions
		// [Especially since some elements don't exist on other pages...]
		function getPageName(){
			var pathname = window.location.pathname;
			var path_sections = pathname.split('/');
			return path_sections[path_sections.length - 1];
		}
		
		
		// MENU FUNCTIONS !!!
		
		// loadMenuActions() - executes all actions necessary for 'menu.php'
		function loadMenuActions(){
			// Highlight vegan and glutenfree items according to the user's preference.
			if (currJavaUser.glutenFree && currJavaUser.vegan) {
				$('.glutenfree.vegan').css('background-color','#FFF0A8');
			}
			else {if (currJavaUser.glutenFree)
				$('.glutenfree').css('background-color','#FFF0A8');
				else {if (currJavaUser.vegan)
						$('.vegan').css('background-color','#FFF0A8');}}			
		
			// Set the delivery options on the orderPane.
			$('#transPU').click(function(){$('#delOnly').hide(); forDelivery = false;updateMenu(<?=!$newUser?>);});
			$('#transD').click(function(){$('#delOnly').show(); forDelivery = true;updateMenu(<?=!$newUser?>);});
			
			// prepares the overload div in case of tracking.
			prepareOverloadError();
		
			// Link the 'add' and 'remove' buttons with the orderPane actions.
			<?php
				// For every menu item, assign the add and remove actions.
			if(isset($currentVenue))
				foreach($currentVenue->food as $code=>$item){
					echo ("$('#".$code."').click(function(){addItem('".$code."');}); \n\t\t\t");
					echo ("$('#".$code."_cancel').click(function(){removeItem('".$code."');}); \n\t\t\t");
				}
			
			?>
			
			// Set the ratings div to the proper width. (of coverage)
			$('#receivedstars').css('width','<?= getAverageRating();?>%')
		}
		
				// addItem() - adds the item to the orderPane & updates info.
		function addItem(item){
			updateItem(item,true);
			updateMenu(<?= !$newUser;?>);
		}
		
		// removeItem() - removes the item from the orderPane & updates info.
		function removeItem(item){
			updateItem(item,false);
			updateMenu(<?= !$newUser;?>);
		}
		
		
		// REVIEW PAGE FUNCTIONS !!!
		
		function loadReviewActions(){
			defaultLook();  // for the # of reviews on the page
			
			// Set the ratings div to the proper width. (of coverage)
			$('#receivedstars').css('width','<?= getAverageRating();?>%');
		}
		
		
		<?php
			// getAverageRating() - returns the average rating based on reviews of a venue.
			function getAverageRating(){
				global $currentVenue;
				
				if (!isset($currentVenue)) return 0;			
				
				$averageRating = 0;
				$totalStars = 0;
				$nReviews = 0;
				
				foreach($currentVenue->reviews as $review){
					$totalStars += $review->rating;
					$nReviews++;
				}
				
				$averageRating =($nReviews > 0) ? $totalStars / $nReviews: 5;
				
				$ratePercent = ($averageRating / 5) * 100;
				
				return $ratePercent;
			}
		?>
		


		$(window).load(function() {
			$('#log-in #start').click(function(){toggleLogin();});
		
			$('#venues_nav').hover(function(){$('#venues_nav .nav_sub').slideToggle();});
			$('#tools_nav').hover(function(){$('#tools_nav .nav_sub').slideToggle();});
			$('#forum_nav').hover(function(){$('#forum_nav .nav_sub').slideToggle();});
			
			var pagename = getPageName();
			
			if (pagename == 'menu.php')
				loadMenuActions();
				
			if (pagename == 'review.php')
				loadReviewActions();
			
		});
	</script>
</body>

</html>
