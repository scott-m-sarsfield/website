window.initializing = true; // used to prevent event handlers from firing onload

$(document).ready( function() {
	$("#input-component nav ul li").click( function() {
		$(this).siblings().removeClass('select-this-nav');
		$(this).addClass('select-this-nav');
	});
	$("#choose-major li").click( function() {
		$(this).siblings().removeClass('selected-major');
		$(this).addClass('selected-major');
	});
})

var CleanSlateApp = angular.module('CleanSlateApp', []);

CleanSlateApp.controller('CleanSlateController', function ($scope) {

	/* View Controller Variable Declaration */
	$scope.Schedule = angular.copy(window.DefaultScheduleCSE);
	$scope.StudentInput = {
		ap_credit : [],
		ib_credit : [],
		transfer_credit : [],
		previous_experience : []
	};  
	$scope.CurrentStep = {};
	$scope.APTests = [];
	$scope.IBTests = [];
	$scope.currently_viewing_ap_test = {};
	$scope.currently_viewing_ib_test = {};
	$scope.current_major = 'Computer Science & Engineering';
	window.setBasePlan('cse'); /* reflect in base plan */

		
		/* View Controller Variable Initialization */
		$scope.CurrentStep = window.Steps[1];
		
			// AP Tests
			$scope.APTests = window.APTests;
			$scope.currently_viewing_ap_test.score = 3;
			
			// IB Tests
			$scope.IBTests = window.IBTests;
			$scope.currently_viewing_ib_test.score = 6;
			
			// Transfer Credit
			$scope.TransferCredit = window.TransferCredit;
			
			// Miscellaneous
			$scope.previousProgramming = false;
			$scope.math9Suggested = false;
				applyMods('M_02',getEquivalentReadinessExam()); /* natural consequence */
			$scope.honorsStudent = false;
			$scope.leadStudent = false;

	/* Event listeners */
	$scope.$watch('CurrentStep', function() {
			$scope.decideWhichNavToSelect();
	}, true);

	
	/* Methods */
	
	$scope.reset = function(){
	
		// clear ModLog
		window.ModLog = {};
		
		// reset ap tests / transfer credit
		$scope.StudentInput = {
			ap_credit : [],
			ib_credit : [],
			transfer_credit : [],
			previous_experience : [] // <- realizing this isn't used...
		};  
		
		// reset miscellaneous
			$scope.previousProgramming = false;
			$scope.math9Suggested = false;
				applyMods('M_02',getEquivalentReadinessExam()); /* natural consequence */
			$scope.honorsStudent = false;
			$scope.leadStudent = false;
			
		// recompute
		$scope.Schedule = computeNewSchedule();
			
		return;
	}

	/**
	 * Used to assign a CSS class that changes the color of the element based on 
	 * the course category.
	 */
	$scope.assignCSSCourseClass = function() {
		switch(this.course.category) {
			case 'engineering' :
				return 'engineering-course';

			case 'math_and_science' :
				return 'math-course';

			case 'humanities_and_social_science' : 
				return 'humanities-course';

			case 'other' :
				return 'other-course';
		}
	};

	/**
	 * Sets a default schedule during step 1 when a user clicks a major
	 *
	 * @param{String} major - either cse wde
	 */
	$scope.setMajor = function(major) {
		if(major === 'cse') {
			//$scope.Schedule = angular.copy(window.DefaultScheduleCSE); // in js/objects.js
			$scope.current_major = 'Computer Science & Engineering';
		}
		else if(major === 'wde') {
			//$scope.Schedule = angular.copy(window.DefaultScheduleWDE); // in js/objects.js
			$scope.current_major = 'Web Design & Engineering';
		}

		setBasePlan(major);
		$scope.Schedule = computeNewSchedule();
		//$scope.StudentInput = {};
		//$scope.CurrentStep = window.Steps[1];
		//$scope.currently_viewing_ap_test = {};
	}

	/**
	 * Skips to a step if a user clicks directly on a button in the nav
	 *
	 * @param {Number} step - step # to skip to
	 */
	$scope.skipToStep = function(step) {
		$scope.CurrentStep = window.Steps[step];
	}

	/**
	 * Decides which nav (AP Credit, Transfer Credit, or Previous Experience)
	 * should be selected based on the current step
	 */
	$scope.decideWhichNavToSelect = function() {
		var child_to_select = $scope.CurrentStep.step_number - 1;
		if($scope.CurrentStep.step_number > 1 && $scope.CurrentStep.step_number < 5) {
			$("#input-component nav ul li").removeClass('select-this-nav');
			$("#input-component nav ul li:nth-child(" + child_to_select + ")").addClass('select-this-nav');
		}
	}

	$scope.setCurrentlyViewingAPTestScore = function(score) {
		$scope.currently_viewing_ap_test.score = score;
		$('#ap-test-score li').removeClass('selected-ap-test-score');
		$($('#ap-test-score li')[ score - 3 ]).addClass('selected-ap-test-score');
	}
	
	$scope.setCurrentlyViewingIBTestScore = function(score) {
		$scope.currently_viewing_ib_test.score = score;
		$('#ib-test-score li').removeClass('selected-ib-test-score');
		$($('#ib-test-score li')[ score - 6 ]).addClass('selected-ib-test-score');
	}

	$scope.addAPTest = function() {
		for(var i in $scope.StudentInput.ap_credit){
			if($scope.StudentInput.ap_credit[i].id == $scope.currently_viewing_ap_test.id) $scope.removeAPTest(i);
		}
		if(!$scope.StudentInput.ap_credit)
			$scope.StudentInput.ap_credit = {};
		$scope.StudentInput.ap_credit.push( { id:$scope.currently_viewing_ap_test.id, score:$scope.currently_viewing_ap_test.score } );
		
		
		// Determine which classes are affected.
		var mods = getEquivalentAPTest( {id: $scope.currently_viewing_ap_test.id, score:$scope.currently_viewing_ap_test.score } );
	
		applyMods('AP_'+$scope.currently_viewing_ap_test.id,mods);
		
		// Recalculate.
		$scope.Schedule = computeNewSchedule();
		
		// Update explanations.
		$scope.updateExplanation();
		
		$scope.setCurrentlyViewingAPTestScore(3);

	}
	
	$scope.removeAPTest = function(index){
		
		var obj = $scope.StudentInput.ap_credit[index];
		removeMods('AP_'+obj.id);
		
		$scope.StudentInput.ap_credit.splice(index,1); // remove the AP test from the array.
		
		
		// Recalculate.
		$scope.Schedule = computeNewSchedule();
		
		// Update explanations.
		$scope.updateExplanation();
		
		//$scope.Schedule = preComputeScheduleAPCSE( {id: $scope.currently_viewing_ap_test.id, score:$scope.currently_viewing_ap_test.score } )
	}
	
	
	$scope.addIBTest = function() {
		for(var i in $scope.StudentInput.ib_credit){
			if($scope.StudentInput.ib_credit[i].id == $scope.currently_viewing_ib_test.id) $scope.removeIBTest(i);
		}
		if(!$scope.StudentInput.ib_credit)
			$scope.StudentInput.ib_credit = {};
		$scope.StudentInput.ib_credit.push( { id:$scope.currently_viewing_ib_test.id, score:$scope.currently_viewing_ib_test.score } );
		
		
		// Determine which classes are affected.
		var mods = getEquivalentIBTest( {id: $scope.currently_viewing_ib_test.id, score:$scope.currently_viewing_ib_test.score } );
	
		applyMods('IB_'+$scope.currently_viewing_ib_test.id,mods);
		
		// Recalculate.
		$scope.Schedule = computeNewSchedule();
		
		// Update explanations.
		$scope.updateExplanation();
		
		$scope.setCurrentlyViewingIBTestScore(6);

	}
	
	$scope.removeIBTest = function(index){
		
		var obj = $scope.StudentInput.ib_credit[index];
		removeMods('IB_'+obj.id);
		
		$scope.StudentInput.ib_credit.splice(index,1); // remove the IB test from the array.
		
		
		// Recalculate.
		$scope.Schedule = computeNewSchedule();
		
		// Update explanations.
		$scope.updateExplanation();
		
		//$scope.Schedule = preComputeScheduleAPCSE( {id: $scope.currently_viewing_ap_test.id, score:$scope.currently_viewing_ap_test.score } )
	}
	
	
	$scope.addTransferCredit = function() {
		for(var i in $scope.StudentInput.transfer_credit){
			if($scope.StudentInput.transfer_credit[i].id == $scope.currently_viewing_transfer.id) $scope.removeTransferCredit(i);
		}
		$scope.StudentInput.transfer_credit.push( { id:$scope.currently_viewing_transfer.id } );
		
		
		// Determine which classes are affected.
		var mods = getEquivalentTransferCredit({id: $scope.currently_viewing_transfer.id} );
	
		applyMods('TR_'+$scope.currently_viewing_transfer.id,mods);
		
		// Recalculate.
		$scope.Schedule = computeNewSchedule();
		
		// Update explanations.
		$scope.updateExplanation();
		
		//$scope.Schedule = preComputeScheduleTransferCSE( );
	}
	
	$scope.removeTransferCredit = function(index){
		var obj = $scope.StudentInput.transfer_credit[index];
		removeMods('TR_'+obj.id);
		
		$scope.StudentInput.transfer_credit.splice(index,1); // remove the AP test from the array.
		
		// Recalculate.
		$scope.Schedule = computeNewSchedule();
		
		// Update explanations.
		$scope.updateExplanation();
		
		//$scope.Schedule = preComputeScheduleTransferCSE( {id: $scope.currently_viewing_ap_test.id, score:$scope.currently_viewing_ap_test.score } )
	}
	

	$scope.updateProgExp = function(){
	
		// If previousProgramming was previously unchecked,
		// calculate the schedule with the it checked.
		if(!$scope.previousProgramming){
			// Determine which classes are affected.
			var mods = getEquivalentProgrammingExperience();
			applyMods('M_01',mods);
		}
		else removeMods('M_01');
		
		// Recalculate.
		$scope.Schedule = computeNewSchedule();
		
		// Update explanations.
		$scope.updateExplanation();
	}
	
	$scope.updateCalcReady = function(){
	
		if($scope.math9Suggested){
			// Determine which classes are affected.
			var mods = getEquivalentReadinessExam();
			applyMods('M_02',mods);
		}
		else removeMods('M_02');

		// Recalculate.
		$scope.Schedule = computeNewSchedule();
		
		// Update explanations.
		$scope.updateExplanation();
	}
	
	$scope.updateHonors = function(){
		if(!$scope.honorStudent){
			//$scope.Schedule = preComputeReadinessExamCSE();
			//alert("Honors");
		}
		
		// Update explanations.
		$scope.updateExplanation();
	}
	
	$scope.updateLEAD = function(){
		if(!$scope.leadStudent){
			//$scope.Schedule = preComputeReadinessExamCSE();
			//alert("LEAD");
		}
		
		// Update explanations.
		$scope.updateExplanation();
	}

	/**
	 * I used this function to test if the updateScheduleWithNewInput() function
	 * is called on change of the StudentInput object. I also tested if the file
	 * js > compute_new_schedule.js was linked correctly and the ComputeNewSchedule()
	 * function was called with the correct data.
	 *
	 * This function is called when you click on "print"
	 *
	 * UPDATE ------ EVERYTHING WORKS
	 */
	$scope.printSchedule = function() {
		// actual print code
		window.print();
	}

	$scope.showDescription = function() {
		$('#selection-description').text(test.description)
	}
	
	
	//------------------------------------------------------------
	// REVIEW MODE
	$scope.reviewMode = false;
	$scope.reviewButtonText = "Review";
	
	$scope.creditObtainedStrings = {};
	
	$scope.toggleReview = function(){
		$scope.reviewMode = !$scope.reviewMode;
		
		if($scope.reviewMode) $scope.reviewButtonText = "Back";	
		else $scope.reviewButtonText = "Review";
	}
	
	$scope.updateExplanation = function(){
		// parse out modification log into credit obtained strings.
		for(var i in window.ModLog){
			$scope.creditObtainedStrings[i] = $scope.parseMods(window.ModLog[i]);
		}
	}
	
	$scope.parseMods = function(mods){
		var str = "";
		 
		for(var i = 0; i < mods.length; i++){
			if(i!=0) str+= ", ";
			
			var s = mods[i]['parameters'][0];
			str += s.substring(0,4)+" "+s.substring(4);
		}
		return str;
	}
	
	/* to apply initial modifications */
	$scope.Schedule = computeNewSchedule();
	
});
