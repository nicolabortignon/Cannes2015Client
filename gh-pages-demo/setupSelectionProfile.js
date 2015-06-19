var currentProfile = -1;
var currentGender = -1; // 0 = man , 1 = woman
var currentInterest = -1; //  0 = photography , 1 = history , 2= nature





function setupSelectionProfile() {
    console.log("SETUP PROFILE -----")
    $('#secondStep').hide();
    $('#firstStep').show();
    $('#selectProfile').show()

    $('#profileMan').click(function() {
        currentGender = 0; // MAN
        $("#genderDescription").text("MAN");
        showSecondStep();
    });
    $('#profileWoman').click(function() {
        currentGender = 1; // MAN
        $("#genderDescription").text("WOMAN");
        showSecondStep();
    });


    // SET UP SECOND PART OF THE PROFILES

    $('#profilePhotography').click(function() {
        currentInterest = 0;
        calculateProfile();
        startExperience()
    });
    $('#profileHistory').click(function() {
        currentInterest = 1;
        calculateProfile();
        startExperience()
    });
    $('#profileNature').click(function() {
        currentInterest = 2;
        calculateProfile();
        startExperience()
    });

}

function calculateProfile() {
    currentProfile = (3 * currentGender) + currentInterest;
    // man,photography    0
    // man,history        1
    // man,nature         2
    // woman, photograph  3
    // woman, history     4
    // woman, nature      5

}

function showSecondStep() {
    $('#secondStep').show();
    $('#firstStep').hide();
}

function showFirstStep() {
    $('#firstStep').show();
    $('#secondStep').hide();
}

function showTheExperience() {
    $('#selectProfile').hide()
    $('#firstStep').hide();
    $('#secondStep').hide()
    $('#likeNumber').hide();
    $('#closeButton').hide();
    $('#likeButton').hide();
    $('#qrCodeHolder').hide();
    $('#shortURL').hide();
    $('#shareNumber').hide();
    $('#likeNumber').hide();

}


function startExperience() {
    // HERE WE START EXPERIENCE 
    showTheExperience();
    setTimeout(function() {
        var tremula = tremulaInit();
        //tremula.Grid.updateConfig({itemConstraint:200,itemMargins:[20,20]});
        attachDemoControls(tremula);
        $('#likeNumber').show();
        $('#closeButton').show();
        $('#likeButton').show();
        $('#qrCodeHolder').show();
        $('#shortURL').show();
        $('#shareNumber').show();
        $('#likeNumber').show();
        window.tremula = tremula; //does not need to be on the window -- implemented here for convienience.

        //$('body').removeClass('doReflect');
        //toggleDebug();

    }, 1000);
}